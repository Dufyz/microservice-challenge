import z from "zod";

export const itemSchema = z.object({
  id: z.number(),
  name: z.string(),
  quantity: z.number(),
  created_at: z.date(),
  updated_at: z.date(),
});
