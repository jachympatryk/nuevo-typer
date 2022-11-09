import { GameResult, Round, UserModel } from "models";

export type CreatePredictionData = {
  hostTeam: string;
  hostId: number;
  guestId: number;
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
  guestId: string;
  hostId: string;
  details: CreatePredictionData;
};
