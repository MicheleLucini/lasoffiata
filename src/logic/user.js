import * as apiUser from "@api/user";
import * as apiPublic from "@api/public";
import * as storeUser from "@store/userSlice";
import { setLocal, getLocal, delLocal } from "./localStorage"
import { checkConstant, ACCOUNT_TYPE } from "@logic/constants";

export const register = ({ email, password, accountType }) => async (dispatch) => {
  if (!email || !password) {
    throw new Error("Devi inserire sia email che password.");
  }
  if (!accountType) {
    throw new Error("Devi specificare il tipo di account.");
  }
  await apiPublic.Register({ email, password, accountType });
};

export const login = ({ email, password }) => async (dispatch) => {
  if (!email || !password) {
    throw new Error("Devi inserire sia email che password.");
  }
  const user = await apiPublic.SignIn({ email, password });
  await dispatch(storeUser.login(user));
  setLocal("user", "token", { token: user.token, id: user.id });
  return user;
};

export const logout = () => async (dispatch) => {
  await dispatch(storeUser.logout());
  delLocal("user", "token");
};

export const restoreSignIn = () => async (dispatch) => {
  const userToken = getLocal("user", "token");
  if (!userToken) {
    return;
  }
  const user = await apiUser.RestoreSignIn();
  await dispatch(storeUser.login(user));
};

export const editUserPublicData = (body) => async (dispatch) => {
  await apiUser.EditUserPublicData(body);
  const user = await apiPublic.GetUser({ userId: body.userId });
  await dispatch(storeUser.refreshData(user));
};

export const editUserBillingData = (body) => async (dispatch) => {
  await apiUser.EditUserBillingData(body);
  const user = await apiPublic.GetUser({ userId: body.userId });
  await dispatch(storeUser.refreshData(user));
};

export const sendResetPasswordEmail = ({ email }) => async (dispatch) => {
  if (!email) {
    throw new Error("Inserisci la tua email.");
  }
  await apiPublic.SendResetPasswordEmail({ email });
};

export const resetPassword = ({ userToken, token, newPassword, repeatNewPassword }) => async (dispatch) => {
  if (!newPassword) {
    throw new Error("Inserisci la tua password.");
  }
  if (newPassword !== repeatNewPassword) {
    throw new Error("Le password devono essere uguali.");
  }
  await apiPublic.ResetPassword({ userToken, token, newPassword });
};

//

export const areUserBillingDataComplete = (user) => {
  if (checkConstant(ACCOUNT_TYPE.PRIVATO, user.accountType)) {
    if (!user.lastName || !user.name || !user.codiceFiscale) return false;
  }
  if (checkConstant(ACCOUNT_TYPE.AZIENDA, user.accountType)) {
    if (!user.businessName || !user.partitaIva) return false;
  }
  if (!user.country
    || !user.province
    || !user.zipCode
    || !user.city
    || !user.street
    || !user.civic) return false;
  return true;
};
