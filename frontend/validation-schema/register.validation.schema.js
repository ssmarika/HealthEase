import * as Yup from "yup";

export const registerValidationSchema = Yup.object({
  email: Yup.string().required().trim().max(55).lowercase().email(),
  password: Yup.string().required().trim(),
  firstName: Yup.string().required().trim().max(30),
  lastName: Yup.string().required().trim().max(30),
  gender: Yup.string().required().oneOf(["male", "female", "other"]),
  role: Yup.string().required().oneOf(["admin", "client"]),
});
