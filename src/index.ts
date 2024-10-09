import fastify, { FastifyRequest } from "fastify";
import open from "open";
import { login2kakao } from "./api/kakao/login.js";
import {
  cronNotifyNewEvents,
  cronNotifyEndingSoonEvents,
} from "./schedules/index.js";

const app = fastify({
  logger: true,
});

type reqQuery = {
  code: string;
};

app.get("/", async (req: FastifyRequest<{ Querystring: reqQuery }>, res) => {
  const { query } = req;
  if (!query.code) {
    return { status: "fail", message: "code is required" };
  }
  const authorizationCode = query.code;
  const loginResult = await login2kakao(authorizationCode);
  if (!cronNotifyNewEvents.running) cronNotifyNewEvents.start();
  if (!cronNotifyEndingSoonEvents.running) cronNotifyEndingSoonEvents.start();

  res.type("application/json").code(loginResult ? 200 : 400);
  return { loginResult, status: loginResult ? "success" : "fail" };
});

// build kakao authorization url
const params = {
  client_id: process.env.KAKAO_REST_API_KEY,
  redirect_uri: "http://localhost:3001",
  response_type: "code",
};
const searchParams = new URLSearchParams(params);

app.listen({ port: +process.env.PORT }, (err, address) => {
  if (err) throw err;
  console.info(`Server is now listening on ${address}`);
  open(`https://kauth.kakao.com/oauth/authorize?${searchParams.toString()}`);
});
