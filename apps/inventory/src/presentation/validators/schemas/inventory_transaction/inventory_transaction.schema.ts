import z from "zod";

export const inventoryTransactionSchema = z.object({
  id: z.number(),
  item_id: z.number(),
  quantity: z.number(),
  type: z.enum(["IN", "OUT"]),
  created_at: z.date(),
  updated_at: z.date(),
});
