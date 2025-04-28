"use client";

import { registerValidationSchema } from "@/validation-schema/register.validation.schema";
import { Formik } from "formik";
import { TextField, Button, Typography, MenuItem } from "@mui/material";
import { genders, roles } from "@/constants/general.constant.js";

const Register = () => {
  return (
    <div className="flex h-screen w-full">
      {/* Left Panel */}
      <div className="flex-1 bg-green-600 flex flex-col justify-center items-center text-white p-8">
        <h1 className="text-4xl font-bold">Logo</h1>
        <p className="mt-4 text-center text-lg">
          Create your account and join our platform today!
        </p>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex justify-center items-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <Typography
            variant="h4"
            className="text-center font-bold text-gray-700 mb-6"
          >
            Register
          </Typography>

          {/* Form */}
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
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                {/* First Name Field */}
                <div>
                  <TextField
                    fullWidth
                    label="First Name"
                    variant="outlined"
                    {...formik.getFieldProps("firstName")}
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <Typography
                      color="error"
                      variant="body2"
                      className="mt-1 text-sm text-red-500"
                    >
                      {formik.errors.firstName}
                    </Typography>
                  )}
                </div>

                {/* Last Name Field */}
                <div>
                  <TextField
                    fullWidth
                    label="Last Name"
                    variant="outlined"
                    {...formik.getFieldProps("lastName")}
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <Typography
                      color="error"
                      variant="body2"
                      className="mt-1 text-sm text-red-500"
                    >
                      {formik.errors.lastName}
                    </Typography>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    {...formik.getFieldProps("email")}
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

                {/* Gender Field */}
                <div>
                  <TextField
                    fullWidth
                    select
                    label="Gender"
                    variant="outlined"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="gender"
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
                    <Typography
                      color="error"
                      variant="body2"
                      className="mt-1 text-sm text-red-500"
                    >
                      {formik.errors.gender}
                    </Typography>
                  )}
                </div>

                {/* Role Field */}
                <div>
                  <TextField
                    fullWidth
                    select
                    label="Role"
                    variant="outlined"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="role"
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
                    <Typography
                      color="error"
                      variant="body2"
                      className="mt-1 text-sm text-red-500"
                    >
                      {formik.errors.role}
                    </Typography>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="success"
                  className="py-3 text-lg bg-green-600 hover:bg-green-700"
                >
                  Register
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
