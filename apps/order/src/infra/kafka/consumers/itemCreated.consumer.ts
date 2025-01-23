import { createProduct } from "../../../application/usecases/product";
import { productRepository } from "../../database/repositories/product.repository";
import { kafkaConsumer } from "../consumer";

export const itemCreatedConsumer = async () => {
  const consumer = await kafkaConsumer("item_created");

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const messageStr = message.value?.toString();

      const json = JSON.parse(messageStr || "") as {
        item: {
          id: number;
          name: string;
          quantity: number;
          created_at: string;
          updated_at: string;
        };
      };

      const item = json.item;

      createProduct(productRepository)({
        name: item.name,
        price: 0,
      });
    },
  });
};

itemCreatedConsumer();
