"use client";

import { serviceType } from "@/constants/general.constant";
import $axios from "@/lib/axios/axios.instance";
import { bookingValidationSchema } from "@/validation-schema/booking.validation";
import {
  Button,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  LinearProgress,
  MenuItem,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Formik } from "formik";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const BookingForm = () => {
  const params = useParams();

  const { isPending, data } = useQuery({
    queryKey: ["test-info-id"],
    queryFn: async () => {
      return await $axios.get(`/labtest/listbyid/${params.id}`);
    },
  });

  const test = data?.data?.labTest;
  console.log(test);

  return (
    <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg mx-auto mt-32">
      <Typography variant="h4" className="text-center font-bold">
        Book an Appointment
      </Typography>
      <Typography
        variant="h5"
        className="text-center text-red-900 mt-2 font-bold"
      >
        Test: {test?.name || "Loading..."}
      </Typography>
      <Formik
        initialValues={{ name: "", address: "", serviceType: "", note: "" }}
        validationSchema={bookingValidationSchema}
        onSubmit={(values) => {
          console.log(values);
          //   mutate(values);
        }}
      >
        {(formik) => {
          return (
            <form onSubmit={formik.handleSubmit} className="space-y-4 mt-4">
              <div>
                <TextField
                  fullWidth
                  label="Name"
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name && (
                  <Typography
                    color="error"
                    variant="body2"
                    className="mt-1 text-sm text-red-500"
                  >
                    {formik.errors.name}
                  </Typography>
                )}
              </div>

              <div>
                <TextField
                  fullWidth
                  label="Address"
                  {...formik.getFieldProps("address")}
                />
                {formik.touched.address && formik.errors.address && (
                  <Typography
                    color="error"
                    variant="body2"
                    className="mt-1 text-sm text-red-500"
                  >
                    {formik.errors.address}
                  </Typography>
                )}
              </div>

              <div>
                <TextField
                  fullWidth
                  select
                  label="Service Type"
                  variant="outlined"
                  value={formik.values.serviceType}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="serviceType"
                >
                  {serviceType.map((item) => (
                    <MenuItem
                      key={item.id}
                      value={item.serviceType}
                      sx={{ textTransform: "capitalize" }}
                      disabled={
                        (item.serviceType === "clinic visit" &&
                          !test?.inPersonAvailable) ||
                        (item.serviceType === "home service" &&
                          !test?.homeServiceAvailable)
                      } // Disable unavailable service
                    >
                      {item.serviceType}
                    </MenuItem>
                  ))}
                </TextField>
                {formik.touched.serviceType && formik.errors.serviceType && (
                  <Typography
                    color="error"
                    variant="body2"
                    className="mt-1 text-sm text-red-500"
                  >
                    {formik.errors.serviceType}
                  </Typography>
                )}
              </div>

              <div>
                <TextField
                  fullWidth
                  label="Note"
                  {...formik.getFieldProps("note")}
                />
                {formik.touched.note && formik.errors.note && (
                  <Typography
                    color="error"
                    variant="body2"
                    className="mt-1 text-sm text-red-500"
                  >
                    {formik.errors.note}
                  </Typography>
                )}
              </div>
              <div className="flex justify-center">
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    alignContent: "center",
                    backgroundColor: "#033069",
                    "&:hover": { backgroundColor: "#022050" },
                  }}
                >
                  Book an Appointment
                </Button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default BookingForm;
