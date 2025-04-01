// src/components/verification/Step3LinkBank.jsx
import React from 'react';
import { Box, TextField, Button, Card, CardContent } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Step3LinkBank = ({ bankCards, handleBankInputChange, handleAddBankCard, handleBankLink, bankLinked }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {bankCards.map((bankCard, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <CardContent>
            <TextField
              label="Bank Nickname"
              value={bankCard.nickname}
              onChange={(e) => handleBankInputChange(index, 'nickname', e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              disabled={bankLinked}
            />
            <TextField
              label="Bank Routing Number"
              value={bankCard.routingNumber}
              onChange={(e) => handleBankInputChange(index, 'routingNumber', e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              disabled={bankLinked}
            />
            <TextField
              label="Account Number"
              value={bankCard.accountNumber}
              onChange={(e) => handleBankInputChange(index, 'accountNumber', e.target.value)}
              fullWidth
              disabled={bankLinked}
            />
          </CardContent>
        </Card>
      ))}
      {bankCards.length < 3 && (
        <Button variant="contained" color="primary" onClick={handleAddBankCard} startIcon={<AddCircleIcon />} disabled={bankLinked}>
          Add another bank
        </Button>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleBankLink}
        disabled={bankLinked}
        sx={{ backgroundColor: bankLinked ? 'gray' : 'primary.main' }}
      >
        {bankLinked ? 'Bank Linked' : 'Link Bank'}
      </Button>
    </Box>
  );
};

export default Step3LinkBank;
