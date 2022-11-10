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

export type Group = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";

export type GameModel = {
  id: string;
  hostId: string;
  hostTeam: string;
  guestId: string;
  guestTeam: string;
  date: Date | string;
  stadium: string;
  result: GameResult | null;
  round: Round;
  group?: Group;
};
