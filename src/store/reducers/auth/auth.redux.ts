import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserDetailsModel, UserModel } from "models";
import { STORAGE_FIELDS } from "constants/storage-fields.constants";

interface UserData {
  user: UserModel | null;
}

interface TokenData {
  token: string | null;
}

type InitialState = UserData & TokenData;

const initialState: InitialState = {
  user: null,
  token: sessionStorage.getItem(STORAGE_FIELDS.token) || localStorage.getItem(STORAGE_FIELDS.token) || null,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUserStore: (state) => {
      state.user = null;
      state.token = null;
    },
    setUser: (state, action: PayloadAction<UserModel>) => {
      state.user = action.payload;
    },
    setUserDetails: (state, action: PayloadAction<UserDetailsModel>) => {
      if (state.user) {
        state.user.details = action.payload;
      }
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
  },
});

export const { resetUserStore, setUser, setUserDetails, setToken } = auth.actions;

export default auth.reducer;
