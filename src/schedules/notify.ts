import moment from "moment-timezone";
import { getEvents } from "../api/lostark/index.js";
import { sendEventTemplateMessage } from "../api/kakao/message.js";
import type { Event } from "../lib/lostark/index.js";

import { CronJob } from "cron";

// NOTE: 2024년 10월 9일 수요일의 데이터에 당일 추가된 이벤트가 누락되어 있음을 확인

/** 현재 시점으로부터 과거 24시간 이내에 시작된 이벤트: true */
const isNew = (event: Event) => {
  const now = moment().tz("Asia/Seoul");
  const startDate = moment(event.StartDate).tz("Asia/Seoul");
  if (now.diff(startDate, "days") < 1 && now.diff(startDate, "days") >= 0)
    return true;
};

/** 현재 시점으로부터 24시간 이내에 종료 예정인 이벤트: true */
const isEndSoon = (event: Event) => {
  const now = moment().tz("Asia/Seoul");
  const endDate = moment(event.EndDate).tz("Asia/Seoul");
  if (endDate.diff(now, "days") < 1 && endDate.diff(now, "days") >= -1) {
    return true;
  }
};

const notifyNewEvents = async () => {
  const events = await getEvents();
  const newEvents = events.filter(isNew);
  console.info("newEvents: ", newEvents);
  Promise.all(newEvents.map((event) => sendEventTemplateMessage(event, true)));
};

const notifyEndingEvents = async () => {
  const events = await getEvents();
  const endingEvents = events.filter(isEndSoon);
  console.info("endingEvents: ", endingEvents);
  Promise.all(
    endingEvents.map((event) => sendEventTemplateMessage(event, false)),
  );
};

export const cronNotifyNewEvents = new CronJob(
  "0 0 12 * * 3", // 매주 수요일 오후 12시 정각
  notifyNewEvents,
  null, // onComplete
  false, // start
  "Asia/Seoul", // timeZone
);

export const cronNotifyEndingSoonEvents = new CronJob(
  "0 0 12 * * 2", // 매주 화요일 오후 12시 정각
  notifyEndingEvents, // onTick
  null, // onComplete
  false, // start
  "Asia/Seoul", // timeZone
);
