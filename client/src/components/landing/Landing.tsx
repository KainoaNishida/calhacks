import { Typography, Button, Container, Box, Link, Card, CardHeader, CardMedia, CardContent } from '@mui/material';
import SpotlightCard from '../cards/spotlight';

export const Landing = () => {
    return (
        <Box sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', margin: 0, padding: 0 }}>
            
            
                
                <Box 
                sx={{ 
                    width: '100vw', 
                    height: '100vh', 
                    backgroundImage: `url(/forest.jpg)`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center', 
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
                >
                    <Card raised sx={{borderRadius: 4, borderColor: 'primary.main', width: '60%', backgroundColor: 'secondary.second'}}>
                        <CardHeader title="Shop Sustainably" titleTypographyProps={{ 
    variant: 'h2', 
    sx: { fontSize: '3rem', color: 'primary.main' } 
  }}/>
                        
                        <CardContent sx={{ mb: 4 }}>
                            <Button 
                            variant="contained" 
                            color="primary" 
                            size="large" 
                            sx={{ mb: 4 }} 
                            component={Link} 
                            href="/search"
                            >
                                Start
                            </Button>
                        
                            <Typography variant="h4" component="h2" color='primary.main' gutterBottom>
                                Want to purchase eco-friendly products but don't know where to start? We are here to help!
                            </Typography>
                        </CardContent>
                    </Card>
                    

                    
                </Box>
            
            
            {/* Normal Content */}
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4, justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', width: "100%" }}>
                <Box sx={{ mb: 4, borderRadius: 5, bgcolor: 'white', borderShadow: 10 }}>
                    <Typography variant="h2" color='primary.secondary' gutterBottom>
                        Our Mission
                    </Typography>
                    <Typography variant="h3" color='primary.secondary' gutterBottom>
                        We aim to provide the best eco-friendly products from around the web, so you can shop sustainably and make a positive impact on the planet.
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
