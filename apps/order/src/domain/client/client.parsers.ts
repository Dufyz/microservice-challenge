import { Client } from "./client.entities";

export const parseClientFromDB = (client: Client): Client => ({
  id: client.id,
  name: client.name,
  created_at: client.created_at,
  updated_at: client.updated_at,
});
