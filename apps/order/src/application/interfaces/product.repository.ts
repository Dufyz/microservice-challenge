import { Product } from "../../domain/product";
import { Either } from "../../shared/utils/either";
import { RepositoryErrors } from "../errors";

export type ProductRepository = {
  findProductById(
    id: number
  ): Promise<Either<RepositoryErrors, Product | null>>;
  create(
    body: Pick<Product, "name" | "price">
  ): Promise<Either<RepositoryErrors, Product>>;
  update(
    id: number,
    body: Partial<Pick<Product, "name" | "price">>
  ): Promise<Either<RepositoryErrors, Product>>;
};
