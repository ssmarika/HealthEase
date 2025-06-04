import yup from "yup";

export const labTestValidationSchema = yup.object({
  name: yup.string().required().max(100).trim(),
  description: yup.string().required().max(1000),
  // inPersonPrice: yup.number().required().moreThan(0),
  price: yup.number().required().moreThan(0),
  available: yup.boolean().default(true),
  // homeServiceAvailable: yup.boolean().default(true),
});

export const paginationData = yup.object({
  page: yup.number().min(1).integer().default(1),
  limit: yup.number().min(1).integer().default(3),
  searchText: yup.string().trim().notRequired(),
});
