import { combineReducers, configureStore } from "@reduxjs/toolkit";

import auth from "./reducers/auth";
import ui from "./reducers/ui";

const reducer = combineReducers({
  auth,
  ui,
});

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof reducer>;

export * from "./reducers/auth";
export * from "./reducers/ui";

export { store };
