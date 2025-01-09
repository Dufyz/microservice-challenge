import { Item } from "../../../domain/item";
import { Either, failure, success } from "../../../shared/utils/either";
import { RepositoryErrors } from "../../errors";
import { ItemRepository } from "../../interfaces/item.repository";

export const updateItem =
  (itemRepository: ItemRepository) =>
  async (
    id: number,
    body: Partial<Pick<Item, "name">>
  ): Promise<Either<RepositoryErrors, Item>> => {
    const itemOrError = await itemRepository.update(id, body);

    if (itemOrError.isFailure()) return failure(itemOrError.value);

    const item = itemOrError.value;
    return success(item);
  };
