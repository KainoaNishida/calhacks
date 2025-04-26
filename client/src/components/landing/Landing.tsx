import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Link } from '@mui/material';

export const Landing: React.FC = () => {
    return (
        <div>

            {/* Main Content */}
            <Container maxWidth="lg" sx={{ textAlign: 'center', padding: 4 }}>
                <Box id="mission" sx={{ marginBottom: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        Our Mission
                    </Typography>
                    <Typography variant="body1">
                        At CompanyName, our mission is to revolutionize the way people interact with technology,
                        making it more accessible, intuitive, and impactful for everyone.
                    </Typography>
                </Box>

                <Box sx={{ marginY: 4 }}>
                    <img
                        src="vite.svg"
                        alt="Company Vision"
                        style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                    />
                </Box>

                <Box id="start" sx={{ marginTop: 4 }}>
                    <Button variant="contained" color="primary" size="large">
                        Get Started
                    </Button>
                </Box>
            </Container>
        </div>
    );
};

