import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  menuOpen: boolean;
};

const initialState: InitialState = {
  menuOpen: false,
};

const ui = createSlice({
  name: "ui",
  initialState,
  reducers: {
    resetUiStore: () => initialState,
    setMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.menuOpen = action.payload;
    },
    toggleMenu: (state) => {
      state.menuOpen = !state.menuOpen;
    },
  },
});

export const { resetUiStore, setMenuOpen, toggleMenu } = ui.actions;

export default ui.reducer;
