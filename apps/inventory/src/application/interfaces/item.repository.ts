import { Item } from "../../domain/item";
import { Either } from "../../shared/utils/either";
import { RepositoryErrors } from "../errors";

export type ItemRepository = {
  findIemById(id: number): Promise<Either<RepositoryErrors, Item | null>>;
  create(
    body: Pick<Item, "name" | "quantity">
  ): Promise<Either<RepositoryErrors, Item>>;
  update(
    id: number,
    body: Partial<Pick<Item, "name" | "quantity">>
  ): Promise<Either<RepositoryErrors, Item>>;
};
