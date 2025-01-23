import { clientRepository } from "../../../infra/database/repositories/client.repository";
import { orderRepository } from "../../../infra/database/repositories/order.repository";

describe("Order repository - Create", () => {
  it("Should successfully create a order", async () => {
    const clientOrError = await clientRepository.create({
      name: "Client 1",
    });

    if (clientOrError.isFailure()) {
      throw new Error(clientOrError.value.message);
    }

    const client = clientOrError.value;

    const orderOrError = await orderRepository.create({
      client_id: client.id,
    });

    if (orderOrError.isFailure()) {
      throw new Error(orderOrError.value.message);
    }

    expect(orderOrError.value).toEqual({
      id: expect.any(Number),
      client_id: client.id,
      status: "pending",
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });
});
