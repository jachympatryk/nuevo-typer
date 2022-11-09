import React from "react";
import { useSelector } from "react-redux";

import { Loader, GamePrediction } from "components";
import { useFirebaseFetch } from "hooks";
import { getUserPredictions } from "firestore";
import { RootState } from "store";

import styles from "./all-user-predictions.module.scss";

export const AllUserPredictions = () => {
  const id = useSelector((state: RootState) => state.auth.user?.id);

  const allPredictionData = useFirebaseFetch(() => getUserPredictions((id as string) || ""));
  const { data, loading } = allPredictionData;

  return (
    <div className={styles.container}>
      {loading && <Loader />}
      <div className={styles.content}>{!loading && data?.map((game) => <GamePrediction game={game} />)}</div>
    </div>
  );
};
