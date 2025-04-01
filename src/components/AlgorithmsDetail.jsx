// src/components/AlgorithmsDetail.jsx
import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const AlgorithmsDetail = () => (
  <Container>
    <Box my={4}>
      <Typography variant="h3" component="h1" gutterBottom>
        Smart Trading Algorithms
      </Typography>
      <Typography variant="body1">
        Quantify offers advanced trading algorithms that adapt to market conditions in real-time to maximize your trading potential.
      </Typography>
    </Box>
  </Container>
);

export default AlgorithmsDetail;
