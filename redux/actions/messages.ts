import { Message } from "../../types/message";
import { newMessage, nextStatus } from "../types/messages";

export const addMessage = (message: Message) => ({
  type: newMessage,
  payload: message,
});
export const changeMessageStatus = (id: number) => ({
  type: nextStatus,
  payload: id,
});
