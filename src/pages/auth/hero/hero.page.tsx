import React from "react";
import { Typography } from "@mui/material";
import { Button } from "react-modern-components";
import { useNavigate } from "react-router-dom";

import { FormStructure } from "components";
import { LOGIN_PAGE, REGISTER_PAGE } from "constants/routes.constants";

import styles from "./hero.module.scss";

export const HeroPage = () => {
  const navigate = useNavigate();

  const openLoginPage = () => {
    navigate(LOGIN_PAGE.path);
  };

  const openRegisterPage = () => {
    navigate(REGISTER_PAGE.path);
  };

  return (
    <FormStructure>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.texts}>
            <Typography variant="h1">Nuevo palace typer</Typography>
            <Typography variant="h3">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure, quia soluta. Dolore ducimus ipsam libero
              non provident rerum totam vero!
            </Typography>
          </div>
          <div className={styles.buttons}>
            <Button className={styles.loginButton} onClick={openLoginPage}>
              Zaloguj się
            </Button>
            <Button className={styles.registerButton} onClick={openRegisterPage}>
              Stwórz konto
            </Button>
          </div>
        </div>
      </div>
    </FormStructure>
  );
};
