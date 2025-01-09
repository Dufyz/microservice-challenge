import { InventoryTransaction } from "../../domain/inventory_transaction";
import { Either } from "../../shared/utils/either";
import { RepositoryErrors } from "../errors";

export type InventoryTransactionRepository = {
  findById(
    id: number
  ): Promise<Either<RepositoryErrors, InventoryTransaction | null>>;
  create(
    body: Pick<InventoryTransaction, "item_id" | "quantity" | "type">
  ): Promise<Either<RepositoryErrors, InventoryTransaction>>;
  delete(id: number): Promise<Either<RepositoryErrors, void>>;
};
