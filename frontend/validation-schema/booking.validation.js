import * as yup from "yup";

export const bookingValidationSchema = yup.object({
  name: yup.string().required().trim().max(30),
  address: yup.string().required().trim().max(200),
  serviceType: yup.string().required().oneOf(["clinic visit", "home service"]),
  // note: yup.string().max(300),
  date: yup.date().required(),
  time: yup.string().required(),
});
