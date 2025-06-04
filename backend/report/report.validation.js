import yup from "yup";

export const reportValidationSchema = yup.object({
  title: yup.string().required().trim().max(30),
  pdf: yup.string().required(),
});
