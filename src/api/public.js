import { post } from "./utils";

const CONTROLLER_URL = "/api/Public.ashx";

export async function GetCategories() {
  return await post(`${CONTROLLER_URL}/GetCategories`);
}

export async function GetPaperCategories() {
  return await post(`${CONTROLLER_URL}/GetPaperCategories`);
}

export async function GetCategoryPrices() {
  return await post(`${CONTROLLER_URL}/GetCategoryPrices`);
}

export async function GetEditions() {
  return await post(`${CONTROLLER_URL}/GetEditions`);
}

export async function Register({ email, password, accountType }) {
  return await post(`${CONTROLLER_URL}/Register`, {
    email,
    password,
    accountType
  });
}

export async function VerifyEmail({ verificationToken }) {
  return await post(`${CONTROLLER_URL}/VerifyEmail`, {
    verificationToken
  });
}

export async function SignIn({ email, password }) {
  return await post(`${CONTROLLER_URL}/SignIn`, {
    email,
    password
  });
}

export async function GetAdvertisement({ advertisementId }) {
  return await post(`${CONTROLLER_URL}/GetAdvertisement`, {
    advertisementId
  });
}

export async function GetUserAdvertisements({ userId }) {
  return await post(`${CONTROLLER_URL}/GetUserAdvertisements`, {
    userId
  });
}

export async function SearchAdvertisements({ searchText, categoryId, province, page }) {
  return await post(`${CONTROLLER_URL}/SearchAdvertisements`, {
    searchText,
    categoryId,
    province,
    page
  });
}

export async function GetFeaturedAdvertisements() {
  return await post(`${CONTROLLER_URL}/GetFeaturedAdvertisements`);
}

export async function GetUser({ userId }) {
  return await post(`${CONTROLLER_URL}/GetUser`, {
    userId
  });
}

export async function SendResetPasswordEmail({ email }) {
  return await post(`${CONTROLLER_URL}/SendResetPasswordEmail`, {
    email
  });
}

export async function ResetPassword({ userToken, token, newPassword }) {
  return await post(`${CONTROLLER_URL}/ResetPassword`, {
    userToken,
    token,
    newPassword
  });
}