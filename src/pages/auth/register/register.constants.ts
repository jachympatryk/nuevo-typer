import { string, object, SchemaOf } from "yup";

import { passwordValidation } from "utils";
import { RegisterData } from "./register.types";

export const registerInitialValues: RegisterData = {
  name: "",
  surname: "",
  email: "",
  password: "",
};

export const formValidationSchema: SchemaOf<RegisterData> = object().shape({
  name: string().min(2).required("Imię jest wymagane"),
  surname: string().min(2).required("Nazwisko jest wymagane"),
  email: string().email("Adres email jest nieprawidłowy").required("Adres email jest wymagany"),
  password: string()
    .test("password", "Hasło nie spełnia wszystkich wymagań", passwordValidation)
    .required("Hasło jest wymagane"),
});
