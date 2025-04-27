import React from 'react';
import { Typography, Box, Container, Stack, Link as MuiLink, Divider } from '@mui/material';

// Define our colors as constants for consistency
const PRIMARY_GREEN = '#00FF62';

const Footer: React.FC = () => {
  return (
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
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} justifyContent="space-around">
          <Box sx={{ width: { xs: '100%', md: '45%' } }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Quick Links
            </Typography>
            <MuiLink
              href="/search"
              sx={{ display: 'block', mb: 1, color: '#aaa', textDecoration: 'none', '&:hover': { color: PRIMARY_GREEN } }}
            >
              <Typography>Discover Products</Typography>
            </MuiLink>
            <MuiLink
              href="#"
              sx={{ display: 'block', mb: 1, color: '#aaa', textDecoration: 'none', '&:hover': { color: PRIMARY_GREEN } }}
            >
              <Typography>About Us</Typography>
            </MuiLink>
            <MuiLink
              href="#"
              sx={{ display: 'block', mb: 1, color: '#aaa', textDecoration: 'none', '&:hover': { color: PRIMARY_GREEN } }}
            >
              <Typography>Our Mission</Typography>
            </MuiLink>
          </Box>
          <Box sx={{ width: { xs: '100%', md: '45%' } }}>
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
          </Box>
        </Stack>
        <Divider sx={{ my: 4, backgroundColor: 'rgba(255,255,255,0.1)' }} />
        <Typography variant="body2" sx={{ textAlign: 'center', color: '#aaa' }}>
          © {new Date().getFullYear()} Sustainably. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
