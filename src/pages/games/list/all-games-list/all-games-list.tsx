import React from "react";

import { FetchingError, Game, Loader } from "components";
import { useFirebaseFetch } from "hooks";
import { getAllGames } from "firestore";

import styles from "./all-games-list.module.scss";

export const AllGamesList: React.FC = () => {
  const gameData = useFirebaseFetch(getAllGames);
  const { data, loading, error } = gameData;

  const showError = Boolean(error && !loading);

  return (
    <div className={styles.container}>
      {loading && <Loader />}
      {showError && <FetchingError />}
      <div className={styles.content}>
        {!loading && data?.map((game) => <Game key={game.id} game={game} noEditable />)}
      </div>
    </div>
  );
};
