import { Event } from "../lostark/index.js";
import { MessageType } from "./types.js";

export const buildMessageBodyFromEvent = (event: Event, type: MessageType) => {
  return {
    object_type: type,
  };
};
