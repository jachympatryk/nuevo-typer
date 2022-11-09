import { GameModel } from "models";

export type GameProps = {
  game: GameModel;
  className?: string;
  noEditable?: boolean;
};

export type GameData = {
  guestTeam: number;
  hostTeam: number;
};
