import { inventoryTransactionRepository } from "../../../infra/database/repositories/inventory_transactions.repository";
import { itemRepository } from "../../../infra/database/repositories/item.repository";

describe("Inventory transaction repository - Create", () => {
  it("Should successfully create an inventory transaction", async () => {
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

    expect(inventoryTransactionOrError.value).toEqual({
      id: expect.any(Number),
      item_id: item.id,
      type: "IN",
      quantity: 10,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });
});
