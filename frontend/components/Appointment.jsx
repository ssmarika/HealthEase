"use client";
import { Box, Typography } from "@mui/material";
import React from "react";
import AppointmentCard from "./AppointmentCard";

const AppointmentPage = ({ booking }) => {
  // Example booking details (replace with real data or props)
  const exampleBooking = {
    name: "John Doe",
    testName: "Blood Test",
    serviceType: "Clinic Visit",
    address: "123 Main Street, Springfield",
    note: "Please arrive 10 minutes early.",
    date: "May 10, 2025",
    time: "10:30 AM",
  };

  const bookingDetails = booking || exampleBooking; // Use passed booking details or fallback to example

  return (
    <div className="flex flex-col justify-between items-center h-screen w-full mt-18 p-8">
      <Typography variant="h4" sx={{ color: "#033069", fontWeight: "bold" }}>
        Appointment Details
      </Typography>
      <Box className="flex flex-col space-x-8">
        <AppointmentCard />
        <AppointmentCard />
      </Box>
    </div>
  );
};

export default AppointmentPage;
