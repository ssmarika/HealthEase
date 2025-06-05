"use client";

import React from "react";

import dynamic from "next/dynamic";

const GoogleMapView = dynamic(() => import("@/components/GoogleMapView"), {
  ssr: false,
});
//google map view component is dynamically imported to avoid SSR issues as it can be rendered only on the client side

const location = () => {
  return (
    <div sx={{ width: "100%", height: "100vh" }}>
      <GoogleMapView />
    </div>
  );
};

export default location;
