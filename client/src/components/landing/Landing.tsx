import React, { useEffect, useRef } from 'react';
import { Typography, Button, Container, Box, Link as MuiLink, Grid, Card, CardContent, CardMedia, CardActions, Divider } from '@mui/material';
import SpotlightCard from '../cards/spotlight';
import * as THREE from 'three';
import EcoCarousel from './carousel';
import SearchBox from '../searchbox/SearchBox';
declare global {
  interface Window {
    VANTA: {
      GLOBE: (opts: any) => { destroy: () => void };
    };
    THREE: typeof THREE;
  }
}

// Define our colors as constants for consistency
const PRIMARY_GREEN = '#00FF62';
const ACCENT_BLUE = '#00E5FF';

const Landing: React.FC = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    if (!window.THREE) {
      window.THREE = THREE;
    }

    const initVanta = () => {
      if (vantaEffect.current || !vantaRef.current || !window.VANTA?.GLOBE) return;
      vantaEffect.current = window.VANTA.GLOBE({
        THREE: window.THREE,
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.4,
        scaleMobile: 1.0,
        color: 0x00FF62,
        color2: 0x00E5FF,
        backgroundColor: 0x343434,
        points: 12,
        maxDistance: 25,
        spacing: 18,
        showDots: true
      });
    };

    if (!window.VANTA || !window.VANTA.GLOBE) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.globe.min.js';
      script.async = true;
      script.onload = initVanta;
      document.body.appendChild(script);
    } else {
      initVanta();
    }

    return () => {
      vantaEffect.current?.destroy();
      vantaEffect.current = null;
    };
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Hero Section with Globe */}
      <Box sx={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden' }}>
        {/* Vanta Globe Background */}
        <Box
          ref={vantaRef}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
          }}
        />

        {/* Hero Content */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            px: { xs: 3, md: 6 },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            {/* SearchBox component positioned prominently */}
            <Box
              sx={{
                position: 'relative',
                zIndex: 10,
                width: { xs: '100%', md: '70%', lg: '60%' },
                ml: { xs: 0, md: 4 },
                mt: { xs: -10, md: 0 },
              }}
            >
              <SearchBox
                title="Sustainably"
                subtitle="find eco-friendly products"
                placeholder="Search for sustainable products..."
                onSearch={(query) => console.log('Searching for:', query)}
              />
            </Box>
          </Box>
        </Box>

        {/* Scroll indicator */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'white',
          }}
        >
          <Typography variant="body2" sx={{ mb: 1 }}>
            Scroll to explore
          </Typography>
          <Box
            sx={{
              width: 30,
              height: 50,
              border: `2px solid ${ACCENT_BLUE}`,
              borderRadius: 15,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 8,
                height: 8,
                backgroundColor: PRIMARY_GREEN,
                borderRadius: '50%',
                animation: 'scrollDown 2s infinite',
              },
              '@keyframes scrollDown': {
                '0%': { top: 8, opacity: 1 },
                '100%': { top: 32, opacity: 0 },
              },
            }}
          />
        </Box>
      </Box>
      <EcoCarousel />
      {/* Mission Statement Section */}
      <Box
        sx={{
          py: 10,
          px: 3,
          backgroundColor: 'white',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            sx={{
              mb: 4,
              fontWeight: 'bold',
              color: '#333',
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 80,
                height: 4,
                backgroundColor: PRIMARY_GREEN,
                borderRadius: 2,
              },
            }}
          >
            Our Mission
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 6,
              color: '#555',
              lineHeight: 1.6,
              maxWidth: '800px',
              mx: 'auto',
            }}
          >
            We aim to provide the best eco-friendly products from around the web, so you can shop sustainably and make a positive impact on the planet. Our curated selections help you discover brands committed to environmental responsibility.
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  p: 3,
                  textAlign: 'center',
                  height: '100%',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 255, 98, 0.1)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mb: 2,
                    mx: 'auto',
                  }}
                >
                  <Typography variant="h4" sx={{ color: PRIMARY_GREEN }}>
                    🌱
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Sustainable Products
                </Typography>
                <Typography variant="body1" sx={{ color: '#666' }}>
                  We carefully vet each product to ensure it meets our eco-friendly standards.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  p: 3,
                  textAlign: 'center',
                  height: '100%',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 229, 255, 0.1)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mb: 2,
                    mx: 'auto',
                  }}
                >
                  <Typography variant="h4" sx={{ color: ACCENT_BLUE }}>
                    🌍
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Global Impact
                </Typography>
                <Typography variant="body1" sx={{ color: '#666' }}>
                  Supporting brands that prioritize environmental conservation worldwide.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  p: 3,
                  textAlign: 'center',
                  height: '100%',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 255, 98, 0.1)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mb: 2,
                    mx: 'auto',
                  }}
                >
                  <Typography variant="h4" sx={{ color: PRIMARY_GREEN }}>
                    💚
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Community Driven
                </Typography>
                <Typography variant="body1" sx={{ color: '#666' }}>
                  Building a community of conscious consumers making better choices together.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Weekly Spotlight Section */}
      <Box
        sx={{
          py: 8,
          backgroundColor: '#f8f8f8',
          borderTop: `4px solid ${PRIMARY_GREEN}`,
          borderBottom: `4px solid ${ACCENT_BLUE}`,
          width: '100%',
        }}
      >
        <Container maxWidth="xl">
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              mb: 6,
              fontWeight: 'bold',
              color: '#333',
            }}
          >
            Weekly Spotlight
          </Typography>
          <Box sx={{ width: '100%', maxWidth: '100%', mb: 4 }}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                overflow: 'hidden',
                borderRadius: 4,
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                height: { xs: 'auto', md: '350px' },
              }}
            >
              <Box sx={{ width: { xs: '100%', md: '50%' }, height: '100%' }}>
                <SpotlightCard />
              </Box>
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  p: 5,
                  width: { xs: '100%', md: '50%' },
                  backgroundColor: 'white',
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 'bold',
                    mb: 2,
                    color: '#333',
                  }}
                >
                  Take a look at Allbirds
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 4,
                    color: '#666',
                    fontSize: '1.1rem',
                    lineHeight: 1.6,
                  }}
                >
                  Allbirds is revolutionizing the footwear industry with their sustainable materials and carbon-neutral approach. Their commitment to eco-friendly practices and transparent supply chains makes them a standout brand in sustainable fashion.
                </Typography>
                <CardActions sx={{ p: 0 }}>
                  <Button
                    variant="contained"
                    size="large"
                    component={MuiLink}
                    href="https://www.allbirds.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      backgroundColor: PRIMARY_GREEN,
                      color: '#000',
                      fontWeight: 'bold',
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: ACCENT_BLUE,
                      },
                    }}
                  >
                    See what they're doing to empower our world here
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>

      {/* Team Section */}
      <Box
        sx={{
          py: 10,
          px: 3,
          backgroundColor: 'white',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              mb: 6,
              fontWeight: 'bold',
              color: '#333',
              position: 'relative',
              display: 'inline-block',
              mx: 'auto',
              width: '100%',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 80,
                height: 4,
                backgroundColor: ACCENT_BLUE,
                borderRadius: 2,
              },
            }}
          >
            Our Team
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[
              {
                name: 'Kai Nishida',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
              },
              {
                name: 'Ostend Surajaya',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
              },
              {
                name: 'Matthew Chang',
                image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
              },
            ].map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    overflow: 'hidden',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="280"
                    image={member.image}
                    alt={member.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {member.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.role}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 6,
          px: 3,
          backgroundColor: '#111',
          color: 'white',
          mt: 'auto',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Sustainably
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: '#aaa' }}>
                Connecting conscious consumers with eco-friendly products since 2023.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Quick Links
              </Typography>
              <Typography
                component={MuiLink}
                href="/search"
                sx={{ display: 'block', mb: 1, color: '#aaa', textDecoration: 'none', '&:hover': { color: PRIMARY_GREEN } }}
              >
                Discover Products
              </Typography>
              <Typography
                component={MuiLink}
                href="#"
                sx={{ display: 'block', mb: 1, color: '#aaa', textDecoration: 'none', '&:hover': { color: PRIMARY_GREEN } }}
              >
                About Us
              </Typography>
              <Typography
                component={MuiLink}
                href="#"
                sx={{ display: 'block', mb: 1, color: '#aaa', textDecoration: 'none', '&:hover': { color: PRIMARY_GREEN } }}
              >
                Our Mission
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Connect With Us
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: '#aaa' }}>
                Join our community and stay updated on the latest sustainable products.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {['📱', '📧', '📘', '📸'].map((icon, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s',
                      '&:hover': {
                        backgroundColor: PRIMARY_GREEN,
                      },
                    }}
                  >
                    {icon}
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4, backgroundColor: 'rgba(255,255,255,0.1)' }} />
          <Typography variant="body2" sx={{ textAlign: 'center', color: '#aaa' }}>
            © {new Date().getFullYear()} Sustainably. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Landing;
