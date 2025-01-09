import { getRepositoryError } from "../../../application/errors";
import { InventoryTransactionRepository } from "../../../application/interfaces/inventory_transaction.repository";
import {
  InventoryTransaction,
  parseInventoryTransactionFromDB,
} from "../../../domain/inventory_transaction";
import { failure, success } from "../../../shared/utils/either";
import sql from "../postgresql";

export const inventoryTransactionRepository: InventoryTransactionRepository = {
  findById: async (id) => {
    try {
      const [transaction] = await sql`
          SELECT id, item_id, quantity, type, created_at
          FROM inventory_transactions
          WHERE id = ${id}
      `;

      if (!transaction) return success(null);

      return success(
        parseInventoryTransactionFromDB(transaction as InventoryTransaction)
      );
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
  create: async (body) => {
    try {
      const transactionToCreate: Pick<
        InventoryTransaction,
        "item_id" | "quantity" | "type"
      > = {
        item_id: body.item_id,
        quantity: body.quantity,
        type: body.type,
      };

      const colsToInsert = Object.keys(
        transactionToCreate
      ) as (keyof typeof transactionToCreate)[];

      const [transaction] = await sql`
            INSERT INTO inventory_transactions ${sql(
              transactionToCreate,
              colsToInsert
            )}
            RETURNING id, item_id, quantity, type, created_at
        `;

      return success(
        parseInventoryTransactionFromDB(transaction as InventoryTransaction)
      );
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
  delete: async (id) => {
    try {
      await sql`
          DELETE FROM inventory_transactions
          WHERE id = ${id}
      `;

      return success(undefined);
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
};
