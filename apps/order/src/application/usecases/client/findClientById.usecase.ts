import { Client } from "../../../domain/client";
import { Either, failure, success } from "../../../shared/utils/either";
import { RepositoryErrors } from "../../errors";
import { ClientRepository } from "../../interfaces/client.repository";

export const findClientById =
  (clientRepository: ClientRepository) =>
  async (id: number): Promise<Either<RepositoryErrors, Client | null>> => {
    const clientOrError = await clientRepository.findClientById(id);

    if (clientOrError.isFailure()) return failure(clientOrError.value);

    const client = clientOrError.value;
    return success(client);
  };
