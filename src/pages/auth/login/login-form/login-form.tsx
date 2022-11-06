import React from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { useSnackbar } from "notistack";
// import { useSubmit } from "@better-typed/react-hyper-fetch";
import { Button, FormInput } from "react-modern-components";

// import { setToken } from "store";
import { loginSchema, initialLoginValues } from "../login.constants";
import { LoginData } from "../login.types";
// import { STORAGE_FIELDS } from "constants/storage-fields.constants";
import { REGISTER_PAGE } from "constants/routes.constants";

import { ReactComponent as GoogleLogo } from "assets/icons/google-logo.svg";

import styles from "../../auth.module.scss";

export const LoginForm: React.FC = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const { enqueueSnackbar } = useSnackbar();

  // const { submit, submitting, error, onSubmitSuccess, onSubmitError } = useSubmit(login);
  // onSubmitSuccess(({ response }) => {
  // dispatch(setToken(response.token));
  // localStorage.setItem(STORAGE_FIELDS.token, response.token);
  // localStorage.setItem(STORAGE_FIELDS.refresh_token, response.refreshToken);
  //
  // navigate(SELECT_COMPANY_PAGE.path);
  // });
  // onSubmitError(() => {
  // enqueueSnackbar(t("login.loginError"), { variant: "error" });
  // });

  const handleSubmit = async (values: LoginData, { setSubmitting }: FormikHelpers<LoginData>) => {
    // await submit({ data: values });
    setSubmitting(false);
  };

  return (
    <Formik initialValues={initialLoginValues} onSubmit={handleSubmit} validationSchema={loginSchema}>
      <Form className={styles.form}>
        {/* {error && <Alert severity="error">{error?.message}</Alert>} */}
        <FormInput name="email" label="Email" size="large" />
        <FormInput name="password" label="Hasło" type="password" size="large" />
        <p className={styles.linkText}>
          Zapomniałeś hasła?{" "}
          <Link to="/" className={styles.linkSpan}>
            Przypomnij
          </Link>
        </p>

        <div className={styles.row}>
          <p className={styles.linkText}>
            Nie masz konta?{" "}
            <Link to={REGISTER_PAGE.path} className={styles.linkSpan}>
              Zarejestruj się!
            </Link>
          </p>

          <div className={styles.buttonRow}>
            <Button type="submit" variant="outlined" className={styles.submitButton} size="large">
              <GoogleLogo />
            </Button>

            <Button disabled={false} type="submit" variant="contained" size="large" className={styles.submitButton}>
              Zaloguj się
            </Button>
          </div>
        </div>
      </Form>
    </Formik>
  );
};
