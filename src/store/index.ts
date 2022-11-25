import { combineReducers, configureStore } from "@reduxjs/toolkit";

import auth from "./reducers/auth";
import ui from "./reducers/ui";
import games from "./reducers/games";

const reducer = combineReducers({
  auth,
  ui,
  games,
});

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof reducer>;

export * from "./reducers/auth";
export * from "./reducers/ui";
export * from "./reducers/games";

export { store };
