import { Item } from "../../../domain/item";
import { Either, failure, success } from "../../../shared/utils/either";
import { RepositoryErrors } from "../../errors";
import { ItemRepository } from "../../interfaces/item.repository";

export const getItemQuantity =
  (itemRepository: ItemRepository) =>
  async (id: number): Promise<Either<RepositoryErrors, number>> => {
    const quantityOrError = await itemRepository.getItemQuantity(id);

    if (quantityOrError.isFailure()) return failure(quantityOrError.value);

    const quantity = quantityOrError.value;
    return success(quantity);
  };
