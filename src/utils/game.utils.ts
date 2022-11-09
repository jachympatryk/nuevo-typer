import { getCurrentRound } from "utils/game-round.utils";
import { GameModel, PredictionModel } from "models";

export const subtractHours = (date: Date, hoursToSubtract: number) => {
  date.setHours(date.getHours() - hoursToSubtract);

  return date;
};

export const canEditGame = (game: GameModel): { canEdit: boolean; editToDate: Date } => {
  // check if user can edit the game - 1 hour before start

  const matchDate = new Date(game.date);
  const editToDate = subtractHours(matchDate, 1);

  const currentRound = getCurrentRound(new Date());

  const isCurrentRound = currentRound === game.round;

  const canEdit = new Date().getTime() < editToDate.getTime() && isCurrentRound;

  return { canEdit, editToDate };
};

export const canEditPrediction = (game: PredictionModel): { canEdit: boolean; editToDate: Date } => {
  // check if user can edit the game - 1 hour before start

  const matchDate = new Date(game.gameDate);
  const editToDate = subtractHours(matchDate, 1);

  const currentRound = getCurrentRound(new Date());

  const isCurrentRound = currentRound === game.round;

  const canEdit = new Date().getTime() < editToDate.getTime() && isCurrentRound;

  return { canEdit, editToDate };
};
