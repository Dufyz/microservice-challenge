import { getRepositoryError } from "../../../application/errors";
import { OrderRepository } from "../../../application/interfaces/order.repository";
import { Order, parseOrderFromDB } from "../../../domain/order";
import { failure, success } from "../../../shared/utils/either";
import sql from "../postgresql";

export const orderRepository: OrderRepository = {
  create: async (body) => {
    try {
      const orderToCreate: Pick<Order, "client_id"> = {
        client_id: body.client_id,
      };

      const colsToInsert = Object.keys(
        orderToCreate
      ) as (keyof typeof orderToCreate)[];

      const [order] = await sql`
                INSERT INTO orders ${sql(orderToCreate, colsToInsert)}
                RETURNING id, client_id, created_at, updated_at
            `;

      return success(parseOrderFromDB(order as Order));
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
};
