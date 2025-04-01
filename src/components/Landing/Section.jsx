// src/components/Section.jsx
import React from 'react';
import { Container, Typography, Box, Grid, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useThemeContext } from '../../context/ThemeContext'
import UseCaseCard from './UseCaseCard';
import { Link as RouterLink } from 'react-router-dom';

const Section = ({ id, title, description, lightImage, darkImage, useCases, overlayLightImage, overlayDarkImage }) => {
  const { isDarkMode } = useThemeContext();
  const backgroundImage = isDarkMode ? darkImage : lightImage;
  const overlayImage = isDarkMode ? overlayDarkImage : overlayLightImage;

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const getButtonText = () => {
    switch (id) {
      case 'quantify':
        return 'Meet the team';
      case 'algorithms':
        return 'Browse algos';
      case 'insights':
        return 'Get some insight';
      default:
        return 'Learn More';
    }
  };

  const getButtonLink = () => {
    switch (id) {
      case 'algorithms':
        return '/trading-algorithms';
      default:
        return `/${id}-detail`;
    }
  };

  const showButton = id !== 'use-cases';

  return (
    <Box
      id={id}
      py={5}
      sx={{
        backgroundColor: 'background.default',
        color: 'text.primary',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        zIndex: 1,
        '::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
          zIndex: -1,
        },
      }}
    >
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={variants}
        >
          <Grid container spacing={3} direction={id === 'algorithms' ? 'row-reverse' : 'row'}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h2" gutterBottom>
                {title}
              </Typography>
              <Typography variant="body1" component="p">
                {description}
              </Typography>
              {showButton && (
                <Box display={{ xs: 'none', md: 'flex' }} justifyContent="center" mt={2}>
                  <Button variant="contained" color="primary" component={RouterLink} to={getButtonLink()}>
                    {getButtonText()}
                  </Button>
                </Box>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              {useCases ? (
                <Grid container spacing={3} justifyContent="center">
                  {useCases.map((useCase, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                      <UseCaseCard {...useCase} />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box position="relative">
                  <img src={backgroundImage} alt={title} style={{ width: '100%', opacity: isDarkMode ? 0.5 : 1 }} />
                  {id === 'quantify' && overlayImage && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <img src={overlayImage} alt="Overlay" style={{ width: '100%', height: '100%', objectFit: 'scale-down', opacity: 0.5 }} />
                    </Box>
                  )}
                </Box>
              )}
            </Grid>
            {showButton && (
              <Grid item xs={12} display={{ xs: 'flex', md: 'none' }} justifyContent="center" mt={2}>
              <Button variant="contained" color="primary" component={RouterLink} to={getButtonLink()}>
                {getButtonText()}
              </Button>
            </Grid>
            )}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Section;
