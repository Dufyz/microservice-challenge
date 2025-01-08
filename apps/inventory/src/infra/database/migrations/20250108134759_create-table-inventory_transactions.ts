import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
        CREATE TABLE inventory_transactions (
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            item_id INT NOT NULL REFERENCES items(id),
            quantity INT NOT NULL,
            type VARCHAR(255) NOT NULL CHECK (type IN ('IN', 'OUT')),
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
    `);
}

export async function down(knex: Knex): Promise<void> {}
