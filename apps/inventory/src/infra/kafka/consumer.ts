import kafka from ".";

export const kafkaConsumer = async (groupId: string, topic: string) => {
  const consumer = kafka.consumer({
    groupId,
    allowAutoTopicCreation: true,
  });

  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });

  return consumer;
};
