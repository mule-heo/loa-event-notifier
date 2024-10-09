import axios from "axios";
import { kakaoApiAxios } from "../../lib/axios/index.js";

export const login2kakao = async (authorizationCode: string) => {
  try {
    const accessToken = await getAccessToken(authorizationCode);
    setAccessToken(accessToken);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const setAccessToken = (accessToken: string) => {
  kakaoApiAxios.defaults.headers.Authorization = `Bearer ${accessToken}`;
};

const getAccessToken = async (authorizationCode: string) => {
  try {
    const response = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      {
        grant_type: "authorization_code",
        client_id: process.env.KAKAO_REST_API_KEY,
        redirect_uri: "http://localhost:3001",
        code: authorizationCode,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        // proxy: { host: "localhost", port: 3001 },
      },
    );
    const accessToken = response.data.access_token;
    return accessToken;
  } catch (e) {
    console.error(e);
  }
};
