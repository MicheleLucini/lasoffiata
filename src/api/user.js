import { post } from "../logic/api";

export async function RestoreSignIn(body) {
  return await post("/api/user/RestoreSignIn", body);
}

export async function CreateAdvertisement(body) {
  // title - string nullable
  // description - string nullable
  // categoryId - integer 
  // province - string nullable
  // city - string nullable
  // imagesBlobs - array nullable
  return await post("/api/user/CreateAdvertisement", body);
}

export async function EditAdvertisement(body) {
  // advertisementId - integer 
  // title - string nullable
  // description - string nullable
  // categoryId - integer 
  // province - string nullable
  // city - string nullable
  // newImagesBlobs - array nullable
  // deletedImageIds - array nullable
  return await post("/api/user/EditAdvertisement", body);
}

export async function DeleteAdvertisement(body) {
  // advertisementId - integer 
  return await post("/api/user/DeleteAdvertisement", body);
}

export async function RepublishAdvertisement(body) {
  // advertisementId - integer 
  return await post("/api/user/RepublishAdvertisement", body);
}

export async function SuspendAdvertisement(body) {
  // advertisementId - integer 
  return await post("/api/user/SuspendAdvertisement", body);
}

export async function EditUserPublicData(body) {
  // userId - integer 
  // advertisementName - string nullable
  // tel - string nullable
  // cel - string nullable
  // email - string nullable
  return await post("/api/user/EditUserPublicData", body);
}

export async function EditUserBillingData(body) {
  // userId - integer 
  // name - string nullable
  // lastName - string nullable
  // street - string nullable
  // civic - string nullable
  // city - string nullable
  // zipCode - string nullable
  // province - string nullable
  // country - string nullable
  // codiceFiscale - string nullable
  // businessName - string nullable
  // partitaIva - string nullable
  return await post("/api/user/EditUserBillingData", body);
}

export async function PurchaseFeatured(body) {
  // advertisementId - integer 
  return await post("/api/user/PurchaseFeatured", body);
}

export async function PurchasePublishOnline(body) {
  // advertisementId - integer 
  return await post("/api/user/PurchasePublishOnline", body);
}

export async function GetMyPayments(body) {
  return await post("/api/user/GetMyPayments", body);
}

export async function GetMyCreditTransactions(body) {
  return await post("/api/user/GetMyCreditTransactions", body);
}