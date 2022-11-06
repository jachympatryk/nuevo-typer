import { object, string, SchemaOf } from "yup";

import { LoginData } from "./login.types";

export const initialLoginValues: LoginData = {
  email: "",
  password: "",
};

export const loginSchema: SchemaOf<LoginData> = object().shape({
  email: string().email("Adres email jest niepoprawny").required("Adres email jest wymagany"),
  password: string().required("Hasło jest wymagane"),
});
