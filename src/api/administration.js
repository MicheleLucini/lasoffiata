import { post } from "../logic/api";

export async function CreateCategory(body) {
  return await post("/api/administration/CreateCategory", body);
}

export async function EditCategory(body) {
  // categoryId - integer 
  // name - string nullable
  // parentCategoryId - integer 
  // prices - array nullable
  //   accountType - enum integer 
  //   serviceType - enum integer 
  //   price - integer 
  return await post("/api/administration/EditCategory", body);
}

export async function DeleteCategory(body) {
  // categoryId - integer 
  return await post("/api/administration/DeleteCategory", body);
}

export async function GetAdvertismentsWaitingForValidation(body) {
  return await post("/api/administration/GetAdvertismentsWaitingForValidation", body);
}

export async function ValidateAdvertisement(body) {
  // advertisementId - integer 
  return await post("/api/administration/ValidateAdvertisement", body);
}

export async function RefuseAdvertisement(body) {
  // advertisementId - integer 
  return await post("/api/administration/RefuseAdvertisement", body);
}

export async function GetPayments(body) {
  return await post("/api/administration/GetPayments", body);
}

export async function GetUsers(body) {
  // page - integer 
  return await post("/api/administration/GetUsers", body);
}