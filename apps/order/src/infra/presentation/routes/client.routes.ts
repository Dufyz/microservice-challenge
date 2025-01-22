import { Router } from "express";

import * as ClientController from "../controllers/client.controller";
import { validate } from "../middleware/zod.middleware";
import { patchClientSchema } from "../validators/schemas/client/patchClient.schema";
import { postClientSchema } from "../validators/schemas/client/postClient.schema";
import { getClientSchema } from "../validators/schemas/client/getClient.schema";

const clientRouter = Router();

clientRouter.get(
  "/clients/:id",
  validate(getClientSchema),
  ClientController.handleGetClient
);

clientRouter.post(
  "/clients",
  validate(postClientSchema),
  ClientController.handlePostClient
);

clientRouter.patch(
  "/clients/:id",
  validate(patchClientSchema),
  ClientController.handlePatchClient
);

export default clientRouter;
