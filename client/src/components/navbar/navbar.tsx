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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LOGO from '../../imgs/logo.png';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#1F2937',
  '&:hover': {
    backgroundColor: '#2D3748',
  },
  height: '60px',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
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
    <AppBar sx={{ px: 1,backgroundColor: '#111827' }}>
      <Toolbar sx={{ height: '110px', display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{  width: '20%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#FFFFFF' }}>
          <Avatar
            src={LOGO}
            alt="Company Logo"
            variant="rounded"
            sx={{ width: 65, height: 65, marginRight: 1}}
          />
          {/* <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              fontWeight: 700,
              color: '#FFFFFF',
              textDecoration: 'none',
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Eco Search
          </Typography> */}
        </Box>

        <Search sx={{ width: '50%', marginLeft: '5%', marginRight: 'auto' }}>
          <SearchIconWrapper>
            <SearchIcon sx={{ color: '#FFFFFF' }} />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{
              'aria-label': 'search',
              style: { fontFamily: "'Poppins', sans-serif" }
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
        </Search>

        {/* <Box sx={{ flexGrow: 1 }} /> */}

        <Box sx={{ display: { xs: 'none', md: 'flex' }, color: '#FFFFFF' }}>
          <Button
            color="inherit"
            component={Link}
            to="/browse"
            sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 16 }}
          >
            Browse
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/spotlight"
            sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 16 }}
          >
            Spotlight
          </Button>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            component={Link}
            to="/profile"
            sx={{ ml: 1 }}
          >
            <Avatar sx={{ width: 40, height: 40 }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;