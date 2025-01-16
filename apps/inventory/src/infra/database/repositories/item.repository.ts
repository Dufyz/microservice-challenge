import { Console } from "console";
import { getRepositoryError } from "../../../application/errors";
import { ItemRepository } from "../../../application/interfaces/item.repository";
import { Item, parseItemFromDB } from "../../../domain/item";
import { failure, success } from "../../../shared/utils/either";
import sql from "../postgresql";

export const itemRepository: ItemRepository = {
  findItemById: async (id) => {
    try {
      const [item] = await sql`
        SELECT
            i.id,
            i.name,
            i.quantity,
            i.created_at,
            i.updated_at
        FROM items i
        WHERE i.id = ${id}
      `;

      if (!item) return success(null);

      return success(parseItemFromDB(item as Item));
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
  getItemQuantity: async (id) => {
    try {
      const [partialItem] = await sql`
        SELECT
            i.quantity
        FROM items i
        WHERE i.id = ${id}
      `;

      if (!partialItem)
        return failure(getRepositoryError(new Error("Item not found")));

      const itemQuantity = (partialItem as Pick<Item, "quantity">).quantity;

      return success(itemQuantity);
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
  create: async (body) => {
    try {
      const itemToCreate: Pick<Item, "name" | "quantity"> = {
        name: body.name,
        quantity: body.quantity,
      };

      const colsToInsert = Object.keys(
        itemToCreate
      ) as (keyof typeof itemToCreate)[];

      const [item] = await sql`
          INSERT INTO items ${sql(itemToCreate, colsToInsert)}
          RETURNING id, name, quantity, created_at, updated_at
      `;

      return success(parseItemFromDB(item as Item));
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
  update: async (id, body) => {
    try {
      const itemToUpdate: Partial<Pick<Item, "name" | "updated_at">> = {
        name: body.name,
        updated_at: new Date(),
      };

      const colsToUpdate = Object.keys(
        itemToUpdate
      ) as (keyof typeof itemToUpdate)[];

      const [item] = await sql`
          UPDATE items
          SET ${sql(itemToUpdate, colsToUpdate)}
          WHERE id = ${id}
          RETURNING id, name, quantity, created_at, updated_at
      `;

      return success(parseItemFromDB(item as Item));
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
  updateQuantity: async (id, quantity) => {
    try {
      await sql`
        UPDATE items
        SET quantity = ${quantity}
        WHERE id = ${id}
      `;

      return success(undefined);
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
};
