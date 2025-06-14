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
import { useMutation, useQuery } from "@tanstack/react-query";
import { Formik } from "formik";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import Loader from "./Loader";
import { useDispatch } from "react-redux";
import { openSuccessSnackbar } from "@/store/slice/snackbarSlice";

const BookingForm = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const router = useRouter();

  const { isPending, data } = useQuery({
    queryKey: ["test-info-id"],
    queryFn: async () => {
      return await $axios.get(`/labtest/listbyid/${params.id}`);
    },
  });

  const { isLoading, error, mutate } = useMutation({
    mutationKey: ["make-booking"],
    mutationFn: async (values) => {
      return await $axios.post(`/booking/post/${params.id}`, values, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
    },
    onSuccess: () => {
      dispatch(openSuccessSnackbar("Appointment booked"));
      router.push("/appointment/list");
    },
  });

  const test = data?.data?.labTest;
  console.log(test);

  if (isLoading || isPending) {
    return <Loader />;
  }

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
        initialValues={{
          name: "",
          address: "",
          date: "",
          time: "",
        }}
        validationSchema={bookingValidationSchema}
        onSubmit={(values) => {
          console.log(values);
          mutate(values);
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
                  type="date"
                  label="Date"
                  InputLabelProps={{ shrink: true }}
                  {...formik.getFieldProps("date")}
                />
                {formik.touched.date && formik.errors.date && (
                  <Typography color="error" variant="body2">
                    {formik.errors.date}
                  </Typography>
                )}
              </div>

              <div>
                <TextField
                  fullWidth
                  type="time"
                  label="Time"
                  InputLabelProps={{ shrink: true }}
                  {...formik.getFieldProps("time")}
                />
                {formik.touched.time && formik.errors.time && (
                  <Typography color="error" variant="body2">
                    {formik.errors.time}
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
