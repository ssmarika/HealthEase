"use client";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import { isAdmin, isClient } from "@/utils/role.check";
import { useRouter } from "next/navigation";

const LabTestCard = (props) => {
  const testId = props._id;
  const router = useRouter();
  console.log(props);

  return (
    <Box className="flex flex-col justify-between items-center rounded-lg shadow-lg w-sm h-96 border-2 border-blue-900 p-4 hover:scale-105 hover:shadow-xl transition-transform duration-300">
      {/* Icon and Title */}
      <Box className="flex flex-col items-center">
        <BloodtypeIcon sx={{ fontSize: "10rem", color: "#033069" }} />
        <Typography
          variant="h5"
          sx={{ color: "#033069", fontWeight: "bold", textAlign: "center" }}
        >
          {props.name}
        </Typography>
      </Box>

      {/* Prices and Availability */}
      <Box className="w-full mt-4 flex flex-col items-center space-y-2">
        <Typography variant="h6" className="text-blue-900">
          Clinic Visit: Rs.{props.inPersonPrice}{" "}
          {props.inPersonAvailable ? "✔️" : "❌"}
        </Typography>
        <Typography variant="h6" className="text-blue-900">
          Home Service: Rs.{props.homeServicePrice}{" "}
          {props.homeServiceAvailable ? "✔️" : "❌"}
        </Typography>
      </Box>

      {/* Buttons Section */}
      <Box className="mt-auto flex flex-wrap justify-center gap-4">
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#033069",
            "&:hover": { backgroundColor: "#022050" },
          }}
        >
          View more
        </Button>
        {isAdmin() && (
          <>
            <Button
              variant="contained"
              onClick={() => {
                router.push(`/edit/${testId}`);
              }}
              sx={{
                backgroundColor: "#033069",
                "&:hover": { backgroundColor: "#022050" },
              }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#033069",
                "&:hover": { backgroundColor: "#022050" },
              }}
            >
              Delete
            </Button>
          </>
        )}
        {isClient() && (
          <Button
            variant="contained"
            onClick={() => {
              router.push(`/booking/${testId}`);
            }}
            sx={{
              backgroundColor: "#033069",
              "&:hover": { backgroundColor: "#022050" },
            }}
          >
            Book an appointment
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default LabTestCard;
