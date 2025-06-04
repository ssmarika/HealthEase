import yup from "yup";

export const bookingValidationSchema = yup.object({
  name: yup.string().required().trim().max(30),
  address: yup.string().required().trim().max(200),
  date: yup.date().required(),
  time: yup.string().required(),
});
