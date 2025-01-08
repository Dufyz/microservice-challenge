import { Item } from "../../../domain/item";
import { Either, failure, success } from "../../../shared/utils/either";
import { RepositoryErrors } from "../../errors";
import { ItemRepository } from "../../interfaces/item.repository";

export const createItem =
  (itemRepository: ItemRepository) =>
  async (
    body: Pick<Item, "name" | "quantity">
  ): Promise<Either<RepositoryErrors, Item>> => {
    const itemOrError = await itemRepository.create(body);

    if (itemOrError.isFailure()) return failure(itemOrError.value);

    const item = itemOrError.value;

    return success(item);
  };
