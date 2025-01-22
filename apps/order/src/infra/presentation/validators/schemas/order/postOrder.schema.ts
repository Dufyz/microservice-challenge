import z from "zod";

export const postOrderSchema = z.object({
  body: z.object({
    client_id: z.coerce.number(),
    products: z.array(
      z.object({
        product_id: z.coerce.number(),
        quantity: z.coerce.number(),
      })
    ),
  }),
});
