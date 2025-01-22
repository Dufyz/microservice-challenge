import { clientRepository } from "../../../infra/database/repositories/client.repository";
import { orderRepository } from "../../../infra/database/repositories/order.repository";
import { orderProductRepository } from "../../../infra/database/repositories/order_product.repository";
import { productRepository } from "../../../infra/database/repositories/product.repository";

describe("OrderProduct repository - Create", () => {
  it("Should successfully create a order product", async () => {
    const clientOrError = await clientRepository.create({
      name: "Client 1",
    });

    if (clientOrError.isFailure()) {
      throw new Error(clientOrError.value.message);
    }

    const client = clientOrError.value;

    const productOrError = await productRepository.create({
      name: "Product 1",
      price: 10,
    });

    if (productOrError.isFailure()) {
      throw new Error(productOrError.value.message);
    }

    const product = productOrError.value;

    const orderOrError = await orderRepository.create({
      client_id: client.id,
    });

    if (orderOrError.isFailure()) {
      throw new Error(orderOrError.value.message);
    }

    const order = orderOrError.value;

    const orderProductOrError = await orderProductRepository.create({
      order_id: orderOrError.value.id,
      product_id: product.id,
      quantity: 1,
    });

    if (orderProductOrError.isFailure()) {
      throw new Error(orderProductOrError.value.message);
    }

    const orderProduct = orderProductOrError.value;
    expect(orderProduct).toEqual({
      id: expect.any(Number),
      order_id: order.id,
      product_id: product.id,
      quantity: 1,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });
});
