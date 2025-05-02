"use client";
import { Box, Typography } from "@mui/material";
import React from "react";

const AppointmentCard = () => {
  return (
    <Box
      className="flex flex-col rounded-lg shadow-lg border-2 border-blue-900"
      sx={{
        backgroundColor: "#f9f9f9",
        width: "600px",
        padding: "24px",
        marginTop: "24px",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: "#033069",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "16px",
        }}
      >
        TestNAme
      </Typography>

      <Box className="flex justify-between mb-3">
        <Typography variant="body1" sx={{ color: "#033069" }}>
          <strong>Patient Name:</strong> Ram
        </Typography>
        <Typography variant="body1" sx={{ color: "#033069" }}>
          <strong>Date:</strong> 2021
        </Typography>
      </Box>

      <Box className="flex justify-between mb-3">
        <Typography variant="body1" sx={{ color: "#033069" }}>
          <strong>Service Type:</strong> Home Service
        </Typography>
        <Typography variant="body1" sx={{ color: "#033069" }}>
          <strong>Time:</strong> 12:30
        </Typography>
      </Box>

      <Typography
        variant="body1"
        sx={{
          color: "#033069",
          textAlign: "left",
          marginBottom: "16px",
        }}
      >
        <strong>Address:</strong> Rampur
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "#555",
          textAlign: "left",
        }}
      >
        noteee
      </Typography>
    </Box>
  );
};

export default AppointmentCard;
