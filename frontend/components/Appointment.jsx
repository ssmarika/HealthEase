"use client";
import {
  Box,
  Button,
  MenuItem,
  Pagination,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import $axios from "@/lib/axios/axios.instance";
import { isAdmin, isClient } from "@/utils/role.check";

import AppointmentTable from "./AppointmentTable";
import FixedBottomNavigation from "./BottomNav";

const AppointmentPage = () => {
  const [page, setPage] = useState(1);

  const { isLoading: clientPending, data: clientData } = useQuery({
    queryKey: ["client-list", page],
    queryFn: async () => {
      return await $axios.post(
        "booking/clientlist",
        { page, limit: 8 },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
    },
    enabled: isClient(),
  });

  const { isLoading: adminPending, data: adminData } = useQuery({
    queryKey: ["admin-list", page],
    queryFn: async () => {
      return await $axios.post(
        "booking/adminlist",
        { page, limit: 8 },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
    },
    enabled: isAdmin(),
  });

  //   const { isLoading, mutate } = useMutation({
  //     mutationKey: ["update-status"],
  //     mutationFn: async ({ id, status }) => {
  //       console.log(id, status);
  //       return await $axios.put(
  //         `/booking/status/${id}`,
  //         { status },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${window.localStorage.getItem("token")}`,
  //           },
  //         }
  //       );
  //     },
  //   });

  //   const handleStatusChange = (id, newStatus) => {
  //     mutate({ id, status: newStatus });
  //   };

  const appointments = isAdmin()
    ? adminData?.data?.bookingList || []
    : clientData?.data?.bookingList || [];

  console.log(appointments);

  if (adminPending || clientPending) {
    return (
      <Typography
        variant="h6"
        sx={{
          color: "#033069",
          fontWeight: "bold",
          textAlign: "center",
          marginTop: "4rem",
        }}
      >
        Loading...
      </Typography>
    );
  }

  return (
    <div className="flex flex-col justify-between items-center h-screen w-full mt-18 p-8">
      <Typography
        variant="h4"
        sx={{ color: "#033069", fontWeight: "bold", marginTop: "4rem" }}
      >
        Appointment Details
      </Typography>

      <AppointmentTable appointments={appointments} />

      {/* 
      <TableContainer component={Paper} sx={{ marginTop: "2rem" }}>
        <Table sx={{ minWidth: 650 }} aria-label="appointment table">
          <TableHead>
            <TableRow>
              {[
                "Customer Name",
                "Test Name",
                "Address",
                "Date",
                "Time",
                "Service Type",
                "Status",
              ].map((header) => (
                <TableCell
                  key={header}
                  align="center"
                  sx={{ fontWeight: "bold" }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.length > 0 ? (
              appointments.map((row, index) => (
                <TableRow key={row._id || index}>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.testName}</TableCell>
                  <TableCell align="center">{row.address}</TableCell>
                  <TableCell align="center">
                    {new Date(row.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center">
                    {new Date(row.date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell align="center">{row.serviceType}</TableCell>

                  <TableCell align="center">
                    {isAdmin() ? (
                      <Select
                        value={row.status} // Current status shown here
                        onChange={(e) =>
                          handleStatusChange(row._id, e.target.value)
                        }
                        size="small"
                        sx={{ minWidth: 120 }}
                      >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="approved">Approved</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                        <MenuItem value="cancelled">Cancelled</MenuItem>
                      </Select>
                    ) : (
                      <Typography variant="body2">{row.status}</Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No Appointments Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer> */}

      <Pagination
        count={10} // Replace this with dynamic count from your API
        page={page}
        onChange={(event, value) => setPage(value)}
        sx={{ marginTop: "2rem" }}
      />
      {/* <FixedBottomNavigation /> */}
    </div>
  );
};

export default AppointmentPage;
