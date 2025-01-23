import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "order-app",
  brokers: ["localhost:9093"],
});

export default kafka;
