import { Router } from "express";

import * as OrderController from "../controllers/order.controller";
import { validate } from "../middleware/zod.middleware";
import { postOrderSchema } from "../validators/schemas/order/postOrder.schema";

const orderRoutes = Router();

orderRoutes.post(
  "/orders",
  validate(postOrderSchema),
  OrderController.handlePostOrder
);

export default orderRoutes;
