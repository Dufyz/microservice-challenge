import { itemRepository } from "../../../infra/database/repositories/item.repository";

describe("Item repository - Find item by id", () => {
  it("Should find created item succefully", async () => {
    const createItemOrError = await itemRepository.create({
      name: "Item 1",
      quantity: 10,
    });

    if (createItemOrError.isFailure()) {
      throw new Error("Error creating item");
    }

    const createdItem = createItemOrError.value;

    const itemOrError = await itemRepository.findItemById(createdItem.id);

    if (itemOrError.isFailure()) {
      throw new Error("Error finding item");
    }

    const item = itemOrError.value;

    expect(createItemOrError.isSuccess()).toBeTruthy;
    expect(itemOrError.isSuccess()).toBeTruthy();

    expect(item).toEqual({
      id: createdItem.id,
      name: createdItem.name,
      quantity: createdItem.quantity,
      created_at: createdItem.created_at,
      updated_at: createdItem.updated_at,
    });
  });
});
