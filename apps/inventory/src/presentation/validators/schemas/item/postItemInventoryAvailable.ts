import z from "zod";

export const postItemInventoryAvailable = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
  body: z.object({
    quantity: z.coerce.number().positive(),
  }),
});
