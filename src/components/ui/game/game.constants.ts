import { GameData } from "./game.types";
import { CreatePredictionData } from "firestore/predictions/predictions.types";
import { Round } from "models";

export const initialValues: GameData = {
  hostTeam: 0,
  guestTeam: 0,
};

export type MapDataProps = {
  hostTeam: string;
  guestTeam: string;
  data: GameData;
  date: Date | string;
  guestId: string;
  hostId: string;
  round: Round;
};

export const mapData = ({
  hostTeam,
  guestTeam,
  data,
  date,
  guestId,
  hostId,
  round,
}: MapDataProps): CreatePredictionData => {
  return {
    hostTeam,
    guestTeam,
    predictedResult: {
      host: data.hostTeam,
      guest: data.guestTeam,
    },
    gameDate: date,
    guestId,
    hostId,
    resultGuest: null,
    resultHost: null,
    round,
  };
};
