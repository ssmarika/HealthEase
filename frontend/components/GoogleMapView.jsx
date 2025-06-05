"use client";

//helps in simple map display
//api key problem arises
// need to learn marker setup

import { GoogleMap, LoadScript } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";

const GoogleMapView = () => {
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching location", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const containerStyle = {
    width: "100vw",
    height: "90vh",
  };

  const cordinates = {
    lat: 37.7749, // Example latitude
    lng: -122.4194, // Example longitude
  };

  return (
    <div style={{ width: "100vw", height: "90vh", margin: 0, padding: 0 }}>
      <LoadScript googleMapsApiKey={process.env.GOOGLE_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentLocation || cordinates}
          zoom={12}
        />
      </LoadScript>
    </div>
  );
};

export default GoogleMapView;
