import { registerValidationSchema } from "@/validation-schema/register.validation.schema";
import { Formik } from "formik";
import React from "react";

const register = () => {
  return (
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
      onSubmit={(values)=>{
        console.log(values)

      }}
    ></Formik>
  );
};

export default register;
