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
import Loader from "./Loader";

const AppointmentPage = () => {
  const [page, setPage] = useState(1);

  const { isLoading: clientPending, data: clientData } = useQuery({
    queryKey: ["client-list", page],
    queryFn: async () => {
      return await $axios.post(
        "booking/clientlist",
        { page, limit: 4 },
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
        { page, limit: 4 },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
    },
    enabled: isAdmin(),
  });

  const appointments = isAdmin()
    ? adminData?.data?.bookingList || []
    : clientData?.data?.bookingList || [];

  console.log(appointments);

  if (adminPending || clientPending) {
    return <Loader />;
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

      <Pagination
        count={10}
        page={page}
        onChange={(event, value) => setPage(value)}
        sx={{ marginTop: "2rem" }}
      />
      {/* <FixedBottomNavigation /> */}
    </div>
  );
};

export default AppointmentPage;
