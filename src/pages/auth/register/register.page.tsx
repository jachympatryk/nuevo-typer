import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { FormInput, Button } from "react-modern-components";
import { createUserWithEmailAndPassword, updateProfile, AuthError, signInWithPopup } from "firebase/auth";

import { FormStructure } from "components";
import { FirebaseErrorType, ProviderArguments } from "../auth.types";
import { setUser, setToken } from "store";
import { RegisterData } from "./register.types";
import { mapUserData } from "utils";
import { auth } from "config/firebase.config";
import { FIREBASE_ERRORS, providers } from "../auth.constants";
import { STORAGE_FIELDS } from "constants/storage-fields.constants";
import { LANDING_PAGE, LOGIN_PAGE } from "constants/routes.constants";
import { formValidationSchema, registerInitialValues } from "./register.constants";

// import { ReactComponent as GoogleLogo } from "assets/icons/google-logo.svg";

import styles from "../auth.module.scss";

export const RegisterPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values: RegisterData, { setSubmitting }: FormikHelpers<RegisterData>) => {
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(({ user }) => {
        user
          .getIdToken()
          .then((idToken) => {
            const userData = mapUserData(user);
            dispatch(setToken(idToken));

            if (auth.currentUser) {
              const displayName = `${values.nickname} (${values.name} ${values.surname})`;

              updateProfile(auth.currentUser, { displayName })
                .then(() => {
                  dispatch(setUser({ ...userData, displayName: values.name }));
                })
                .catch(() => {
                  dispatch(setUser(userData));
                });
            }

            localStorage.setItem(STORAGE_FIELDS.token, idToken);
            localStorage.setItem(STORAGE_FIELDS.refresh_token, user.refreshToken);

            navigate(LANDING_PAGE.path);
          })
          .catch(() => enqueueSnackbar("Wystąpił błąd podczas rejestracji", { variant: "error" }));
      })
      .catch((error: AuthError) => {
        const errorName = error.code as FirebaseErrorType;
        const message = FIREBASE_ERRORS[errorName] || "Wystąpił błąd podczas rejestracji";

        enqueueSnackbar(message, { variant: "error" });
      });

    setSubmitting(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleProviderRegister =
    ({ authProvider }: ProviderArguments) =>
    () => {
      const provider = providers[authProvider];

      signInWithPopup(auth, provider)
        .then(({ user }) => {
          user
            .getIdToken()
            .then((idToken) => {
              const userData = mapUserData(user);
              dispatch(setToken(idToken));
              dispatch(setUser(userData));

              localStorage.setItem(STORAGE_FIELDS.token, idToken);
              localStorage.setItem(STORAGE_FIELDS.refresh_token, user.refreshToken);

              navigate(LANDING_PAGE.path);
            })
            .catch(() => {
              enqueueSnackbar("Wystąpił błąd podczas rejestracji. 1", { variant: "error" });
            });
        })
        .catch((error: AuthError) => {
          const errorName = error.code as FirebaseErrorType;
          const message = FIREBASE_ERRORS[errorName] || "Wystąpił błąd podczas rejestracji. 2";

          enqueueSnackbar(message, { variant: "error" });
        });
    };

  return (
    <FormStructure>
      <Formik initialValues={registerInitialValues} onSubmit={handleSubmit} validationSchema={formValidationSchema}>
        {({ isSubmitting }) => (
          <Form className={styles.container}>
            <div className={styles.textContainer}>
              <h4 className={styles.title}>Zarejestruj się</h4>
              <p className={styles.subtitle}>
                Uzupełnij swoje dane aby wziąć udział w typerze mistrzostw świata razem z Nuevo!
              </p>
            </div>

            <div className={styles.form}>
              <FormInput name="name" label="Imię" className={styles.input} />
              <FormInput name="surname" label="Nazwisko" className={styles.input} />
              <FormInput name="nickname" label="Nick" className={styles.input} />
              <FormInput name="email" label="Adres email" type="email" className={styles.input} />
              <FormInput name="password" label="Hasło" type="password" className={styles.input} />

              <div className={styles.row}>
                <p className={styles.linkText}>
                  Masz już konto?{" "}
                  <Link to={LOGIN_PAGE.path} className={styles.linkSpan}>
                    Zaloguj się
                  </Link>
                </p>

                <div className={styles.buttonRow}>
                  {/* <Button */}
                  {/*  disabled={isSubmitting} */}
                  {/*  type="submit" */}
                  {/*  variant="outlined" */}
                  {/*  className={styles.submitButton} */}
                  {/*  size="large" */}
                  {/*  onClick={handleProviderRegister({ authProvider: "google" })} */}
                  {/* > */}
                  {/*  <GoogleLogo /> */}
                  {/* </Button> */}

                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
                    size="large"
                    className={styles.submitButton}
                  >
                    Zarejestruj się
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </FormStructure>
  );
};
