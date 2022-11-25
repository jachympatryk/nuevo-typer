import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { GameModel } from "models";

interface GamesData {
  games: GameModel[];
}

const initialState: GamesData = {
  games: [],
};

const games = createSlice({
  name: "games",
  initialState,
  reducers: {
    resetGamesStore: (state) => {
      state.games = [];
    },
    setGames: (state, action: PayloadAction<GameModel[]>) => {
      state.games = action.payload;
    },
  },
});

export const { resetGamesStore, setGames } = games.actions;

export default games.reducer;
