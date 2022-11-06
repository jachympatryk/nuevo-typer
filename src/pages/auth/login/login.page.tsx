import React from "react";

import { FormStructure } from "components";
import { LoginForm } from "./login-form/login-form";

import styles from "../auth.module.scss";

export const LoginPage: React.FC = () => {
  return (
    <FormStructure>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h4 className={styles.title}>Nuevo world cup</h4>
          <p className={styles.subtitle}>
            Wejdź do gry razem z Nuevo. Typujemy wyniki mistrzostw świata i bawimy się razem!
          </p>
        </div>

        <LoginForm />
      </div>
    </FormStructure>
  );
};
