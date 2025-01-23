import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
        CREATE TYPE order_status AS ENUM ('pending', 'approved', 'canceled');

        CREATE TABLE orders (
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            client_id INT NOT NULL REFERENCES clients(id),
            status order_status NOT NULL DEFAULT 'pending',
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
    `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
        DROP TYPE IF EXISTS order_status;
        
        DROP TABLE IF EXISTS orders;
    `);
}
