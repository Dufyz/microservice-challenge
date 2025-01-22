import z from "zod";
import { clientSchema } from "./client.schema";

export const patchClientSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
  body: clientSchema.pick({ name: true }).partial(),
});
