import { BASE_URL } from "@api/utils"
import * as apiUser from "@api/user";
import noPhoto from "@assets/logo_header.png";

export function getAdvertisementImageUrl({ userId, advertisementId, imageId }) {
  if (!userId || !advertisementId || !imageId) {
    return noPhoto;
  }
  return `${BASE_URL}/images/${userId}/${advertisementId}/${imageId}.jpg`;
}

export const createAdvertisement = ({
  title,
  description,
  categoryId,
  province,
  city,
  imageBlob,
}) => async (dispatch) => {
  // if (!email || !password) {
  //   throw new Error("Devi inserire sia email che password.");
  // }
  // if (!accountType) {
  //   throw new Error("Devi specificare il tipo di account.");
  // }
  await apiUser.CreateAdvertisement({
    title,
    description,
    categoryId,
    province,
    city,
    imageBlob,
  });
};

export const editAdvertisement = ({
  advertisementId,
  title,
  description,
  categoryId,
  province,
  city,
  newImageBlob,
  deletedImageIds,
}) => async (dispatch) => {
  // if (!email || !password) {
  //   throw new Error("Devi inserire sia email che password.");
  // }
  // if (!accountType) {
  //   throw new Error("Devi specificare il tipo di account.");
  // }
  await apiUser.EditAdvertisement({
    advertisementId,
    title,
    description,
    categoryId,
    province,
    city,
    newImageBlob,
    deletedImageIds,
  });
};