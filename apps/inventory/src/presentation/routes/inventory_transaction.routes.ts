import { Router } from "express";

import * as InventoryTransactionController from "../controllers/inventory_transaction.controller";
import { validate } from "../middleware/zod.middleware";
import { postInventoryTransactionSchema } from "../validators/schemas/inventory_transaction/postInventoryTransaction.schema";
import { deleteInventoryTransactionSchema } from "../validators/schemas/inventory_transaction/deleteInventoryTransaction.schema";

const inventoryTransactionRoutes = Router();

inventoryTransactionRoutes.post(
  "/inventory-transactions",
  validate(postInventoryTransactionSchema),
  InventoryTransactionController.handlePostInventoryTransaction
);

inventoryTransactionRoutes.delete(
  "/inventory-transactions/:id",
  validate(deleteInventoryTransactionSchema),
  InventoryTransactionController.handleDeleteInventoryTransaction
);

export default inventoryTransactionRoutes;
