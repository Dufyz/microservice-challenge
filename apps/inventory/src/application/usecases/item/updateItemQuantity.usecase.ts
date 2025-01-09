import { Item } from "../../../domain/item";
import { Either, failure, success } from "../../../shared/utils/either";
import { RepositoryErrors } from "../../errors";
import { ItemRepository } from "../../interfaces/item.repository";

export const updateItemQuantity =
  (itemRepository: ItemRepository) =>
  async (
    id: number,
    quantity: number
  ): Promise<Either<RepositoryErrors, void>> => {
    const valueOrError = await itemRepository.updateQuantity(id, quantity);

    if (valueOrError.isFailure()) return failure(valueOrError.value);

    return success(undefined);
  };
