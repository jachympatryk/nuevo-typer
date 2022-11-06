import { TestContext } from "yup";

export const passwordValidation = (value: string | undefined, testContext: TestContext) => {
  const password = value || "";

  const minLength = 6;
  const isRequiredLength = password.length >= minLength;
  if (!isRequiredLength) {
    return testContext.createError({ message: "Hasło powinno zawierać przynajmniej 6 znaków." });
  }
  const hasLowerCase = password.match(/[a-z]+/);
  const hasUpperCase = password.match(/[A-Z]+/);
  if (!hasLowerCase || !hasUpperCase) {
    return testContext.createError({
      message: "Hasło powinno zawierać małą oraz przynajmniej jedną wielką literę.",
    });
  }
  const hasNumber = password.match(/[0-9]+/);
  if (!hasNumber) {
    return testContext.createError({
      message: "Hasło powinno mieć przynajmniej jeden znak numeryczny.",
    });
  }
  const hasSpecialCharacter = password.match(/[_\W]+/);
  if (!hasSpecialCharacter) {
    return testContext.createError({
      message: "Hasło powinno mieć przynajmniej jeden znak specjalny.",
    });
  }
  return true;
};
