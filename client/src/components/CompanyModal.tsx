import React from 'react';
import { Modal, Box, Typography, Button, IconButton, Rating, LinearProgress, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ESGScores {
  totalEsg: { normalized: number };
  peerEnvironmentPerformance: { normalized: number };
  peerSocialPerformance: { normalized: number };
  peerGovernancePerformance: { normalized: number };
}

interface CompanyModalProps {
  open: boolean;
  onClose: () => void;
  companyName: string;
  esg: ESGScores;
  link: string;
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  maxHeight: '90vh',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
  overflowY: 'auto',
};

export const CompanyModal: React.FC<CompanyModalProps> = ({ open, onClose, companyName, esg, link }) => {

    const handleGoToSeller = () => {
        window.open(link, '_blank');
    };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="company-modal-title" aria-describedby="company-modal-description">
      <Box sx={style}>
        {/* Title and Rating */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography id="company-modal-title" variant="h6">{companyName}</Typography>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            {/* <Rating value={4.8} precision={0.1} readOnly size="small" /> */}
            {/* <Typography variant="body2" color="text.secondary">(243 reviews)</Typography> */}
            <IconButton onClick={onClose} size="small" edge="end" aria-label="close">
                <CloseIcon />
            </IconButton>
          </Stack>
        </Box>

        {/* Image Placeholder
        <Box position="relative" mb={2} height={200} bgcolor="#f0f0f0" borderRadius={1} display="flex" alignItems="center" justifyContent="center">
          <Typography color="text.secondary">Product Image</Typography>
          <IconButton sx={{ position: 'absolute', left: 8 }}>
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          <IconButton sx={{ position: 'absolute', right: 8 }}>
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Box> */}

        {/* ESG Scores */}
        <Box mb={3}>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>Company Eco Rating</Typography>

          {[
            { label: 'Total ESG Score', value: esg.totalEsg.normalized * 100 },
            { label: 'Environment', value: esg.peerEnvironmentPerformance.normalized * 100 },
            { label: 'Social', value: esg.peerSocialPerformance.normalized * 100 },
            { label: 'Governance', value: esg.peerGovernancePerformance.normalized * 100 }
          ].map((item) => (
            <Box key={item.label} mb={1}>
              <Typography variant="body2" mb={0.5}>{item.label}</Typography>
              <LinearProgress variant="determinate" value={item.value} sx={{
                height: 8,
                borderRadius: 5,
                backgroundColor: '#e0e0e0',
                '& .MuiLinearProgress-bar': { backgroundColor: 'green' }
              }} />
            </Box>
          ))}

          <Typography variant="body2" color="text.secondary" mt={1}>
            Industry ESG Percentile: Top {100 - esg.totalEsg.normalized * 100}%
          </Typography>
        </Box>

        {/* Product Description */}
        <Box mb={3}>
          <Typography id="company-modal-description" variant="subtitle1" fontWeight="bold" mb={1}>
            Company Description
          </Typography>
          <Typography variant="body2" color="text.secondary">
            "This will be description of the company. It will be a long description that will be used to describe the product in detail. This will be description of the product. It will be a long description that will be used to describe the product in detail."
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={handleGoToSeller} sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: 'darkgreen' } }} fullWidth>
            Go to Seller
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
