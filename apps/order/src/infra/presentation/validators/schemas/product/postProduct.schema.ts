import z from "zod";
import { productSchema } from "./product.schema";

export const postProductSchema = z.object({
  body: productSchema.pick({ name: true, price: true }),
});
