import z from "zod";

export const getItemSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
});
