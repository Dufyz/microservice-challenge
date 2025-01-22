import { productRepository } from "../../../infra/database/repositories/product.repository";

describe("Product repository - Find product by id", () => {
  it("Should successfully find a created product", async () => {
    const createdProductOrError = await productRepository.create({
      name: "Product 1",
      price: 10,
    });

    if (createdProductOrError.isFailure()) {
      throw new Error(createdProductOrError.value.message);
    }

    const productOrError = await productRepository.findProductById(
      createdProductOrError.value.id
    );

    if (productOrError.isFailure()) {
      throw new Error(productOrError.value.message);
    }

    const createdProduct = createdProductOrError.value;
    const product = productOrError.value;
    expect(product).toEqual({
      id: createdProduct.id,
      name: createdProduct.name,
      price: createdProduct.price,
      created_at: createdProduct.created_at,
      updated_at: createdProduct.updated_at,
    });
  });
});
