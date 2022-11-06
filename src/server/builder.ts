import { Builder } from "@better-typed/hyper-fetch";

import { ServerErrorType } from "./server.types";
import { environment } from "config/environment.config";
import { STORAGE_FIELDS } from "constants/storage-fields.constants";

export const builder = new Builder<ServerErrorType>({ baseUrl: environment.serverUrl })
  .setDebug(true)
  .onError(async (res, command) => {
    const [, , status] = res;
    const refreshToken = localStorage.getItem(STORAGE_FIELDS.refresh_token);
    const isLoginEndpoint = command.endpoint.includes("login");

    if (status === 401 && !isLoginEndpoint && !command.used && refreshToken) {
      /* handle refresh token request */
    }
    return res;
  })
  .setQueryParamsConfig({
    arrayFormat: "comma",
    skipEmptyString: true,
  })
  .onAuth((command) => {
    /*
          const state = store.getState();
          const authToken = state.auth.token;
        */
    const authToken = "";

    return command.setHeaders({
      ...command.headers,
      Authorization: `Bearer ${authToken}`,
    });
  });
