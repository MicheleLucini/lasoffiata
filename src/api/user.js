import { post } from "./utils";

const CONTROLLER_URL = "/api/User.ashx";

export async function RestoreSignIn() {
  return await post(`${CONTROLLER_URL}/RestoreSignIn`);
}
