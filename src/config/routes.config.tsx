import { RouteConfig } from "types";
import {
  HeroPage,
  LandingPage,
  LoginPage,
  LogoutPage,
  PredictionsPage,
  RankingPage,
  RegisterPage,
  GamesListPage,
} from "pages";
import {
  LANDING_PAGE,
  LOGIN_PAGE,
  REGISTER_PAGE,
  LOGOUT_PAGE,
  RANKING_PAGE,
  PREDICTIONS_PAGE,
  HERO_PAGE,
  GAMES_PAGE,
} from "constants/routes.constants";

export const routes: RouteConfig[] = [
  { ...HERO_PAGE, component: <HeroPage /> },
  { ...LANDING_PAGE, component: <LandingPage /> },
  { ...LOGIN_PAGE, component: <LoginPage /> },
  { ...REGISTER_PAGE, component: <RegisterPage /> },
  { ...LOGOUT_PAGE, component: <LogoutPage /> },
  { ...RANKING_PAGE, component: <RankingPage /> },
  { ...PREDICTIONS_PAGE, component: <PredictionsPage /> },
  { ...GAMES_PAGE, component: <GamesListPage /> },
];
