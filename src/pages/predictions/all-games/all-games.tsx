import React from "react";

import { Game, Loader } from "components";
import { useFirebaseFetch } from "hooks";
import { getCurrentRoundGames } from "firestore";

import styles from "./all-games.module.scss";

export const AllGames = () => {
  const gameData = useFirebaseFetch(getCurrentRoundGames);
  const { data, loading } = gameData;

  return (
    <div className={styles.container}>
      {loading && <Loader />}
      <div className={styles.content}>{!loading && data?.map((game) => <Game game={game} />)}</div>
    </div>
  );
};
