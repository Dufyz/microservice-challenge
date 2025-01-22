import z from "zod";
import { clientSchema } from "./client.schema";

export const postClientSchema = z.object({
  body: clientSchema.pick({ name: true }),
});
