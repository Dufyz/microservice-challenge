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
import { itemInventoryAvailable } from "../../application/usecases/item/itemInventoryAvailability.usecase";
import { postItemInventoryAvailable } from "../validators/schemas/item/postItemInventoryAvailable";
import { inventoryTransactionRepository } from "../../infra/database/repositories/inventory_transactions.repository";

export async function handleGetItem(req: Request, res: Response) {
  const { id } = req.params as unknown as z.infer<
    typeof getItemSchema
  >["params"];

  const itemOrError = await findItemById(itemRepository)(id);

  if (itemOrError.isFailure()) {
    res.status(404).json({ message: itemOrError.value.message });
    return;
  }

  const item = itemOrError.value;

  if (item === null) {
    res.status(404).json({ item, message: "Item not found" });
    return;
  }

  res.status(200).json({
    item,
    message: "Item found",
  });
}

export async function handlePostItem(req: Request, res: Response) {
  const { name, quantity } = req.body as unknown as z.infer<
    typeof postItemSchema
  >["body"];

  const itemOrError = await createItem(
    itemRepository,
    inventoryTransactionRepository
  )({ name, quantity });

  if (itemOrError.isFailure()) {
    res.status(400).json({ message: itemOrError.value.message });
    return;
  }

  res.status(201).json({
    item: itemOrError.value,
    message: "Item created",
  });
}

export async function handlePostItemInventoryAvailable(
  req: Request,
  res: Response
) {
  const { id } = req.params as unknown as z.infer<
    typeof postItemInventoryAvailable
  >["params"];

  const { quantity } = req.body as unknown as z.infer<
    typeof postItemInventoryAvailable
  >["body"];

  const valueOrError = await itemInventoryAvailable(itemRepository)(
    id,
    quantity
  );

  if (valueOrError.isFailure()) {
    res.status(404).json({ message: valueOrError.value.message });
    return;
  }

  res.status(200).json({
    is_available: valueOrError.value.isAvailable,
    quantity: valueOrError.value.quantity,
    message: "Item inventory is available",
  });
}

export async function handlePatchItem(req: Request, res: Response) {
  const { id } = req.params as unknown as z.infer<
    typeof patchItemSchema
  >["params"];
  const { name } = req.body as unknown as z.infer<
    typeof patchItemSchema
  >["body"];

  const itemOrError = await updateItem(itemRepository)(id, { name });

  if (itemOrError.isFailure()) {
    res.status(404).json({ message: itemOrError.value.message });
    return;
  }

  res.status(200).json({
    item: itemOrError.value,
    message: "Item updated",
  });
}
