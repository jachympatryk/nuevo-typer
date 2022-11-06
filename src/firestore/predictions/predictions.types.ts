import { GameResult } from "models";

export type CreatePredictionData = {
  hostTeam: string;
  guestTeam: string;
  predictedResult: GameResult;
  gameDate: Date | string;
};

export type CreatePredictionArguments = {
  userId: string;
  gameId: string;
  details: CreatePredictionData;
};
