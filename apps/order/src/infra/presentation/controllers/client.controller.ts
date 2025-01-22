import z from "zod";
import { getClientSchema } from "../validators/schemas/client/getClient.schema";
import { clientRepository } from "../../database/repositories/client.repository";
import { Request, Response } from "express";
import { postClientSchema } from "../validators/schemas/client/postClient.schema";
import { patchClientSchema } from "../validators/schemas/client/patchClient.schema";
import {
  createClient,
  findClientById,
  updateClient,
} from "../../../application/usecases/client";

export async function handleGetClient(req: Request, res: Response) {
  const { id } = req.params as unknown as z.infer<
    typeof getClientSchema
  >["params"];

  const clientOrError = await findClientById(clientRepository)(id);

  if (clientOrError.isFailure()) {
    res.status(404).json({ message: clientOrError.value.message });
    return;
  }

  res.status(200).json({
    client: clientOrError.value,
    message: "Client found",
  });
}

export async function handlePostClient(req: Request, res: Response) {
  const body = req.body as unknown as z.infer<typeof postClientSchema>["body"];

  const clientOrError = await createClient(clientRepository)(body);

  if (clientOrError.isFailure()) {
    res.status(400).json({ message: clientOrError.value.message });
    return;
  }

  res.status(201).json({
    client: clientOrError.value,
    message: "Client created",
  });
}

export async function handlePatchClient(req: Request, res: Response) {
  const { id } = req.params as unknown as z.infer<
    typeof patchClientSchema
  >["params"];

  const body = req.body as unknown as z.infer<typeof patchClientSchema>["body"];

  const clientOrError = await updateClient(clientRepository)(id, body);

  if (clientOrError.isFailure()) {
    res.status(400).json({ message: clientOrError.value.message });
    return;
  }

  res.status(200).json({
    client: clientOrError.value,
    message: "Client updated",
  });
}
