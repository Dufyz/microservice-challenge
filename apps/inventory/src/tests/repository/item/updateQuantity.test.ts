import { itemRepository } from "../../../infra/database/repositories/item.repository";

describe("Item repository - Update item quantity", () => {
  it("Should update item quantiy", async () => {
    const createItemOrError = await itemRepository.create({
      name: "Item 1",
      quantity: 10,
    });

    if (createItemOrError.isFailure()) {
      throw new Error("Error creating item");
    }

    const createdItem = createItemOrError.value;
    
    const newQuantity = 20;

    const voidOrError = await itemRepository.updateQuantity(createdItem.id, newQuantity);

    if (voidOrError.isFailure()) {
      throw new Error("Error finding item");
    }

    const updatedItemOrError = await itemRepository.findItemById(
      createdItem.id
    );

    if (updatedItemOrError.isFailure()) {
      throw new Error("Error finding item");
    }

    const updatedItem = updatedItemOrError.value;

    expect(createItemOrError.isSuccess()).toBeTruthy;
    expect(voidOrError.isSuccess()).toBeTruthy();

    expect(updatedItem).toEqual({
      id: createdItem.id,
      name: createdItem.name,
      quantity: newQuantity,
      created_at: createdItem.created_at,
      updated_at: expect.any(Date),
    });
  });
});
