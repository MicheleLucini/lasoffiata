import axios from "axios";
import { getLocal } from "@logic/localStorage"

const API_BASE_URL = "https://79.44.229.126/api";
const DEFAULT_TIMEOUT = 30000;

export async function post(url, body) {
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
  return response.data.value;
}
