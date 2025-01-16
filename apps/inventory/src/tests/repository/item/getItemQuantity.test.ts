import { itemRepository } from "../../../infra/database/repositories/item.repository";

describe("Item repository - Get item quantity by item id", () => {
  it("Should return item quantity by item id", async () => {
    const createItemOrError = await itemRepository.create({
      name: "Item 1",
      quantity: 10,
    });

    if (createItemOrError.isFailure()) {
      throw new Error("Error creating item");
    }

    const item = createItemOrError.value;

    const itemQuantityOrError = await itemRepository.getItemQuantity(item.id);

    if (itemQuantityOrError.isFailure()) {
      throw new Error("Error finding item");
    }

    const itemQuantity = itemQuantityOrError.value;

    expect(createItemOrError.isSuccess()).toBeTruthy;
    expect(itemQuantityOrError.isSuccess()).toBeTruthy();

    expect(itemQuantity).toEqual(item.quantity);
  });
});
