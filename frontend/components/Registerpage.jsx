"use client";

import { registerValidationSchema } from "@/validation-schema/register.validation.schema";
import { Formik } from "formik";
import {
  TextField,
  Button,
  Typography,
  MenuItem,
  LinearProgress,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  FormControl,
} from "@mui/material";
import { genders, roles } from "@/constants/general.constant.js";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import $axios from "@/lib/axios/axios.instance";
import React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "next/link";

const RegisterPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseUpPassword = (event) => event.preventDefault();

  const { isPending, error, mutate } = useMutation({
    mutationKey: ["register-user"],
    mutationFn: async (values) => await $axios.post("/user/register", values),
    onSuccess: () => router.push("/login"),
  });

  if (isPending) return <LinearProgress sx={{ backgroundColor: "#033069" }} />;

  return (
    <div className="flex h-screen w-full">
      {/* Left Panel */}
      <div className="flex-1 bg-custom flex flex-col justify-center items-center text-white p-10">
        <h1 className="text-4xl font-bold">HealthEase</h1>
        <p className="mt-4 text-lg text-center">
          Create your account and join our platform today!
          <br /> Access reliable lab tests, appointments, and health resources
          from the comfort of your home.
        </p>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex justify-center items-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg space-y-6">
          <Typography
            variant="h4"
            className="text-center font-semibold text-gray-700"
          >
            Register
          </Typography>

          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              gender: "",
              role: "",
            }}
            validationSchema={registerValidationSchema}
            onSubmit={(values) => mutate(values)}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit} className="space-y-5">
                {/* First Name */}
                <div>
                  <TextField
                    fullWidth
                    label="First Name"
                    variant="outlined"
                    {...formik.getFieldProps("firstName")}
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <Typography variant="body2" color="error" className="mt-1">
                      {formik.errors.firstName}
                    </Typography>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <TextField
                    fullWidth
                    label="Last Name"
                    variant="outlined"
                    {...formik.getFieldProps("lastName")}
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <Typography variant="body2" color="error" className="mt-1">
                      {formik.errors.lastName}
                    </Typography>
                  )}
                </div>

                {/* Email */}
                <div>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    {...formik.getFieldProps("email")}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <Typography variant="body2" color="error" className="mt-1">
                      {formik.errors.email}
                    </Typography>
                  )}
                </div>

                {/* Password */}
                <div>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      {...formik.getFieldProps("password")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                    {formik.touched.password && formik.errors.password && (
                      <FormHelperText error>
                        {formik.errors.password}
                      </FormHelperText>
                    )}
                  </FormControl>
                </div>

                {/* Gender */}
                <div>
                  <TextField
                    fullWidth
                    select
                    label="Gender"
                    variant="outlined"
                    name="gender"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    {genders.map((item) => (
                      <MenuItem
                        key={item.id}
                        value={item.gender}
                        sx={{ textTransform: "capitalize" }}
                      >
                        {item.gender}
                      </MenuItem>
                    ))}
                  </TextField>
                  {formik.touched.gender && formik.errors.gender && (
                    <Typography variant="body2" color="error" className="mt-1">
                      {formik.errors.gender}
                    </Typography>
                  )}
                </div>

                {/* Role */}
                <div>
                  <TextField
                    fullWidth
                    select
                    label="Role"
                    variant="outlined"
                    name="role"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    {roles.map((item) => (
                      <MenuItem
                        key={item.id}
                        value={item.role}
                        sx={{ textTransform: "capitalize" }}
                      >
                        {item.role}
                      </MenuItem>
                    ))}
                  </TextField>
                  {formik.touched.role && formik.errors.role && (
                    <Typography variant="body2" color="error" className="mt-1">
                      {formik.errors.role}
                    </Typography>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    py: 1.5,
                    backgroundColor: "#033069",
                    "&:hover": { backgroundColor: "#022050" },
                  }}
                >
                  Register
                </Button>
                <div className="flex justify-center">
                  <Link
                    href="/login"
                    className="text-md underline text-custom mt-4"
                  >
                    Already registered? Login
                  </Link>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
