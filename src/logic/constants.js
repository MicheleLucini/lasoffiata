
export const VALIDATION_STATUS = {
  WAITING: { value: 1, label: "In verifica" },
  VALIDATED: { value: 2, label: "Approvato" },
  REFUSED: { value: 3, label: "Rifiutato" }
}

export const SERVICE_TYPE = {
  TEST_SERVICE: { value: 1, label: "TestService" },
  FEATURED_ONE_DAY: { value: 2, label: "FeaturedOneDay" },
  PUBLISH_ONLINE: { value: 3, label: "PublishOnline" },
  PUBLISH_PAPER: { value: 4, label: "PublishPaper" },
  PUBLISH_PAPER_GUARANTEED: { value: 5, label: "PublishPaperGuaranteed" },
  PHOTO_ADVERTISEMENT: { value: 6, label: "PhotoAdvertisement" },
  BOXED: { value: 7, label: "Boxed" }
}

export const PAYMENT_STATUS = {
  CREATED: { value: 1, label: "Created" },
  EXECUTED: { value: 2, label: "Executed" },
  CANCELED: { value: 3, label: "Canceled" },
  FAILED: { value: 4, label: "Failed" }
}

export const ACCOUNT_TYPE = {
  PRIVATO: { value: 1, label: "Privato" },
  AZIENDA: { value: 2, label: "Azienda" }
}

export function getSelectOptionsFromConstant(constant) {
  return Object.values(constant).map((x) => ({ value: x.value, description: x.label }));
}

export function getConstantDescription(constant) {
  return constant.label;
}

export function getConstantDescriptionByValue(constant, value) {
  return Object.values(constant).find((x) => x.value === value).label || "";
}

export function checkConstant(constant, value) {
  return constant.value === value;
}