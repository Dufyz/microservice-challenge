import { OrderRepository } from "../../../application/interfaces/order.repository";
import { updateOrderStatus } from "../../../application/usecases/order/updateOrderStatus.usecase";
import { orderRepository } from "../../database/repositories/order.repository";
import { kafkaConsumer } from "../consumer";

export const orderCreateInventoryVerifyConsumer = async (
  orderRepository: OrderRepository
) => {
  const consumer = await kafkaConsumer(
    "order-group-2",
    "order_created_inventory_verify"
  );

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const messageStr = message.value?.toString();

      const json = JSON.parse(messageStr || "") as {
        order: {
          id: number;
          status: "approved" | "canceled";
        };
      };

      const order = json.order;

      updateOrderStatus(orderRepository)(order.id, {
        status: order.status,
      });
    },
  });
};

orderCreateInventoryVerifyConsumer(orderRepository);
