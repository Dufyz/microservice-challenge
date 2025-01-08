import { Request, Response } from "express";
import { itemRepository } from "../../infra/database/repositories/item.repository";
import {
  createItem,
  findItemById,
  updateItem,
} from "../../application/usecases/item";
import z from "zod";
import { getItemSchema } from "../validators/schemas/item/getItem.schema";
import { postItemSchema } from "../validators/schemas/item/postItem.schema";
import { patchItemSchema } from "../validators/schemas/item/patchItem.schema";

export async function handleGetItem(req: Request, res: Response) {
  const { id } = req.params as unknown as z.infer<
    typeof getItemSchema
  >["params"];

  const itemOrError = await findItemById(itemRepository)(id);

  if (itemOrError.isFailure()) {
    res.status(404).json({ message: itemOrError.value.message });
    return;
  }

  res.status(200).json(itemOrError.value);
}

export async function handlePostItem(req: Request, res: Response) {
  const { name, quantity } = req.body as unknown as z.infer<
    typeof postItemSchema
  >["body"];

  const itemOrError = await createItem(itemRepository)({ name, quantity });

  if (itemOrError.isFailure()) {
    res.status(400).json({ message: itemOrError.value.message });
    return;
  }

  res.status(201).json(itemOrError.value);
}

export async function handlePatchItem(req: Request, res: Response) {
  const { id } = req.params as unknown as z.infer<
    typeof patchItemSchema
  >["params"];
  const { name, quantity } = req.body as unknown as z.infer<
    typeof patchItemSchema
  >["body"];

  const itemOrError = await updateItem(itemRepository)(id, { name, quantity });

  if (itemOrError.isFailure()) {
    res.status(404).json({ message: itemOrError.value.message });
    return;
  }

  res.status(200).json(itemOrError.value);
}
