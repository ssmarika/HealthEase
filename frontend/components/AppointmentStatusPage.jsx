"use client";
import $axios from "@/lib/axios/axios.instance";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import AppointmentTable from "./AppointmentTable";
import { Pagination, Typography } from "@mui/material";

const AppointmentStatusPage = () => {
  const [page, setPage] = useState(1);

  const params = useParams();

  const { status } = params;

  console.log(status);

  const { isLoading, data } = useQuery({
    queryFn: ["status-list"],
    queryFn: () => {
      return $axios.get(`booking/list/${status}`);
    },
  });

  const appointment = data?.data?.bookingList;

  console.log(appointment);

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
