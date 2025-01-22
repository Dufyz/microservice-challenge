import { Product } from "../../../domain/product";
import { Either, failure, success } from "../../../shared/utils/either";
import { RepositoryErrors } from "../../errors";
import { ProductRepository } from "../../interfaces/product.repository";

export const createProduct =
  (productRepository: ProductRepository) =>
  async (
    body: Pick<Product, "name" | "price">
  ): Promise<Either<RepositoryErrors, Product>> => {
    const productOrError = await productRepository.create(body);

    if (productOrError.isFailure()) return failure(productOrError.value);

    const product = productOrError.value;
    return success(product);
  };
