import postgres from "postgres";
import { DB_CONNECTION } from "../config";

if (!DB_CONNECTION) throw new Error("Check POSTGRES_URL_CONNECTION env");

const sql = postgres(DB_CONNECTION, {
  prepare: false,
  // debug(connection, query, parameters, paramTypes) {
  //   console.log({ connection, query, parameters });
  // },
  connect_timeout: 6000,
  idle_timeout: 8000,
  onclose(connId) {
    console.log(`Connection ${connId} closed`);
  },
});

const query = sql``;

export type SQLQuery = typeof query;

export default sql;
