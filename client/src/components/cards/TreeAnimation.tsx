import React from 'react';
import { Box } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTree } from '@fortawesome/free-solid-svg-icons';

// Keyframes for the rotation animation
const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Styled component for the animated tree
const SpinningTree = styled(FontAwesomeIcon)({
  animation: `${spinAnimation} 5s infinite linear`, // 5 seconds, infinite, linear rotation
  fontSize: '80px', // Adjust the size as needed
  color: '#81c784', // A nice green color, you can change it
  display: 'inline-block', // Ensure proper alignment and spacing if needed
});

const TreeAnimation = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%" // Make sure the container takes up space
    >
      <SpinningTree icon={faTree} />
    </Box>
  );
};

export default TreeAnimation;
