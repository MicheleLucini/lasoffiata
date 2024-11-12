import { post } from "./utils";

const CONTROLLER_URL = "/api/user";

export async function RestoreSignIn() {
  return await post(`${CONTROLLER_URL}/RestoreSignIn`);
}

export async function CreateAdvertisement({
  title,
  description,
  categoryId,
  province,
  city,
  imagesBlobs
}) {
  return await post(`${CONTROLLER_URL}/CreateAdvertisement`, {
    title,
    description,
    categoryId,
    province,
    city,
    imagesBlobs
  });
}

export async function EditAdvertisement({
  advertisementId,
  title,
  description,
  categoryId,
  province,
  city,
  newImagesBlobs,
  deletedImageIds
}) {
  return await post(`${CONTROLLER_URL}/EditAdvertisement`, {
    advertisementId,
    title,
    description,
    categoryId,
    province,
    city,
    newImagesBlobs,
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

// export async function UploadImage({ advertisementId, image, }) {
//   return await post(`${CONTROLLER_URL}/UploadImage`, {
//     advertisementId,
//     image
//   });
// }

// export async function DeleteImage({ imageId }) {
//   return await post(`${CONTROLLER_URL}/DeleteImage`, {
//     imageId
//   });
// }

export async function EditUserPublicData({
  userId,
  advertisementName,
  tel,
  cel,
  email
}) {
  return await post(`${CONTROLLER_URL}/EditUserPublicData`, {
    userId,
    advertisementName,
    tel,
    cel,
    email
  });
}

export async function EditUserBillingData({
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
  partitaIva
}) {
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
    partitaIva
  });
}

export async function PurchaseFeatured({ advertisementId }) {
  return await post(`${CONTROLLER_URL}/PurchaseFeatured`, {
    advertisementId
  });
}

export async function PurchasePublishOnline({ advertisementId }) {
  return await post(`${CONTROLLER_URL}/PurchasePublishOnline`, {
    advertisementId
  });
}

export async function GetMyPayments() {
  return await post(`${CONTROLLER_URL}/GetMyPayments`);
}

export async function GetMyCreditTransactions() {
  return await post(`${CONTROLLER_URL}/GetMyCreditTransactions`);
}

// export async function CreatePayment({ service, quantity }) {
//   return await post(`${CONTROLLER_URL}/CreatePayment`, {
//     service,
//     quantity
//   });
// }

// export async function ExecutePayment({ paymentID, payerID }) {
//   return await post(`${CONTROLLER_URL}/ExecutePayment`, {
//     paymentID,
//     payerID
//   });
// }
