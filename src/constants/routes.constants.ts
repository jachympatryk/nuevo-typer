import { RouteConstant } from "types";

export const LANDING_PAGE: RouteConstant = {
  path: "/",
  name: "Strona główna",
  auth: false,
  showNavigation: false,
};

export const LOGIN_PAGE: RouteConstant = {
  path: "/login",
  name: "Logowanie",
  auth: false,
  showNavigation: false,
};

export const REGISTER_PAGE: RouteConstant = {
  path: "/register",
  name: "Rejestracja",
  auth: false,
  showNavigation: false,
};

export const LOGOUT_PAGE: RouteConstant = {
  path: "/logout",
  name: "Wylogowanie",
  auth: false,
  showNavigation: false,
};

export const RANKING_PAGE: RouteConstant = {
  path: "/ranking",
  name: "Ranking",
  auth: true,
  showNavigation: false,
};

export const PREDICTIONS_PAGE: RouteConstant = {
  path: "/prognozy",
  name: "Prognozy",
  auth: true,
  showNavigation: false,
};
