// 'use client';

// import React from 'react';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import LabTestIcon from '@mui/icons-material/Science';
// import BlogIcon from '@mui/icons-material/Article';
// import TestimonyIcon from '@mui/icons-material/Chat';
// import ResponsiveAppBar from './Appbar';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import { images } from '@/constants/general.constant';

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

//       <Box sx={{
//         mt: '64px',
//         minHeight: '64px',
//         display: 'flex',
//         backgroundColor: '#16851b',
//         justifyContent: 'space-around',
//         alignItems: 'center'
//       }}>
//         <Typography className='font'>Book an appointment</Typography>
//         <Typography>Appointment</Typography>
//         <Typography>Results</Typography>

//       </Box>

//       {/* Hero Section */}
//       <Box
//         sx={{
//           //mt: '64px', // To account for the fixed AppBar height
//           backgroundColor: '#388E3C',
//           color: 'white',
//           minHeight: '70vh',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           px: 4,
//           flexDirection: { xs: 'column', md: 'row' },
//         }}
//       >
//         {/* Text Section */}
//         <Typography
//           variant="h3"
//           sx={{
//             fontWeight: 'bold',
//             textAlign: { xs: 'center', md: 'left' },
//             mb: { xs: 4, md: 0 },
//           }}
//         >
//           Medical services at your doorstep
//         </Typography>

//         {/* Image Carousel */}
//         <Box
//           sx={{
//             width: { xs: '80%', md: '40%' },
//             height: '300px',
//             borderRadius: '8px',
//             overflow: 'hidden',
//           }}
//         >
//           <Slider {...sliderSettings}>
//             {images.map((image, index) => (
//               <div key={index}>
//                 <img
//                   src={image}
//                   alt={`Slide ${index + 1}`}
//                   style={{ width: '100%', height: '300px', objectFit: 'cover' }}
//                 />
//               </div>
//             ))}
//           </Slider>
//         </Box>
//       </Box>

//       {/* Icons Section */}
//       <Container sx={{ py: 6 }}>
//         <Typography
//           variant="h4"
//           sx={{
//             fontWeight: 'bold',
//             textAlign: 'center',
//             mb: 4,
//             color: '#2E7D32',
//           }}
//         >
//           Explore Our Services
//         </Typography>

//         <Grid container spacing={20} justifyContent="center">
//           {/* Lab Test Icon */}
//           <Grid item xs={12} sm={6} md={4} textAlign="center">
//             <LabTestIcon sx={{ fontSize: 60, color: '#388E3C', mb: 2 }} />
//             <Typography variant="h6">Lab Test</Typography>
//           </Grid>

//           {/* Blogs Icon */}
//           <Grid item xs={12} sm={6} md={4} textAlign="center">
//             <BlogIcon sx={{ fontSize: 60, color: '#388E3C', mb: 2 }} />
//             <Typography variant="h6">Blogs</Typography>
//           </Grid>

//           {/* Testimony Icon */}
//           <Grid item xs={12} sm={6} md={4} textAlign="center">
//             <TestimonyIcon sx={{ fontSize: 60, color: '#388E3C', mb: 2 }} />
//             <Typography variant="h6">Testimony</Typography>
//           </Grid>
//         </Grid>
//       </Container>
//     </div>
//   );
// }

// export default Homepage;

//? tailwind css
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

function Homepage() {
  // React Slick settings for the carousel
  const sliderSettings = {
    dots: true, // Show dots for navigation
    infinite: true, // Infinite loop
    speed: 500, // Transition speed in ms
    slidesToShow: 1, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at once
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2000, // Change slides every 2 seconds
  };

  return (
    <div>
      {/* AppBar */}
      <ResponsiveAppBar />

      {/* Hero Section */}
      <div className="mt-16 bg-green-800 text-white min-h-[70vh] flex items-center justify-between px-4 flex-col md:flex-row">
        {/* Text Section */}
        <h3 className="text-3xl font-bold text-center md:text-left mb-4 md:mb-0">
          Medical services at your doorstep
        </h3>

        {/* Image Carousel */}
        <div className="w-[80%] md:w-[40%] h-[300px] rounded-lg overflow-hidden">
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
      </div>

      {/* Icons Section */}
      <div className="py-6">
        <h4 className="text-2xl font-bold text-center mb-4 text-green-800">
          Explore Our Services
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 justify-center">
          {/* Lab Test Icon */}
          <div className="flex flex-col items-center text-center">
            <LabTestIcon
              className="text-green-700 mb-2"
              style={{ fontSize: "60px" }}
            />
            <p className="text-lg font-semibold">Lab Test</p>
          </div>

          {/* Blogs Icon */}
          <div className="flex flex-col items-center text-center">
            <BlogIcon
              className="text-green-700 mb-2"
              style={{ fontSize: "60px" }}
            />
            <p className="text-lg font-semibold">Blogs</p>
          </div>

          {/* Testimony Icon */}
          <div className="flex flex-col items-center text-center">
            <TestimonyIcon
              className="text-green-700 mb-2"
              style={{ fontSize: "60px" }}
            />
            <p className="text-lg font-semibold">Testimony</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
