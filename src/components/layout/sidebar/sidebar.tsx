import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { menuItems } from "./sidebar.constants";
import { RootState, toggleMenu } from "store";

import { ReactComponent as Nuevo } from "assets/icons/nuevo.svg";
import background from "assets/images/background.png";

import styles from "./sidebar.module.scss";

export const Sidebar: React.FC = () => {
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const { menuOpen } = useSelector((state: RootState) => state.ui);

  const handleMenuToggle = () => {
    dispatch(toggleMenu());
  };

  return (
    <aside
      className={menuOpen ? styles.containerOpen : styles.container}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className={styles.content}>
        <div className={styles.navigation}>
          {menuItems.map(({ path, label }) => (
            <Link
              to={path}
              className={classNames(styles.link, path === pathname && styles.activeSection)}
              onClick={handleMenuToggle}
            >
              {label}
            </Link>
          ))}
        </div>
        <Nuevo className={styles.nuevo} />
      </div>
    </aside>
  );
};
