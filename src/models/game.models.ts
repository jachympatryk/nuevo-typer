export type GameResult = {
  host: number;
  guest: number;
};

export type Round =
  | "Faza grupowa - Mecz 1"
  | "Faza grupowa - mecz 2"
  | "Faza grupowa - mecz 3"
  | "1/8 finału"
  | "Ćwierćfinały"
  | "Półfinały"
  | "Finał";

export type GameModel = {
  hostTeam: string;
  guestTeam: string;
  date: Date | string;
  stadium: string;
  result: GameResult | null;
  round: Round;
};
