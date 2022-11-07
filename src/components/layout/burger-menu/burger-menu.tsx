import React from "react";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import styles from "./burger-menu.module.scss";

export const BurgerMenu = () => {
  return (
    <IconButton className={styles.burger}>
      <MenuIcon />
    </IconButton>
  );
};
