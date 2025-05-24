"use client";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { isAdmin } from "@/utils/role.check";

const ReportTable = ({ appointments = [] }) => {
  //   const { appointments } = props;
  console.log(appointments);

  return (
    <TableContainer component={Paper} sx={{ marginTop: "2rem" }}>
      <Table sx={{ minWidth: 650 }} aria-label="appointment table">
        <TableHead>
          <TableRow>
            {["Customer Name", "Test Name", "Date", "Status", "Report"].map(
              (header) => (
                <TableCell
                  key={header}
                  align="center"
                  sx={{ fontWeight: "bold" }}
                >
                  {header}
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.length > 0 ? (
            appointments.map((row, index) => (
              <TableRow key={row._id || index}>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.testName}</TableCell>
                <TableCell align="center">
                  {new Date(row.date).toLocaleDateString()}
                </TableCell>

                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="center">
                  {isAdmin() ? (
                    <Button>Upload document</Button>
                  ) : (
                    <Button>View Document</Button>
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

export default ReportTable;
