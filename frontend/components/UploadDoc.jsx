"use client";
import $axios from "@/lib/axios/axios.instance";
import { Button, TextField, Typography, Box } from "@mui/material";
import React from "react";
import { Formik } from "formik";
import { useMutation } from "@tanstack/react-query";
import Loader from "./Loader";
import { useDispatch } from "react-redux";
import { openSuccessSnackbar } from "@/store/slice/snackbarSlice";
import { useParams, useRouter } from "next/navigation";

const UploadDoc = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();

  const { isPending, error, mutate } = useMutation({
    mutationKey: ["upload-doc"],
    mutationFn: async (formData) => {
      return await $axios.post("/report/upload", formData);
    },
    onSuccess: () => {
      //   dispatch(openSuccessSnackbar("Report uploaded successfully!"));
      //   router.push("/report");
    },
  });

  if (isPending) return <Loader />;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="70vh"
      bgcolor="#f5f7fa"
      gap={2}
    >
      <Typography variant="h5" fontWeight="bold" textAlign="center" mb={1}>
        Upload Report
      </Typography>
      <Formik
        initialValues={{ title: "", file: null }}
        onSubmit={async (values, { resetForm }) => {
          const formData = new FormData();
          formData.append("title", values.title);
          formData.append("file", values.file);
          formData.append("bookingId", params.id); // Add booking id to FormData
          mutate(formData, {
            onSuccess: () => {
              resetForm();
            },
          });
        }}
      >
        {(formik) => (
          <form
            onSubmit={formik.handleSubmit}
            style={{ width: "100%", maxWidth: 400 }}
          >
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ mt: 2, mb: 2, textAlign: "left" }}
            >
              {formik.values.file ? formik.values.file.name : "Select PDF File"}
              <input
                type="file"
                accept="application/pdf"
                hidden
                onChange={(e) =>
                  formik.setFieldValue("file", e.target.files[0])
                }
              />
            </Button>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              fullWidth
              disabled={
                !formik.values.title || !formik.values.file || isPending
              }
              sx={{ mt: 1 }}
            >
              Submit
            </Button>
            {error && (
              <Typography color="error" mt={1}>
                Upload failed. Please try again.
              </Typography>
            )}
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default UploadDoc;
