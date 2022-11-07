export const subtractHours = (date: Date, hoursToSubtract: number) => {
  date.setHours(date.getHours() - hoursToSubtract);

  return date;
};

export const canEditGame = (gameDate: string | Date): { canEdit: boolean; editToDate: Date } => {
  // check if user can edit the game - 1 hour before start

  const matchDate = new Date(gameDate);
  const editToDate = subtractHours(matchDate, 1);

  const canEdit = new Date().getTime() < editToDate.getTime();

  return { canEdit, editToDate };
};
