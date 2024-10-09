import axios from "axios";

const instance = axios.create({
  baseURL: "https://developer-lostark.game.onstove.com",
});

instance.interceptors.request.use((config) => {
  const apiKey = process.env.LOSTARK_API_KEY;
  if (apiKey) {
    // authorization should be in lower case
    config.headers.authorization = `bearer ${apiKey}`;
  }
  return config;
});

export default instance;
