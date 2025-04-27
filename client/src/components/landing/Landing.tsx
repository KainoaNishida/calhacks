import { Typography, Button, Container, Box, Link } from '@mui/material';
import SpotlightCard from '../cards/spotlight';

export const Landing = () => {
    return (
        
            <Box sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                 {/* Main Content */}
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4, bgcolor: '#F9FBF7', width: "100%" }} >
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography variant="h2" component="h1" color='primary' gutterBottom>
                            Shop Sustainably 
                        </Typography>
                        <Button variant="contained" color="primary" size="large" sx={{ mb: 4 }} component={Link} href="/search">
                            Start
                        </Button>
                    </Box>  
                    
                    <Box sx={{ mb: 4, textAlign: 'center' }}>
                        <Typography variant="h5" component="h2" color='primary' gutterBottom>         
                            Your one-stop solution for all your needs.
                        </Typography>
                    </Box>
                    
                </Container>
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4, height: '100%' }}>
                    

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h2" color='primary' gutterBottom>
                            Our Mission
                        </Typography>
                        <Typography variant="h3" color='primary' gutterBottom>
                            blah blah blah
                        </Typography>
                    </Box>
                    <Box sx={{ mb: 4, height: '50%' }}>
                        <Typography variant="h2" color='primary' gutterBottom>
                            Monthly Spotlight
                        </Typography>
                        <Box>
                            <SpotlightCard />
                        </Box>
                        
                    </Box>
                </Container>
            </Box>
           

            
        
    );
};

