import { InventoryTransaction } from "./inventory_transaction.entities";

export const parseInventoryTransactionFromDB = (
  inventoryTransaction: InventoryTransaction
): InventoryTransaction => ({
  id: inventoryTransaction.id,
  item_id: inventoryTransaction.item_id,
  quantity: inventoryTransaction.quantity,
  type: inventoryTransaction.type,
  created_at: inventoryTransaction.created_at,
  updated_at: inventoryTransaction.updated_at,
});
