// src/components/ModifyPortfolio.jsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Grid, Slider, Button, List, ListItem, ListItemText, Divider, Switch, TextField, InputAdornment, FormControlLabel, Checkbox, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Header from './Header';

const ModifyPortfolio = () => {
  const [totalBalance] = useState(10000); // Example value
  const [fundsInvested, setFundsInvested] = useState(7000); // Example value
  const [botAllocations, setBotAllocations] = useState({ wyvern: 2000, basilisk: 3000, hydra: 2000 });
  const [notifications, setNotifications] = useState(true);
  const [rebalanceStrategy, setRebalanceStrategy] = useState(''); // 'risk-adjusted' or 'equal-weighted'
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const totalFundsAvailable = totalBalance - fundsInvested;

  useEffect(() => {
    if (rebalanceStrategy) {
      handleRebalance(rebalanceStrategy);
    }
  }, [rebalanceStrategy]);

  const adjustAllocations = (newAllocations) => {
    const totalNewAllocation = Object.values(newAllocations).reduce((acc, value) => acc + value, 0);

    if (totalNewAllocation > totalBalance) {
      let excess = totalNewAllocation - totalBalance;
      const otherBots = Object.keys(newAllocations);
      const totalOtherAllocations = otherBots.reduce((acc, key) => acc + newAllocations[key], 0);

      if (totalOtherAllocations > 0) {
        otherBots.forEach((otherBot) => {
          const reduction = (newAllocations[otherBot] / totalOtherAllocations) * excess;
          newAllocations[otherBot] = Math.max(0, newAllocations[otherBot] - reduction);
          excess -= reduction;
        });
      }
    }

    setBotAllocations(newAllocations);
    setFundsInvested(Object.values(newAllocations).reduce((acc, val) => acc + val, 0));
  };

  const handleSliderChange = (bot) => (event, newValue) => {
    setRebalanceStrategy('');
    adjustAllocations({ ...botAllocations, [bot]: newValue });
  };

  const handleInputChange = (bot) => (event) => {
    setRebalanceStrategy('');
    const newValue = parseFloat(event.target.value.replace(/[^0-9.-]+/g, "")) || 0;
    adjustAllocations({ ...botAllocations, [bot]: newValue });
  };

  const handleRebalance = (strategy) => {
    let newAllocations = { ...botAllocations };
    if (strategy === 'equal-weighted') {
      const equalValue = totalBalance / Object.keys(newAllocations).length;
      Object.keys(newAllocations).forEach((bot) => {
        newAllocations[bot] = equalValue;
      });
    } else if (strategy === 'risk-adjusted') {
      // Implement risk-adjusted rebalancing logic here
      // For simplicity, let's assume Wyvern is the least risky and Hydra is the most risky
      const weights = { wyvern: 0.5, basilisk: 0.3, hydra: 0.2 };
      Object.keys(newAllocations).forEach((bot) => {
        newAllocations[bot] = totalBalance * weights[bot];
      });
    }
    adjustAllocations(newAllocations);
  };

  const handleSaveAllocations = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Modify Portfolio
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Total Account Balance
              </Typography>
              <Typography variant="h6" component="div">
                ${totalBalance.toFixed(2)}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1">
                  Funds Invested: ${fundsInvested.toFixed(2)}
                </Typography>
                <Typography variant="body1">
                  Funds Available: ${(totalBalance - fundsInvested).toFixed(2)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Bot Allocation
              </Typography>
              <List>
                {Object.entries(botAllocations).map(([bot, amount]) => (
                  <ListItem key={bot}>
                    <ListItemText primary={bot.charAt(0).toUpperCase() + bot.slice(1)} />
                    <Slider
                      value={amount}
                      onChange={handleSliderChange(bot)}
                      aria-labelledby="continuous-slider"
                      min={0}
                      max={totalBalance}
                      sx={{ width: '200px', ml: 2 }}
                    />
                    <TextField
                      value={amount}
                      onChange={handleInputChange(bot)}
                      type="number"
                      inputProps={{ min: 0, max: totalBalance }}
                      sx={{ width: '100px', ml: 2 }}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        inputMode: 'numeric',
                      }}
                    />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 2 }} />
              <FormControlLabel
                control={<Checkbox checked={rebalanceStrategy === 'equal-weighted'} onChange={() => setRebalanceStrategy('equal-weighted')} />}
                label="Equal-Weighted Rebalance"
              />
              <FormControlLabel
                control={<Checkbox checked={rebalanceStrategy === 'risk-adjusted'} onChange={() => setRebalanceStrategy('risk-adjusted')} />}
                label="Risk-Adjusted Rebalance"
              />
              <Divider sx={{ my: 2 }} />
              <Button variant="contained" color="primary" fullWidth onClick={handleSaveAllocations}>
                Save Allocations
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Notification Settings
              </Typography>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="body1">Enable Significant Movement Notifications</Typography>
                <Switch checked={notifications} onChange={(e) => setNotifications(e.target.checked)} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Allocations saved! Your allocations will be rebalanced on the next bot buy/sell events.
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default ModifyPortfolio;

