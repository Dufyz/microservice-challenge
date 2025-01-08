import { getRepositoryError } from "../../../application/errors";
import { InventoryTransactionRepository } from "../../../application/interfaces/inventory_transaction.repository";
import {
  InventoryTransaction,
  parseInventoryTransactionFromDB,
} from "../../../domain/inventory_transaction";
import { failure, success } from "../../../shared/utils/either";
import { filterObjNullishValues } from "../../../shared/utils/filterObjNullishValues";
import sql from "../postgresql";

export const inventoryTransactionRepository: InventoryTransactionRepository = {
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

      const insertObj = filterObjNullishValues(transactionToCreate);
      const colsToInsert = Object.keys(insertObj) as (keyof typeof insertObj)[];

      const [transaction] = await sql`
            INSERT INTO inventory_transactions ${sql(insertObj, colsToInsert)}
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
