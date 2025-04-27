import { useState, useEffect, useContext } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Paper,
  Chip,
  Modal,
  Button,
  Grid,
  Rating,
  IconButton,
  Stack,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  InputAdornment,
  Divider,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import { useBackendContext } from '@/contexts/hooks/useBackendContext';
import { SearchContext } from '@/contexts/SearchContext';
import { CompanyModal } from '@/components/CompanyModal';
import axios from 'axios';

interface RawCompany {
  company: string;
  esg: any;
  searchResults?: Array<{
    title: string;
    link: string;
    thumbnail?: string;
    images?: string[];
    rich_snippet?: {
      bottom?: {
        detected_extensions?: {
          price_from?: number;
          price_to?: number;
          currency?: string;
          rating?: number;
          reviews?: number;
        };
      };
    };
  }>;
}

interface Product {
  id: number;
  title: string;
  link: string;
  thumbnail: string;
  priceFrom?: number;
  priceTo?: number;
  currency?: string;
  rating?: number;
  reviews?: number;
  favicon: string;
  companyName: string;
  esg: any;
  desc: string; // Added desc property
}

export default function Search() {
  const { backend } = useBackendContext();
  const { searchTerm: q } = useContext(SearchContext);

  const [products, setProducts] = useState<Product[]>([]);
  const [productDBInfo, setProductDBInfo] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState('esg');
  const [filterOpen, setFilterOpen] = useState(false);

  const [companyModalOpen, setCompanyModalOpen] = useState(false);

  const ProductRow = ({ prod, setSelectedProduct, dbInfo }) => {
    const [imgSrc, setImgSrc] = useState(prod.thumbnail); // Initially, set the image to the thumbnail
    const [loading, setLoading] = useState(true); // Loading state for the image fetch
    const [error, setError] = useState(null); // Error state for handling failed requests
  
    useEffect(() => {
      console.log("DB Info:", dbInfo);
      console.log("Product db info:", productDBInfo);
    }, [dbInfo]);
  
    return (
      <Box
        key={prod.id}
        sx={{
          display: 'table-row',
          bgcolor: 'background.paper',
          boxShadow: '0 2px 5px rgba(0,0,0,0.08)',
          borderRadius: '8px',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          },
        }}
      >
        {/* Product */}
        <Box sx={{ display: 'table-cell', p: 2, verticalAlign: 'middle', borderRadius: '8px 0 0 8px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: 1,
                overflow: 'hidden',
                bgcolor: 'rgba(0, 0, 0, 0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
              }}
            >
              <img
                src={dbInfo.img} // Use the imgSrc state to dynamically update the image source
                alt={prod.title}
                style={{ width: '75px', height: '75px', objectFit: 'contain' }}
              />
            </Box>
            <Typography
              variant="subtitle1"
              fontWeight="medium"
              sx={{
                maxWidth: '200px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {prod.title}
            </Typography>
          </Box>
        </Box>
  
        {/* Company */}
        <Box sx={{ display: 'table-cell', p: 2, verticalAlign: 'middle' }}>
          <Typography variant="body2" color="text.primary">
            {prod.companyName}
          </Typography>
        </Box>
  
        {/* ESG Score */}
        <Box sx={{ display: 'table-cell', p: 2, verticalAlign: 'middle', textAlign: 'center' }}>
          <Chip
            label={prod.esg?.totalEsg?.normalized?.toFixed(1) || 'N/A'}
            color="success"
            size="small"
            sx={{ fontWeight: 'bold', minWidth: '60px' }}
          />
        </Box>
  
        {/* Price */}
        <Box sx={{ display: 'table-cell', p: 2, verticalAlign: 'middle', textAlign: 'center' }}>
          <Typography variant="body1" fontWeight="bold" color="primary">
            {Array.from({ length: Math.floor(Math.random() * 2) + 1 }).map(() => '$').join('')}
          </Typography>
        </Box>
  
        {/* Rating */}
        <Box sx={{ display: 'table-cell', p: 2, verticalAlign: 'middle', textAlign: 'center' }}>
          {(() => {
            const randomRating = (Math.random() + 4).toFixed(1); // Random value between 4.0 and 5.0
            return (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body2" fontWeight="bold" mr={0.5}>
                  {randomRating}
                </Typography>
                <Rating
                  value={parseFloat(randomRating)} // Ensure the value matches the Typography rating
                  precision={0.5}
                  readOnly
                  size="small"
                />
              </Box>
            );
          })()}
        </Box>
  
        {/* Actions */}
        <Box sx={{ display: 'table-cell', p: 2, verticalAlign: 'middle', textAlign: 'right', borderRadius: '0 8px 8px 0' }}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => {
              console.log(prod.companyName);
              setSelectedProduct(prod);
            }}
            sx={{ borderRadius: '4px', textTransform: 'none', backgroundColor: 'green', '&:hover': { backgroundColor: 'darkgreen' } }}
          >
            View
          </Button>
        </Box>
      </Box>
    );
  };


  const itemsPerPage = 10;

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setError(null);
  
      try {
        const resp = await backend.post<RawCompany[]>('/companies/search', { searchTerm: q });
        const raw = resp.data;
        console.log(raw);
        const mapped: Product[] = raw
          .map((companyItem, idx) => {
            const first = companyItem.searchResults?.[0];
            if (!first) return null;
  
            const extensions = first.rich_snippet?.bottom?.detected_extensions || {};
  
            return {
              id: idx,
              title: first.title,
              link: first.link,
              thumbnail: first.thumbnail || '../../../public/imgs/logo.png',
              priceFrom: extensions.price_from,
              priceTo: extensions.price_to,
              currency: extensions.currency,
              rating: extensions.rating,
              reviews: extensions.reviews,
              companyName: companyItem.company,
              esg: companyItem.esg,
            };
          })
          .filter((p): p is Product => p !== null);
  
        setProducts(mapped);
        setPage(1);
        console.log('Products:', mapped);
  
        // Fetch the product DB info for each companyName
        const fetchDBInfo = async () => {
          const dbInfoPromises = mapped.map(async (product) => {
            if (product?.companyName) {
              try {
                const dbResp = (await backend.get(`/companies/${product.companyName}`)).data.company;
                console.log(`DB info for ${product.companyName}:`, dbResp);
                return { dbResp };
              } catch (err) {
                console.error(`Failed to fetch DB info for ${product.companyName}:`, err);
                return { companyName: product.companyName, dbInfo: null };
              }
            }
            return { companyName: product.companyName, dbInfo: null };
          });
  
          // Wait for all DB info requests to complete
          const dbInfo = await Promise.all(dbInfoPromises);
          setProductDBInfo(dbInfo);
        };
  
        fetchDBInfo();
      } catch (err: any) {
        setError(err.message || 'Failed to fetch products');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [q, backend]);

  const displayed = products.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
        <CircularProgress size={60} thickness={4} sx={{ mb: 3 }} />
        <Typography variant="h5" align="center" fontWeight="medium">
          Loading Products...
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mt: 1 }}>
          Please wait while we fetch sustainable products for you
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Paper sx={{ p: 5, textAlign: 'center', borderRadius: '8px', bgcolor: '#FFF5F5' }}>
          <Typography variant="h5" color="error" align="center" fontWeight="bold" gutterBottom>
            Something went wrong
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 3, maxWidth: '600px', mx: 'auto' }}>
            {error}
          </Typography>
          <Button variant="contained" color="primary" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4, marginTop: '80px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Search Results
        </Typography>
        {/* <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={() => setFilterOpen(!filterOpen)}
            sx={{ borderRadius: '4px', textTransform: 'none', fontWeight: 'medium' }}
          >
            Filter
          </Button>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
            <Select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              displayEmpty
              startAdornment={<SortIcon sx={{ mr: 1, color: 'text.secondary' }} />}
              sx={{ borderRadius: '4px' }}
            >
              <MenuItem value="esg">ESG Score: High to Low</MenuItem>
              <MenuItem value="price_low">Price: Low to High</MenuItem>
              <MenuItem value="price_high">Price: High to Low</MenuItem>
              <MenuItem value="rating">Rating: High to Low</MenuItem>
            </Select>
          </FormControl>
        </Box> */}
      </Box>

      {filterOpen && (
        <Paper sx={{ p: 3, mb: 3, bgcolor: '#F9FAFB', borderRadius: '8px' }} elevation={1}>
          <Typography variant="h6" gutterBottom>
            Filter Options
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Search Products"
                variant="outlined"
                defaultValue={q}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>ESG Rating</InputLabel>
                <Select
                  label="ESG Rating"
                  value="all"
                >
                  <MenuItem value="all">All Ratings</MenuItem>
                  <MenuItem value="high">High (8-10)</MenuItem>
                  <MenuItem value="medium">Medium (5-7)</MenuItem>
                  <MenuItem value="low">Low (0-4)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Product Category</InputLabel>
                <Select
                  label="Product Category"
                  value="all"
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  <MenuItem value="electronics">Electronics</MenuItem>
                  <MenuItem value="clothing">Clothing</MenuItem>
                  <MenuItem value="home">Home & Kitchen</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" sx={{ mr: 1 }}>Apply Filters</Button>
            <Button variant="outlined" onClick={() => setFilterOpen(false)}>Cancel</Button>
          </Box>
        </Paper>
      )}

      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
        {q
          ? `Showing products for "${q}" • ${products.length} items`
          : `Showing all ${products.length} items`}
      </Typography>

      {displayed.length > 0 ? (
        <>
          <Box sx={{ mb: 4, overflowX: 'auto' }}>
            <Box sx={{ minWidth: '100%', display: 'table', borderSpacing: '0 16px', borderCollapse: 'separate' }}>
              {/* Table Header */}
              <Box sx={{ display: 'table-header-group' }}>
                <Box sx={{ display: 'table-row' }}>
                  <Box sx={{ display: 'table-cell', p: 2, fontWeight: 'bold', color: 'text.secondary', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Product</Box>
                  <Box sx={{ display: 'table-cell', p: 2, fontWeight: 'bold', color: 'text.secondary', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Company</Box>
                  <Box sx={{ display: 'table-cell', p: 2, fontWeight: 'bold', color: 'text.secondary', borderBottom: '1px solid rgba(0, 0, 0, 0.12)', textAlign: 'center' }}>ESG Score</Box>
                  <Box sx={{ display: 'table-cell', p: 2, fontWeight: 'bold', color: 'text.secondary', borderBottom: '1px solid rgba(0, 0, 0, 0.12)', textAlign: 'center' }}>Price</Box>
                  <Box sx={{ display: 'table-cell', p: 2, fontWeight: 'bold', color: 'text.secondary', borderBottom: '1px solid rgba(0, 0, 0, 0.12)', textAlign: 'center' }}>Rating</Box>
                  <Box sx={{ display: 'table-cell', p: 2, fontWeight: 'bold', color: 'text.secondary', borderBottom: '1px solid rgba(0, 0, 0, 0.12)', textAlign: 'right' }}>Actions</Box>
                </Box>
              </Box>

              {/* Table Body */}
              <Box sx={{ display: 'table-row-group' }}>
                {displayed.map((prod) => (
                  <ProductRow
                    key={prod.id}
                    prod={prod}
                    setSelectedProduct={setSelectedProduct}
                    dbInfo={productDBInfo.find(info => info.dbResp.name === prod.companyName)?.dbResp}
                  />
                ))}
                {/* Company Modal */}
                {selectedProduct && (
                  <CompanyModal
                    open={selectedProduct !== null} // Modal open when a product is selected
                    onClose={() => setSelectedProduct(null)} // Close when modal is closed
                    companyName={selectedProduct.companyName}
                    esg={selectedProduct.esg}
                    desc={productDBInfo.find(info => info.dbResp.name === selectedProduct.companyName)?.dbResp?.desc}
                  />)}
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Button
                variant="outlined"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                sx={{ minWidth: '40px', borderRadius: '4px' }}
              >
                &lt;
              </Button>

              {Array.from({ length: Math.min(5, Math.ceil(products.length / itemsPerPage)) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <Button
                    key={pageNum}
                    variant={pageNum === page ? "contained" : "outlined"}
                    onClick={() => setPage(pageNum)}
                    sx={{
                      minWidth: '40px',
                      borderRadius: '4px',
                      fontWeight: 'bold'
                    }}
                  >
                    {pageNum}
                  </Button>
                );
              })}

              {Math.ceil(products.length / itemsPerPage) > 5 && (
                <>
                  <Typography variant="body2">...</Typography>
                  <Button
                    variant="outlined"
                    onClick={() => setPage(Math.ceil(products.length / itemsPerPage))}
                    sx={{ minWidth: '40px', borderRadius: '4px' }}
                  >
                    {Math.ceil(products.length / itemsPerPage)}
                  </Button>
                </>
              )}

              <Button
                variant="outlined"
                disabled={page === Math.ceil(products.length / itemsPerPage)}
                onClick={() => setPage(page + 1)}
                sx={{ minWidth: '40px', borderRadius: '4px' }}
              >
                &gt;
              </Button>
            </Stack>
          </Box>
        </>
      ) : (
        <Paper sx={{ p: 5, textAlign: 'center', borderRadius: '8px' }}>
          <Box sx={{ mb: 3 }}>
            <SearchIcon sx={{ fontSize: 60, color: 'text.secondary', opacity: 0.5 }} />
          </Box>
          <Typography variant="h5" fontWeight="bold" gutterBottom>No products found</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '500px', mx: 'auto', mb: 3 }}>
            We couldn't find any products matching your search criteria. Try adjusting your search terms or filters.
          </Typography>
          <Button variant="contained" onClick={() => window.location.href = '/search'}>
            Clear Filters
          </Button>
        </Paper>
      )}

      {/* Product Detail Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="product-detail-modal"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '80%', md: '70%' },
          maxWidth: 800,
          bgcolor: 'background.paper',
          borderRadius: 8,
          boxShadow: 24,
          p: 4,
          maxHeight: '90vh',
          overflow: 'auto'
        }}>
          {selectedProduct && (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" component="h2" fontWeight="bold">
                  {selectedProduct.title}
                </Typography>
                <IconButton onClick={() => setModalOpen(false)} aria-label="close">
                  <CloseIcon />
                </IconButton>
              </Box>

              <Grid container spacing={4}>
                <Grid item xs={12} md={5}>
                  <Card elevation={0} sx={{ bgcolor: 'rgba(0, 0, 0, 0.02)', borderRadius: 2 }}>
                    <CardMedia
                      component="img"
                      sx={{ width: '100%', height: 300, objectFit: 'contain', p: 2 }}
                      image={selectedProduct.thumbnail}
                      alt={selectedProduct.title}
                    />
                  </Card>

                  <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      Company Information
                    </Typography>
                    <Paper sx={{ p: 2, borderRadius: 2 }}>
                      <Typography variant="body1" fontWeight="medium">
                        {selectedProduct.companyName}
                      </Typography>
                      <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        <Chip label="Sustainable" color="success" size="small" />
                        <Chip label="Eco-Friendly" color="success" size="small" />
                      </Box>
                    </Paper>
                  </Box>
                </Grid>

                <Grid item xs={12} md={7}>
                  <Box>
                    {selectedProduct.priceFrom !== null && selectedProduct.priceFrom !== undefined && (
                      <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
                        {selectedProduct.priceTo !== null && selectedProduct.priceTo !== undefined
                          ? `${selectedProduct.currency || '$'}${selectedProduct.priceFrom} - ${selectedProduct.currency || '$'}${selectedProduct.priceTo}`
                          : `${selectedProduct.currency || '$'}${selectedProduct.priceFrom}`}
                      </Typography>
                    )}

                    {selectedProduct.rating !== null && selectedProduct.rating !== undefined && (
                      <Box display="flex" alignItems="center" mb={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="h6" fontWeight="bold" mr={1}>
                            {selectedProduct.rating.toFixed(1)}
                          </Typography>
                          <Rating
                            value={selectedProduct.rating}
                            precision={0.5}
                            readOnly
                            size="medium"
                          />
                        </Box>
                        <Typography variant="body1" color="text.secondary" ml={1}>
                          ({selectedProduct.reviews ?? 0} reviews)
                        </Typography>
                      </Box>
                    )}

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      ESG Ratings
                    </Typography>

                    <Grid container spacing={2} sx={{ mb: 3 }}>
                      <Grid item xs={6}>
                        <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e8f5e9', borderRadius: 2 }}>
                          <Typography variant="body2" color="text.secondary">Overall ESG</Typography>
                          <Typography variant="h4" fontWeight="bold">{selectedProduct.esg?.totalEsg?.normalized?.toFixed(1) || 'N/A'}</Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={6}>
                        <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e3f2fd', borderRadius: 2 }}>
                          <Typography variant="body2" color="text.secondary">Environment</Typography>
                          <Typography variant="h4" fontWeight="bold">{selectedProduct.esg?.environment?.normalized?.toFixed(1) || 'N/A'}</Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={6}>
                        <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#fff3e0', borderRadius: 2 }}>
                          <Typography variant="body2" color="text.secondary">Social</Typography>
                          <Typography variant="h4" fontWeight="bold">{selectedProduct.esg?.social?.normalized?.toFixed(1) || 'N/A'}</Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={6}>
                        <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#f3e5f5', borderRadius: 2 }}>
                          <Typography variant="body2" color="text.secondary">Governance</Typography>
                          <Typography variant="h4" fontWeight="bold">{selectedProduct.esg?.governance?.normalized?.toFixed(1) || 'N/A'}</Typography>
                        </Paper>
                      </Grid>
                    </Grid>

                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      Product Description
                    </Typography>
                    <Typography variant="body1" paragraph>
                      This product is offered by {selectedProduct.companyName}, a company with an ESG score of {selectedProduct.esg?.totalEsg?.normalized?.toFixed(1) || 'N/A'}.
                      The company demonstrates strong commitment to sustainable practices and ethical business operations.
                    </Typography>

                    <Box sx={{ mt: 4 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        startIcon={<ShoppingCartIcon />}
                        onClick={() => window.open(selectedProduct.link, '_blank')}
                        sx={{ py: 1.5, borderRadius: 2, textTransform: 'none', fontWeight: 'bold' }}
                      >
                        View on Retailer Website
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </>
          )}
        </Box>
      </Modal>
    </Container>
  );
}
