import React, { useRef, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { ecoLeaders } from './data/heroes';

const EcoCarousel: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Rewind video at 30 seconds
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const onTimeUpdate = () => {
      if (vid.currentTime >= 30) vid.currentTime = 0;
    };
    vid.addEventListener('timeupdate', onTimeUpdate);
    return () => void vid.removeEventListener('timeupdate', onTimeUpdate);
  }, []);

  // Duplicate slides for seamless looping
  const slides = [...ecoLeaders, ...ecoLeaders];
  const duration = ecoLeaders.length * 4; // total duration in seconds

  return (
    <Box
      sx={{
        position: 'relative',

        overflow: 'hidden',
        height: 450,
        my: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background video */}
      <video
        ref={videoRef}
        src="/nature.mp4"
        autoPlay
        muted
        loop
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: 0.9,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'grayscale(100%)',
          zIndex: 0,
        }}
      />

      {/* Carousel content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          px: 4,
        }}
      >
        {/* Title */}
        <Typography
          variant="h3"
          sx={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 450,
            fontSize: { xs: 30, md: 40 },
            color: '#fff',
            textShadow: '0 3px 6px rgba(0,0,0,0.4)',
            mb: 4,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -10,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '4px',
              background: 'linear-gradient(90deg, #00FF62 0%, #00E5FF 100%)',
              borderRadius: '2px',
            }
          }}
        >
          Who's saving our world?
        </Typography>

        {/* Sliding track */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            animation: `scroll ${duration}s linear infinite`,
            '@keyframes scroll': {
              '0%': { transform: 'translateX(0)' },
              '100%': { transform: 'translateX(-50%)' },
            },
          }}
        >
          {slides.map((item, idx) => (
            <Box
              key={idx}
              sx={{
                width: 400,
                flexShrink: 0,
                mx: 9,
                p: 3,
                backgroundColor: 'rgba(255,255,255,0.92)',
                borderRadius: '16px',
                textAlign: 'center',
                boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                border: '1px solid rgba(255,255,255,0.8)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 28px rgba(0,0,0,0.25)',
                },
              }}
            >
              <Box
                component="img"
                src={item.image}
                alt={item.name}
                sx={{
                  width: 90,
                  height: 90,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  mb: 2,
                  border: '3px solid rgba(0, 200, 83, 0.7)',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                }}
              />
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  mb: 0.5
                }}
              >
                {item.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(0, 150, 136, 0.9)',
                  fontWeight: 500,
                  mb: 1.5
                }}
              >
                {item.company}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: '#444',
                  display: 'block',
                  fontSize: '0.8rem',
                  lineHeight: 1.4
                }}
              >
                {item.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default EcoCarousel;
