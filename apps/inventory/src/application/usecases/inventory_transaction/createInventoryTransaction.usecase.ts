import { InventoryTransaction } from "../../../domain/inventory_transaction";
import { calculateNewItemQuantity } from "../../../domain/item";
import { Either, failure, success } from "../../../shared/utils/either";
import { getRepositoryError, RepositoryErrors } from "../../errors";
import { InventoryTransactionRepository } from "../../interfaces/inventory_transaction.repository";
import { ItemRepository } from "../../interfaces/item.repository";
import { getItemQuantity } from "../item/getItemQuantity.usecase";
import { updateItemQuantity } from "../item/updateItemQuantity.usecase";

export const createInventoryTransaction =
  (
    inventoryTransactionRepository: InventoryTransactionRepository,
    itemRepository: ItemRepository
  ) =>
  async (
    body: Pick<InventoryTransaction, "item_id" | "quantity" | "type">
  ): Promise<Either<RepositoryErrors, InventoryTransaction>> => {
    const itemQuantityOrError = await getItemQuantity(itemRepository)(
      body.item_id
    );

    if (itemQuantityOrError.isFailure())
      return failure(itemQuantityOrError.value);

    const itemQuantity = itemQuantityOrError.value;

    if (body.type === "OUT" && itemQuantity < body.quantity)
      return failure(
        getRepositoryError(new Error("Insufficient quantity of item in stock"))
      );

    const inventoryTransactionOrError =
      await inventoryTransactionRepository.create(body);

    if (inventoryTransactionOrError.isFailure())
      return failure(inventoryTransactionOrError.value);

    const inventoryTransaction = inventoryTransactionOrError.value;

    const valueOrErorr = await updateItemQuantity(itemRepository)(
      body.item_id,
      calculateNewItemQuantity({
        quantity: itemQuantity,
        transaction: inventoryTransaction,
      })
    );
    if (valueOrErorr.isFailure()) return failure(valueOrErorr.value);

    return success(inventoryTransaction);
  };
