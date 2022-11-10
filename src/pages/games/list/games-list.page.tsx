import React, { useState } from "react";

import { AllGamesList } from "./all-games-list/all-games-list";
import { CurrentRoundGames } from "./current-round-games/current-round-games";
import { Groups } from "./groups/groups";
import { PageHeader, PageTabs } from "components";
import { View } from "./games-list.types";
import { gamesTabs } from "./games-list.constants";

export const GamesListPage: React.FC = () => {
  const [view, setView] = useState<View>("all");

  const onViewChange = (viewName: View) => setView(viewName);

  return (
    <div>
      <PageHeader title="Lista spotkań" subtitle="W tym miejscu znajdują się spotkania mistrzostw świata." />
      <PageTabs views={gamesTabs} currentView={view} onViewChange={onViewChange} />
      {view === "all" && <AllGamesList />}
      {view === "current-round" && <CurrentRoundGames />}
      {view === "groups" && <Groups />}
    </div>
  );
};
