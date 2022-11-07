import React from "react";

import styles from "./content.module.scss";

interface Props {
  children: React.ReactNode;
}

export const Content: React.FC<Props> = ({ children }) => {
  return <main className={styles.container}>{children}</main>;
};
