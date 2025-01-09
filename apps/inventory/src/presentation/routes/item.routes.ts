import { Router } from "express";

import * as ItemController from "../controllers/item.controller";
import { validate } from "../middleware/zod.middleware";
import { getItemSchema } from "../validators/schemas/item/getItem.schema";
import { postItemSchema } from "../validators/schemas/item/postItem.schema";
import { patchItemSchema } from "../validators/schemas/item/patchItem.schema";
import { postItemInventoryAvailable } from "../validators/schemas/item/postItemInventoryAvailable";

const itemRoutes = Router();

itemRoutes.get(
  "/items/:id",
  validate(getItemSchema),
  ItemController.handleGetItem
);

itemRoutes.post(
  "/items",
  validate(postItemSchema),
  ItemController.handlePostItem
);

itemRoutes.post(
  "/items/:id/inventory/availability",
  validate(postItemInventoryAvailable),
  ItemController.handlePostItemInventoryAvailable
);

itemRoutes.patch(
  "/items/:id",
  validate(patchItemSchema),
  ItemController.handlePatchItem
);

export default itemRoutes;
