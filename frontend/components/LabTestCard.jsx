"use client";
import { Box, Typography } from "@mui/material";
import React from "react";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";

const LabTestCard = (props) => {
  console.log(props);
  return (
    <Box className="flex flex-col items-center rounded-lg shadow-lg w-sm h-96 border-2 border-blue-900 p-4 hover:scale-105 hover:shadow-xl transition-transform duration-300">
      <BloodtypeIcon sx={{ fontSize: "10rem", color: "#033069" }} />
      <Typography
        variant="h5"
        // className="font-blue-950 font-bold"
        sx={{ color: "#033069", fontWeight: "bold", textAlign: "center" }}
      >
        {props.name}
      </Typography>
      <Typography variant="h6" sx={{ color: "#033069" }}>
        Clinic Visit:{props.inPersonPrice}
      </Typography>
      <Typography variant="h6" sx={{ color: "#033069" }}>
        Home Service:{props.homeServicePrice}
      </Typography>
    </Box>
  );
};

export default LabTestCard;
