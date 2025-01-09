import { Either, failure, success } from "../../../shared/utils/either";
import { RepositoryErrors } from "../../errors";
import { ItemRepository } from "../../interfaces/item.repository";

export const itemInventoryAvailable =
  (itemRepository: ItemRepository) =>
  async (
    id: number,
    quantity: number
  ): Promise<
    Either<
      RepositoryErrors,
      {
        isAvailable: boolean;
        quantity: number;
      }
    >
  > => {
    const quantityOrError = await itemRepository.getItemQuantity(id);

    if (quantityOrError.isFailure()) return failure(quantityOrError.value);

    return success({
      isAvailable: quantityOrError.value >= quantity,
      quantity: quantityOrError.value,
    });
  };
