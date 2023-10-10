import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  isLogged: false,
  accountType: null, // 1
  advertisementName: null, // "test nickname"
  businessName: null, // ""
  cel: null, // "348 123456"
  city: null, // "Bergamo Alta"
  civic: null, // "5"
  codiceFiscale: null, // "blljcp"
  country: null, // "italia"
  credits: null, // 0 
  email: null, // "admin"
  hasAdvertisements: null, // true
  id: null, // 16
  isAdmin: null, // true
  lastName: null, // "Bellocchio"
  name: null, // "Jacopo"
  partitaIva: null, // ""
  province: null, // "BG"
  street: null, // "via del sottoscritto"
  tel: null, // "123123"
  token: null, // "OykftCswoFguXatwWPYDxkhfPHAjUArSDGuGDv9M3MFBc/KdRZGlJLTIyqVRAsYE7+UCGUjK2epSQSXmFkB+/g=="
  zipCode: null, // "20100"
};

export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    login: (state, action) => ({
      ...action.payload,
      isLogged: true,
    }),
    refreshData: (state, action) => ({
      ...action.payload,
    }),
    logout: () => INITIAL_STATE,
  },
});

export const { login, logout, refreshData } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
