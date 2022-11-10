import React from "react";

import { Group } from "components";

import styles from "./groups.module.scss";

export const Groups: React.FC = () => {
  return (
    <div className={styles.container}>
      <Group group="A" />
      <Group group="B" />
      <Group group="C" />
      <Group group="D" />
      <Group group="E" />
      <Group group="F" />
      <Group group="G" />
      <Group group="H" />
    </div>
  );
};
