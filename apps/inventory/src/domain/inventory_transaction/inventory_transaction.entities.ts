export type InventoryTransactionType = "IN" | "OUT";

export type InventoryTransaction = {
  id: number;
  item_id: number;
  quantity: number;
  type: InventoryTransactionType;
  created_at: Date;
  updated_at: Date;
};
