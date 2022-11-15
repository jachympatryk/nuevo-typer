import React from "react";
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
            <h4 className={styles.title}>Nuevo Palace typer</h4>
            <p className={styles.subtitle}>
              Wejdź do gry razem z Nuevo. Typujemy wyniki mistrzostw świata i bawimy się razem!
            </p>
          </div>
          <div className={styles.buttons}>
            <Button className={styles.loginButton} onClick={openLoginPage} variant="contained">
              Zaloguj się
            </Button>
            <Button className={styles.registerButton} onClick={openRegisterPage} variant="outlined">
              Stwórz konto
            </Button>
          </div>
        </div>
      </div>
    </FormStructure>
  );
};
