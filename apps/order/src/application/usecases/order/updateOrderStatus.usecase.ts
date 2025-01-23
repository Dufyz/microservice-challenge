import { Order } from "../../../domain/order";
import { Either, failure, success } from "../../../shared/utils/either";
import { RepositoryErrors } from "../../errors";
import { OrderRepository } from "../../interfaces/order.repository";

export const updateOrderStatus =
  (orderRepository: OrderRepository) =>
  async (
    id: number,
    body: Pick<Order, "status">
  ): Promise<Either<RepositoryErrors, Order>> => {
    const orderOrError = await orderRepository.updateOrderStatus(id, body);

    if (orderOrError.isFailure()) return failure(orderOrError.value);

    const order = orderOrError.value;
    return success(order);
  };
