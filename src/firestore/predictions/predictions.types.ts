import { GameResult, UserModel } from "models";

export type CreatePredictionData = {
  user: UserModel;
  gameId: string;
  predictedResult: GameResult;
};
