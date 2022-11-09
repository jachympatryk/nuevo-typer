import React, { useState } from "react";

import { PageHeader, PageTabs } from "components";
import { View } from "./predictions.types";
import { predictionsTabs } from "./predictions.constants";
import { AllGames } from "./all-games/all-games";
import { AllUserPredictions } from "./all-user-predictions/all-user-predictions";
// TODO validate id
export const PredictionsPage: React.FC = () => {
  const [view, setView] = useState<View>("all");

  const onViewChange = (viewName: View) => setView(viewName);

  return (
    <div>
      <PageHeader title="Twoje typy" subtitle="W tym miejscu znajdują się spotkania mistrzostw świata." />
      <PageTabs views={predictionsTabs} currentView={view} onViewChange={onViewChange} />
      {view === "all" && <AllGames />}
      {view === "your-predictions" && <AllUserPredictions />}
    </div>
  );
};
