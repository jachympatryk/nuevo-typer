import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import { Game } from "components";
import { PredictionModel } from "models";
import { getDateTime } from "utils";
import { getCurrentRound } from "utils/game-round.utils";
import { RootState } from "store";

import styles from "./all-games.module.scss";

interface Props {
  predictions: PredictionModel[];
  refreshPredictions: () => void;
}

export const AllGames: React.FC<Props> = ({ predictions, refreshPredictions }) => {
  const currentRound = useMemo(() => getCurrentRound(new Date()), []);

  const { games: savedGames } = useSelector((state: RootState) => state.games);

  const games = savedGames.filter((game) => game.round === currentRound);

  const gamesToDisplay = useMemo(() => {
    const currentRoundGames = games.filter((game) => !predictions.some((prediction) => prediction.gameId === game.id));
    const sortedGames = currentRoundGames.sort((first, second) => getDateTime(first.date) - getDateTime(second.date));

    return sortedGames;
  }, [predictions, games]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {gamesToDisplay
          .sort((first, second) => new Date(first.date).getTime() - new Date(second.date).getTime())
          .map((game) => (
            <Game key={game.id} game={game} onSuccess={refreshPredictions} />
          ))}
      </div>
    </div>
  );
};
