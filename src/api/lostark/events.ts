import { lostarkAxios } from "../../lib/axios/index.js";
import { Event } from "../../lib/lostark/index.js";

export const getEvents = async () => {
  try {
    const response = await lostarkAxios.get<Event[]>("/news/events");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
