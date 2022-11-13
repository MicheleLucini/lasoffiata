import axios from "axios";
import { getLocal } from "@logic/localStorage"

const API_BASE_URL = "https://79.44.229.126/api";
const DEFAULT_TIMEOUT = 30000;

var MESSAGE_TYPE = {
  SUCCESS: 1,
  INFO: 2,
  WARNING: 3,
  ERROR: 4
};

function responseHasErrors(response) {
  if (response?.data?.messages) {
    return response.data.messages.some((x) => x.messageType === MESSAGE_TYPE.ERROR)
  }
  return false;
}

function formatServerMessages(response) {
  return response.data.messages.map((x) => x.description).join("\n");
}

export async function post(url, body = {}) {
  const userToken = getLocal("user", "token");
  const response = await axios({
    method: "post",
    baseURL: API_BASE_URL,
    url: url,
    data: {
      ...body,
      t: userToken?.token,
      u: userToken?.id,
    },
    timeout: DEFAULT_TIMEOUT,
  });

  if (responseHasErrors(response)) {
    throw new Error(formatServerMessages(response));
  }

  return response.data.value;
}
