import { InventoryTransaction } from "../../../domain/inventory_transaction";
import { Either, failure, success } from "../../../shared/utils/either";
import { RepositoryErrors } from "../../errors";
import { InventoryTransactionRepository } from "../../interfaces/inventory_transaction.repository";

export const createInventoryTransaction =
  (inventoryTransactionRepository: InventoryTransactionRepository) =>
  async (
    body: Pick<InventoryTransaction, "item_id" | "quantity" | "type">
  ): Promise<Either<RepositoryErrors, InventoryTransaction>> => {
    const inventoryTransactionOrError =
      await inventoryTransactionRepository.create(body);

    if (inventoryTransactionOrError.isFailure())
      return failure(inventoryTransactionOrError.value);

    const inventoryTransaction = inventoryTransactionOrError.value;

    return success(inventoryTransaction);
  };
