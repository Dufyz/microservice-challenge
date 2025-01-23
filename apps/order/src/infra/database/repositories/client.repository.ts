import { getRepositoryError } from "../../../application/errors";
import { ClientRepository } from "../../../application/interfaces/client.repository";
import { Client, parseClientFromDB } from "../../../domain/client";
import { failure, success } from "../../../shared/utils/either";
import sql from "../postgresql";

export const clientRepository: ClientRepository = {
  findClientById: async (id) => {
    try {
      const [client] = await sql`
    SELECT 
        c.id,
        c.name,
        c.created_at,
        c.updated_at
    FROM clients c
    WHERE c.id = ${id}
`;

      if (!client) return success(null);

      return success(parseClientFromDB(client as Client));
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
  create: async (body) => {
    try {
      const clientToCreate: Pick<Client, "name"> = {
        name: body.name,
      };

      const colsToInsert = Object.keys(
        clientToCreate
      ) as (keyof typeof clientToCreate)[];

      const [client] = await sql`
            INSERT INTO clients ${sql(clientToCreate, colsToInsert)}
            RETURNING id, name, created_at, updated_at
        `;

      return success(parseClientFromDB(client as Client));
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
  update: async (id, body) => {
    try {
      const clientToUpdate: Partial<Pick<Client, "name" | "updated_at">> = {
        name: body.name,
        updated_at: new Date(),
      };

      const colsToUpdate = Object.keys(
        clientToUpdate
      ) as (keyof typeof clientToUpdate)[];

      const [client] = await sql`
            UPDATE clients
            SET ${sql(clientToUpdate, colsToUpdate)}
            WHERE id = ${id}
            RETURNING id, name, created_at, updated_at
        `;

      return success(parseClientFromDB(client as Client));
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
};
