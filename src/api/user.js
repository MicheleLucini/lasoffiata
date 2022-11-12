import { post } from "./utils";

export async function SignIn({ email, password }) {
  return await post("/User.ashx/SignIn", {
    sEmail: email,
    sPassword: password,
  });
}

export async function RestoreSignIn({ id }) {
  return await post("/User.ashx/RestoreSignIn", { id });
}

export async function GetFeaturedAdvertisements() {
  return await post("/User.ashx/GetFeaturedAdvertisements", {});
}
