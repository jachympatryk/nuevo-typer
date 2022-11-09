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

export const PredictionsPage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [view, setView] = useState<View>("all");

  const allPredictionData = useFirebaseFetch(() => getUserPredictions(user?.id || "-"), {
    dependencies: [user],
  });
  const { data, loading, refresh } = allPredictionData;

  const onViewChange = (viewName: View) => setView(viewName);

  return (
    <div>
      <PageHeader title="Twoje typy" subtitle="W tym miejscu znajdują się spotkania mistrzostw świata." />
      <PageTabs views={predictionsTabs} currentView={view} onViewChange={onViewChange} />
      {view === "all" && <AllGames predictions={data || []} refreshPredictions={refresh} />}
      {view === "your-predictions" && (
        <AllUserPredictions predictions={data || []} loading={loading} refreshPredictions={refresh} />
      )}
    </div>
  );
};
