import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { Page } from "components";
import { RouteConfig } from "types";
import { HeroPage } from "pages";
import { RootState } from "store";
import { LOGIN_PAGE, REGISTER_PAGE } from "constants/routes.constants";

export const PageRoute: React.FC<RouteConfig> = ({ component, showNavigation, auth }) => {
  const { pathname } = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);

  const isAuthenticated = Boolean(user);
  const isAuthRoute = pathname === LOGIN_PAGE.path || pathname === REGISTER_PAGE.path;
  const showContent = isAuthRoute || isAuthenticated;

  if (auth && !isAuthenticated) return <Navigate to={LOGIN_PAGE.path} />;

  return (
    <>
      {!isAuthenticated && !isAuthRoute && <HeroPage />}
      {showContent && (
        <Page showNavigation={showNavigation} guarded={auth}>
          {component}
        </Page>
      )}
    </>
  );
};
