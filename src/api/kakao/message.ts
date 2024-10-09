import moment from "moment-timezone";
import { kakaoApiAxios } from "../../lib/axios/index.js";
import { buildMessageBodyFromEvent } from "../../lib/kakao/messageTemplate.js";
import { Event } from "../../lib/lostark/index.js";
import { MessageType } from "../../lib/kakao/index.js";
import { kakaoConfig } from "../../environment/index.js";

export const sendMessage = async (event: Event, type: MessageType) => {
  const data = buildMessageBodyFromEvent(event, type);

  try {
    const response = await kakaoApiAxios.post("/talk/memo/default/send", data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const sendTemplateMessage = async (
  template_id: string,
  template_args?: {
    [key: string]: number | string;
  },
) => {
  template_args ??= {};
  const data = {
    template_id,
    template_args: JSON.stringify(template_args), // NOTE: args 객체를 JSON string으로 변환하여 보내야 함
  };
  try {
    const response = await kakaoApiAxios.post("/talk/memo/send", data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    if (response.status >= 400) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const sendTestTemplateMessage = async () => {
  await sendTemplateMessage(kakaoConfig.TEST_TEMPLATE_ID, {});
};

export const sendEventTemplateMessage = async (
  event: Event,
  isNew: boolean,
) => {
  await sendTemplateMessage(kakaoConfig.EVENT_TEMPLATE_ID, {
    THUMB: event.Thumbnail,
    TITLE: event.Title,
    DESCRIPTION: isNew
      ? `[NEW] ${moment(event.StartDate).tz("Asia/Seoul").format("MM월 DD일")} 신규 이벤트`
      : `${moment(event.EndDate).tz("Asia/Seoul").format("MM월 DD일")} 종료 예정`,
  });
};
