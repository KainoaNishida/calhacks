import { Card, Typography, CardMedia, CardHeader } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import { MdHeight } from 'react-icons/md';

export default function SpotlightCard() {
  return (
    <Card raised sx={{ minWidth: 300, boxShadow: 10, borderRadius: 2, bgcolor: 'primary.second'}}>
      <CardMedia component="video"
        autoPlay
        loop
        muted
        src="allbirds.mp4">
      </CardMedia>

      {/* Card content */}
      <CardContent
        sx={{
          position: 'relative', // Ensures content is above the video
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" component="div" color='primary' gutterBottom>
          Allbirds
        </Typography>
        <Typography variant="h5" color='primary' gutterBottom>
          Allbirds is a sustainable footwear and apparel company known for its eco-friendly materials and commitment to reducing carbon emissions.
        </Typography>
        </CardContent>
    </Card>
  );
}

