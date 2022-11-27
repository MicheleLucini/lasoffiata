import * as apiUser from "@api/user";
import * as apiPublic from "@api/public";
import * as storeUser from "@store/userSlice";
import { setLocal, getLocal, delLocal } from "./localStorage"

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
