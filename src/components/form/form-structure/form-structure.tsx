import React from "react";

import { FormStructureProps } from "./form-structure.types";

import { ReactComponent as Logo } from "assets/icons/logo.svg";

import styles from "./form-structure.module.scss";

export const FormStructure: React.FC<FormStructureProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.desktopSide}>
        <Logo className={styles.logo} />
      </div>
      <section className={styles.content}>{children}</section>
    </div>
  );
};
