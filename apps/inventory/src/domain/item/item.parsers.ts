import { Item } from "./item.entities";

export const parseItemFromDB = (item: Item): Item => ({
  id: item.id,
  name: item.name,
  quantity: item.quantity,
  created_at: item.created_at,
  updated_at: item.updated_at,
});
