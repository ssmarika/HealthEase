import * as yup from "yup";

export const multipleBookingValidationSchema = yup.object({
  name: yup.string().required().trim().max(30),
  address: yup.string().required().trim().max(200),
  tests: yup.array(),
  date: yup.date().required(),
  time: yup.string().required(),
});
