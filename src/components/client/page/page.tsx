import React from "react";

import { PageProps } from "./page.types";
import { Navbar } from "components";

import styles from "./page.module.scss";

export const Page: React.FC<PageProps> = ({ children }) => {
  /* include header/footer if necessary */

  return (
    <div className={styles.container}>
      <Navbar />
      {children}
    </div>
  );
};
