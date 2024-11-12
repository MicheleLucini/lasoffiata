import { post } from "./utils";

const CONTROLLER_URL = "/api/administration";

export async function CreateCategory() {
  return await post(`${CONTROLLER_URL}/CreateCategory`);
}

export async function EditCategory({ categoryId, name, parentCategoryId }) {
  return await post(`${CONTROLLER_URL}/EditCategory`, {
    categoryId,
    name,
    parentCategoryId,
  });
}

export async function DeleteCategory({ categoryId }) {
  return await post(`${CONTROLLER_URL}/DeleteCategory`, {
    categoryId
  });
}

export async function SetCategoryPrices({ categoryId, prices }) {
  return await post(`${CONTROLLER_URL}/SetCategoryPrices`, {
    categoryId,
    prices,
  });
}

// export async function DeleteCategoryPrice({ categoryId, accountType, serviceType }) {
//   return await post(`${CONTROLLER_URL}/DeleteCategoryPrice`, {
//     categoryId,
//     accountType,
//     serviceType
//   });
// }

// export async function CreatePaperCategory({ name }) {
//   return await post(`${CONTROLLER_URL}/CreatePaperCategory`, {
//     name
//   });
// }

// export async function EditPaperCategory({ paperCategoryId, name }) {
//   return await post(`${CONTROLLER_URL}/EditPaperCategory`, {
//     paperCategoryId,
//     name
//   });
// }

// export async function DeletePaperCategory({ paperCategoryId }) {
//   return await post(`${CONTROLLER_URL}/DeletePaperCategory`, {
//     paperCategoryId
//   });
// }

export async function GetAdvertismentsWaitingForValidation() {
  return await post(`${CONTROLLER_URL}/GetAdvertismentsWaitingForValidation`);
}

export async function ValidateAdvertisement({ advertisementId }) {
  return await post(`${CONTROLLER_URL}/ValidateAdvertisement`, {
    advertisementId
  });
}

export async function RefuseAdvertisement({ advertisementId }) {
  return await post(`${CONTROLLER_URL}/RefuseAdvertisement`, {
    advertisementId
  });
}

// export async function GetExportFile({ from, to }) {
//   return await post(`${CONTROLLER_URL}/GetExportFile`, {
//     from,
//     to
//   });
// }

export async function GetPayments() {
  return await post(`${CONTROLLER_URL}/GetPayments`);
}

export async function GetUsers({ page }) {
  return await post(`${CONTROLLER_URL}/GetUsers`, {
    page
  });
}

// export async function AddEdition({ date }) {
//   return await post(`${CONTROLLER_URL}/AddEdition`, {
//     date
//   });
// }

// export async function DeleteEdition({ id }) {
//   return await post(`${CONTROLLER_URL}/DeleteEdition`, {
//     id
//   });
// }
