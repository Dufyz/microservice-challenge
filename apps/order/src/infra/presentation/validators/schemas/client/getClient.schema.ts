import z from "zod";

export const getClientSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
});
