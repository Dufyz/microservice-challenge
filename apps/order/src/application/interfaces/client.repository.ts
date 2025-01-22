import { Client } from "../../domain/client";
import { Either } from "../../shared/utils/either";
import { RepositoryErrors } from "../errors";

export type ClientRepository = {
  findClientById(id: number): Promise<Either<RepositoryErrors, Client | null>>;
  create(body: Pick<Client, "name">): Promise<Either<RepositoryErrors, Client>>;
  update(
    id: number,
    body: Partial<Pick<Client, "name">>
  ): Promise<Either<RepositoryErrors, Client>>;
};
