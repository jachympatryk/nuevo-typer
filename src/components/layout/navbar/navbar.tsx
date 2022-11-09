import React from "react";

import { BurgerMenu } from "components";

import background from "assets/images/background.png";
import { ReactComponent as Nuevo } from "assets/icons/nuevo.svg";

import styles from "./navbar.module.scss";

export const Navbar = () => {
  return (
    <div className={styles.container} style={{ backgroundImage: `url(${background})` }}>
      <div className={styles.content}>
        <Nuevo className={styles.nuevo} />
        <BurgerMenu />
      </div>
    </div>
  );
};
