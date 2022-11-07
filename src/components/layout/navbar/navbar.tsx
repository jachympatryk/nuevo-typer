import React from "react";
import { Link } from "react-router-dom";

import { BurgerMenu } from "components";
import { useWindowSize } from "hooks";
import { linksData } from "./navbar.constants";

import background from "assets/images/background.webp";
import { ReactComponent as Nuevo } from "assets/icons/nuevo.svg";

import styles from "./navbar.module.scss";

export const Navbar = () => {
  const { width } = useWindowSize();

  const showBurger = width < 1024;

  return (
    <div className={styles.container} style={{ backgroundImage: `url(${background})` }}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <Nuevo className={styles.nuevo} />
        {showBurger && <BurgerMenu />}
        {!showBurger && (
          <div className={styles.navigation}>
            {linksData.map(({ path, label }) => (
              <Link to={path} className={styles.link}>
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
