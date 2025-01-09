import { calculateNewItemQuantity } from "../../../domain/item";
import { Either, failure, success } from "../../../shared/utils/either";
import { getRepositoryError, RepositoryErrors } from "../../errors";
import { InventoryTransactionRepository } from "../../interfaces/inventory_transaction.repository";
import { ItemRepository } from "../../interfaces/item.repository";
import { getItemQuantity } from "../item/getItemQuantity.usecase";
import { updateItemQuantity } from "../item/updateItemQuantity.usecase";
import { findInventoryTransactionById } from "./findInventoryTransactionById.usecase";

export const deleteInventoryTransaction =
  (
    inventoryTransactionRepository: InventoryTransactionRepository,
    itemRepository: ItemRepository
  ) =>
  async (id: number): Promise<Either<RepositoryErrors, void>> => {
    const inventoryTransactionOrError = await findInventoryTransactionById(
      inventoryTransactionRepository
    )(id);
    if (inventoryTransactionOrError.isFailure())
      return failure(inventoryTransactionOrError.value);
    if (!inventoryTransactionOrError.value)
      return failure(getRepositoryError(new Error("Transaction not found")));

    const inventoryTransaction = inventoryTransactionOrError.value;

    const itemQuantityOrError = await getItemQuantity(itemRepository)(
      inventoryTransaction.item_id
    );
    if (itemQuantityOrError.isFailure())
      return failure(itemQuantityOrError.value);

    const voidOrError = await inventoryTransactionRepository.delete(id);
    if (voidOrError.isFailure()) return failure(voidOrError.value);

    const valueOrErorr = await updateItemQuantity(itemRepository)(
      inventoryTransaction.item_id,
      calculateNewItemQuantity({
        quantity: itemQuantityOrError.value,
        transaction: inventoryTransaction,
        invert: true,
      })
    );
    if (valueOrErorr.isFailure()) return failure(valueOrErorr.value);

    return success(undefined);
  };
