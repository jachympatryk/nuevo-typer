import { GameResult, Round } from "models/game.models";

export type PredictionModel = {
  gameDate: Date | string;
  gameId: string;
  guestTeam: string;
  hostTeam: string;
  predictedResult: GameResult;
  userId: string;
  round: Round;
  resultGuest: null | number;
  resultHost: null | number;
  hostId: number;
  userName: string;
  guestId: number;
};
