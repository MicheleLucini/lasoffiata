
export const ACCOUNT_TYPES = {
  1: "Privato",
  2: "Azienda",
};


export function getSelectOptionsFromConstant(costant) {
  return Object.entries(costant).map((pair) => ({ value: pair[0], description: pair[1] }));
}