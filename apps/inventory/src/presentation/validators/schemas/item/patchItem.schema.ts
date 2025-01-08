import z from "zod";
import { itemSchema } from "./item.schema";

export const patchItemSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
  body: itemSchema
    .pick({ name: true, quantity: true })
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one property must be provided",
    }),
});
