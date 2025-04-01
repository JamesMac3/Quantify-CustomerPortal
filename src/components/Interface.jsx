// src/components/Interface.jsx
import React from 'react';
import { Box, Card, CardContent, CardHeader, Chip, Grid, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { AreaChart, Area, XAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useTheme } from '@mui/material/styles';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
const generateDemoData = () => {
  const dates = ['2023-04-01', '2023-04-15', '2023-05-01', '2023-05-15', '2023-06-01', '2023-06-15', '2023-07-01'];
  return dates.map((date, index) => ({
    date,
    Wyvern: parseFloat((1000 + index * 200 + Math.random() * 100).toFixed(2)),
    Basilisk: parseFloat((800 + index * 180 + Math.random() * 100).toFixed(2)),
    Hydra: parseFloat((900 + index * 210 + Math.random() * 100).toFixed(2)),
  }));
};

const demoData = generateDemoData();

const tradeData = [
  { id: 1, bot: 'Wyvern', entry: '2023-06-01', exit: '2023-06-10', profit: 200.00 },
  { id: 2, bot: 'Basilisk', entry: '2023-06-05', exit: '2023-06-15', profit: 300.00 },
  { id: 3, bot: 'Hydra', entry: '2023-06-07', exit: '2023-06-17', profit: 250.00 },
];

const botStates = [
  { bot: 'Wyvern', state: 'Waiting' },
  { bot: 'Basilisk', state: 'Analyzing Entry' },
  { bot: 'Hydra', state: 'Trading' },
];

const formatCurrency = (value) => {
  return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const getAccountTotal = (data) => {
  const lastEntry = data[data.length - 1];
  const total = lastEntry.Wyvern + lastEntry.Basilisk + lastEntry.Hydra;
  return total;
};

const getEndingTotals = (data) => {
  const lastEntry = data[data.length - 1];
  return {
    Wyvern: lastEntry.Wyvern,
    Basilisk: lastEntry.Basilisk,
    Hydra: lastEntry.Hydra,
  };
};

const calculatePercentageChange = (data) => {
  const firstEntry = data[0];
  const lastEntry = data[data.length - 1];
  const initialTotal = firstEntry.Wyvern + firstEntry.Basilisk + firstEntry.Hydra;
  const finalTotal = lastEntry.Wyvern + lastEntry.Basilisk + lastEntry.Hydra;
  const percentageChange = ((finalTotal - initialTotal) / initialTotal) * 100;
  return percentageChange.toFixed(2);
};

const Interface = () => {
  const theme = useTheme();
  const accountTotal = getAccountTotal(demoData);
  const formattedAccountTotal = formatCurrency(accountTotal);
  const endingTotals = getEndingTotals(demoData);
  const percentageChange = calculatePercentageChange(demoData);

  const wyvernColor = theme.palette.primary.main;
  const basiliskColor = theme.palette.secondary.main;
  const hydraColor = theme.palette.warning.main;

  const pieData = [
    { name: 'Wyvern', value: endingTotals.Wyvern, color: wyvernColor },
    { name: 'Basilisk', value: endingTotals.Basilisk, color: basiliskColor },
    { name: 'Hydra', value: endingTotals.Hydra, color: hydraColor },
  ];

  return (
    <Box p={2}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Typography variant="h6">Account Total:</Typography>
                  <Box display="flex" alignItems="center" color="green">
                    <Typography variant="h6">
                      {formattedAccountTotal}
                    </Typography>
                    <Box display="flex" alignItems="center" ml={1}>
                      <ArrowDropUpIcon/>
                      <Typography variant="h6">
                        {`+${percentageChange}%`}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              }
            />
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={demoData}>
                  <XAxis dataKey="date" />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="Wyvern" stroke={wyvernColor} fill={wyvernColor} stackId="total" />
                  <Area type="monotone" dataKey="Basilisk" stroke={basiliskColor} fill={basiliskColor} stackId="total" />
                  <Area type="monotone" dataKey="Hydra" stroke={hydraColor} fill={hydraColor} stackId="total" />
                </AreaChart>
              </ResponsiveContainer>
              <Box mt={2}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} justifyContent="center">
                  {botStates.map(({ bot, state }) => (
                    <Chip
                      key={bot}
                      label={`${bot}: ${state}`}
                      color={state === 'Trading' ? 'success' : state === 'Analyzing Entry' ? 'warning' : 'default'}
                    />
                  ))}
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader title="Trade History" />
            <CardContent>
              <DataGrid
                rows={tradeData}
                columns={[
                  { field: 'bot', headerName: 'Bot', width: 150 },
                  { field: 'entry', headerName: 'Trade Entry', width: 150 },
                  { field: 'exit', headerName: 'Trade Exit', width: 150 },
                  { field: 'profit', headerName: 'Profit', width: 150 },
                ]}
                pageSize={5}
                rowsPerPageOptions={[5]}
                autoHeight
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Portfolio Diversity" />
            <CardContent>
              <Box display="flex" justifyContent="center">
                <ResponsiveContainer width={200} height={200}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      innerRadius={76}
                      outerRadius={99}
                      paddingAngle={5}
                      cornerRadius={3}
                      startAngle={-180}
                      endAngle={180}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              <Box mt={2} textAlign="center">
                {pieData.map((entry, index) => (
                  <Typography key={index} variant="body1">
                    {`${entry.name}: ${formatCurrency(entry.value)}`}
                  </Typography>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Interface;
