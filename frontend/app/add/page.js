import AddTest from "@/components/AddTestForm";
import { Typography } from "@mui/material";
import React from "react";

const page = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <Typography
        variant="h4"
        className="mb-6 font-serif font-bold"
      ></Typography>
      <AddTest />
    </div>
  );
};

export default page;
