import React from "react";

import { Game, Loader } from "components";
import { useFirebaseFetch } from "hooks";
import { getCurrentRoundGames } from "firestore";

import styles from "./current-round-games.module.scss";

export const CurrentRoundGames: React.FC = () => {
  const gameData = useFirebaseFetch(getCurrentRoundGames);
  const { data, loading } = gameData;

  return (
    <div className={styles.container}>
      {loading && <Loader />}
      {!loading && (
        <div className={styles.content}>
          {data?.map((game) => (
            <Game game={game} noEditable />
          ))}
        </div>
      )}
    </div>
  );
};
