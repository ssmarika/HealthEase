import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .required()
    .trim()
    .email()
    .max(55, "email must not be greater than 55 characters"),
  password: Yup.string()
    .required()
    .max(20, "Password cannot be greater than 20 characters"),
});
