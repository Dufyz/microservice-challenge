import { clientRepository } from "../../../infra/database/repositories/client.repository";

describe("Client repository - Update", () => {
  it("Should successfully update a client", async () => {
    const clientOrError = await clientRepository.create({
      name: "Client 1",
    });

    if (clientOrError.isFailure()) {
      throw new Error(clientOrError.value.message);
    }

    const client = clientOrError.value;

    const upatedClientOrError = await clientRepository.update(client.id, {
      name: "Client 2",
    });

    if (upatedClientOrError.isFailure()) {
      throw new Error(upatedClientOrError.value.message);
    }

    const updatedClient = upatedClientOrError.value;
    expect(updatedClient).toEqual({
      id: client.id,
      name: "Client 2",
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });
});
