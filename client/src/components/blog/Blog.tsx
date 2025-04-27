import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container,
  Grid,
  Divider,
  useTheme,
  useMediaQuery,
  Link
} from '@mui/material';
// import BIRDS from 'vanta/dist/vanta.birds.min'; // Removed as it's unused


const Blog = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ backgroundColor: '#FAFDF7' }}>
      {/* Hero Section */}
      <Box sx={{
        height: '100vh',
        width: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url(/allbirds-hero.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        }
      }}>
        <Typography 
          variant="h1" 
          sx={{
            color: '#FFFFFF',
            position: 'relative',
            textAlign: 'center',
            maxWidth: '800px',
            fontSize: { xs: '2.5rem', md: '4rem' },
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            px: 3
          }}
        >
          Making Better Things in a Better Way Featuring Allbirds
        </Typography>
      </Box>

      {/* Story Sections */}
      <Container maxWidth="lg">
        {/* Mission Statement */}
        <Box sx={{ 
          py: { xs: 8, md: 16 },
          textAlign: 'center' 
        }}>
          <Typography 
            variant="h4" 
            sx={{ 
              color: '#2E5D3F',
              maxWidth: '700px',
              mx: 'auto',
              mb: 6,
              lineHeight: 1.6
            }}
          >
            We're on a mission to prove that comfort, design, and sustainability aren't mutually exclusive.
          </Typography>
          <Divider sx={{ maxWidth: '100px', mx: 'auto', borderColor: '#2E5D3F' }} />
        </Box>

        {/* Story Grid */}
        <Grid container spacing={8} sx={{ mb: 12 }}>
          {/* Image Left + Text Right */}
          <Grid item xs={12}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' },
              gap: 6,
              alignItems: 'center'
            }}>
              <Box sx={{ 
                flex: 1,
                height: { xs: '300px', md: '500px' },
                backgroundImage: 'url(/sustainable-materials.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: 2
              }} />
              <Box sx={{ flex: 1 }}>
                <Typography variant="h3" sx={{ color: '#2E5D3F', mb: 3 }}>
                  Sustainable Materials
                </Typography>
                <Typography variant="body1" sx={{ 
                  color: '#445D48',
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  mb: 4
                }}>
                  Every material we use is carefully selected for its environmental impact. From our signature merino wool to recycled polyester, we're committed to using materials that are better for the planet.
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Impact Stats */}
          <Grid item xs={12}>
            <Box sx={{ 
              backgroundColor: '#2E5D3F',
              p: { xs: 4, md: 8 },
              borderRadius: 2,
              color: '#FFFFFF',
              textAlign: 'center'
            }}>
              <Typography variant="h4" sx={{ mb: 6 }}>Our Impact</Typography>
              <Grid container spacing={4}>
                {[
                  { stat: '60%', desc: 'Carbon Footprint Reduction' },
                  { stat: '95%', desc: 'Renewable Materials Used' },
                  { stat: '100%', desc: 'Recycled Packaging' }
                ].map((item) => (
                  <Grid item xs={12} md={4} key={item.stat}>
                    <Typography variant="h2" sx={{ mb: 2 }}>{item.stat}</Typography>
                    <Typography variant="body1">{item.desc}</Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>

        {/* Call to Action */}
        <Box sx={{ 
          textAlign: 'center',
          py: { xs: 8, md: 16 }
        }}>
          <Typography variant="h3" sx={{ 
            color: '#2E5D3F',
            mb: 4,
            maxWidth: '600px',
            mx: 'auto'
          }}>
            Join Us in Making a Difference
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#2E5D3F',
              color: '#FFFFFF',
              px: 6,
              py: 2,
              fontSize: '1.1rem',
              '&:hover': {
                backgroundColor: '#1F4030',
              },
            }}
          >
            <Link src="https://www.allbirds.com/pages/our-story" color="inherit">
                See Our Story
            </Link>
            
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Blog;