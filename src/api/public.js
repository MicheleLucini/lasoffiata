import { post } from "./utils";

const CONTROLLER_URL = "/api/Public.ashx";

export async function SignIn({ email, password }) {
  return await post(`${CONTROLLER_URL}/SignIn`, {
    email,
    password,
  });
}

export async function GetFeaturedAdvertisements() {
  return await post(`${CONTROLLER_URL}/GetFeaturedAdvertisements`);
}

export async function GetAdvertisement({ idAnnuncio }) {
  return await post(`${CONTROLLER_URL}/GetAdvertisement`, {
    advertisementId: idAnnuncio,
  });
}
