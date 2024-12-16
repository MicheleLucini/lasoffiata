import * as apiUser from "@api/user";
import moment from 'moment';
import noPhoto from "@assets/logo_header.png";
import { BASE_URL } from "./api"
import { checkConstant, VALIDATION_STATUS } from "@logic/constants";

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

export const getStatoAnnuncio = (annuncio) => {
  if (!annuncio) return {};
  let error = false;
  let icon = "event_available";
  let text = "Attivo";
  let warning = false;
  const isScaduto = moment().diff(annuncio.expirationDate) > 0;
  const isMaiStatoAttivato = annuncio.publishDate === "0001-01-01T00:00:00Z";
  const isRifiutato = checkConstant(VALIDATION_STATUS.REFUSED, annuncio.validationStatus);
  const isWaiting = checkConstant(VALIDATION_STATUS.WAITING, annuncio.validationStatus);
  if (isRifiutato) {
    icon = "block";
    error = true;
    text = "Rifiutato";
  } else if (isMaiStatoAttivato) {
    icon = "savings";
    warning = true;
    text = "Pagamento richiesto";
  } else if (annuncio.isSuspended) {
    icon = "pause_circle";
    error = true;
    text = "Sospeso";
  } else if (isScaduto) {
    icon = "event_busy";
    error = true;
    text = "Scaduto";
  } else if (isWaiting) {
    icon = "hourglass_empty";
    text = "In attesa di verifica";
    warning = true;
  }
  return {
    error,
    icon,
    isMaiStatoAttivato,
    isRifiutato,
    isScaduto,
    isWaiting,
    ok: !error && !warning,
    text,
    warning: warning && !error,
  };
};

