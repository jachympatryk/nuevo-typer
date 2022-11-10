import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { menuItems } from "./sidebar.constants";
import { resetUserStore, RootState, toggleMenu } from "store";
import { STORAGE_FIELDS } from "constants/storage-fields.constants";
import { LOGIN_PAGE } from "constants/routes.constants";

import { ReactComponent as Nuevo } from "assets/icons/nuevo.svg";
import background from "assets/images/background.png";
import { ReactComponent as Logout } from "assets/icons/logout.svg";

import styles from "./sidebar.module.scss";

export const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const { menuOpen } = useSelector((state: RootState) => state.ui);

  const logout = () => {
    dispatch(resetUserStore());
    localStorage.removeItem(STORAGE_FIELDS.token);
    localStorage.removeItem(STORAGE_FIELDS.refresh_token);
    navigate(LOGIN_PAGE.path);
  };

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

        <Logout className={styles.logout} onClick={logout} />
      </div>
    </aside>
  );
};
