import { OrderProduct } from "../../../domain/order_product";
import { Either, failure, success } from "../../../shared/utils/either";
import { RepositoryErrors } from "../../errors";
import { OrderProductRepository } from "../../interfaces/order_product.repository";

export const createOrderProduct =
  (orderProductRepository: OrderProductRepository) =>
  async (
    body: Pick<OrderProduct, "order_id" | "product_id" | "quantity" | "price">
  ): Promise<Either<RepositoryErrors, OrderProduct>> => {
    const orderProductOrError = await orderProductRepository.create(body);

    if (orderProductOrError.isFailure())
      return failure(orderProductOrError.value);

    const orderProduct = orderProductOrError.value;
    return success(orderProduct);
  };
