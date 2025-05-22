"use client";

import React from "react";
import ResponsiveAppBar from "./Appbar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { images } from "@/constants/general.constant";
import {
  Science as LabTestIcon,
  Article as BlogIcon,
  Chat as TestimonyIcon,
} from "@mui/icons-material";
import BiotechIcon from "@mui/icons-material/Biotech";
import MonitorHeartRoundedIcon from "@mui/icons-material/MonitorHeartRounded";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";

const Homepage = () => {
  // React Slick settings for the carousel
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    pauseOnHover: false,
  };

  return (
    <div className="bg-[#f6f9fb] min-h-screen">
      {/* AppBar */}
      <ResponsiveAppBar />

      {/* Hero Section */}
      <section className="mt-20 relative flex flex-col md:flex-row items-center justify-between px-4 md:px-20 py-10 bg-gradient-to-r from-custom via-blue-900 to-custom text-white  shadow-xl">
        <div className="flex-1 flex flex-col items-start justify-center gap-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-lg mb-2">
            Medical Services
            <br />
            <span className="text-blue-200">At Your Doorstep</span>
          </h1>
          <p className="text-lg md:text-xl font-medium mb-4 text-blue-100">
            Access reliable lab tests, appointments, and health resources from
            the comfort of your home.
          </p>
        </div>

        <div className="w-[80%] md:w-[40%] h-[300px] rounded-lg overflow-hidden shadow-2xl my-8 md:my-0 ">
          <Slider {...sliderSettings}>
            {images.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-[300px] object-cover"
                />
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Appointment Booking Section */}
      <section className="flex flex-col items-center justify-center py-12 bg-white shadow-md my-12 rounded-3xl mx-4 md:mx-20 border border-blue-100">
        <div className="flex items-center gap-4 mb-2">
          <span className="inline-block bg-blue-100 rounded-full p-4 shadow-md">
            <BiotechIcon className="text-custom" style={{ fontSize: 56 }} />
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-custom tracking-wide">
            Book Your Appointment Today
          </h2>
        </div>
        <p className="text-base md:text-lg text-gray-600 text-center max-w-xl mb-6">
          Quick, easy, and convenient health scheduling at your fingertips. Easy
          at-home sample collection and accurate reporting.
        </p>
        <a
          href="/labtest"
          className="px-8 py-3 bg-custom hover:bg-blue-900 text-white font-semibold rounded-full shadow-lg transition"
        >
          Book Now
        </a>
      </section>

      {/* Upcoming Services Section */}
      <section className="py-10 px-4 md:px-0">
        <h4 className="text-4xl font-bold text-center mb-10 text-custom drop-shadow-md">
          Our Upcoming Services
        </h4>
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
          {/* Lab Test Icon */}
          <div className="flex flex-col items-center text-center bg-white py-8 px-6 rounded-2xl shadow-md border border-blue-100 hover:shadow-xl transition w-90 h-50">
            <MonitorHeartRoundedIcon
              className="text-custom mb-2"
              style={{ fontSize: "60px" }}
            />
            <p className="text-xl font-semibold">Doctor Consultation</p>
            <span className="text-gray-500 text-sm mt-2">
              Get expert medical consultation —anytime, anywhere.
            </span>
          </div>
          {/* Blogs Icon */}
          <div className="flex flex-col items-center text-center bg-white py-8 px-6 rounded-2xl shadow-md border border-blue-100 hover:shadow-xl transition w-90 h-50">
            <BlogIcon
              className="text-custom mb-2"
              style={{ fontSize: "60px" }}
            />
            <p className="text-xl font-semibold">Blogs</p>
            <span className="text-gray-500 text-sm mt-2">
              Stay informed with curated articles and health tips.
            </span>
          </div>
          {/* Testimony Icon */}
          <div className="flex flex-col items-center text-center bg-white py-8 px-6 rounded-2xl shadow-md border border-blue-100 hover:shadow-xl transition w-90 h-50">
            <AddShoppingCartRoundedIcon
              className="text-custom mb-2"
              style={{ fontSize: "60px" }}
            />
            <p className="text-xl font-semibold">E-pharmacy</p>
            <span className="text-gray-500 text-sm mt-2">
              Get wide variety of product online.
            </span>
          </div>
        </div>
      </section>

      {/* contact section*/}
      <scetion></scetion>
    </div>
  );
};

export default Homepage;
