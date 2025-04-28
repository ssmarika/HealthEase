"use client";

import { loginValidationSchema } from "@/validation-schema/login.validation.schema";
import { Formik } from "formik";
import { TextField, Button, Typography } from "@mui/material";

const LoginPage = () => {
  return (
    <div className="flex h-screen w-full">
      {/* Left Panel */}
      <div className="flex-1 bg-green-600 flex flex-col justify-center items-center text-white p-8">
        <h1 className="text-4xl font-bold">E-pharma</h1>
        <p className="mt-4 text-center text-lg">
          Create is simply your account text of printing and typesetting
          industry.
        </p>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex justify-center items-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <Typography variant="h4" className="text-center font-bold mb-4">
            Sign In
          </Typography>

          {/* Form */}
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginValidationSchema}
            onSubmit={(values) => {
              console.log(values);
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
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    {...formik.getFieldProps("password")}
                    className="mt-1"
                  />
                  {formik.touched.password && formik.errors.password && (
                    <Typography
                      color="error"
                      variant="body2"
                      className="mt-1 text-sm text-red-500"
                    >
                      {formik.errors.password}
                    </Typography>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="success"
                  className="py-3 text-lg bg-blue-600 hover:bg-blue-700"
                >
                  Sign In
                </Button>
              </form>
            )}
          </Formik>

          {/* Forgot Password */}
          <div className="text-center mt-4">
            <a
              href="/forgot-password"
              className="text-blue-600 hover:underline text-sm"
            >
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
