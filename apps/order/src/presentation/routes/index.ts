import { Router } from "express";
import clientRoutes from "./client.routes";
import productRoutes from "./product.routes";
import orderRoutes from "./order.routes";

const routes = Router();
const apiRoutes = Router();

apiRoutes.get("/health-check", (_, res) => {
  res.json({ message: "Server is up and running!" }).status(200);
});

apiRoutes.use(clientRoutes);
apiRoutes.use(productRoutes);
apiRoutes.use(orderRoutes);

routes.use("/api", apiRoutes);

export default routes;
