import { post } from "./utils";

const CONTROLLER_URL = "/api/administration";

export async function CreateCategory({ name, parentCategoryId, paperCategoryId }) {
  return await post(`${CONTROLLER_URL}/CreateCategory`, {
    name,
    parentCategoryId,
    paperCategoryId
  });
}

export async function EditCategory({ categoryId, name, parentCategoryId, paperCategoryId }) {
  return await post(`${CONTROLLER_URL}/EditCategory`, {
    categoryId,
    name,
    parentCategoryId,
    paperCategoryId
  });
}

export async function DeleteCategory({ categoryId }) {
  return await post(`${CONTROLLER_URL}/DeleteCategory`, {
    categoryId
  });
}

export async function SetCategoryPrice({ categoryId, accountType, serviceType, price }) {
  return await post(`${CONTROLLER_URL}/SetCategoryPrice`, {
    categoryId,
    accountType,
    serviceType,
    price
  });
}

export async function DeleteCategoryPrice({ categoryId, accountType, serviceType }) {
  return await post(`${CONTROLLER_URL}/DeleteCategoryPrice`, {
    categoryId,
    accountType,
    serviceType
  });
}

export async function CreatePaperCategory({ name }) {
  return await post(`${CONTROLLER_URL}/CreatePaperCategory`, {
    name
  });
}

export async function EditPaperCategory({ paperCategoryId, name }) {
  return await post(`${CONTROLLER_URL}/EditPaperCategory`, {
    paperCategoryId,
    name
  });
}

export async function DeletePaperCategory({ paperCategoryId }) {
  return await post(`${CONTROLLER_URL}/DeletePaperCategory`, {
    paperCategoryId
  });
}

export async function GetAdvertismentsWaitingForValidation() {
  return await post(`${CONTROLLER_URL}/GetAdvertismentsWaitingForValidation`);
}

export async function ValidateAdvertisement({ id }) {
  return await post(`${CONTROLLER_URL}/ValidateAdvertisement`, {
    id
  });
}

export async function RefuseAdvertisement({ id }) {
  return await post(`${CONTROLLER_URL}/RefuseAdvertisement`, {
    id
  });
}

export async function GetExportFile({ from, to }) {
  return await post(`${CONTROLLER_URL}/GetExportFile`, {
    from,
    to
  });
}

export async function GetPayments() {
  return await post(`${CONTROLLER_URL}/GetPayments`);
}

export async function GetUsers() {
  return await post(`${CONTROLLER_URL}/GetUsers`);
}

export async function AddEdition({ date }) {
  return await post(`${CONTROLLER_URL}/AddEdition`, {
    date
  });
}

export async function DeleteEdition({ id }) {
  return await post(`${CONTROLLER_URL}/DeleteEdition`, {
    id
  });
}
