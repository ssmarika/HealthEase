import * as yup from "yup";

export const labTestValidationSchema = yup.object({
  name: yup.string().required().max(100).trim(),
  description: yup.string().required().max(1000),
  price: yup.number().required().moreThan(0),
  available: yup.boolean(),
});
