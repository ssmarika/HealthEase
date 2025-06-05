"use client";
import $axios from "@/lib/axios/axios.instance";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const ViewDoc = () => {
  const params = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["view-report", params.id],
    queryFn: async () => {
      const response = await $axios.get(`/report/view/${params.id}`);
      return response.data;
    },
  });

  const doc = data?.report;

  useEffect(() => {
    if (doc?.pdf) {
      window.open(
        `http://localhost:8080/files/${doc.pdf}`,
        "_blank",
        "noreferrer"
      );
    }
  }, [doc]);

  if (isLoading) return <div>Loading...</div>;

  return <div>The document will open in a new window.</div>;
};

export default ViewDoc;
