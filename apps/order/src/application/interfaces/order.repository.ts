import { Order } from "../../domain/order";
import { Either } from "../../shared/utils/either";
import { RepositoryErrors } from "../errors";

export type OrderRepository = {
  create(
    body: Pick<Order, "client_id">
  ): Promise<Either<RepositoryErrors, Order>>;
};
