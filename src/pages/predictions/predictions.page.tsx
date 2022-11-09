import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDidUpdate } from "@better-typed/react-lifecycle-hooks";

import { PageHeader, PageTabs } from "components";
import { View } from "./predictions.types";
import { predictionsTabs } from "./predictions.constants";
import { AllGames } from "./all-games/all-games";
import { AllUserPredictions } from "./all-user-predictions/all-user-predictions";
import { AllUserPredictionsCurrentRound } from "./all-user-predictions-current-round/all-user-predictions-current-round";
import { RootState } from "store";
import { useFirebaseFetch } from "hooks";
import { getCurrentRoundGames, getUserPredictionFromCurrentRound, getUserPredictions } from "firestore";
import { GameModel, PredictionModel } from "models";
// TODO validate id
export const PredictionsPage: React.FC = () => {
  const id = useSelector((state: RootState) => state.auth.user?.id);

  const [view, setView] = useState<View>("all");
  const [gamesCanBePredicted, setGamesCanBePredicted] = useState<GameModel[] | null>(null);
  const [gamesPredicted, setGamesPredicted] = useState<PredictionModel[] | null>(null);
  const [allPredictions, setAllPredictions] = useState<PredictionModel[] | null>(null);

  const gameData = useFirebaseFetch(getCurrentRoundGames);
  const { data: gamesData, loading: gameLoading } = gameData;

  const predictionData = useFirebaseFetch(() => getUserPredictionFromCurrentRound((id as string) || "asdad"));
  const { data: predictionsData, loading: predictionsLoading, refresh: refreshPredictions } = predictionData;

  const allPredictionData = useFirebaseFetch(() => getUserPredictions((id as string) || "asdasd"));
  const {
    data: allPredictionsData,
    loading: allPredictionsLoading,
    refresh: refreshAllPredictions,
  } = allPredictionData;

  const onViewChange = (viewName: View) => setView(viewName);
  const loading = gameLoading && predictionsLoading && allPredictionsLoading;

  useDidUpdate(
    () => {
      if (gamesData && allPredictionData && predictionData) {
        const games: {
          canBePredicted: GameModel[];
          alreadyPredicted: PredictionModel[];
        } = {
          canBePredicted: [],
          alreadyPredicted: [],
        };

        gamesData?.map((game) => {
          return predictionsData?.forEach((prediction) => {
            if (prediction.gameId === game.id) games.alreadyPredicted.push(prediction);
            else games.canBePredicted.push(game);
          });
        });

        setGamesCanBePredicted(games.canBePredicted);
        setGamesPredicted(games.alreadyPredicted);
        setAllPredictions(allPredictionsData || []);
      }
    },
    [gamesData, allPredictionsData, predictionsData],
    true,
  );

  useDidUpdate(
    () => {
      if (id) {
        refreshPredictions();
        refreshAllPredictions();
      }
    },
    [id],
    true,
  );

  return (
    <div>
      <PageHeader title="Twoje typy" subtitle="W tym miejscu znajdują się spotkania mistrzostw świata." />
      <PageTabs views={predictionsTabs} currentView={view} onViewChange={onViewChange} />
      {id && allPredictions && gamesPredicted && gamesCanBePredicted && (
        <>
          {view === "all" && gamesCanBePredicted && <AllGames gamesData={gamesCanBePredicted} loading={loading} />}
          {view === "your-predictions" && <AllUserPredictions gamesData={allPredictions} loading={loading} />}
          {view === "your-predictions-current-round" && (
            <AllUserPredictionsCurrentRound gamesData={gamesPredicted} loading={loading} />
          )}
        </>
      )}
    </div>
  );
};
