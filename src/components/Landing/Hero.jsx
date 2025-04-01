import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Typing from 'react-typing-effect';
import { useThemeContext } from '../../context/ThemeContext';
import { useTheme } from '@mui/material/styles';

const Hero = () => {
  const { isDarkMode } = useThemeContext();
  const theme = useTheme();
  const videoSrc = isDarkMode ? '/videos/stockdarkloop.mp4' : '/videos/stocklight.mp4';

  const primaryColor = theme.palette.primary.main;
  const seaGreenColor = '#2E8B57'; // Sea green color

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', // Adjusted height
        overflow: 'hidden',
        
      }}
    >
      <video
        key={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        preload="auto" // Preload attribute added
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: 'translate(-50%, -50%)',
          zIndex: -1,
        }}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0)',
          zIndex: 0,
        }}
      />
      <Container maxWidth="md" sx={{ textAlign: 'center', zIndex: 1 }}>
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontSize: { xs: '2rem', md: '4rem' }, 
            color: isDarkMode ? '#B4F3E9' : '#ffffff' 
          }}
        >
          <Typing
            text={['Quantify', 'Launching in September']}
            speed={100}
            eraseSpeed={50}
            typingDelay={500}
            eraseDelay={4000}
            cursorClassName="typing-cursor"
            displayTextRenderer={(text, i) => {
              return (
                <span>
                  {text.split('').map((char, i) => (
                    <span key={i}>{char}</span>
                  ))}
                </span>
              );
            }}
          />
        </Typography>
        <Typography variant="h5" component="p" sx={{ color: isDarkMode ? '#B4F3E9' : '#ffffff'  }}>
          Automated Trading Platform
        </Typography>
      </Container>
    </Box>
  );
};

export default Hero;
