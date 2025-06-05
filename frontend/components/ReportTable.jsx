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
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

const ReportTable = ({ appointments = [] }) => {
  //   const { appointments } = props;
  console.log(appointments);
  const router = useRouter();

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
                <TableCell align="center">
                  {row.tests.map((test, idx) => (
                    <div key={test.testId || idx}>
                      {idx + 1}. {test.name}
                    </div>
                  ))}
                </TableCell>
                <TableCell align="center">
                  {new Date(row.date).toLocaleDateString()}
                </TableCell>

                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="center">
                  {isAdmin() ? (
                    <div className="flex flex-col gap-2">
                      {" "}
                      <Button
                        onClick={() => {
                          router.push(`/upload/${row._id}`);
                        }}
                        sx={{
                          alignContent: "center",
                          backgroundColor: "#033069",
                          color: "white",
                          "&:hover": { backgroundColor: "#022050" },
                        }}
                      >
                        Upload document
                      </Button>
                      <Button
                        sx={{
                          alignContent: "center",
                          backgroundColor: "#033069",
                          color: "white",
                          "&:hover": { backgroundColor: "#022050" },
                        }}
                        onClick={() => {
                          router.push(`/view/${row._id}`);
                        }}
                      >
                        View Document
                      </Button>
                    </div>
                  ) : (
                    <Button
                      sx={{
                        alignContent: "center",
                        backgroundColor: "#033069",
                        color: "white",
                        "&:hover": { backgroundColor: "#022050" },
                      }}
                      onClick={() => {
                        router.push(`/view/${row._id}`);
                      }}
                    >
                      View Document
                    </Button>
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
