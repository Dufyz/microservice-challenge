import { OrderProduct } from "../../domain/order_product";
import { Either } from "../../shared/utils/either";
import { RepositoryErrors } from "../errors";

export type OrderProductRepository = {
  create(
    body: Pick<OrderProduct, "order_id" | "product_id" | "quantity" | "price">
  ): Promise<Either<RepositoryErrors, OrderProduct>>;
};
