import React from "react";

import styles from "./loader.module.scss";

interface Props {
  height?: React.CSSProperties["height"];
}

export const Loader: React.FC<Props> = ({ height }) => {
  return (
    <div className={styles.container} style={{ height }}>
      <div className={styles.scalingDots}>
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};
