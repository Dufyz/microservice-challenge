import { getRepositoryError } from "../../../application/errors";
import { OrderProductRepository } from "../../../application/interfaces/order_product.repository";
import {
  OrderProduct,
  parseOrderProductFromDB,
} from "../../../domain/order_product";
import { failure, success } from "../../../shared/utils/either";
import sql from "../postgresql";

export const orderProductRepository: OrderProductRepository = {
  create: async (body) => {
    try {
      const orderProductToCreate: Pick<
        OrderProduct,
        "order_id" | "product_id" | "quantity"
      > = {
        order_id: body.order_id,
        product_id: body.product_id,
        quantity: body.quantity,
      };

      const colsToInsert = Object.keys(
        orderProductToCreate
      ) as (keyof typeof orderProductToCreate)[];

      const [orderProduct] = await sql`
                INSERT INTO order_products ${sql(
                  orderProductToCreate,
                  colsToInsert
                )}
                RETURNING id, order_id, product_id, quantity, created_at, updated_at
            `;

      return success(parseOrderProductFromDB(orderProduct as OrderProduct));
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
};
