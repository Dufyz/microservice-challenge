import { Order } from "./order.entities";

export const parseOrderFromDB = (order: Order): Order => ({
  id: order.id,
  client_id: order.client_id,
  created_at: order.created_at,
  updated_at: order.updated_at,
});
