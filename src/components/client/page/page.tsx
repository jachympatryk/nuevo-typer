import React from "react";

import { PageProps } from "./page.types";
import { Navbar } from "components";

import styles from "./page.module.scss";

export const Page: React.FC<PageProps> = ({ children, showNavigation }) => {
  /* include header/footer if necessary */

  return (
    <div className={showNavigation ? styles.navigationContainer : styles.container}>
      {showNavigation ? <Navbar /> : null}
      {children}
    </div>
  );
};
