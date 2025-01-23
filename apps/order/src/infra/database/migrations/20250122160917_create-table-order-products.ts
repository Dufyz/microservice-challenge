import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
        CREATE TABLE order_products (
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
            order_id INT NOT NULL REFERENCES orders(id),
            product_id INT NOT NULL REFERENCES products(id),
            quantity INT NOT NULL,
            price INT NOT NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
    `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
        DROP TABLE IF EXISTS order_products;
    `);
}
