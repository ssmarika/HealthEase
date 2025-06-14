"use client";

import $axios from "@/lib/axios/axios.instance";
import { Button, TextField, Typography, MenuItem } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Formik } from "formik";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { multipleBookingValidationSchema } from "@/validation-schema/multiple.booking.validation";

const MultipleBookingForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const { isLoading, data } = useQuery({
    queryKey: ["name-list"],
    queryFn: () => {
      return $axios.get("/labtest/list/name");
    },
  });

  const labTest = data?.data?.nameList;

  const { isPending, error, mutate } = useMutation({
    mutationKey: ["multiple-booking"],
    mutationFn: async (values) => {
      return await $axios.post("/booking/multiple", values, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
    },
    onSuccess: () => {
      //!when i use dispatch the router.push is not functioning
      // dispatch(openSuccessSnackbar("Test added successfully"));
      router.push("/labtest");
    },
  });
  return (
    <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg mx-auto mt-32">
      <Typography variant="h4" className="text-center font-bold">
        Book an Appointment
      </Typography>

      <Formik
        initialValues={{
          name: "",
          address: "",
          tests: [],
          date: "",
          time: "",
        }}
        validationSchema={multipleBookingValidationSchema}
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
                  name="name"
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
                  name="address"
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

              <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                name="tests"
                options={labTest}
                disableCloseOnSelect
                value={formik.values.tests}
                onChange={(_, value) => formik.setFieldValue("tests", value)}
                onBlur={formik.handleBlur}
                getOptionLabel={(option) => option.name}
                renderOption={(props, option, { selected }) => {
                  const { key, ...optionProps } = props;
                  return (
                    <li key={key} {...optionProps}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.name}
                    </li>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Lab Tests"
                    placeholder="Tests"
                    name="tests"
                    error={formik.touched.tests && Boolean(formik.errors.tests)}
                    helperText={formik.touched.tests && formik.errors.tests}
                  />
                )}
              />

              <div>
                <TextField
                  fullWidth
                  type="date"
                  label="Date"
                  InputLabelProps={{ shrink: true }}
                  {...formik.getFieldProps("date")}
                  name="date"
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
                  name="time"
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

export default MultipleBookingForm;
