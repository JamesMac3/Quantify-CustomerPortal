// src/components/verification/Step1RequestWallet.jsx
import React from 'react';
import { Box, TextField, Button } from '@mui/material';

const Step1RequestWallet = ({ fullName, setFullName, phoneNumber, setPhoneNumber, email, setEmail, birthdate, setBirthdate, walletRequested, handleRequestWallet }) => {
  const isStep1Complete = fullName && phoneNumber && email && birthdate;

  return (
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
        disabled={walletRequested}
      />
      <TextField
        label="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
        disabled={walletRequested}
      />
      <TextField
        label="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={walletRequested}
      />
      <TextField
        label="Birthdate"
        type="date"
        value={birthdate}
        onChange={(e) => setBirthdate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        required
        disabled={walletRequested}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleRequestWallet}
        disabled={!isStep1Complete || walletRequested}
        sx={{ backgroundColor: walletRequested ? 'gray' : 'primary.main' }}
      >
        {walletRequested ? 'Wallet Requested' : 'Request Wallet'}
      </Button>
    </Box>
  );
};

export default Step1RequestWallet;
