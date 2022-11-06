import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";

import { store } from "store";
import { ProviderProps } from "./providers.types";

import styles from "./providers.module.scss";

export const Providers: React.FC<ProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <SnackbarProvider
        preventDuplicate
        autoHideDuration={3000}
        maxSnack={3}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        classes={{
          variantSuccess: styles.success,
          variantWarning: styles.warning,
          variantError: styles.error,
          variantInfo: styles.info,
        }}
      >
        <BrowserRouter>{children}</BrowserRouter>
      </SnackbarProvider>
    </Provider>
  );
};
