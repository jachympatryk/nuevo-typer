import React from "react";

import { GamePrediction, NoContent } from "components";
import { PredictionModel } from "models";

import styles from "./all-user-predictions.module.scss";

interface Props {
  predictions: PredictionModel[];
  loading: boolean;
  onPredictionEdited: (prediction: PredictionModel) => void;
}

export const AllUserPredictions: React.FC<Props> = ({ predictions, loading, onPredictionEdited }) => {
  const showNoContent = Boolean(!loading && !predictions.length);
  const showContent = Boolean(!loading && predictions.length);

  const sortPredictions = (first: PredictionModel, second: PredictionModel) => {
    return +second.gameId - +first.gameId;
  };

  return (
    <div className={styles.container}>
      {showNoContent && (
        <NoContent
          title="Aktualnie nie masz żadnych typów"
          subtitle="Przejdź do sekcji meczów do typowania i obstaw swój pierwszy mecz"
        />
      )}
      {showContent && (
        <div className={styles.content}>
          {predictions.sort(sortPredictions).map((prediction) => (
            <GamePrediction key={prediction.gameId} prediction={prediction} onEditSuccess={onPredictionEdited} />
          ))}
        </div>
      )}
    </div>
  );
};
