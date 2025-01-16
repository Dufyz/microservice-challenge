import { itemRepository } from "../../../infra/database/repositories/item.repository";

describe("Item repository - Update item", () => {
  it("Should update item data", async () => {
    const createItemOrError = await itemRepository.create({
      name: "Item 1",
      quantity: 10,
    });

    if (createItemOrError.isFailure()) {
      throw new Error("Error creating item");
    }

    const createdItem = createItemOrError.value;

    const updatedItemOrError = await itemRepository.update(createdItem.id, {
      name: "Item name updated",
    });

    if (updatedItemOrError.isFailure()) {
      throw new Error("Error finding item");
    }

    const updatedItem = updatedItemOrError.value;

    expect(createItemOrError.isSuccess()).toBeTruthy;
    expect(updatedItemOrError.isSuccess()).toBeTruthy();

    expect(updatedItem).toEqual({
      id: createdItem.id,
      name: updatedItem.name,
      quantity: createdItem.quantity,
      created_at: createdItem.created_at,
      updated_at: updatedItem.updated_at,
    });
  });
});
