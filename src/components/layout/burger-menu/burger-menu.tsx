import React from "react";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";

import { toggleMenu } from "store";

import styles from "./burger-menu.module.scss";

export const BurgerMenu = () => {
  const dispatch = useDispatch();

  const handleMenuToggle = () => {
    dispatch(toggleMenu());
  };

  return (
    <IconButton className={styles.burger} onClick={handleMenuToggle}>
      <MenuIcon />
    </IconButton>
  );
};
