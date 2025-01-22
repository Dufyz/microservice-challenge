import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
        CREATE TABLE orders (
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            client_id INT NOT NULL REFERENCES clients(id),
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
    `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
            DROP TABLE IF EXISTS orders;
    `);
}
