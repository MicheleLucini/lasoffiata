import axios from "axios";
import { getLocal } from "@logic/localStorage"

export const BASE_URL = "https://79.44.229.126";
const DEFAULT_TIMEOUT = 30000;

var MESSAGE_TYPE = {
  SUCCESS: 1,
  INFO: 2,
  WARNING: 3,
  ERROR: 4
};

function responseIsHttpError500(response) {
  return response?.status === 500;
}

function responseHasServerErrors(response) {
  if (response?.data?.messages) {
    return response.data.messages.some((x) => x.messageType === MESSAGE_TYPE.ERROR)
  }
  return false;
}

function formatResponseServerMessages(response) {
  return response.data.messages.map((x) => x.description).join("\n");
}

export async function post(url, body = {}) {
  const userToken = getLocal("user", "token");

  let response;
  try {
    response = await axios({
      method: "post",
      baseURL: BASE_URL,
      url: url,
      data: {
        ...body,
        t: userToken?.token,
        u: userToken?.id,
      },
      timeout: DEFAULT_TIMEOUT,
    });
  } catch (error) {
    if (responseIsHttpError500(error.response)) {
      throw new Error("Qualcosa è andato storto.");
    }
    throw error;
  }

  if (responseHasServerErrors(response)) {
    throw new Error(formatResponseServerMessages(response));
  }

  return response.data.value;
}
