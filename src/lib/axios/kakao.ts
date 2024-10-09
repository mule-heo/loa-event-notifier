import axios from "axios";

// apiInstance - kakao api 서버로 요청 수행 - login 성공 후 부여받은 access token을 Authorization으로 설정하고 사용하여야 함
const apiInstance = axios.create({
  baseURL: "https://kapi.kakao.com/v2/api",
});

export { apiInstance };
