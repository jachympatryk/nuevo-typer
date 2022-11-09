import React from "react";

import { Game, Loader } from "components";
import { GameModel } from "models";

import styles from "./all-games.module.scss";

export type AllGamesProps = {
  gamesData: GameModel[];
  loading: boolean;
};

export const AllGames: React.FC<AllGamesProps> = ({ gamesData, loading }) => {
  return (
    <div className={styles.container}>
      {loading && <Loader />}
      <div className={styles.content}>{!loading && gamesData?.map((game) => <Game game={game} />)}</div>
    </div>
  );
};
