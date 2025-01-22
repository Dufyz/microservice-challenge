import { Product } from "../../../domain/product";
import { Either, failure, success } from "../../../shared/utils/either";
import { RepositoryErrors } from "../../errors";
import { ProductRepository } from "../../interfaces/product.repository";

export const findProductById =
  (productRepository: ProductRepository) =>
  async (id: number): Promise<Either<RepositoryErrors, Product | null>> => {
    const productOrError = await productRepository.findProductById(id);

    if (productOrError.isFailure()) return failure(productOrError.value);

    const product = productOrError.value;
    return success(product);
  };
