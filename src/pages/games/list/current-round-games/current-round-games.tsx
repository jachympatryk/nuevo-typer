import React from "react";

import { FetchingError, Game, Loader } from "components";
import { useFirebaseFetch } from "hooks";
import { getCurrentRoundGames } from "firestore";
import { getDateTime } from "utils";
import { GameModel } from "models";

import styles from "./current-round-games.module.scss";

export const CurrentRoundGames: React.FC = () => {
  const gameData = useFirebaseFetch(getCurrentRoundGames);
  const { data, loading, error } = gameData;

  const sortByDates = (first: GameModel, second: GameModel) => {
    return getDateTime(first.date) - getDateTime(second.date);
  };

  const showError = Boolean(error && !loading);

  return (
    <div className={styles.container}>
      {showError && <FetchingError />}
      {loading && <Loader />}
      {!loading && (
        <div className={styles.content}>
          {data?.sort(sortByDates).map((game) => (
            <Game game={game} noEditable />
          ))}
        </div>
      )}
    </div>
  );
};
