import React from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { Button, FormInput } from "react-modern-components";
import { signInWithEmailAndPassword, User, AuthError } from "firebase/auth";

import { LoginData } from "../login.types";
import { setUser, setToken } from "store";
import { mapUserData } from "utils";
import { FirebaseErrorType } from "pages/auth/auth.types";
import { auth } from "config/firebase.config";
import { FIREBASE_ERRORS } from "pages/auth/auth.constants";
import { GAMES_PAGE, REGISTER_PAGE } from "constants/routes.constants";
import { STORAGE_FIELDS } from "constants/storage-fields.constants";
import { loginSchema, initialLoginValues } from "../login.constants";

import styles from "../../auth.module.scss";

export const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const onLoginSuccess = (user: User) => {
    user
      .getIdToken()
      .then((idToken) => {
        const userData = mapUserData(user);
        dispatch(setUser(userData));
        dispatch(setToken(idToken));

        localStorage.setItem(STORAGE_FIELDS.token, idToken);
        localStorage.setItem(STORAGE_FIELDS.refresh_token, user.refreshToken);

        navigate(GAMES_PAGE.path);
      })
      .catch(() => enqueueSnackbar("Wystąpił błąd podczas logowania", { variant: "error" }));
  };

  const handleSubmit = (values: LoginData, { setSubmitting }: FormikHelpers<LoginData>) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(({ user }) => {
        onLoginSuccess(user);
      })
      .catch((error: AuthError) => {
        const errorName = error.code as FirebaseErrorType;
        const message = FIREBASE_ERRORS[errorName] || "Wystąpił błąd podczas logowania";

        enqueueSnackbar(message, { variant: "error" });
      });

    setSubmitting(false);
  };

  return (
    <Formik initialValues={initialLoginValues} onSubmit={handleSubmit} validationSchema={loginSchema}>
      <Form className={styles.form}>
        <FormInput name="email" label="Email" size="large" />
        <FormInput name="password" label="Hasło" type="password" size="large" />

        <div className={styles.row}>
          <p className={styles.linkText}>
            Nie masz konta?{" "}
            <Link to={REGISTER_PAGE.path} className={styles.linkSpan}>
              Zarejestruj się!
            </Link>
          </p>

          <div className={styles.buttonRow}>
            <Button disabled={false} type="submit" variant="contained" className={styles.submitButton}>
              Zaloguj się
            </Button>
          </div>
        </div>
      </Form>
    </Formik>
  );
};
