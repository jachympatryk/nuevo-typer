import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import { Game } from "components";
import { getDateTime } from "utils";
import { GameModel } from "models";
import { getCurrentRound } from "utils/game-round.utils";
import { RootState } from "store";

import styles from "./current-round-games.module.scss";

export const CurrentRoundGames: React.FC = () => {
  const currentRound = useMemo(() => getCurrentRound(new Date()), []);

  const { games } = useSelector((state: RootState) => state.games);

  const data = games.filter((game) => game.round === currentRound);

  const sortByDates = (first: GameModel, second: GameModel) => {
    return getDateTime(first.date) - getDateTime(second.date);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {data?.sort(sortByDates).map((game) => (
          <Game key={game.id} game={game} noEditable />
        ))}
      </div>
    </div>
  );
};
