import { InventoryTransaction } from "../../../domain/inventory_transaction";
import { Either, failure, success } from "../../../shared/utils/either";
import { RepositoryErrors } from "../../errors";
import { InventoryTransactionRepository } from "../../interfaces/inventory_transaction.repository";

export const findInventoryTransactionById =
  (inventoryTransactionRepository: InventoryTransactionRepository) =>
  async (
    id: number
  ): Promise<Either<RepositoryErrors, InventoryTransaction | null>> => {
    const inventoryTransactionOrError =
      await inventoryTransactionRepository.findById(id);

    if (inventoryTransactionOrError.isFailure())
      return failure(inventoryTransactionOrError.value);

    const inventoryTransaction = inventoryTransactionOrError.value;
    return success(inventoryTransaction);
  };
