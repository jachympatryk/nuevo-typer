import React, { useMemo, useState } from "react";
import { useDidUpdate } from "@better-typed/react-lifecycle-hooks";

import { Loader, PageHeader } from "components";
import { useFirebaseFetch } from "hooks";
import { getAllUsers } from "firestore";
import { RankUser } from "./rank.types";
import { getPoints } from "./rank.constants";

import styles from "./rank.module.scss";

export const RankPage = () => {
  const [rankUsers, setRankUsers] = useState<RankUser[]>([]);

  const { data: usersData, loading: usersLoading, error: usersError } = useFirebaseFetch(getAllUsers);

  const users: RankUser[] = useMemo(() => {
    if (usersData)
      return usersData.map((user) => ({ id: user.id, displayName: user.displayName, points: user.points }));

    return [];
  }, [usersData]);

  useDidUpdate(() => {
    users.forEach(async (user) => {
      const rankUser = await getPoints(user);

      setRankUsers((prevUsers) => [...prevUsers, rankUser]);
    });
  }, [users]);

  const rank = useMemo(() => {
    return rankUsers.sort((first, second) => {
      return second.points - first.points;
    });
  }, [rankUsers]);

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