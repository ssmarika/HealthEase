"use client";
import { bookingStatus } from "@/constants/general.constant";
import $axios from "@/lib/axios/axios.instance";
import { isAdmin, isClient } from "@/utils/role.check";
import { CloudDone } from "@mui/icons-material";
import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

const AppointmentCard = (props) => {
  const queryClient = useQueryClient();

  const [status, setStatus] = useState(props.status || "Pending");

  const { isPending, error, mutate } = useMutation({
    mutationKey: ["delete-appointment"],
    mutationFn: async () => {
      return await $axios.delete(`booking/delete/${props._id}`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.refetchQueries("client-list");
    },
  });

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    mutate(newStatus);
  };

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
        {props.testName}
      </Typography>

      <Box className="flex justify-between mb-3">
        <Typography variant="body1" sx={{ color: "#033069" }}>
          <strong>Patient Name:</strong> {props.name}
        </Typography>
        <Typography variant="body1" sx={{ color: "#033069" }}>
          <strong>Date:</strong> {props.date}
        </Typography>
      </Box>

      <Box className="flex justify-between mb-3">
        <Typography variant="body1" sx={{ color: "#033069" }}>
          <strong>Service Type:</strong> {props.serviceType}
        </Typography>
        <Typography variant="body1" sx={{ color: "#033069" }}>
          <strong>Time:</strong> {props.time}
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
        <strong>Address:</strong> {props.address}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "#555",
          textAlign: "left",
        }}
      >
        {props.note}
      </Typography>

      {isClient() && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              mutate();
            }}
          >
            Delete
          </Button>
        </Box>
      )}

      {isAdmin() && (
        <Box sx={{ display: "flex", flexDirection: "column", marginTop: 2 }}>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            <strong>Update Status:</strong>
          </Typography>
          <Select
            value={status}
            onChange={handleStatusChange}
            sx={{
              width: "100%",
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: "4px",
              "& .MuiSelect-select": {
                padding: "8px",
              },
            }}
          >
            {bookingStatus.map((item) => (
              <MenuItem
                key={item.id}
                value={item.role}
                sx={{ textTransform: "capitalize" }}
              >
                {item.status}
              </MenuItem>
            ))}
          </Select>
        </Box>
      )}
    </Box>
  );
};

export default AppointmentCard;
