import React from "react";

import background from "assets/images/background.png";

import styles from "./group.module.scss";

interface Props {
  group: "A" | "B" | "C" | "D" | "E" | "F" | "G";
}

export const Group: React.FC<Props> = ({ group }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header} style={{ backgroundImage: `url(${background})` }}>
        <p className={styles.group}>Grupa {group}</p>
      </div>
      <section className={styles.content}>
        <div className={styles.team}>
          <p>Team 1</p>
        </div>
        <div className={styles.team}>
          <p>Team 1</p>
        </div>
        <div className={styles.team}>
          <p>Team 1</p>
        </div>
        <div className={styles.team}>
          <p>Team 1</p>
        </div>
      </section>
    </div>
  );
};
