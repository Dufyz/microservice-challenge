import z from "zod";
import { itemSchema } from "./item.schema";

export const postItemSchema = z.object({
  body: itemSchema.pick({ name: true, quantity: true }),
});
