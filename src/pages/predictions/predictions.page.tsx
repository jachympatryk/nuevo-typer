import React, { useState } from "react";
import { useSelector } from "react-redux";

import { PageHeader, PageTabs } from "components";
import { View } from "./predictions.types";
import { predictionsTabs } from "./predictions.constants";
import { AllGames } from "./all-games/all-games";
import { AllUserPredictions } from "./all-user-predictions/all-user-predictions";
import { useFirebaseFetch } from "hooks";
import { getUserPredictions } from "firestore";
import { RootState } from "store";
import { PredictionModel } from "models";

export const PredictionsPage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [view, setView] = useState<View>("all");
  const [userPredictions, setUserPredictions] = useState<PredictionModel[]>([]);

  const allPredictionData = useFirebaseFetch(() => getUserPredictions(user?.id || "-"), {
    dependencies: [user],
    onSuccess: (allUsersPredictions) => {
      const predictions = allUsersPredictions?.sort((first, second) => +first.gameId - +second.gameId);
      setUserPredictions(predictions || []);
    },
  });
  const { loading } = allPredictionData;

  const onViewChange = (viewName: View) => setView(viewName);

  const onPredictionAdded = (prediction: PredictionModel) => {
    setUserPredictions((predictions) => [...predictions, prediction]);
  };

  const onPredictionEdited = (prediction: PredictionModel) => {
    const newPredictions = userPredictions.map((userPrediction) => {
      if (userPrediction.gameId === prediction.gameId) {
        return { ...userPrediction, predictedResult: prediction.predictedResult };
      }
      return userPrediction;
    });

    setUserPredictions(newPredictions);
  };

  return (
    <div>
      <PageHeader title="Twoje typy" subtitle="W tym miejscu znajdują się spotkania mistrzostw świata." />
      <PageTabs views={predictionsTabs} currentView={view} onViewChange={onViewChange} />
      {view === "all" && <AllGames predictions={userPredictions} onPredictionAdded={onPredictionAdded} />}
      {view === "your-predictions" && (
        <AllUserPredictions predictions={userPredictions} loading={loading} onPredictionEdited={onPredictionEdited} />
      )}
    </div>
  );
};
