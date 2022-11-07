export type GameResult = {
  host: number;
  guest: number;
};

export type Round =
  | "Faza grupowa - mecz 1"
  | "Faza grupowa - mecz 2"
  | "Faza grupowa - mecz 3"
  | "1/8 finału"
  | "Ćwierćfinał"
  | "Półfinał"
  | "Mecz o 3 miejsce"
  | "Finał";

export type GameModel = {
  id: string;
  hostTeam: string;
  guestTeam: string;
  date: Date | string;
  stadium: string;
  result: GameResult | null;
  round: Round;
};
