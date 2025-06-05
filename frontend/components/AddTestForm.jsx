"use client";

import $axios from "@/lib/axios/axios.instance";
import { labTestValidationSchema } from "@/validation-schema/add.test.schema";
import {
  Button,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  LinearProgress,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import Loader from "./Loader";
import { useDispatch } from "react-redux";
import { openSuccessSnackbar } from "@/store/slice/snackbarSlice";

const AddTest = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isPending, error, mutate } = useMutation({
    mutationKey: ["add-test"],
    mutationFn: async (values) => {
      return await $axios.post("/labtest/add", values, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
    },
    onSuccess: () => {
      dispatch(openSuccessSnackbar("Test added successfully"));

      router.push("/labtest");
    },
  });
  if (isPending) {
    return <Loader />;
  }
  return (
    <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg mx-auto mt-32">
      {isPending && <LinearProgress />}
      <Typography variant="h4" className="text-center font-bold">
        Add Test
      </Typography>
      <Formik
        initialValues={{
          name: "",
          description: "",
          price: "",
          available: false,
        }}
        validationSchema={labTestValidationSchema}
        onSubmit={(values) => {
          console.log(values);
          mutate(values);
        }}
      >
        {(formik) => {
          return (
            <form onSubmit={formik.handleSubmit} className="space-y-4 mt-4">
              {/* Test Name */}
              <div>
                <TextField
                  fullWidth
                  label="Test Name"
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
              {/* Description */}
              <div>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={3}
                  {...formik.getFieldProps("description")}
                />
                {formik.touched.description && formik.errors.description && (
                  <Typography
                    color="error"
                    variant="body2"
                    className="mt-1 text-sm text-red-500"
                  >
                    {formik.errors.description}
                  </Typography>
                )}
              </div>
               {/* Price */}
              <div>
                <TextField
                  fullWidth
                  label="Price"
                  {...formik.getFieldProps("price")}
                />
                {formik.touched.price && formik.errors.price && (
                  <Typography
                    color="error"
                    variant="body2"
                    className="mt-1 text-sm text-red-500"
                  >
                    {formik.errors.price}
                  </Typography>
                )}
              </div>
              {/* Available */}
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...formik.getFieldProps("available")}
                      checked={formik.values.available} 
                    />
                  }
                  label="Service Available"
                />
              </div>
              <div className="flex justify-center">
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{
                    alignContent: "center",
                    backgroundColor: "#033069",
                    "&:hover": { backgroundColor: "#022050" },
                  }}
                >
                  Add Test
                </Button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddTest;
