import z from "zod";

export const productSchema = z.object({
  id: z.coerce.number(),
  name: z.string(),
  price: z.number(),
  created_at: z.date(),
  updated_at: z.date(),
});
