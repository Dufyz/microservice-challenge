import { OrderProduct } from "./order_product.entities";

export const parseOrderProductFromDB = (
  orderProduct: OrderProduct
): OrderProduct => ({
  id: orderProduct.id,
  order_id: orderProduct.order_id,
  product_id: orderProduct.product_id,
  quantity: orderProduct.quantity,
  created_at: orderProduct.created_at,
  updated_at: orderProduct.updated_at,
});
