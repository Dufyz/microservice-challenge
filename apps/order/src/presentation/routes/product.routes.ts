import { Router } from "express";

import * as ProductController from "../controllers/product.controller";
import { validate } from "../middleware/zod.middleware";
import { getProductSchema } from "../validators/schemas/product/getProduct.schema";
import { postProductSchema } from "../validators/schemas/product/postProduct.schema";
import { patchProductSchema } from "../validators/schemas/product/patchProduct.schema";

const productRoutes = Router();

productRoutes.get(
  "/products/:id",
  validate(getProductSchema),
  ProductController.handleGetProduct
);

productRoutes.post(
  "/products",
  validate(postProductSchema),
  ProductController.handlePostProduct
);

productRoutes.patch(
  "/products/:id",
  validate(patchProductSchema),
  ProductController.handlePatchProduct
);

export default productRoutes;
