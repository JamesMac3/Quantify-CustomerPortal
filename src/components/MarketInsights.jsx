// src/components/MarketInsights.jsx
import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, Switch, FormControlLabel, Box, Alert, IconButton, Collapse, Grid } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDrag } from '@use-gesture/react';

const MarketInsights = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes in seconds
  const theme = useTheme();
  const controls = useAnimation();

  useEffect(() => {
    let timer;
    if (notificationVisible) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setNotificationVisible(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [notificationVisible]);

  const handleToggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    setNotificationVisible(!notificationsEnabled);
    setTimeRemaining(1800); // Reset timer to 30 minutes
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const bind = useDrag(
    ({ down, movement: [mx], memo = notificationVisible }) => {
      if (!down && mx > window.innerWidth * 0.5) {
        controls.start({ x: window.innerWidth, opacity: 0, transition: { duration: 0.3 } });
        setTimeout(() => setNotificationVisible(false), 300);
      } else if (!down) {
        controls.start({ x: 0, opacity: 1 });
      } else {
        controls.start({ x: mx, opacity: 1 - Math.min(mx / (window.innerWidth * 0.75), 1) });
      }
      return memo;
    },
    { axis: 'x', filterTaps: true }
  );

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <Container>
      {notificationVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%', zIndex: 1000, marginTop: '24px' }}
        >
          <Box
            {...bind()}
            sx={{
              bgcolor: theme.palette.mode === 'dark' ? '#333333' : theme.palette.background.paper,
              borderRadius: '8px',
              boxShadow: 1,
              overflow: 'hidden',
              width: '100%',
              cursor: 'grab',
              mb: 2,
              touchAction: 'none', // Prevents default touch behavior on mobile
            }}
            component={motion.div}
            animate={controls}
          >
            <Alert
              severity="warning"
              sx={{
                width: '100%',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              action={
                <IconButton
                  color="inherit"
                  size="small"
                  onClick={handleExpandClick}
                  sx={{
                    transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  <ExpandMoreIcon />
                </IconButton>
              }
            >
              <Box sx={{ flexGrow: 1, textAlign: 'left' }}>
                <Typography variant="h6" component="p" gutterBottom>
                  Limited Market Opportunity
                </Typography>
                <Typography variant="body2" component="p">
                  Time remaining: {formatTime(timeRemaining)}
                </Typography>
              </Box>
            </Alert>
            <Collapse in={expanded}>
              <Box sx={{ p: 2 }}>
                <Typography variant="body2" component="p">
                  Detected volatile crypto market, users should move funds to Hydra bot for maximum gains.
                </Typography>
              </Box>
            </Collapse>
          </Box>
        </motion.div>
      )}
      <Typography variant="h4" component="h1" gutterBottom>
        Market Insights
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Real-Time Insight Notifications
              </Typography>
              <Typography variant="body1" gutterBottom>
                Stay updated with real-time market insights and notifications from a Registered Investment Advisor. All notificaitons are legally finaical adivce. Enable notifications to receive alerts about limited market opportunities and more.
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationsEnabled}
                    onChange={handleToggleNotifications}
                    color="primary"
                  />
                }
                label="Enable Notifications"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MarketInsights;
