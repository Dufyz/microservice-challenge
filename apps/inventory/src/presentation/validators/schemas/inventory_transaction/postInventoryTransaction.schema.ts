import z from "zod";
import { inventoryTransactionSchema } from "./inventory_transaction.schema";

export const postInventoryTransactionSchema = z.object({
  body: inventoryTransactionSchema.pick({
    item_id: true,
    quantity: true,
    type: true,
  }),
});
