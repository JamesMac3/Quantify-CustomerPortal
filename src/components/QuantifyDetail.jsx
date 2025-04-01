// src/components/QuantifyDetail.jsx
import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import PersonnelCard from './PersonnelCard';

const personnelData = [
  {
    name: 'Airem Smith',
    title: 'Chief Executive Officer',
    description: '10x Developer and Financial mastermind',
    details: 'USAF Veteran, 10+ years of programming on a wide variety of systems and specializes in Financial Algorithm Trading.',
    image: '/Officers/airem.png', 
  },
  {
    name: 'James Mcgonigal',
    title: 'Chief Technology Officer',
    description: 'Webmaster and L33t coder',
    details: 'USAF Veteran, Cyber Operations Defense Enterprise, specializes in Project Management, Marketing',
    image: '/Officers/james.png', 
  },
  {
    name: 'Stephen Martin',
    title: 'Chief Financial Officer',
    description: 'Ovsees accounts, Risk Aversion and expenses',
    details: 'US Army Veteran, Provides Invaluable Leadership and Operations, Specializes in contracting and negociations',
    image: '/Officers/stephen.png', 

  },
];

const QuantifyDetail = () => (
  <Container>
    <Box my={4}>
      <Typography variant="h3" component="h1" gutterBottom>
       Meet The Quantify Team
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to Team Quantify, your Automated Trading Platform Leaders. A dedicated Team of American Military Veterans who devised highly sophisticated Automated Trading Portfolios to upend the traditional market and practices.
      </Typography>
      <Grid container spacing={4}>
        {personnelData.map((person) => (
          <Grid item xs={12} sm={6} md={4} key={person.name}>
            <PersonnelCard
              name={person.name}
              title={person.title}
              description={person.description}
              details={person.details}
              image={person.image}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  </Container>
);

export default QuantifyDetail;
