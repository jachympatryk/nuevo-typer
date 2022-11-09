import { getCurrentRound } from "utils/game-round.utils";
import { GameModel, GameResult } from "models";

export const subtractHours = (date: Date, hoursToSubtract: number) => {
  date.setHours(date.getHours() - hoursToSubtract);

  return date;
};

export const canEditGame = (game: GameModel | null): { canEdit: boolean; editToDate?: Date } => {
  // check if user can edit the game - 1 hour before start
  if (!game) return { canEdit: false };

  const matchDate = new Date(game.date);
  const editToDate = subtractHours(matchDate, 1);

  const currentRound = getCurrentRound(new Date());

  const isCurrentRound = currentRound === game.round;

  const canEdit = new Date().getTime() < editToDate.getTime() && isCurrentRound;

  return { canEdit, editToDate };
};

export const calculatePoints = (predicted: GameResult, result: GameResult): number => {
  if (predicted.host === result.host && predicted.guest === result.guest) return 3;

  if (result.host > result.guest) {
    if (predicted.host > predicted.guest) return 1;
    return 0;
  }

  if (result.host === result.guest) {
    if (predicted.host === predicted.guest) return 1;
    return 0;
  }

  if (result.host < result.guest) {
    if (predicted.host < predicted.guest) return 1;
    return 0;
  }

  return 0;
};
