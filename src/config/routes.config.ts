import { LandingPage, LoginPage, RegisterPage } from "pages";
import { RouteConfig } from "types";
import { LANDING_PAGE, LOGIN_PAGE, REGISTER_PAGE } from "constants/routes.constants";

export const routes: RouteConfig[] = [
  { ...LANDING_PAGE, component: LandingPage },
  { ...LOGIN_PAGE, component: LoginPage },
  { ...REGISTER_PAGE, component: RegisterPage },
];
