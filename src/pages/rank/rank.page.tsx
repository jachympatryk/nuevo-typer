import React, { useMemo } from "react";

import { Loader, PageHeader } from "components";
import { useFirebaseFetch } from "hooks";
import { getAllUsers } from "firestore";
import { RankUser } from "./rank.types";

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

  return (
    <div>
      <PageHeader title="Ranking" subtitle="Poniżej znajduje się aktualny ranking graczy." />

      {usersLoading && <Loader />}
      {usersError && <p>Wystąpił błąd</p>}
      {users.length !== 0 &&
        rank.map((user) => (
          <p key={user.id}>
            {user.displayName} - points: {user.points}
          </p>
        ))}
    </div>
  );
};
