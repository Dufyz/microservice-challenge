import z from "zod";

export const clientSchema = z.object({
  id: z.coerce.number(),
  name: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
});
