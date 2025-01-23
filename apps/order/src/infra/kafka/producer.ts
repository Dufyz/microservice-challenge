import { Partitioners } from "kafkajs";
import kafka from ".";
import { Producer } from "../../application/interfaces/producer";

export const kafkaProducer: Producer = {
  sendMessage: async (topic, message) => {
    const producer = kafka.producer({
      createPartitioner: Partitioners.LegacyPartitioner,
    });

    await producer.connect();
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });

    await producer.disconnect();
  },
};
