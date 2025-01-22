import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
        CREATE TABLE clients (
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )    
    `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
        DROP TABLE IF EXISTS clients;
    `);
}
