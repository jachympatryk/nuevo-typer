import React from "react";

import { Game, Loader } from "components";
import { useFirebaseFetch } from "hooks";
import { getAllGames } from "firestore";

import styles from "./all-games-list.module.scss";

export const AllGamesList: React.FC = () => {
  const gameData = useFirebaseFetch(getAllGames);
  const { data, loading } = gameData;

  return (
    <div className={styles.container}>
      {loading && <Loader />}
      <div className={styles.content}>{!loading && data?.map((game) => <Game game={game} />)}</div>
    </div>
  );
};
