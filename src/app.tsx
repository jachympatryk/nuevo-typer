import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDidUpdate } from "@better-typed/react-lifecycle-hooks";
import { onAuthStateChanged } from "firebase/auth";

import { PageRoute } from "components";
import { setUser, setToken, RootState } from "store";
import { mapUserData } from "utils";
import { LOGOUT_PAGE } from "constants/routes.constants";
import { STORAGE_FIELDS } from "constants/storage-fields.constants";
import { routes } from "config/routes.config";
import { auth } from "config/firebase.config";

import "./assets/styles/app.scss";

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.auth);

  useDidUpdate(
    () => {
      const sub = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser && !user) {
          setLoading(true);
          firebaseUser
            .getIdToken()
            .then((idToken) => {
              dispatch(setUser(mapUserData(firebaseUser)));
              dispatch(setToken(idToken));

              localStorage.setItem(STORAGE_FIELDS.token, idToken);
              localStorage.setItem(STORAGE_FIELDS.refresh_token, firebaseUser.refreshToken);
              setLoading(false);
            })
            .catch(() => {
              navigate(LOGOUT_PAGE.path);
              setLoading(false);
            });
        } else {
          setLoading(false);
        }
      });

      return sub;
    },
    [user],
    true,
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.name} path={route.path} element={<PageRoute {...route} />} />
      ))}
    </Routes>
  );
};
