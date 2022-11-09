import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { menuItems } from "./sidebar.constants";
import { RootState } from "store";

import { ReactComponent as Nuevo } from "assets/icons/nuevo.svg";
import background from "assets/images/background.webp";

import styles from "./sidebar.module.scss";

export const Sidebar: React.FC = () => {
  const { menuOpen } = useSelector((state: RootState) => state.ui);

  return (
    <aside
      className={menuOpen ? styles.containerOpen : styles.container}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className={styles.overlay} />
      <div className={styles.content}>
        <div className={styles.navigation}>
          {menuItems.map(({ path, label }) => (
            <Link to={path} className={styles.link}>
              {label}
            </Link>
          ))}
        </div>
        <Nuevo className={styles.nuevo} />
      </div>
    </aside>
  );
};
