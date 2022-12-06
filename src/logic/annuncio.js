import * as apiUser from "@api/user";

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