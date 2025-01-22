import { productRepository } from "../../../infra/database/repositories/product.repository";

describe("Product repository - Create", () => {
  it("Should successfully create a product", async () => {
    const productOrError = await productRepository.create({
      name: "Product 1",
      price: 10,
    });

    if (productOrError.isFailure()) {
      throw new Error(productOrError.value.message);
    }

    expect(productOrError.value).toEqual({
      id: expect.any(Number),
      name: "Product 1",
      price: 10,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });
});
