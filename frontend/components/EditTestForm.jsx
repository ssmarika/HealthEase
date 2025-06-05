"use client";

import $axios from "@/lib/axios/axios.instance";
import { labTestValidationSchema } from "@/validation-schema/add.test.schema";
import {
  Button,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Formik } from "formik";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import Loader from "./Loader";
import { useDispatch } from "react-redux";
import { openSuccessSnackbar } from "@/store/slice/snackbarSlice";

const EditTestForm = () => {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { isLoading, data } = useQuery({
    queryKey: ["test-detail"],
    queryFn: async () => {
      return await $axios.get(`/labtest/listbyid/${params.id}`);
    },
  });
  const test = data?.data?.labTest;

  const { isPending, mutate } = useMutation({
    mutationKey: ["update-test"],
    mutationFn: async (values) => {
      return await $axios.put(`/labtest/update/${params.id}`, values);
    },
    onSuccess: () => {
      dispatch(openSuccessSnackbar("Test edited successfully"));
      return router.push("/labtest");
    },
  });

  if (isLoading || isPending) {
    return <Loader />;
  }

  return (
    <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg mx-auto mt-16">
      <Typography variant="h4" className="text-center font-bold">
        Edit Test
      </Typography>
      <Formik
        initialValues={{
          name: test?.name || "",
          description: test?.description || "",
          price: test?.price || "",
          // homeServicePrice: test?.homeServicePrice || "",
          available: test?.available || false,
          // homeServiceAvailable: test?.homeServiceAvailable || false,
        }}
        enableReinitialize
        validationSchema={labTestValidationSchema}
        onSubmit={(values) => {
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

              {/*Price */}
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

              {/* Availability Checkbox */}
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...formik.getFieldProps("available")}
                      checked={formik.values.available} // Bind the checkbox with formik state
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
                  Edit Test
                </Button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default EditTestForm;
