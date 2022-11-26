import { PredictionModel } from "models";

export type GamePredictionProps = {
  prediction: PredictionModel;
  className?: string;
  noEditable?: boolean;
  onEditSuccess?: (prediction: PredictionModel) => void;
};
