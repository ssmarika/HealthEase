"use client";
import $axios from "@/lib/axios/axios.instance";
import {
  Button,
  TextField,
  Typography,
  Box,
  Card,
  CardContent,
} from "@mui/material";
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
      dispatch(openSuccessSnackbar("Report uploaded successfully!"));
      router.push("/report");
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
      px={2}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 450,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            fontWeight="bold"
            textAlign="center"
            mb={2}
            color="primary"
          >
            Upload Report
          </Typography>
          <Formik
            initialValues={{ title: "", file: null }}
            onSubmit={async (values, { resetForm }) => {
              const formData = new FormData();
              formData.append("title", values.title);
              formData.append("file", values.file);
              formData.append("bookingId", params.id); // Add booking ID to FormData
              mutate(formData, {
                onSuccess: () => {
                  resetForm();
                },
              });
            }}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit}>
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
                  sx={{
                    mt: 2,
                    mb: 2,
                    textAlign: "left",
                    justifyContent: "flex-start",
                  }}
                >
                  {formik.values.file
                    ? formik.values.file.name
                    : "Select PDF File"}
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
                  fullWidth
                  sx={{
                    alignContent: "center",
                    backgroundColor: "#033069",
                    "&:hover": { backgroundColor: "#022050" },
                  }}
                  disabled={
                    !formik.values.title || !formik.values.file || isPending
                  }
                >
                  Submit
                </Button>
                {error && (
                  <Typography color="error" mt={2} textAlign="center">
                    Upload failed. Please try again.
                  </Typography>
                )}
              </form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UploadDoc;
