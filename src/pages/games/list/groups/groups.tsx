import React from "react";

import { Group } from "components";

import styles from "./groups.module.scss";

export const Groups: React.FC = () => {
  return (
    <div className={styles.container}>
      <Group group="A" />
    </div>
  );
};
