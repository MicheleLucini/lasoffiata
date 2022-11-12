import * as apiUser from "@api/user";
import * as storeUser from "@store/userSlice";

export const login = ({ email, password }) => async (dispatch) => {
  if (!email || !password) {
    throw new Error("Devi inserire sia email che password.");
  }
  const user = await apiUser.SignIn({ email, password });
  await dispatch(storeUser.login(user));
};

// export const logout = ({ accessToken }) => async (dispatch) => {
//   await apiUser.accountLogout(accessToken);
//   await dispatch(userStore.logout());
//   await storage.resetKeychain();
// };
