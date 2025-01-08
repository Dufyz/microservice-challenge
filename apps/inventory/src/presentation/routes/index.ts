import { Router } from "express";
import itemRoutes from "./item.routes";
import inventoryTransactionRoutes from "./inventory_transaction.routes";

const routes = Router();
const apiRoutes = Router();

apiRoutes.get("/health-check", (_, res) => {
  res.json({ message: "Server is up and running!" }).status(200);
});

apiRoutes.use(itemRoutes);
apiRoutes.use(inventoryTransactionRoutes);

routes.use("/api", apiRoutes);

export default routes;
