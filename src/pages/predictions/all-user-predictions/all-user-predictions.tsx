import React from "react";

import { GamePrediction, NoContent } from "components";
import { PredictionModel } from "models";

import styles from "./all-user-predictions.module.scss";

interface Props {
  predictions: PredictionModel[];
  loading: boolean;
  refreshPredictions: () => void;
}

export const AllUserPredictions: React.FC<Props> = ({ predictions, loading, refreshPredictions }) => {
  const showNoContent = Boolean(!loading && !predictions.length);
  const showContent = Boolean(!loading && predictions.length);

  return (
    <div className={styles.container}>
      {showNoContent && <NoContent />}
      {showContent && (
        <div className={styles.content}>
          {predictions.map((prediction) => (
            <GamePrediction key={prediction.gameId} prediction={prediction} onEditSuccess={refreshPredictions} />
          ))}
        </div>
      )}
    </div>
  );
};
