import z from "zod";
import { getProductSchema } from "../validators/schemas/product/getProduct.schema";
import {
  createProduct,
  findProductById,
  updateProduct,
} from "../../../application/usecases/product";
import { productRepository } from "../../database/repositories/product.repository";
import { Request, Response } from "express";
import { postProductSchema } from "../validators/schemas/product/postProduct.schema";
import { patchProductSchema } from "../validators/schemas/product/patchProduct.schema";

export async function handleGetProduct(req: Request, res: Response) {
  const { id } = req.params as unknown as z.infer<
    typeof getProductSchema
  >["params"];

  const productOrError = await findProductById(productRepository)(id);

  if (productOrError.isFailure()) {
    res.status(404).json({ message: productOrError.value.message });
    return;
  }

  res.status(200).json({
    product: productOrError.value,
    message: "Product found",
  });
}

export async function handlePostProduct(req: Request, res: Response) {
  const body = req.body as unknown as z.infer<typeof postProductSchema>["body"];

  const productOrError = await createProduct(productRepository)(body);

  if (productOrError.isFailure()) {
    res.status(400).json({ message: productOrError.value.message });
    return;
  }

  res.status(201).json({
    product: productOrError.value,
    message: "Product created",
  });
}

export async function handlePatchProduct(req: Request, res: Response) {
  const { id } = req.params as unknown as z.infer<
    typeof patchProductSchema
  >["params"];

  const body = req.body as unknown as z.infer<
    typeof patchProductSchema
  >["body"];

  const productOrError = await updateProduct(productRepository)(id, body);

  if (productOrError.isFailure()) {
    res.status(400).json({ message: productOrError.value.message });
    return;
  }

  res.status(200).json({
    product: productOrError.value,
    message: "Product updated",
  });
}
