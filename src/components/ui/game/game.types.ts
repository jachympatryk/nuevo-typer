import { GameModel, PredictionModel } from "models";

export type GameProps = {
  game: GameModel;
  className?: string;
  noEditable?: boolean;
  onSuccess?: (prediction: PredictionModel) => void;
};

export type GameData = {
  guestTeam: number;
  hostTeam: number;
};
