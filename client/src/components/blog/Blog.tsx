import React from 'react';
import { Typography, Box, Button, Card, CardContent, CardMedia, Link } from '@mui/material';

const Blog = () => {
  return (
    <Box sx={{ mb: 8 }}>
      <Typography variant="h2" color="primary" gutterBottom>
        Sustainable Sourcing
      </Typography>
      <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center' }}>
        <CardMedia
          component="img"
          sx={{
            width: { xs: '100%', md: '50%' },
            height: {xs: 'auto', md: '100%'},
            objectFit: 'cover',
            borderRadius: '8px 0 0 8px', 
            order: {xs: 0, md: -1},
            mt: { xs: 2, md: 2.5 }, // Margin top for mobile view
          }}
          image="/allbirds.jpg" 
          alt="Sustainable Sourcing"
        />
        <CardContent sx={{ flex: 1, padding: 3 }}>
          <Typography variant="h4" paragraph>
            Read Allbirds' backstory of how they founded the company and their commitment to sustainability.
          </Typography>
          <ul>
            <li>
              <Typography variant="body1" component="li">
                BCorp
              </Typography>
            </li>
            <li>
              <Typography variant="body1" component="li">
                Recycled Packaging
              </Typography>
            </li>
            <li>
              <Typography variant="body1" component="li">
                Soft & Comfort
              </Typography>
            </li>
          </ul>
          <Typography variant="body1" paragraph>
          A native of New Zealand, Tim Brown was always well versed in the magical qualities of merino wool. Inherently curious, he began asking himself why such a remarkable, sustainable resource was virtually absent in the footwear industry. And with that spirit of wonder, the Allbirds journey began.
          </Typography>
          <Typography variant="body1" paragraph>
          After years of researching and tinkering, Tim teamed up with Joey Zwillinger, an engineer and renewables expert. Together, they crafted a revolutionary wool fabric made specifically for footwear. The outcome? An entirely new category of shoes inspired by natural materials, and an ongoing mantra to create better things in a better way.          </Typography>
          <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
            <Link href="https://www.allbirds.com/pages/our-story" target="_blank" rel="noopener" color="inherit" underline="none">
            Learn More About Our Practices
            </Link>
            
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Blog;
