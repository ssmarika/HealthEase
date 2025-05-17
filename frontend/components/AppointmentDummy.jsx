"use client";
import { Box, Pagination, Typography } from "@mui/material";
import React, { useState } from "react";
import AppointmentCard from "./AppointmentCard";
import { useQuery } from "@tanstack/react-query";
import $axios from "@/lib/axios/axios.instance";
import { isAdmin, isClient } from "@/utils/role.check";

const AppointmentPage1 = ({}) => {
  const [page, setPage] = useState(1);

  const { isPending: clientPending, data: clientData } = useQuery({
    queryKey: ["client-list", page],
    queryFn: async () => {
      return await $axios.post(
        "booking/clientlist",
        { page: page, limit: 3 },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
    },
    enabled: isClient(),
  });

  const { isPending: adminPending, data: adminData } = useQuery({
    queryKey: ["admin-list", page],
    queryFn: async () => {
      return await $axios.post(
        "booking/adminlist",
        { page: page, limit: 3 },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
    },
    enabled: isAdmin(),
  });
  console.log(clientData);
  const appointment = isAdmin()
    ? adminData?.data?.bookingList
    : clientData?.data?.bookingList;

  console.log("this is ", appointment);

  return (
    <div className="flex flex-col justify-between items-center h-screen w-full mt-18 p-8">
      <Typography
        variant="h4"
        sx={{ color: "#033069", fontWeight: "bold", marginTop: "4rem" }}
      >
        Appointment Details
      </Typography>
      <Box className="flex flex-col space-x-8">
        {appointment?.map((item) => {
          return <AppointmentCard key={item._id} {...item} />;
        })}
      </Box>
      <Pagination
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
      />
    </div>
  );
};

export default AppointmentPage1;
