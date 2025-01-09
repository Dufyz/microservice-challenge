import { Item } from "../../../domain/item";
import { Either, failure, success } from "../../../shared/utils/either";
import { RepositoryErrors } from "../../errors";
import { InventoryTransactionRepository } from "../../interfaces/inventory_transaction.repository";
import { ItemRepository } from "../../interfaces/item.repository";
import { createInventoryTransaction } from "../inventory_transaction";

export const createItem =
  (
    itemRepository: ItemRepository,
    inventoryTransaction: InventoryTransactionRepository
  ) =>
  async (
    body: Pick<Item, "name" | "quantity">
  ): Promise<Either<RepositoryErrors, Item>> => {
    const itemOrError = await itemRepository.create({
      name: body.name,
      quantity: 0,
    });

    if (itemOrError.isFailure()) return failure(itemOrError.value);

    const item = itemOrError.value;
    item.quantity = body.quantity;

    if (item.quantity === 0) return success(item);

    const inventoryTransactionOrError = await createInventoryTransaction(
      inventoryTransaction,
      itemRepository
    )({
      item_id: item.id,
      quantity: item.quantity,
      type: "IN",
    });

    if (inventoryTransactionOrError.isFailure())
      return failure(inventoryTransactionOrError.value);

    return success(item);
  };
