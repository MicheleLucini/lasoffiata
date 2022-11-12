import axios from "axios";

const API_BASE_URL = "https://79.44.229.126/api";
const DEFAULT_TIMEOUT = 30000;

export async function post(url, body) {
  const response = await axios({
    method: "post",
    baseURL: API_BASE_URL,
    url: url,
    data: body,
    timeout: DEFAULT_TIMEOUT,
  });
  return response.data.value;
}
