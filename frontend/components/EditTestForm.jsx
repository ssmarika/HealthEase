"use client";

import { labTestValidationSchema } from "@/validation-schema/add.test.schema";
import {
  Button,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import axios from "axios";
import { Formik } from "formik";
import React from "react";

const AddTest = () => {
  return (
    <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg mx-auto mt-8">
      <Typography variant="h4" className="text-center font-bold">
        Edit Test
      </Typography>
      <Formik
        initialValues={{
          name: "",
          description: "",
          inPersonPrice: "",
          homeServicePrice: "",
          available: false,
        }}
        validationSchema={labTestValidationSchema}
        onSubmit={async (values) => {
          try {
            const response = await axios.post(
              "http://localhost:8080/labtest/add",
              values,
              {
                headers: {
                  Authorization: `Bearer ${window.localStorage.getItem(
                    "token"
                  )}`,
                },
              }
            );
          } catch (error) {
            console.log("Error encountered");
          }
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
                      {...formik.getFieldProps("available")}
                      checked={formik.values.available} // Bind the checkbox with formik state
                    />
                  }
                  label="Available"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                color="success"
                variant="contained"
                fullWidth
                className="py-3 text-lg font-bold"
              >
                Add Test
              </Button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddTest;
