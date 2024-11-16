import { BASE_URL } from "./api"
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
  imagesBlobs,
}) => async (dispatch) => {
  if (!title) {
    throw new Error("Devi specificare il titolo.");
  }
  if (!description) {
    throw new Error("Devi specificare la descrizione.");
  }
  if (!categoryId) {
    throw new Error("Devi specificare la categoria.");
  }
  if (!province) {
    throw new Error("Devi specificare la provincia.");
  }
  if (!city) {
    throw new Error("Devi specificare la città.");
  }
  await apiUser.CreateAdvertisement({
    title,
    description,
    categoryId,
    province,
    city,
    imagesBlobs,
  });
};

export const editAdvertisement = ({
  advertisementId,
  title,
  description,
  categoryId,
  province,
  city,
  newImagesBlobs,
  deletedImageIds,
}) => async (dispatch) => {
  if (!advertisementId) {
    throw new Error("Qualcosa è andato storto, prova a ricaricare la pagina.");
  }
  if (!title) {
    throw new Error("Devi specificare il titolo.");
  }
  if (!description) {
    throw new Error("Devi specificare la descrizione.");
  }
  if (!categoryId) {
    throw new Error("Devi specificare la categoria.");
  }
  if (!province) {
    throw new Error("Devi specificare la provincia.");
  }
  if (!city) {
    throw new Error("Devi specificare la città.");
  }
  await apiUser.EditAdvertisement({
    advertisementId,
    title,
    description,
    categoryId,
    province,
    city,
    newImagesBlobs,
    deletedImageIds,
  });
};