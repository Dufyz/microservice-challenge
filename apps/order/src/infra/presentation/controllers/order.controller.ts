import { Request, Response } from "express";
import z from "zod";
import { postOrderSchema } from "../validators/schemas/order/postOrder.schema";
import { createOrder } from "../../../application/usecases/order";
import { orderRepository } from "../../database/repositories/order.repository";
import { orderProductRepository } from "../../database/repositories/order_product.repository";

export async function handlePostOrder(req: Request, res: Response) {
  const body = req.body as unknown as z.infer<typeof postOrderSchema>["body"];

  const orderOrError = await createOrder(
    orderRepository,
    orderProductRepository
  )(body);

  if (orderOrError.isFailure()) {
    res.status(400).json({ message: orderOrError.value.message });
    return;
  }

  res.status(201).json({
    order: orderOrError.value,
    message: "Order created",
  });
}
