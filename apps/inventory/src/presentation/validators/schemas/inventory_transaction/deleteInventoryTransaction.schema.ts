import z from "zod";

export const deleteInventoryTransactionSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
});
