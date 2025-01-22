import z from "zod";

export const orderSchema = z.object({
  id: z.coerce.number(),
  client_id: z.coerce.number(),
  created_at: z.date(),
  updated_at: z.date(),
});
