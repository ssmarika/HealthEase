// "use client";

// import React from "react";
// import ResponsiveAppBar from "./Appbar";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { images } from "@/constants/general.constant";
// import {
//   Science as LabTestIcon,
//   Article as BlogIcon,
//   Chat as TestimonyIcon,
// } from "@mui/icons-material";
// import { localStorageCheck } from "@/utils/localstorage.check";

// function Homepage() {
//   // React Slick settings for the carousel
//   const sliderSettings = {
//     dots: true, // Show dots for navigation
//     infinite: true, // Infinite loop
//     speed: 500, // Transition speed in ms
//     slidesToShow: 1, // Number of slides to show at once
//     slidesToScroll: 1, // Number of slides to scroll at once
//     autoplay: true, // Enable autoplay
//     autoplaySpeed: 2000, // Change slides every 2 seconds
//   };

//   return (
//     <div>
//       {/* AppBar */}
//       <ResponsiveAppBar />

//       {/* Hero Section */}
//       <div className="mt-16 bg-custom text-white min-h-[70vh] flex items-center justify-between px-4 flex-col md:flex-row">
//         {/* Text Section */}
//         <h3 className="text-3xl font-bold text-center md:text-left mb-4 md:mb-0">
//           Medical services at your doorstep
//         </h3>

//         {/* Image Carousel */}
//         <div className="w-[80%] md:w-[40%] h-[300px] rounded-lg overflow-hidden">
//           <Slider {...sliderSettings}>
//             {images.map((image, index) => (
//               <div key={index}>
//                 <img
//                   src={image}
//                   alt={`Slide ${index + 1}`}
//                   className="w-full h-[300px] object-cover"
//                 />
//               </div>
//             ))}
//           </Slider>
//         </div>
//       </div>

//       {/* booking */}
//       <div className="flex px-12">
//         <LabTestIcon
//           className="text-custom mb-2"
//           style={{ fontSize: "200px" }}
//         />
//       </div>

//       {/* Icons Section */}
//       <div className="py-6">
//         <h4 className="text-4xl font-bold text-center mb-4 text-custom">
//           Our Upcoming Services
//         </h4>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 justify-center">
//           {/* Lab Test Icon */}
//           <div className="flex flex-col items-center text-center">
//             <LabTestIcon
//               className="text-custom mb-2"
//               style={{ fontSize: "60px" }}
//             />
//             <p className="text-lg font-semibold">Lab Test</p>
//           </div>

//           {/* Blogs Icon */}
//           <div className="flex flex-col items-center text-center">
//             <BlogIcon
//               className="text-custom mb-2"
//               style={{ fontSize: "60px" }}
//             />
//             <p className="text-lg font-semibold">Blogs</p>
//           </div>

//           {/* Testimony Icon */}
//           <div className="flex flex-col items-center text-center">
//             <TestimonyIcon
//               className="text-custom mb-2"
//               style={{ fontSize: "60px" }}
//             />
//             <p className="text-lg font-semibold">Testimony</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Homepage;

<div className="flex-1 flex items-center justify-center w-full md:w-[45%] h-[340px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl my-8 md:my-0">
          <Slider {...sliderSettings}>
            {images.map((image, index) => (
              <div key={index}>
                {/* <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-[340px] md:h-[400px] object-cover object-center"
                  style={{ borderRadius: "1.5rem" }}
                /> */}
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-[300px] object-cover"
                />
              </div>
            ))}
          </Slider>
        </div>