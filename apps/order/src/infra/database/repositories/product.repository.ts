import { getRepositoryError } from "../../../application/errors";
import { ProductRepository } from "../../../application/interfaces/product.repository";
import { parseProductFromDB, Product } from "../../../domain/product";
import { failure, success } from "../../../shared/utils/either";
import { filterObjNullishValues } from "../../../shared/utils/filterObjNullishValues";
import sql from "../postgresql";

export const productRepository: ProductRepository = {
  findProductById: async (id) => {
    try {
      const [product] = await sql`
            SELECT 
                p.id,
                p.name,
                p.price,
                p.created_at,
                p.updated_at
            FROM products p
            WHERE p.id = ${id}
        `;

      if (!product) return success(null);

      return success(parseProductFromDB(product as Product));
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },

  create: async (body) => {
    try {
      const productToCreate: Pick<Product, "name" | "price"> = {
        name: body.name,
        price: body.price,
      };

      const colsToInsert = Object.keys(
        productToCreate
      ) as (keyof typeof productToCreate)[];

      const [product] = await sql`
            INSERT INTO products ${sql(productToCreate, colsToInsert)}
            RETURNING id, name, price, created_at, updated_at
        `;

      return success(parseProductFromDB(product as Product));
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },

  update: async (id, body) => {
    try {
      const productToUpdate: Partial<
        Pick<Product, "name" | "price" | "updated_at">
      > = filterObjNullishValues({
        name: body.name,
        price: body.price,
        updated_at: new Date(),
      });

      const colsToUpdate = Object.keys(
        productToUpdate
      ) as (keyof typeof productToUpdate)[];

      const [product] = await sql`
                UPDATE products
                SET ${sql(productToUpdate, colsToUpdate)}
                WHERE id = ${id}
                RETURNING id, name, price, created_at, updated_at
            `;

      return success(parseProductFromDB(product as Product));
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
};
