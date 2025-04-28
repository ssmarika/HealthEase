'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import LabTestIcon from '@mui/icons-material/Science';
import BlogIcon from '@mui/icons-material/Article';
import TestimonyIcon from '@mui/icons-material/Chat';
import ResponsiveAppBar from './Appbar';
import Slider from 'react-slick'; // Import React Slick
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { images } from '@/constants/general.constant'; // Import the images array

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
      <Box
        sx={{
          mt: '64px', // To account for the fixed AppBar height
          backgroundColor: '#388E3C',
          color: 'white',
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 4,
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {/* Text Section */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            textAlign: { xs: 'center', md: 'left' },
            mb: { xs: 4, md: 0 },
          }}
        >
          Medical services at your doorstep
        </Typography>

        {/* Image Carousel */}
        <Box
          sx={{
            width: { xs: '80%', md: '40%' },
            height: '300px',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <Slider {...sliderSettings}>
            {images.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                />
              </div>
            ))}
          </Slider>
        </Box>
      </Box>

      {/* Icons Section */}
      <Container sx={{ py: 6 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 4,
            color: '#2E7D32',
          }}
        >
          Explore Our Services
        </Typography>

        <Grid container spacing={20} justifyContent="center">
          {/* Lab Test Icon */}
          <Grid item xs={12} sm={6} md={4} textAlign="center">
            <LabTestIcon sx={{ fontSize: 60, color: '#388E3C', mb: 2 }} />
            <Typography variant="h6">Lab Test</Typography>
          </Grid>

          {/* Blogs Icon */}
          <Grid item xs={12} sm={6} md={4} textAlign="center">
            <BlogIcon sx={{ fontSize: 60, color: '#388E3C', mb: 2 }} />
            <Typography variant="h6">Blogs</Typography>
          </Grid>

          {/* Testimony Icon */}
          <Grid item xs={12} sm={6} md={4} textAlign="center">
            <TestimonyIcon sx={{ fontSize: 60, color: '#388E3C', mb: 2 }} />
            <Typography variant="h6">Testimony</Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Homepage;