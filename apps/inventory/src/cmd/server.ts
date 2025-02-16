import helmet from "helmet";
import express from "express";
import { NODE_ENV, SERVER_PORT } from "../infra/config";
import routes from "../presentation/routes";
import "../infra/kafka/consumers";

require("dotenv").config();

// TODO: Rate limiter
// TODO: Error handling middleware
// TODO: Graceful shutdown
// TODO: Logger

const app = express();

app.use(helmet());
app.use(express.json());
app.use(routes);

const server = app.listen(SERVER_PORT, () => {
  console.log(
    `Server running in ${NODE_ENV} mode on port http://localhost:${SERVER_PORT}`
  );
});

server.timeout = 30000;

export default server;
