import { GameModel } from "models";

export type GameProps = {
  game: GameModel;
  className?: string;
};

export type GameData = {
  guestTeam: number;
  hostTeam: number;
};
