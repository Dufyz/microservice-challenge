import { getRepositoryError } from "../../../application/errors";
import { ItemRepository } from "../../../application/interfaces/item.repository";
import { Item, parseItemFromDB } from "../../../domain/item";
import { failure, success } from "../../../shared/utils/either";
import { filterObjNullishValues } from "../../../shared/utils/filterObjNullishValues";
import sql from "../postgresql";

export const itemRepository: ItemRepository = {
  findIemById: async (id) => {
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

      console.log("Item found: ", item);

      return success(parseItemFromDB(item as Item));
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

      const insertObj = filterObjNullishValues(itemToCreate);
      const colsToInsert = Object.keys(insertObj) as (keyof typeof insertObj)[];

      const [item] = await sql`
          INSERT INTO items ${sql(insertObj, colsToInsert)}
          RETURNING id, name, quantity, created_at, updated_at
      `;

      return success(parseItemFromDB(item as Item));
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
  update: async (id, body) => {
    try {
      const itemToUpdate: Partial<
        Pick<Item, "name" | "quantity" | "updated_at">
      > = {
        name: body.name,
        quantity: body.quantity,
        updated_at: new Date(),
      };

      const updateObj = filterObjNullishValues(itemToUpdate);
      const colsToUpdate = Object.keys(updateObj) as (keyof typeof updateObj)[];

      const [item] = await sql`
          UPDATE items
          SET ${sql(updateObj, colsToUpdate)}
          WHERE id = ${id}
          RETURNING id, name, quantity, created_at, updated_at
      `;

      return success(parseItemFromDB(item as Item));
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
};
