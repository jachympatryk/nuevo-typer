import { GameResult } from "models/game.models";

export type PredictionModel = {
  userId: string;
  gameId: string;
  hostTeam: string;
  guestTeam: string;
  predictedResult: GameResult;
  gameDate: Date | string;
  points?: number | null;
};
