import { itemRepository } from "../../../infra/database/repositories/item.repository";

describe("Item repository - Create", () => {
  it("Should successfully create an item", async () => {
    const itemOrError = await itemRepository.create({
      name: "Item 1",
      quantity: 10,
    });

    if (itemOrError.isFailure()) {
      throw new Error("Error creating item");
    }

    expect(itemOrError.value).toEqual({
      id: expect.any(Number),
      name: "Item 1",
      quantity: 10,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });
});
