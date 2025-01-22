import { Product } from "../../../domain/product";
import { Either, failure, success } from "../../../shared/utils/either";
import { RepositoryErrors } from "../../errors";
import { ProductRepository } from "../../interfaces/product.repository";

export const updateProduct =
  (productRepository: ProductRepository) =>
  async (
    id: number,
    body: Partial<Pick<Product, "name" | "price">>
  ): Promise<Either<RepositoryErrors, Product>> => {
    const productOrError = await productRepository.update(id, body);

    if (productOrError.isFailure()) return failure(productOrError.value);

    const product = productOrError.value;
    return success(product);
  };
