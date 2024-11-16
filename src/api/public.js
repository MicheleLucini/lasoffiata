import { post } from "../logic/api";

export async function GetCategories(body) {
  return await post("/api/public/GetCategories", body);
}

export async function Register(body) {
  // email - string nullable
  // password - string nullable
  // accountType - enum integer 
  return await post("/api/public/Register", body);
}

export async function SendResetPasswordEmail(body) {
  // email - string nullable
  return await post("/api/public/SendResetPasswordEmail", body);
}

export async function ResetPassword(body) {
  // userToken - string nullable
  // token - string nullable
  // newPassword - string nullable
  return await post("/api/public/ResetPassword", body);
}


export async function SignIn(body) {
  // email - string nullable
  // password - string nullable
  return await post("/api/public/SignIn", body);
}

export async function GetAdvertisement(body) {
  // advertisementId - integer 
  return await post("/api/public/GetAdvertisement", body);
}

export async function GetUserAdvertisements(body) {
  // userId - integer 
  return await post("/api/public/GetUserAdvertisements", body);
}

export async function GetFeaturedAdvertisements(body) {
  return await post("/api/public/GetFeaturedAdvertisements", body);
}

export async function SearchAdvertisements(body) {
  // searchText - string nullable
  // categoryId - integer 
  // province - string nullable
  // page - integer 
  return await post("/api/public/SearchAdvertisements", body);
}

export async function GetUser(body) {
  // userId - integer 
  return await post("/api/public/GetUser", body);
}