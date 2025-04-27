import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Pagination,
  FormControl,
  Select,
  MenuItem,
  Chip,
  Stack,
  Paper,
  Divider,
  SelectChangeEvent
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

interface Company {
  id: number;
  name: string;
  industry: string;
  esgScore: number;
  percentile: number;
  controversyLevel: number;
  description: string;
  logoUrl: string;
}

function Search() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('q') || '';

  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('esgScore');
  const [companies, setCompanies] = useState<Company[]>([]);
  const itemsPerPage = 10;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      setError(null);
      try {
        const endpoint = searchTerm.trim() === ''
          ? '/api/companies'
          : `/api/companies/search?q=${encodeURIComponent(searchTerm)}`;

        const response = await fetch(endpoint);
        const data = await response.json();

        const sortedCompanies = [...data].sort((a, b) => {
          if (sortBy === 'esgScore') {
            return b.esgScore - a.esgScore;
          } else if (sortBy === 'percentile') {
            return b.percentile - a.percentile;
          } else if (sortBy === 'controversyLevel') {
            return a.controversyLevel - b.controversyLevel;
          }
          return 0;
        });

        setCompanies(sortedCompanies);
        setPage(1);
      } catch (err) {
        console.error('Error fetching companies:', err);
        setError('Failed to fetch companies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [searchTerm, sortBy]);

  const displayedCompanies = companies.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortBy(event.target.value);
  };

  const renderControversyLevel = (level: number) => {
    const icons = [];
    for (let i = 0; i < level; i++) {
      icons.push(<WarningIcon key={i} sx={{ color: '#F59E0B' }} />);
    }
    return <Stack direction="row">{icons}</Stack>;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, backgroundColor: 'red' }}>
      <Paper elevation={0} sx={{ padding: 3, marginBottom: 3, backgroundColor: '#F9FAFB', borderRadius: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Search Results
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {searchTerm ?
            `Showing results for "${searchTerm}" • ${companies.length} eco-friendly companies found` :
            `Showing all ${companies.length} eco-friendly companies`
          }
        </Typography>
      </Paper>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 3 }}>
        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
          Sort by:
        </Typography>
        <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
          <Select
            value={sortBy}
            onChange={handleSortChange}
            displayEmpty
          >
            <MenuItem value="esgScore">ESG Score (Highest First)</MenuItem>
            <MenuItem value="percentile">Percentile (Highest First)</MenuItem>
            <MenuItem value="controversyLevel">Controversy Level (Lowest First)</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {loading && (
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            Loading...
          </Typography>
        </Box>
      )}

      {error && (
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            {error}
          </Typography>
        </Box>
      )}

      {!loading && !error && displayedCompanies.length > 0 ? (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
          {displayedCompanies.map((company) => (
            <Box key={company.id.toString()} sx={{ height: '100%' }}>
              <Card sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 4,
                },
              }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={company.logoUrl || 'https://via.placeholder.com/150?text=No+Image'}
                  alt={company.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {company.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {company.industry}
                  </Typography>
                  <Divider sx={{ my: 1.5 }} />
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                    <Typography variant="body2" color="text.secondary">
                      ESG Score:
                    </Typography>
                    <Chip
                      label={company.esgScore.toString()}
                      size="small"
                      icon={<WarningIcon />}
                      sx={{
                        backgroundColor: company.esgScore >= 80 ? '#10B981' : company.esgScore >= 60 ? '#FBBF24' : '#EF4444',
                        color: '#FFFFFF',
                        fontWeight: 'bold'
                      }}
                    />
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                    <Typography variant="body2" color="text.secondary">
                      Percentile:
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {company.percentile}%
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                    <Typography variant="body2" color="text.secondary">
                      Controversy:
                    </Typography>
                    {renderControversyLevel(company.controversyLevel)}
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    {company.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      ) : (!loading && !error && (
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            No companies found matching your search criteria.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search terms or browse all companies.
          </Typography>
        </Box>
      ))}

      {Math.ceil(companies.length / itemsPerPage) > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: '32px 0' }}>
          <Pagination
            count={Math.ceil(companies.length / itemsPerPage)}
            page={page}
            onChange={(_: React.ChangeEvent<unknown>, value: number) => {
              setPage(value);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Container>
  );
}

export default Search;