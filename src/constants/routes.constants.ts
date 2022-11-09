import { RouteConstant } from "types";

export const HERO_PAGE: RouteConstant = {
  path: "/",
  name: "Logowanie / Rejestracja",
  auth: false,
  showNavigation: false,
};

export const LANDING_PAGE: RouteConstant = {
  path: "/home",
  name: "Strona główna",
  auth: true,
  showNavigation: true,
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

export const GAMES_PAGE: RouteConstant = {
  path: "/games",
  name: "Wszystkie mecze",
  auth: true,
  showNavigation: true,
};

export const GAME_DETAILS_PAGE: RouteConstant = {
  path: "/games/:gameId",
  name: "Szczegóły meczu",
  auth: true,
  showNavigation: true,
};

export const RANK_PAGE: RouteConstant = {
  path: "/rank",
  name: "Ranking",
  auth: true,
  showNavigation: true,
};

export const PREDICTIONS_PAGE: RouteConstant = {
  path: "/predictions",
  name: "Twoje typy",
  auth: true,
  showNavigation: true,
};
