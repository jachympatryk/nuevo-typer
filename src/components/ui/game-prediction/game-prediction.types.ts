import { PredictionModel } from "models";

export type GamePredictionProps = {
  game: PredictionModel;
  className?: string;
  noEditable?: boolean;
  onEditSuccess?: () => void;
};
