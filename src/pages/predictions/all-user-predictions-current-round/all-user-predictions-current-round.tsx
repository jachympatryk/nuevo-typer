import React from "react";

import { GamePrediction, Loader } from "components";
import { PredictionModel } from "models";

import styles from "./all-user-predictions-current-round.module.scss";

type AllUserPredictionsProps = {
  gamesData: PredictionModel[];
  loading: boolean;
};

export const AllUserPredictionsCurrentRound: React.FC<AllUserPredictionsProps> = ({ gamesData, loading }) => {
  return (
    <div className={styles.container}>
      {loading && <Loader />}
      <div className={styles.content}>{!loading && gamesData?.map((game) => <GamePrediction game={game} />)}</div>
    </div>
  );
};
