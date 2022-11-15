import React, { useMemo, useState } from "react";
import { useDidUpdate } from "@better-typed/react-lifecycle-hooks";

import { Group as GroupModel } from "models";
import { useFirebaseFetch } from "hooks";
import { getGamesFromGroup, getTeamsFromGroup } from "firestore";
import { flags } from "constants/flags.constants";
import { Loader } from "../loader/loader";

import background from "assets/images/background.png";

import styles from "./group.module.scss";

interface Props {
  group: GroupModel;
}

type GroupValues = { id: string | number; name: string; points: number; scored: number; conceded: number };
type GroupResult = Record<string, Omit<GroupValues, "id">>;

export const Group: React.FC<Props> = ({ group }) => {
  const [groupResult, setGroupResult] = useState<GroupResult | null>(null);

  const { data: teams, loading: teamsLoading } = useFirebaseFetch(() => getTeamsFromGroup(group));
  const { data: games, loading: gamesLoading } = useFirebaseFetch(() => getGamesFromGroup(group));

  const loading = teamsLoading || gamesLoading;

  useDidUpdate(() => {
    const groupResults: GroupResult = {};

    // eslint-disable-next-line no-return-assign
    teams?.forEach((team) => (groupResults[team.id] = { name: team.name, points: 0, scored: 0, conceded: 0 }));

    const isGroupResultsEmpty = Object.keys(groupResults).length === 0;

    if (!isGroupResultsEmpty) {
      games?.forEach((game) => {
        if (game.result && game?.hostId && game?.guestId) {
          if (game.result.host > game.result.guest) {
            groupResults[game.hostId].points += 3;
            groupResults[game.guestId].points += 0;
          }

          if (game.result.host === game.result.guest) {
            groupResults[game.hostId].points += 1;
            groupResults[game.guestId].points += 1;
          }

          if (game.result.host < game.result.guest) {
            groupResults[game.hostId].points += 0;
            groupResults[game.guestId].points += 3;
          }

          groupResults[game.hostId].scored += game.result.host;
          groupResults[game.hostId].conceded += game.result.guest;
          groupResults[game.guestId].scored += game.result.guest;
          groupResults[game.guestId].conceded += game.result.host;
        }
      });

      setGroupResult(groupResults);
    }
  }, [teams, group]);

  const values: GroupValues[] = useMemo(() => {
    if (groupResult) {
      const array = Object.entries(groupResult).map(([key, value]) => {
        return { id: key, ...value };
      });

      return array.sort((first, second) => second.points - first.points);
    }

    return [];
  }, [groupResult]);

  return (
    <div className={styles.container}>
      <div className={styles.header} style={{ backgroundImage: `url(${background})` }}>
        <p className={styles.group}>Grupa {group}</p>
      </div>
      <section className={styles.content}>
        {loading && <Loader height="300px" />}
        {!loading &&
          values.map((team) => {
            const Flag = flags[team.id];
            const balance = team.scored - team.conceded;

            return (
              <div key={team.id} className={styles.team}>
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-ignore */}
                <Flag style={{ height: "20px" }} />
                <p className={styles.name}>{team.name}</p>
                <p className={styles.caption}>{team.scored}</p>
                <p className={styles.caption}>{team.conceded}</p>
                <p className={styles.caption}>
                  {balance > 0 ? "+" : ""}
                  {balance}
                </p>
                <p className={styles.points}>{team.points}</p>
              </div>
            );
          })}
      </section>
    </div>
  );
};
