import React from "react";
import { useSelector } from "react-redux";

import { Game, NoContent } from "components";
import { RootState } from "store";

import styles from "./all-games-list.module.scss";

export const AllGamesList: React.FC = () => {
  const { games } = useSelector((state: RootState) => state.games);

  const showNoContent = games.length === 0;

  return (
    <div className={styles.container}>
      {showNoContent && <NoContent />}
      <div className={styles.content}>
        {games.map((game) => (
          <Game key={game.id} game={game} noEditable />
        ))}
      </div>
    </div>
  );
};
