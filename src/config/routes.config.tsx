import { RouteConfig } from "types";
import { LandingPage, LoginPage, LogoutPage, RegisterPage } from "pages";
import { LANDING_PAGE, LOGIN_PAGE, REGISTER_PAGE, LOGOUT_PAGE } from "constants/routes.constants";

export const routes: RouteConfig[] = [
  { ...LANDING_PAGE, component: <LandingPage /> },
  { ...LOGIN_PAGE, component: <LoginPage /> },
  { ...REGISTER_PAGE, component: <RegisterPage /> },
  { ...LOGOUT_PAGE, component: <LogoutPage /> },
];
