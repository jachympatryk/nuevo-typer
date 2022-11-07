import { GameResult, UserModel } from "models";

export type CreatePredictionData = {
  hostTeam: string;
  guestTeam: string;
  predictedResult: GameResult;
  gameDate: Date | string;
};

export type CreatePredictionArguments = {
  user: UserModel;
  gameId: string;
  details: CreatePredictionData;
};
