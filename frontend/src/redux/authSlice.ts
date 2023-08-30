import { createSlice } from "@reduxjs/toolkit";
import { IUserInfo } from "./types";
import { USER_INFO_STORAGE_KEY } from "../constants/localStorageKeys";

const getUserInfoFromLocalStorage = (): IUserInfo | null => {
  const userInfoJSON = localStorage.getItem(USER_INFO_STORAGE_KEY);
  if (userInfoJSON) {
    return JSON.parse(userInfoJSON);
  }
  return null;
};

const initialState = {
  userInfo: getUserInfoFromLocalStorage(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem(
        USER_INFO_STORAGE_KEY,
        JSON.stringify(action.payload)
      );
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem(USER_INFO_STORAGE_KEY);
    },
    register: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem(
        USER_INFO_STORAGE_KEY,
        JSON.stringify(action.payload)
      );
    },
  },
});

export const { setUserInfo, logout, register } = authSlice.actions;
export default authSlice.reducer;
