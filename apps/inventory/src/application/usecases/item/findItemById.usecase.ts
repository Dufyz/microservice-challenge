import { Item } from "../../../domain/item";
import { Either, failure, success } from "../../../shared/utils/either";
import { RepositoryErrors } from "../../errors";
import { ItemRepository } from "../../interfaces/item.repository";

export const findItemById =
  (itemRepository: ItemRepository) =>
  async (id: number): Promise<Either<RepositoryErrors, Item | null>> => {
    const itemOrError = await itemRepository.findIemById(id);

    if (itemOrError.isFailure()) return failure(itemOrError.value);

    const item = itemOrError.value;

    return success(item);
  };
