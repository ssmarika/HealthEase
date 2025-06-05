"use client";

import { loginValidationSchema } from "@/validation-schema/login.validation.schema";
import { Formik } from "formik";
import {
  TextField,
  Button,
  Typography,
  LinearProgress,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import $axios from "@/lib/axios/axios.instance";
import Loader from "./Loader";
import React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { openSuccessSnackbar } from "@/store/slice/snackbarSlice";

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseUpPassword = (event) => event.preventDefault();

  const { isPending, error, mutate } = useMutation({
    mutationKey: ["login-user"],
    mutationFn: async (values) => {
      return await $axios.post("/user/login", values);
    },
    onSuccess: (response) => {
      window.localStorage.setItem("token", response?.data?.accessToken);
      window.localStorage.setItem("firstName", response?.data?.user?.firstName);
      window.localStorage.setItem("userRole", response?.data?.user?.role);
      dispatch(openSuccessSnackbar("Login successful!"));
      router.push("/");
    },
    onError: (err) => {
      let msg = "Login failed. Please try again.";
      if (err?.response?.data?.message) {
        msg = err.response.data.message;
      }
      dispatch(openSuccessSnackbar(msg));
    },
  });
  if (isPending) {
    return <Loader />;
  }
  return (
    <div className="flex h-screen w-full">
      {/* Left Panel */}
      <div className="flex-1 bg-custom flex flex-col justify-center items-center text-white p-8">
        <h1 className="text-4xl font-bold">HealthEase</h1>
        <p className="mt-4 text-center text-lg">
          Access reliable lab tests, appointments, and health resources from the
          comfort of your home.
        </p>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex justify-center items-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg space-y-6">
          {isPending && <LinearProgress sx={{ backgroundColor: "#033069" }} />}
          <Typography variant="h4" className="text-center font-bold ">
            Sign In
          </Typography>

          {/* Form */}
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginValidationSchema}
            onSubmit={async (values) => {
              console.log(values);
              mutate(values);
            }}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    {...formik.getFieldProps("email")}
                    className="mt-1"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <Typography
                      color="error"
                      variant="body2"
                      className="mt-1 text-sm text-red-500"
                    >
                      {formik.errors.email}
                    </Typography>
                  )}
                </div>

                {/* Password Field */}

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

                {/* Submit Button */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: "#033069",
                    "&:hover": { backgroundColor: "#022050" },
                  }}
                >
                  Sign In
                </Button>
                <div className="flex justify-center">
                  <Link
                    href="/register"
                    className="text-md underline text-custom mt-4"
                  >
                    New user? Sign up
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

export default LoginPage;
