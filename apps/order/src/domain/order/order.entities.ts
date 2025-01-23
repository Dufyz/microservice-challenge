export type OrderStatus = "pending" | "approved" | "canceled";

export type Order = {
  id: number;
  client_id: number;
  status: OrderStatus;
  created_at: Date;
  updated_at: Date;
};
