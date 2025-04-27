import React, { useState, KeyboardEvent } from 'react';
import { styled } from '@mui/system';
import { Box, InputBase, IconButton, Paper, Typography } from '@mui/material';

// Styled container with blur and glassmorphic effect
const SearchContainer = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start', // Align items at the top
  width: '100%',
  maxWidth: 800,
  height: 120, // Increased height for taller appearance
  margin: '0 auto',
  padding: theme.spacing(4, 4),  // Increased padding for taller appearance
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 245, 245, 0.95) 100%)',
  backdropFilter: 'blur(12px)',
  borderRadius: theme.shape.borderRadius * 4,
  border: '1px solid rgba(0, 200, 83, 0.3)',
  boxShadow: '0 6px 24px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover, &:focus-within': {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(250, 250, 250, 1) 100%)',
    boxShadow: '0 10px 35px rgba(0, 200, 83, 0.2)',
    borderColor: 'rgba(0, 200, 83, 0.6)',
  },
}));

interface SearchBoxProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  title?: string;
  subtitle?: string;
  caption?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder = 'Find eco-friendly fashion, sustainable tech, zero-waste products...',
  onSearch,
  // title = 'Sustainably',
  subtitle = 'Shop Sustainably',
  caption = 'Discover planet-friendly alternatives for a sustainable lifestyle'
 }) => {
  const [query, setQuery] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 700,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        px: { xs: 2, md: 0 },
        mb: { xs: 6, md: 4 },
        position: 'relative',
      }}
    >
      {/* Title with gradient
      {title && (
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.5rem', md: '4rem' },
            fontWeight: 700,
            lineHeight: 1.2,
            color: 'white',
            mb: 1,
            textShadow: '0 2px 10px rgba(0,0,0,0.2)',
          }}
        >
          {title}
        </Typography>
      )} */}

      {/* Subtitle with gradient */}
      {subtitle && (
        <Box sx={{ position: 'relative', mb: 3, height: { xs: '3.5rem', md: '5.5rem' } }}>
          <Typography
            variant="h2"
            sx={{
              position: 'absolute',
              bottom: 0,
              mb: 0.8,
              left: 0,
              fontSize: { xs: '2rem', md: '3.5rem' },
              fontWeight: 550,
              lineHeight: 1,
              color: 'black',
            }}
          >
            Shop
          </Typography>
          <Typography
            variant="h2"
            sx={{
              position: 'absolute',
              mt: 1,
              height: { xs: '3.5rem', md: '5.5rem' },
              left: { xs: '5rem', md: '10rem' },
              fontSize: { xs: '2rem', md: '5rem' },
              fontWeight: 700,
              lineHeight: 1,
              background: 'linear-gradient(90deg, #00FF62 0%, #00E5FF 100%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 10px rgba(0,0,0,0.1)',
            }}
          >
            Sustainably
          </Typography>
        </Box>
      )}

      <SearchContainer elevation={0}>
        <InputBase
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          multiline
          rows={2}

          inputProps={{ 'aria-label': 'search' }}
          sx={{
            color: 'rgba(50, 50, 50, 0.9)',
            fontSize: '1.2rem',
            py: 1,  // Adjusted padding for multiline input
            alignSelf: 'flex-start', // Align to the top
            '&::placeholder': {
              color: 'rgba(100, 100, 100, 0.7)',
              opacity: 1,
              fontStyle: 'italic',
            }
          }}
        />
        <IconButton
          onClick={() => query.trim() && onSearch(query.trim())}
          sx={{
            color: '#00C853',
            p: 1.5, // Increased padding for larger button
            alignSelf: 'flex-start', // Align to the top
            mt: 1, // Add top margin to position it properly
            '&:hover': {
              color: '#009688',
              backgroundColor: 'rgba(0, 200, 83, 0.1)',
            }
          }}
          aria-label="search"
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
            />
          </svg>
        </IconButton>
      </SearchContainer>

      {/* Hint text */}
      <Typography
        variant="body2"
        sx={{
          color: 'rgba(0, 200, 83, 0.9)',
          mt: 1.5,
          ml: 1,
          fontSize: '1rem',
          fontStyle: 'italic',
          fontWeight: 500,
          animation: 'fadeInOut 2s infinite',
          '@keyframes fadeInOut': {
            '0%': { opacity: 0.6 },
            '50%': { opacity: 1 },
            '100%': { opacity: 0.6 },
          },
        }}
      >
        {caption}
      </Typography>
    </Box>
  );
};

export default SearchBox;
