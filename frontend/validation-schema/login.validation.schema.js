import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .trim()
    .required("Required")
    .max(55)
    .lowercase(),
  password: Yup.string().required().max(20),
});
