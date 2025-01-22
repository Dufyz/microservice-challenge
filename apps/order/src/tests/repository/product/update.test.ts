import { productRepository } from "../../../infra/database/repositories/product.repository";

describe("Product repository - Update", () => {
  it("Should successfully update a product", async () => {
    const productOrError = await productRepository.create({
      name: "Product 1",
      price: 10,
    });

    if (productOrError.isFailure()) {
      throw new Error(productOrError.value.message);
    }

    const product = productOrError.value;

    const updatedProductOrError = await productRepository.update(product.id, {
      name: "Product 2",
    });

    if (updatedProductOrError.isFailure()) {
      throw new Error(updatedProductOrError.value.message);
    }

    const updatedProduct = updatedProductOrError.value;
    expect(updatedProduct).toEqual({
      id: product.id,
      name: "Product 2",
      price: product.price,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });
});
