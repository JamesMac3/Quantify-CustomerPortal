// src/components/UseCaseCard.jsx
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useThemeContext } from '../../context/ThemeContext';

const UseCaseCard = ({ title, description, icon }) => {
  const { isDarkMode } = useThemeContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: isDarkMode ? '#0a1929' : '#ffffff',
          color: isDarkMode ? '#B4F3E9' : '#000000',
          boxShadow: isDarkMode
            ? '0 3px 5px rgba(255, 255, 255, 0.1)'
            : '0 3px 5px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box sx={{ pt: 2 }}>{icon}</Box>
        <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography>{description}</Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UseCaseCard;
