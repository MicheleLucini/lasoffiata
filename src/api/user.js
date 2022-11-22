import { post } from "./utils";

const CONTROLLER_URL = "/api/User.ashx";

export async function RestoreSignIn({ }) {
  return await post(`${CONTROLLER_URL}/RestoreSignIn`, {
  });
}

export async function CreateAdvertisement({ title, description, categoryId, province, city, imageBlob }) {
  return await post(`${CONTROLLER_URL}/CreateAdvertisement`, {
    title,
    description,
    categoryId,
    province,
    city,
    imageBlob
  });
}

export async function EditAdvertisement({ advertisementId, title, description, categoryId, province, city, newImageBlob, deletedImageIds }) {
  return await post(`${CONTROLLER_URL}/EditAdvertisement`, {
    advertisementId,
    title,
    description,
    categoryId,
    province,
    city,
    newImageBlob,
    deletedImageIds
  });
}

export async function DeleteAdvertisement({ advertisementId }) {
  return await post(`${CONTROLLER_URL}/DeleteAdvertisement`, {
    advertisementId
  });
}

export async function RepublishAdvertisement({ advertisementId }) {
  return await post(`${CONTROLLER_URL}/RepublishAdvertisement`, {
    advertisementId
  });
}

export async function SuspendAdvertisement({ advertisementId }) {
  return await post(`${CONTROLLER_URL}/SuspendAdvertisement`, {
    advertisementId
  });
}

export async function UploadImage({ image, advertisementId }) {
  return await post(`${CONTROLLER_URL}/UploadImage`, {
    image,
    advertisementId
  });
}

export async function DeleteImage({ imageId }) {
  return await post(`${CONTROLLER_URL}/DeleteImage`, {
    imageId
  });
}

export async function EditUser({ userId, name, lastName, advertisementName, yearBirth, street, civic, city, zipCode, province, country, codiceFiscale, tel, cel, email, businessName, partitaIva, webSite }) {
  return await post(`${CONTROLLER_URL}/EditUser`, {
    userId,
    name,
    lastName,
    advertisementName,
    yearBirth,
    street,
    civic,
    city,
    zipCode,
    province,
    country,
    codiceFiscale,
    tel,
    cel,
    email,
    businessName,
    partitaIva,
    webSite
  });
}

export async function EditUserBillingData({ userId, name, lastName, street, civic, city, zipCode, province, country, codiceFiscale, businessName, partitaIva, pec, icfCode }) {
  return await post(`${CONTROLLER_URL}/EditUserBillingData`, {
    userId,
    name,
    lastName,
    street,
    civic,
    city,
    zipCode,
    province,
    country,
    codiceFiscale,
    businessName,
    partitaIva,
    pec,
    icfCode
  });
}

export async function CreatePayment({ cartItems }) {
  return await post(`${CONTROLLER_URL}/CreatePayment`, {
    cartItems
  });
}

export async function ExecutePayment({ paymentID, payerID }) {
  return await post(`${CONTROLLER_URL}/ExecutePayment`, {
    paymentID,
    payerID
  });
}

export async function GetMyPayments({ }) {
  return await post(`${CONTROLLER_URL}/GetMyPayments`, {
  });
}