import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  InputBase,
  Box,
  Avatar,
  IconButton,
  styled,
  Tooltip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import LOGO from '../../../public/imgs/logo.png';

// Define our colors as constants for consistency
const ACCENT_TEAL = '#009688';    // Teal accent
const DARK_BG = '#263238';       // Dark blue-gray
const LIGHT_ACCENT = '#8BC34A';  // Light green accent


const Search = styled('div')(() => ({
  position: 'relative',
  borderRadius: '30px',
  backgroundColor: 'rgba(38, 50, 56, 0.7)',
  '&:hover': {
    backgroundColor: 'rgba(38, 50, 56, 0.9)',
    boxShadow: `0 0 8px ${LIGHT_ACCENT}`,
  },
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  transition: 'all 0.3s ease',
  border: `1px solid ${DARK_BG}`,
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#FFFFFF',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  '& .MuiInputBase-input': {
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    height: '100%',
    width: '100%',
    fontWeight: 500,
    '&::placeholder': {
      color: '#9CA3AF',
      opacity: 1,
    },
  },
}));

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      // Navigate to search page with query parameter
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <AppBar position="fixed" elevation={3} sx={{ px: 2, background: `linear-gradient(to right, ${DARK_BG}, #1E3A34)`, borderBottom: `1px solid ${ACCENT_TEAL}` }}>
      <Toolbar sx={{ height: '80px', display: 'flex', justifyContent: 'space-between', py: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', color: '#FFFFFF' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              src={LOGO}
              alt="Sustainably Logo"
              variant="rounded"
              sx={{
                width: 50,
                height: 50,
                marginRight: 2,
                // boxShadow: `0 0 10px ${ACCENT_TEAL}`,
              }}
            />
            <Typography
              variant="h5"
              noWrap
              sx={{
                fontWeight: 700,
                color: '#FFFFFF',
                textDecoration: 'none',
                fontFamily: "'Poppins', sans-serif",
                letterSpacing: 1,
                display: { xs: 'none', sm: 'block' },
                '& span': {
                  color: LIGHT_ACCENT,
                }
              }}
            >
              Sustain<span>ably</span>
            </Typography>
          </Box>
        </Box>

        <Search sx={{
          width: { xs: '40%', sm: '50%', md: '40%' },
          mx: 'auto',
          '&:focus-within': {
            boxShadow: `0 0 8px ${LIGHT_ACCENT}`,
            borderColor: LIGHT_ACCENT,
          }
        }}>
          <SearchIconWrapper>
            <SearchIcon sx={{ color: LIGHT_ACCENT }} />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search sustainable products..."
            inputProps={{
              'aria-label': 'search',
              style: { fontFamily: "'Poppins', sans-serif" }
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
        </Search>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title="Browse Products">
            <Button
              component={Link}
              to="/browse"
              startIcon={<ShoppingBagIcon />}
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                borderRadius: '20px',
                px: 2,
                py: 1,
                textTransform: 'none',
                color: '#FFF',
                backgroundColor: 'transparent',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(139,195,74,0.1)',
                  borderColor: LIGHT_ACCENT,
                }
              }}
            >
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>Browse</Box>
            </Button>
          </Tooltip>

          <Tooltip title="Sustainable Spotlight">
            <Button
              component={Link}
              to="/spotlight"
              startIcon={<LocalFloristIcon />}
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                borderRadius: '20px',
                px: 2,
                py: 1,
                textTransform: 'none',
                color: '#FFF',
                backgroundColor: 'transparent',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.3s ease',
                display: { xs: 'none', sm: 'flex' },
                '&:hover': {
                  backgroundColor: 'rgba(0,150,136,0.1)',
                  borderColor: ACCENT_TEAL,
                }
              }}
            >
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>Company Spotlight</Box>
            </Button>
          </Tooltip>

          <Tooltip title="Profile">
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              component={Link}
              to="/profile"
              sx={{
                ml: 1,
                border: '2px solid transparent',
                transition: 'all 0.3s ease',
                '&:hover': {
                  border: `2px solid ${ACCENT_TEAL}`,
                  transform: 'scale(1.05)',
                }
              }}
            >
              <Avatar sx={{ width: 40, height: 40 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
