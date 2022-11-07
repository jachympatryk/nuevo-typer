import React from "react";
import { TextField } from "@mui/material";
import { useField } from "formik";

import { TextInputProps } from "./form-text-field.types";

export const FormTextField: React.FC<TextInputProps> = ({ name, type = "text", ...rest }) => {
  const [field, meta] = useField(name);
  const { error } = meta;

  return <TextField {...field} type={type} id={name} error={Boolean(error)} helperText={error} {...rest} />;
};
