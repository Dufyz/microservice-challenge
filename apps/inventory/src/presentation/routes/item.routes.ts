import { Router } from "express";

import * as ItemController from "../controllers/item.controller";
import { validate } from "../middleware/zod.middleware";
import { getItemSchema } from "../validators/schemas/item/getItem.schema";
import { postItemSchema } from "../validators/schemas/item/postItem.schema";
import { patchItemSchema } from "../validators/schemas/item/patchItem.schema";

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

itemRoutes.patch(
  "/items/:id",
  validate(patchItemSchema),
  ItemController.handlePatchItem
);

export default itemRoutes;
