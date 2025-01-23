import { Order } from "../../../domain/order";
import { OrderProduct } from "../../../domain/order_product";
import { Either, failure, success } from "../../../shared/utils/either";
import { RepositoryErrors } from "../../errors";
import { OrderRepository } from "../../interfaces/order.repository";
import { OrderProductRepository } from "../../interfaces/order_product.repository";
import { Producer } from "../../interfaces/producer";
import { createOrderProduct } from "../order_product";

export const createOrder =
  (
    orderRepository: OrderRepository,
    orderProductRepository: OrderProductRepository,
    producer: Producer
  ) =>
  async (
    body: Pick<Order, "client_id"> & {
      products: { product_id: number; quantity: number; price: number }[];
    }
  ): Promise<Either<RepositoryErrors, Order>> => {
    const orderOrError = await orderRepository.create(body);

    if (orderOrError.isFailure()) return failure(orderOrError.value);

    const order = orderOrError.value;

    const promises: Promise<Either<RepositoryErrors, OrderProduct>>[] = [];

    body.products.forEach((product) => {
      promises.push(
        createOrderProduct(orderProductRepository)({
          order_id: order.id,
          quantity: product.quantity,
          product_id: product.product_id,
          price: product.price,
        })
      );
    });

    await Promise.all(promises);

    producer.sendMessage("order_created", {
      order: {
        id: order.id,
        client_id: order.client_id,
        created_at: order.created_at,
        updated_at: order.updated_at,
        products: body.products.map((product) => ({
          product_id: product.product_id,
          quantity: product.quantity,
          price: product.price,
        })),
      },
    });

    return success(order);
  };
