import { Client } from "../../../domain/client";
import { Either, failure, success } from "../../../shared/utils/either";
import { RepositoryErrors } from "../../errors";
import { ClientRepository } from "../../interfaces/client.repository";

export const createClient =
  (clientRepository: ClientRepository) =>
  async (
    body: Pick<Client, "name">
  ): Promise<Either<RepositoryErrors, Client>> => {
    const clientOrError = await clientRepository.create(body);

    if (clientOrError.isFailure()) return failure(clientOrError.value);

    const client = clientOrError.value;
    return success(client);
  };
