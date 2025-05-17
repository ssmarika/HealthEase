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
import axios from "axios";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";

const AddTest = () => {
  const router = useRouter();
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
      router.push("/");
    },
  });
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
          inPersonPrice: "",
          homeServicePrice: "",
          inPersonAvailable: false,
          homeServiceAvailable: false, // Changed to boolean for checkbox
          // Changed to boolean for checkbox
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

              {/* In-Person Service Price */}
              <div>
                <TextField
                  fullWidth
                  label="In-Person Price"
                  {...formik.getFieldProps("inPersonPrice")}
                />
                {formik.touched.inPersonPrice &&
                  formik.errors.inPersonPrice && (
                    <Typography
                      color="error"
                      variant="body2"
                      className="mt-1 text-sm text-red-500"
                    >
                      {formik.errors.inPersonPrice}
                    </Typography>
                  )}
              </div>

              {/* Home Service Price */}
              <div>
                <TextField
                  fullWidth
                  label="Home Service Price"
                  {...formik.getFieldProps("homeServicePrice")}
                />
                {formik.touched.homeServicePrice &&
                  formik.errors.homeServicePrice && (
                    <Typography
                      color="error"
                      variant="body2"
                      className="mt-1 text-sm text-red-500"
                    >
                      {formik.errors.homeServicePrice}
                    </Typography>
                  )}
              </div>

              {/* Availability Checkbox */}
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...formik.getFieldProps("inPersonAvailable")}
                      checked={formik.values.inPersonAvailable} // Bind the checkbox with formik state
                    />
                  }
                  label="Clinic Visit Available"
                />
              </div>

              {/* Availability Checkbox */}
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...formik.getFieldProps("homeServiceAvailable")}
                      checked={formik.values.homeServiceAvailable} // Bind the checkbox with formik state
                    />
                  }
                  label="Home Service Available"
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
