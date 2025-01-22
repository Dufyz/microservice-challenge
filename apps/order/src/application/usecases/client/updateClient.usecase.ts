import { Client } from "../../../domain/client";
import { Either, failure, success } from "../../../shared/utils/either";
import { RepositoryErrors } from "../../errors";
import { ClientRepository } from "../../interfaces/client.repository";

export const updateClient =
  (clientRepository: ClientRepository) =>
  async (
    id: number,
    body: Partial<Pick<Client, "name">>
  ): Promise<Either<RepositoryErrors, Client>> => {
    const clientOrError = await clientRepository.update(id, body);

    if (clientOrError.isFailure()) return failure(clientOrError.value);

    const client = clientOrError.value;
    return success(client);
  };
