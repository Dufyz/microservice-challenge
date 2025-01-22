import z from "zod";

export const getProductSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
});
