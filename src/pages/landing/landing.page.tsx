import React from "react";

import { useFirebaseFetch } from "hooks";
import { getAllGames } from "firestore/games/games.firestore";
import { Game } from "components";

import styles from "./landing.module.scss";

export const LandingPage: React.FC = () => {
  const gameData = useFirebaseFetch(getAllGames);
  const { data } = gameData;

  return (
    <div>
      <div className={styles.content}>
        {data?.map((game) => (
          <Game game={game} />
        ))}
      </div>
    </div>
  );
};
