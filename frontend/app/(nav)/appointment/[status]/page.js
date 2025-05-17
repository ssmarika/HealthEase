import AppointmentStatusPage from "@/components/AppointmentStatusPage";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Appointment = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <AppointmentStatusPage />
    </div>
  );
};

export default Appointment;
