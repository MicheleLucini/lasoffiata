import { post } from "./utils";

export async function SignIn({ email, password }) {
  return await post("/api/User.ashx/SignIn", {
    sEmail: email,
    sPassword: password,
  });
}

export async function RestoreSignIn() {
  return await post("/api/User.ashx/RestoreSignIn");
}

export async function GetFeaturedAdvertisements() {
  return await post("/api/User.ashx/GetFeaturedAdvertisements");
}
