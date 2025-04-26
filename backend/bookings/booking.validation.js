import yup from "yup";

export const bookingValidationSchema = yup.object({
  testId: yup.string().required(),
  serviceType: yup.string().required().oneOf(["in person", "home service"]),
});
