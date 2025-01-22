import z from "zod";
import { productSchema } from "./product.schema";

export const patchProductSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
  body: productSchema.pick({ name: true, price: true }).partial(),
});
