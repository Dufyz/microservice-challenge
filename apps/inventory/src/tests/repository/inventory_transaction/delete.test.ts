import { inventoryTransactionRepository } from "../../../infra/database/repositories/inventory_transactions.repository";
import { itemRepository } from "../../../infra/database/repositories/item.repository";

describe("Inventory transaction repository - Delete", () => {
  it("Should successfully delete an inventory transaction", async () => {
    const itemOrError = await itemRepository.create({
      name: "Item 1",
      quantity: 10,
    });

    if (itemOrError.isFailure()) {
      throw new Error("Error creating item");
    }

    const item = itemOrError.value;

    const inventoryTransactionOrError =
      await inventoryTransactionRepository.create({
        item_id: item.id,
        quantity: item.quantity,
        type: "IN",
      });

    if (inventoryTransactionOrError.isFailure()) {
      throw new Error("Error creating item");
    }

    const inventoryTransaction = inventoryTransactionOrError.value;

    const voidOrError = await inventoryTransactionRepository.delete(
      inventoryTransaction.id
    );

    if (voidOrError.isFailure()) {
      throw new Error("Error deleting inventory transaction");
    }

    const deletedInventoryTransactionOrError =
      await inventoryTransactionRepository.findById(inventoryTransaction.id);

    if (deletedInventoryTransactionOrError.isFailure()) {
      throw new Error("Error finding inventory transaction");
    }

    expect(deletedInventoryTransactionOrError.value).toBeNull();
  });
});
