import React, { useMemo, useState } from "react";

import { Game, Loader } from "components";
import { useFirebaseFetch } from "hooks";
import { getCurrentRoundGames } from "firestore";
import { GameModel, PredictionModel } from "models";
import { getDateTime } from "utils";

import styles from "./all-games.module.scss";

interface Props {
  predictions: PredictionModel[];
  refreshPredictions: () => void;
}

export const AllGames: React.FC<Props> = ({ predictions, refreshPredictions }) => {
  const [games, setGames] = useState<GameModel[]>([]);

  const gameData = useFirebaseFetch(getCurrentRoundGames, { onSuccess: (response) => setGames(response || []) });
  const { loading } = gameData;

  const gamesToDisplay = useMemo(() => {
    const currentRoundGames = games.filter((game) => !predictions.some((prediction) => prediction.gameId === game.id));
    const sortedGames = currentRoundGames.sort((first, second) => getDateTime(first.date) - getDateTime(second.date));

    return sortedGames;
  }, [predictions, games]);

  return (
    <div className={styles.container}>
      {loading && <Loader />}
      <div className={styles.content}>
        {!loading &&
          gamesToDisplay
            .sort((first, second) => new Date(first.date).getTime() - new Date(second.date).getTime())
            .map((game) => <Game key={game.id} game={game} onSuccess={refreshPredictions} />)}
      </div>
    </div>
  );
};
