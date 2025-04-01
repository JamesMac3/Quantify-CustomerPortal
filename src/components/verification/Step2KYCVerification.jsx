// src/components/verification/Step2KYCVerification.jsx
import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const Step2KYCVerification = ({ ssn, setSsn, uploadedFiles, handleFileUpload, kycVerified, handleKycVerification }) => {
  return (
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
      <TextField
        label="Social Security Number"
        value={ssn}
        onChange={(e) => setSsn(e.target.value)}
        required
        disabled={kycVerified}
      />
      <Button
        variant="contained"
        component="label"
        color="primary"
        disabled={kycVerified}
      >
        Upload KYC Documents
        <input
          type="file"
          hidden
          multiple
          onChange={handleFileUpload}
        />
      </Button>
      <Typography variant="body2" color="text.secondary">
        Documents required: Government-issued ID card, additional proof of address (utility bills, bank statements), passport, social security card.
      </Typography>
      <Box>
        {uploadedFiles.map((file, index) => (
          <Typography key={index} variant="body2">
            {file.name}
          </Typography>
        ))}
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleKycVerification}
        disabled={!ssn || uploadedFiles.length < 1 || kycVerified}
        sx={{ backgroundColor: kycVerified ? 'gray' : 'primary.main' }}
      >
        {kycVerified ? 'KYC Verified' : 'Request KYC verification'}
      </Button>
    </Box>
  );
};

export default Step2KYCVerification;
