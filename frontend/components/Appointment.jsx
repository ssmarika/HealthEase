import { Box, Pagination, Typography } from "@mui/material";
import React from "react";

const AppointmentPage = () => {
  return (
    <div className="flex flex-col justify-between items-center h-screen w-full mt-18 p-8 ">
      <Typography variant="h4" sx={{ color: "#033069", fontWeight: "bold" }}>
        Appointment
      </Typography>
      <Box className="flex flex-col space-x-8">
        <Box className="flex flex-col justify-between items-center rounded-lg shadow-lg h-32 w-5/6 border-2 border-blue-900 p-4 hover:scale-105 hover:shadow-xl transition-transform duration-300"></Box>
      </Box>

      {/* <Pagination
        page={page}
        count={5}
        size="large"
        onChange={(_, value) => {
          setPage(value);
        }}
        sx={{
          "& .MuiPaginationItem-root": {
            color: "#033069", // Set the color of the numbers and default state
          },
          "& .Mui-selected": {
            backgroundColor: "#033069", // Set the background color of the selected item
            color: "#fff", // Set the text color of the selected item
          },
          "& .MuiPaginationItem-ellipsis": {
            color: "#033069", // Set the color of the ellipsis (...)
          },
        }}
      /> */}

      <div></div>
    </div>
  );
};

export default AppointmentPage;
