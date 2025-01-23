export type Producer = {
  sendMessage(topic: string, message: unknown): Promise<void>;
};
