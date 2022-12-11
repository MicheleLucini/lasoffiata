
export const VALIDATION_STATUS = {
  1: "Waiting",
  2: "Validated",
  3: "Refused"
}

export const SERVICE_TYPE = {
  1: "TestService",
  2: "FeaturedOneDay",
  3: "PublishOnline",
  4: "PublishPaper",
  5: "PublishPaperGuaranteed",
  6: "PhotoAdvertisement",
  7: "Boxed"
}

export const PAYMENT_STATUS = {
  1: "Created",
  2: "Executed",
  3: "Canceled",
  4: "Failed"
}

export const ACCOUNT_TYPE = {
  1: "Privato",
  2: "Azienda"
}

export function getSelectOptionsFromConstant(costant) {
  return Object.entries(costant).map((pair) => ({ value: pair[0], description: pair[1] }));
}