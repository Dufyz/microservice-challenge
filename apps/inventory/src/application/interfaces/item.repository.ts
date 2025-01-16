import { Item } from "../../domain/item";
import { Either } from "../../shared/utils/either";
import { RepositoryErrors } from "../errors";

export type ItemRepository = {
  findItemById(id: number): Promise<Either<RepositoryErrors, Item | null>>;
  getItemQuantity(id: number): Promise<Either<RepositoryErrors, number>>;
  create(
    body: Pick<Item, "name" | "quantity">
  ): Promise<Either<RepositoryErrors, Item>>;
  update(
    id: number,
    body: Partial<Pick<Item, "name">>
  ): Promise<Either<RepositoryErrors, Item>>;
  updateQuantity(
    id: number,
    quantity: number
  ): Promise<Either<RepositoryErrors, void>>;
};
