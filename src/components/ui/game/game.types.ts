import { GameModel } from "models";

export type GameProps = {
  game: GameModel;
  className?: string;
  noEditable?: boolean;
  onSuccess?: () => void;
};

export type GameData = {
  guestTeam: number;
  hostTeam: number;
};
