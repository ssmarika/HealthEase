import AppointmentPage from "@/components/Appointment";
import AppointmentPage1 from "@/components/Appointment1";
import BasicTable from "@/components/AppointmentTable";
import { TableContainer } from "@mui/material";
import React from "react";

const Appointment = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <AppointmentPage1 />
      {/* <BasicTable /> */}
    </div>
  );
};

export default Appointment;
