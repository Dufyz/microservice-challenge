import { Request, Response } from "express";
import { itemRepository } from "../../infra/database/repositories/item.repository";

import z from "zod";
import { postInventoryTransactionSchema } from "../validators/schemas/inventory_transaction/postInventoryTransaction.schema";
import { createInventoryTransaction } from "../../application/usecases/inventory_transaction";
import { inventoryTransactionRepository } from "../../infra/database/repositories/inventory_transactions.repository";
import { deleteInventoryTransactionSchema } from "../validators/schemas/inventory_transaction/deleteInventoryTransaction.schema";
import { deleteInventoryTransaction } from "../../application/usecases/inventory_transaction/deleteInventoryTransaction.usecase";

export async function handlePostInventoryTransaction(
  req: Request,
  res: Response
) {
  const { item_id, quantity, type } = req.body as unknown as z.infer<
    typeof postInventoryTransactionSchema
  >["body"];

  const inventoryTransactionOrError = await createInventoryTransaction(
    inventoryTransactionRepository
  )({
    item_id,
    quantity,
    type,
  });

  if (inventoryTransactionOrError.isFailure()) {
    res
      .status(400)
      .json({ message: inventoryTransactionOrError.value.message });
    return;
  }

  res.status(201).json(inventoryTransactionOrError.value);
}

export async function handleDeleteInventoryTransaction(
  req: Request,
  res: Response
) {
  const { id } = req.params as unknown as z.infer<
    typeof deleteInventoryTransactionSchema
  >["params"];

  const voidOrError = await deleteInventoryTransaction(
    inventoryTransactionRepository
  )(id);

  if (voidOrError.isFailure()) {
    res.status(404).json({ message: voidOrError.value.message });
    return;
  }

  res.status(200).json({
    message: "Inventory transaction deleted successfully",
  });
}
