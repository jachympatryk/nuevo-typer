import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { resetUserStore } from "store";
import { LOGIN_PAGE, GAMES_PAGE } from "constants/routes.constants";
import { STORAGE_FIELDS } from "constants/storage-fields.constants";
import { auth } from "config/firebase.config";

export const LogoutPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // firebase - sign out
    signOut(auth)
      .then(() => {
        // remove tokens
        localStorage.removeItem(STORAGE_FIELDS.token);
        localStorage.removeItem(STORAGE_FIELDS.refresh_token);
        sessionStorage.removeItem(STORAGE_FIELDS.token);
        sessionStorage.removeItem(STORAGE_FIELDS.refresh_token);

        // reset redux
        dispatch(resetUserStore());

        // redirect to log in page
        navigate(LOGIN_PAGE.path);
      })
      .catch(() => {
        navigate(GAMES_PAGE.path);
        // sign out error - redirect to the home page
      });
  }, [dispatch, navigate]);

  return <>Logout</>;
};
