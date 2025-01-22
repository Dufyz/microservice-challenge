import { Product } from "./product.entities";

export const parseProductFromDB = (product: Product): Product => ({
  id: product.id,
  name: product.name,
  price: product.price,
  created_at: product.created_at,
  updated_at: product.updated_at,
});
