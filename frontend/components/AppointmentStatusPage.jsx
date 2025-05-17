"use client";
import $axios from "@/lib/axios/axios.instance";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import AppointmentTable from "./AppointmentTable";
import { Pagination, Typography } from "@mui/material";
import { isAdmin, isClient } from "@/utils/role.check";

const AppointmentStatusPage = () => {
  const [page, setPage] = useState(1);

  const params = useParams();

  const { status } = params;

  console.log(status);

  const { isLoading: adminLoading, data: adminData } = useQuery({
    queryKey: ["status-list-admin", page],
    queryFn: () => {
      return $axios.post(
        `booking/adminlist/${status}`,
        { page, limit: 4 },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
    },
    enabled: isAdmin,
  });

  const { isLoading: clientLoading, data: clientData } = useQuery({
    queryKey: ["status-list-client", page],
    queryFn: () => {
      return $axios.post(
        `booking/clientlist/${status}`,
        { page, limit: 4 },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
    },
    enabled: isClient,
  });

  const appointment = isAdmin()
    ? adminData?.data?.bookingList || []
    : clientData?.data?.bookingList || [];

  return (
    <div className="flex flex-col justify-between items-center h-screen w-full mt-18 p-8">
      <Typography
        variant="h4"
        sx={{ color: "#033069", fontWeight: "bold", marginTop: "4rem" }}
      >
        {`${status} Appointment Details`}
      </Typography>

      <AppointmentTable appointments={appointment} />

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

export default AppointmentStatusPage;
