"use client";
import $axios from "@/lib/axios/axios.instance";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Pagination, Typography } from "@mui/material";
import { isAdmin, isClient } from "@/utils/role.check";
import Loader from "./Loader";
import ReportTable from "./ReportTable";

const ReportPage = () => {
  const [page, setPage] = useState(1);

  const status = "completed";

  console.log(status);

  const { isLoading: adminLoading, data: adminData } = useQuery({
    queryKey: ["status-list-admin", page],
    queryFn: async () => {
      return await $axios.post(
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
    queryFn: async () => {
      return await $axios.post(
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

  if (clientLoading || adminLoading) {
    return <Loader />;
  }

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

      <ReportTable appointments={appointment} />

      <Pagination
        count={10}
        page={page}
        onChange={(event, value) => setPage(value)}
        sx={{ marginTop: "2rem" }}
      />
    </div>
  );
};

export default ReportPage;
