import React from "react";
import { Formik, Form } from "formik";
// import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import { FormInput, Button } from "react-modern-components";

import { formValidationSchema, registerInitialValues } from "./register.constants";
import { FormStructure } from "components";
import { RegisterData } from "./register.types";
// import { RegisterData } from "server/auth/auth.types";
// import { register } from "server";
import { LOGIN_PAGE } from "constants/routes.constants";

import styles from "../auth.module.scss";

export const RegisterPage: React.FC = () => {
  // const navigate = useNavigate();

  // const { enqueueSnackbar } = useSnackbar();

  // const { submit, submitting, onSubmitSuccess, onSubmitError } = useSubmit(register);
  // onSubmitSuccess(() => {
  //   setIsSuccessfullySent(true);
  // });
  // onSubmitError(() => {
  //   enqueueSnackbar(t("register.registerError"), { variant: "error" });
  // });

  // const handleClose = () => {
  //   navigate(LOGIN_PAGE.path);
  // };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit = async (values: RegisterData) => {
    // await submit({ data: values });
  };

  return (
    <FormStructure>
      <Formik initialValues={registerInitialValues} onSubmit={handleSubmit} validationSchema={formValidationSchema}>
        <Form className={styles.container}>
          <div className={styles.textContainer}>
            <h4 className={styles.title}>Zarejestruj się</h4>
            <p className={styles.subtitle}>
              Uzupełnij swoje dane aby wziąć udział w typerze mistrzostw świata razem z Nuevo!
            </p>
          </div>

          <div className={styles.form}>
            <FormInput name="name" label="Imię" className={styles.input} size="large" />
            <FormInput name="surname" label="Nazwisko" className={styles.input} size="large" />
            <FormInput name="email" label="Adres email" type="email" className={styles.input} size="large" />
            <FormInput name="password" label="Hasło" type="password" className={styles.input} size="large" />

            <div className={styles.row}>
              <p className={styles.linkText}>
                Masz już konto?{" "}
                <Link to={LOGIN_PAGE.path} className={styles.linkSpan}>
                  Zaloguj się
                </Link>
              </p>

              <Button
                // disabled={submitting}
                type="submit"
                variant="contained"
                size="large"
                className={styles.submitButton}
              >
                Zarejestruj się
              </Button>
            </div>
          </div>
        </Form>
      </Formik>
    </FormStructure>
  );
};
