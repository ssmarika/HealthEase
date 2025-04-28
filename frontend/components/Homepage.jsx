'use client';

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import LabTestIcon from '@mui/icons-material/Science'; // Icon for Lab Test
import BlogIcon from '@mui/icons-material/Article'; // Icon for Blog
import TestimonyIcon from '@mui/icons-material/Chat'; // Icon for Testimony
import ResponsiveAppBar from './Appbar';

function Homepage() {
  return (
    <div>
     
      <ResponsiveAppBar/>

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

        {/* Image Placeholder */}
        <Box
          sx={{
            width: { xs: '80%', md: '40%' },
            height: '300px',
            backgroundColor: '#2E7D32',
            borderRadius: '8px',
          }}
        >
          {/* Step for adding image: Replace this Box with an <img> tag */}
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