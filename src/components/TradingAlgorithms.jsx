// src/components/TradingAlgorithms.jsx
import React from 'react';
import { Container, Typography, Box, Card, CardHeader, Stepper, Step, StepLabel, StepContent, Button, Paper, CardContent, Grid, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CustomActiveShapePieChart from './CustomActiveShapePieChart';

const tradingAlgorithms = [
  {
    title: 'Wyvern Savings',
    description: 'Conservative Bot for Safe Growth',
    details: `This bot intends to beat inflation and conserve the value of your money over time by trading with and against the market at the same time.`,
    strategy: `As the market declines, the position shifts to holding bonds, and when the market rises, it buys an index. The algorithm uses three different indicators, each tailored to a specific sector traditionally associated with overall market volatility. These indicators constantly change in priority to make decisions about buying as the market rises. The bot is reinforced with dynamic auto-adjusting trailing stop-loss to protect your capital. This is known as a dynamic asset allocation strategy, and it is our standard recommendation for long-term holdings.`,
    image: '/Dragons/dragonwest.webp',
    backgroundColor: '#4B0082', // Indigo color
    performance: { '1D': 1, '5D': 2, '1M': 5, '6M': 10, 'YTD': 20, '1Y': 30 },
    metrics: [
      { name: 'Safety', value: 50, color: '#ffc658' },
      { name: 'Reward', value: 20, color: '#8884d8' },
      { name: 'Diversification', value: 10, color: '#82ca9d' },
      { name: 'Leverage', value: 0, color: '#ff7300' },
      { name: 'Fees', value: 5, color: '#d0ed57' },
    ],
  },
  {
    title: 'Basilisk Ventures',
    description: 'Aggressive Bot for High Returns',
    details: `This bot aims to maximize returns by taking advantage of market volatility.`,
    strategy: `The Basilisk bot employs a high-frequency trading strategy that exploits small price movements. It uses advanced machine learning models to predict short-term trends and executes trades at lightning speed.`,
    image: '/Dragons/dragoneast.png',
    backgroundColor: '#8B0000', // Dark Red color
    performance: { '1D': -1, '5D': 3, '1M': 4, '6M': 8, 'YTD': 18, '1Y': 25 },
    metrics: [
      { name: 'Risk/Reward', value: 50, color: '#8884d8' },
      { name: 'Diversification', value: 10, color: '#82ca9d' },
      { name: 'Safety', value: 10, color: '#ffc658' },
      { name: 'Leverage', value: 30, color: '#ff7300' },
      { name: 'Fees', value: 5, color: '#d0ed57' },
    ],
  },
  {
    title: 'Hydra Capital',
    description: 'Balanced Bot for Steady Growth',
    details: `This bot seeks to balance risk and reward by diversifying investments across multiple asset classes.`,
    strategy: `Hydra Capital utilizes a multi-asset approach, investing in stocks, bonds, and commodities. The bot dynamically adjusts its portfolio based on market conditions, ensuring steady growth while minimizing risk.`,
    image: '/Dragons/hydra.png',
    backgroundColor: '#2E8B57', // Sea Green color
    performance: { '1D': 0.5, '5D': 1.5, '1M': 3, '6M': 6, 'YTD': 15, '1Y': 20 },
    metrics: [
      { name: 'Risk/Reward', value: 50, color: '#8884d8' },
      { name: 'Diversification', value: 50, color: '#82ca9d' },
      { name: 'Safety', value: 0, color: '#ffc658' },
      { name: 'Leverage', value: 0, color: '#ff7300' },
      { name: 'Fees', value: 30, color: '#d0ed57' },
    ],
  },
];

const steps = [
  {
    label: 'Create an Account and Broker Account',
    description: 'Sign up for an account on our platform and create a broker account.',
  },
  {
    label: 'KYC and Bank Account Funding',
    description: 'Complete the KYC verification process and fund your bank account.',
  },
  {
    label: 'Choose Your Bots and Relax',
    description: 'Select your preferred trading bots and let them do the trading for you.',
  },
];

const TradingAlgorithms = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Trading Algorithms
      </Typography>
      <Typography variant="h6" component="p" gutterBottom>
        Quantify offers advanced trading algorithms that adapt to market conditions in real-time to maximize your trading potential. Hooking up is easy, and we handle the KYC verification and account setup. This process typically takes a couple of days, but users can play around with paper-based trading until then.
      </Typography>
      <Card>
        <CardContent>
          <CardHeader title="It's so easy!" />
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel>{step.label}</StepLabel>
                <StepContent>
                  <Typography>{step.description}</Typography>
                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                        disabled={index === steps.length - 1}
                      >
                        Next
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>All steps completed - you're finished</Typography>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Reset
              </Button>
            </Paper>
          )}
        </CardContent>
      </Card>
      <Grid container spacing={3} justifyContent="center" alignItems="flex-start">
        {tradingAlgorithms.map((algo, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card
              sx={{
                position: 'relative',
                backgroundImage: `url(${algo.image})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                color: '#ffffff',
                backgroundColor: algo.backgroundColor,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: algo.backgroundColor,
                  opacity: 0.8,
                  zIndex: 1,
                },
              }}
            >
              <CardContent sx={{ position: 'relative', zIndex: 2 }}>
                <Typography variant="h5" component="h2">
                  {algo.title}
                </Typography>
                <Typography variant="subtitle1" color="inherit">
                  {algo.description}
                </Typography>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Bot Trading Strategy Description</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{algo.strategy}</Typography>
                  </AccordionDetails>
                </Accordion>
                <Box mt={2}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" component="div">
                        Performance
                      </Typography>
                      <Grid container direction="row" justifyContent="center" alignItems="flex-start" spacing={2}>
                        {Object.entries(algo.performance).map(([key, value]) => (
                          <Grid item key={key} sx={{ maxWidth: 100, minWidth: 60 }}>
                            <Card sx={{ backgroundColor: 'transparent', color: theme.palette.text.primary, padding: 1, textAlign: 'center' }}>
                              <Typography variant="body2">{key}</Typography>
                              <Typography variant="h6" sx={{ color: value > 0 ? 'neon green' : 'crimson red' }}>
                                {`${value > 0 ? '▲' : '▼'}${Math.abs(value)}%`}
                              </Typography>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                      </CardContent>
                  </Card>
                  <Card mt={2}>
                    <CardContent>
                      <Typography variant="h6" component="div">
                        Bot Metrics
                      </Typography>
                      <Box sx={{ width: '100%', height: 300 }}>
                        <CustomActiveShapePieChart data={algo.metrics} />
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TradingAlgorithms;
