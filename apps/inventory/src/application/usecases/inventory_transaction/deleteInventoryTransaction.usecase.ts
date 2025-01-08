import { Either, failure, success } from "../../../shared/utils/either";
import { RepositoryErrors } from "../../errors";
import { InventoryTransactionRepository } from "../../interfaces/inventory_transaction.repository";

export const deleteInventoryTransaction =
  (inventoryTransactionRepository: InventoryTransactionRepository) =>
  async (id: number): Promise<Either<RepositoryErrors, void>> => {
    const voidOrError = await inventoryTransactionRepository.delete(id);

    if (voidOrError.isFailure()) return failure(voidOrError.value);

    return success(undefined);
  };
