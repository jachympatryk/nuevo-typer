import React, { useMemo } from "react";

import { Loader, PageHeader } from "components";
import { useFirebaseFetch } from "hooks";
import { getAllUsers } from "firestore";
import { RankUser } from "./rank.types";

import styles from "./rank.module.scss";

export const RankPage = () => {
  const { data: usersData, loading: usersLoading, error: usersError } = useFirebaseFetch(getAllUsers);

  const users: RankUser[] = useMemo(() => {
    if (usersData)
      return usersData.map((user) => ({ id: user.id, displayName: user.displayName, points: user.points }));

    return [];
  }, [usersData]);

  const rank = useMemo(() => {
    return users.sort((first, second) => {
      return second.points - first.points;
    });
  }, [users]);

  // todo: error handler

  const showLoader = Boolean(usersLoading);
  const showError = Boolean(usersError && !showLoader);
  const showContent = !showError && rank.length > 0;

  return (
    <div>
      <PageHeader title="Ranking" subtitle="Poniżej znajduje się aktualny ranking graczy." />

      {usersLoading && <Loader />}
      {usersError && <p>Wystąpił błąd</p>}
      {showContent && (
        <section className={styles.container}>
          {rank?.map((user, index) => (
            <div key={user.id} className={styles.position}>
              <p className={styles.place}>{index + 1}</p>
              <div className={styles.content}>
                <p className={styles.name}>{user.displayName}</p>
                <p>Punkty: {user.points}</p>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};
