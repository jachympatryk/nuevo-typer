import React from "react";

import styles from "./page-header.module.scss";

interface Props {
  title: string;
  subtitle: string;
}

export const PageHeader: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <div>
      <h1 className={styles.title}>{title}</h1>
      <h6 className={styles.subtitle}>{subtitle}</h6>
    </div>
  );
};
