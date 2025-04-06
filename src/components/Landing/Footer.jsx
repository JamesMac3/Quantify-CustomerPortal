// src/components/Footer.jsx
import React from 'react';
import { Container, Typography, Box, Link } from '@mui/material';
import { motion } from 'framer-motion';
import { useThemeContext } from '../../context/ThemeContext';

const Footer = () => {
  const { isDarkMode } = useThemeContext();

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      variants={variants}
    >
      <Box
        sx={{
          backgroundColor: isDarkMode ? '#0a1929' : '#0C7887',
          color: isDarkMode ? '#B4F3E9' : '#ffffff',
          py: 3,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body1">
            &copy; 2025 Quantify investments LLC. All rights reserved.
          </Typography>
          <Typography variant="body2">
            <Link href="#" color="inherit">
              Privacy Policy
            </Link>
            {' | '}
            <Link href="#" color="inherit">
              Terms of Service
            </Link>
          </Typography>
        </Container>
      </Box>
    </motion.div>
  );
};

export default Footer;
