"use Client";
import { Box, Pagination, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import $axios from "@/lib/axios/axios.instance";
import LabTestCard from "./LabTestCard";

const LabTest = () => {
  const [page, setPage] = useState(1);

  const { isPending, error, data } = useQuery({
    queryKey: ["lab-test-list", page],
    queryFn: async () => {
      return await $axios.post("/labtest/list", {
        page: page,
        limit: 3,
      });
    },
  });
  //console.log(data);

  const labTestList = data?.data?.testList;
  console.log(labTestList);
  return (
    <div className="flex flex-col justify-between items-center h-screen w-full mt-18 p-8 ">
      <Typography variant="h4" sx={{ color: "#033069", fontWeight: "bold" }}>
        Diagnostics Pathalogy
      </Typography>
      <Box className="flex justify-center space-x-8">
        {labTestList?.map((item) => {
          return <LabTestCard key={item._id} {...item} />;
        })}
      </Box>
      <Pagination
        page={page}
        count={5}
        color="#033069"
        size="large"
        onChange={(_, value) => {
          setPage(value);
        }}
      />

      <div></div>
    </div>
  );
};

export default LabTest;
