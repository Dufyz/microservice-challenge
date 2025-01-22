import z from "zod";

export const orderProductSchema = z.object({
  id: z.coerce.number(),
  order_id: z.coerce.number(),
  product_id: z.coerce.number(),
  quantity: z.coerce.number(),
  created_at: z.date(),
  updated_at: z.date(),
});
