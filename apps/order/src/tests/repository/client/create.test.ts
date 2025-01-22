import { clientRepository } from "../../../infra/database/repositories/client.repository";

describe("Client repository - Create", () => {
  it("Should successfully create a client", async () => {
    const clientOrError = await clientRepository.create({
      name: "Client 1",
    });

    if (clientOrError.isFailure()) {
      throw new Error(clientOrError.value.message);
    }

    expect(clientOrError.value).toEqual({
      id: expect.any(Number),
      name: "Client 1",
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });
});
