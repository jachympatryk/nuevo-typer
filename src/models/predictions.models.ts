import { GameResult } from "models/game.models";

export type PredictionModel = {
  gameId: string;
  predictedResult: GameResult;
  userId: string;
  userName: string;
};
