"use client";
import React from "react";
import {
  Box,
  Typography,
  Chip,
  Button,
  CircularProgress,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { isAdmin, isClient } from "@/utils/role.check";
import DeleteTestDialog from "./DeleteDialogueBox";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import $axios from "@/lib/axios/axios.instance";

const LabTestDetail = () => {
  const params = useParams();
  const testId = params.id;
  const router = useRouter();

  const { isPending, data } = useQuery({
    queryKey: ["test-detail-id", testId],
    queryFn: async () => {
      return await $axios.get(`/labtest/listbyid/${testId}`);
    },
  });

  const test = data?.data?.labTest;

  if (isPending) {
    return (
      <Box className="flex justify-center items-center min-h-[300px]">
        <CircularProgress />
      </Box>
    );
  }

  if (!test) {
    return (
      <Box className="flex justify-center items-center min-h-[300px]">
        <Typography variant="h6" color="error">
          Lab Test not found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="flex flex-col items-center bg-white rounded-xl shadow-lg border-2 border-blue-900 p-8 w-full max-w-xl mx-auto hover:shadow-2xl transition-shadow duration-300">
      <Typography
        variant="h4"
        sx={{
          color: "#033069",
          fontWeight: "bold",
        }}
      >
        {test.name}
      </Typography>

      <Typography
        variant="body1"
        className="mb-6 text-gray-700"
        sx={{ textAlign: "center", fontSize: 18 }}
        gutterBottom
      >
        {test.description}
      </Typography>

      <Box className="w-full flex flex-col md:flex-row items-center justify-center gap-8 mb-4">
        

        <Box className="flex flex-col items-center">
          <HomeIcon
            sx={{
              color: test.available ? "#033069" : "#bdbdbd",
              fontSize: 35,
              mb: 1,
            }}
          />
          <Typography
            variant="subtitle1"
            sx={{
              color: test.available ? "#033069" : "#bdbdbd",
              fontWeight: 600,
            }}
          >
            Home Service
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            Rs. {test.price}
          </Typography>
          <Chip
            label={test.available ? "Available" : "Not Available"}
            color={test.available ? "success" : "default"}
            size="small"
            sx={{ mt: 1 }}
          />
        </Box>
      </Box>

      <Box className="mt-auto flex flex-wrap justify-center gap-4">
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

            <DeleteTestDialog testId={testId} />
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

export default LabTestDetail;
