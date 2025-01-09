import { InventoryTransaction } from "../inventory_transaction";

export function calculateNewItemQuantity({
  quantity,
  transaction,
  invert = false,
}: {
  quantity: number;
  transaction: InventoryTransaction;
  invert?: boolean;
}): number {
  const transactionQuantity = transaction.quantity;

  if (invert) transaction.type = transaction.type === "IN" ? "OUT" : "IN";

  if (transaction.type === "IN") return quantity + transactionQuantity;

  if (quantity - transactionQuantity >= 0)
    return quantity - transactionQuantity;

  return 0;
}
