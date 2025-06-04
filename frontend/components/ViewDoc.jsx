"use client";
import $axios from "@/lib/axios/axios.instance";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";

const ViewDoc = () => {
  const params = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["view-report"],
    queryFn: async () => {
      return await $axios.get(`/report/view/${params.id}`);
    },
  });
  const doc = data?.data?.report;
  console.log(doc);

  const showDoc = () => {
    window.open(
      `http://localhost:8080/files/${doc.pdf}`,
      "_blank",
      "noreferrer"
    );
  };

  return (
    <div>
      Doc is shown in another window
      {showDoc()}
    </div>
  );
};

export default ViewDoc;
