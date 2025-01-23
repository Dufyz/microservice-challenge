import { ItemRepository } from "../../../application/interfaces/item.repository";
import { Producer } from "../../../application/interfaces/producer";
import { itemInventoryAvailable } from "../../../application/usecases/item";
import { updateItemQuantity } from "../../../application/usecases/item/updateItemQuantity.usecase";
import { itemRepository } from "../../database/repositories/item.repository";
import { kafkaConsumer } from "../consumer";
import { kafkaProducer } from "../producer";

export const orderCreateInventoryVerifyConsumer = async (
  itemRepository: ItemRepository,
  producer: Producer
) => {
  const consumer = await kafkaConsumer("inventory-group-1", "order_created");

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const messageStr = message.value?.toString();

      const json = JSON.parse(messageStr || "") as {
        order: {
          id: number;
          client_id: number;
          created_at: string;
          updated_at: string;
          products: { product_id: number; quantity: number; price: number }[];
        };
      };

      const { order } = json;
      const { products } = order;

      try {
        const inventoryChecks = products.map(async (product) => {
          const result = await itemInventoryAvailable(itemRepository)(
            product.product_id,
            product.quantity
          );

          if (result.isFailure() || !result.value.isAvailable) {
            throw new Error(
              `Inventory unavailable for product ${product.product_id}`
            );
          }

          return {
            productId: product.product_id,
            currentQuantity: result.value.quantity,
            requestedQuantity: product.quantity,
          };
        });

        const validatedProducts = await Promise.all(inventoryChecks);

        const updatePromises = validatedProducts.map(async (product) => {
          await updateItemQuantity(itemRepository)(
            product.productId,
            product.currentQuantity - product.requestedQuantity
          );
        });

        await Promise.all(updatePromises);

        await producer.sendMessage("order_created_inventory_verify", {
          order: {
            id: order.id,
            status: "approved",
          },
        });
      } catch (error) {
        await producer.sendMessage("order_created_inventory_verify", {
          order: {
            id: order.id,
            status: "canceled",
          },
        });
      }
    },
  });
};

orderCreateInventoryVerifyConsumer(itemRepository, kafkaProducer);
