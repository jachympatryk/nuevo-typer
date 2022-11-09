import { GameResult, Round, UserModel } from "models";

export type CreatePredictionData = {
  hostTeam: string;
  hostId: string;
  guestId: string;
  guestTeam: string;
  predictedResult: GameResult;
  gameDate: Date | string;
  resultGuest: null;
  resultHost: null;
  round: Round;
};

export type CreatePredictionArguments = {
  user: UserModel;
  gameId: string;
  details: CreatePredictionData;
};
