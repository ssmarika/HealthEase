"use Client";
import { Box, Button, Pagination, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import $axios from "@/lib/axios/axios.instance";
import LabTestCard from "./LabTestCard";
import Loader from "./Loader";
import { isAdmin, isClient } from "@/utils/role.check";
import { useRouter } from "next/navigation";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const LabTest = () => {
  const [page, setPage] = useState(1);

  const router = useRouter();

  const { isPending, error, data } = useQuery({
    queryKey: ["lab-test-list", page],
    queryFn: async () => {
      return await $axios.post("/labtest/list", {
        page: page,
        limit: 3,
      });
    },
  });

  const labTestList = data?.data?.testList;
  console.log(labTestList);

  if (isPending) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col justify-between items-center h-screen w-full mt-18 p-8 ">
      <Typography variant="h4" sx={{ color: "#033069", fontWeight: "bold" }}>
        Diagnostics Pathalogy
      </Typography>

      {isAdmin() && (
        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={() => {
            router.push("/add");
          }}
          sx={{
            alignContent: "center",
            backgroundColor: "#033069",
            "&:hover": { backgroundColor: "#022050" },
          }}
        >
          Add Test
        </Button>
      )}

      {isClient() && (
        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={() => {
            router.push("/multiplebooking");
          }}
          sx={{
            alignContent: "center",
            backgroundColor: "#033069",
            "&:hover": { backgroundColor: "#022050" },
          }}
        >
          Book Multiple Tests
        </Button>
      )}

      <Box className="flex justify-center space-x-8">
        {labTestList?.map((item) => {
          return <LabTestCard key={item._id} {...item} />;
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

export default LabTest;
