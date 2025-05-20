"use client";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { isAdmin } from "@/utils/role.check";
import { MenuItem, Select, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import $axios from "@/lib/axios/axios.instance";
import Loader from "./Loader";

const AppointmentTable = ({ appointments = [] }) => {
  //   const { appointments } = props;
  console.log(appointments);

  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationKey: ["update-status"],
    mutationFn: async ({ id, status }) => {
      console.log(id, status);
      return await $axios.put(
        `/booking/status/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.refetchQueries("admin-list");
    },
  });

  if (isLoading) {
    return <Loader />;
  }
  const handleStatusChange = (id, newStatus) => {
    mutate({ id, status: newStatus });
  };

  return (
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
    </TableContainer>
  );
};

export default AppointmentTable;
