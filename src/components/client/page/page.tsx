import React from "react";

import { PageProps } from "./page.types";
import { Content, Navbar, Sidebar } from "components";

import styles from "./page.module.scss";

export const Page: React.FC<PageProps> = ({ children, showNavigation, guarded }) => {
  /* include header/footer if necessary */

  return (
    <div className={showNavigation ? styles.navigationContainer : styles.container}>
      {showNavigation && <Sidebar />}
      {showNavigation && <Navbar />}
      {guarded ? <Content>{children}</Content> : children}
    </div>
  );
};
