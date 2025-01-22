import { clientRepository } from "../../../infra/database/repositories/client.repository";

describe("Client repository - Find client by id", () => {
  it("Should successfully find a created client", async () => {
    const createdClientOrError = await clientRepository.create({
      name: "Client 1",
    });

    if (createdClientOrError.isFailure()) {
      throw new Error(createdClientOrError.value.message);
    }

    const clientOrError = await clientRepository.findClientById(
      createdClientOrError.value.id
    );

    if (clientOrError.isFailure()) {
      throw new Error(clientOrError.value.message);
    }

    const createdClient = createdClientOrError.value;
    const client = clientOrError.value;
    expect(client).toEqual({
      id: createdClient.id,
      name: createdClient.name,
      created_at: createdClient.created_at,
      updated_at: createdClient.updated_at,
    });
  });
});
