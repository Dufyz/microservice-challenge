import { inventoryTransactionRepository } from "../../../infra/database/repositories/inventory_transactions.repository";
import { itemRepository } from "../../../infra/database/repositories/item.repository";

describe("Inventory transaction repository - Find by id", () => {
  it("Should successfully find an inventory transaction by id", async () => {
    const itemOrError = await itemRepository.create({
      name: "Item 1",
      quantity: 10,
    });

    if (itemOrError.isFailure()) {
      throw new Error("Error creating item");
    }

    const item = itemOrError.value;

    const createdInventoryTransactionOrError =
      await inventoryTransactionRepository.create({
        item_id: item.id,
        quantity: item.quantity,
        type: "IN",
      });

    if (createdInventoryTransactionOrError.isFailure()) {
      throw new Error("Error creating item");
    }

    const createdInventoryTransaction =
      createdInventoryTransactionOrError.value;

    const inventoryTransactionOrError =
      await inventoryTransactionRepository.findById(
        createdInventoryTransaction.id
      );

    if (inventoryTransactionOrError.isFailure()) {
      throw new Error("Error creating item");
    }

    expect(inventoryTransactionOrError.value).toEqual({
      id: createdInventoryTransaction.id,
      item_id: createdInventoryTransaction.item_id,
      type: createdInventoryTransaction.type,
      quantity: createdInventoryTransaction.quantity,
      created_at: createdInventoryTransaction.created_at,
      updated_at: createdInventoryTransaction.updated_at,
    });
  });
});
