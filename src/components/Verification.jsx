// src/components/Verification.jsx
import React, { useState } from 'react';
import { Container, Card, CardContent, Typography, Box, Chip, Grid, Accordion, AccordionSummary, AccordionDetails, Button, Link } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LockIcon from '@mui/icons-material/Lock';
import Step1RequestWallet from './verification/Step1RequestWallet';
import Step2KYCVerification from './verification/Step2KYCVerification';
import Step3LinkBank from './verification/Step3LinkBank';

const Verification = () => {
  const [walletRequested, setWalletRequested] = useState(false);
  const [kycVerified, setKycVerified] = useState(false);
  const [bankLinked, setBankLinked] = useState(false);
  const [requestCompleted, setRequestCompleted] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [ssn, setSsn] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [bankCards, setBankCards] = useState([{ nickname: '', routingNumber: '', accountNumber: '' }]);

  const handleRequestWallet = () => {
    setWalletRequested(true);
  };

  const handleKycVerification = () => {
    setKycVerified(true);
  };

  const handleBankLink = () => {
    setBankLinked(true);
  };

  const handleCompleteRequest = () => {
    setRequestCompleted(true);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles(prevFiles => [...prevFiles, ...files]);
  };

  const handleBankInputChange = (index, field, value) => {
    const newBankCards = [...bankCards];
    newBankCards[index][field] = value;
    setBankCards(newBankCards);
  };

  const handleAddBankCard = () => {
    if (bankCards.length < 3) {
      setBankCards([...bankCards, { nickname: '', routingNumber: '', accountNumber: '' }]);
    }
  };

  const handleGoBack = () => {
    setWalletRequested(false);
    setFullName('');
    setPhoneNumber('');
    setEmail('');
    setBirthdate('');
    setSsn('');
    setUploadedFiles([]);
    setKycVerified(false);
    setBankLinked(false);
    setBankCards([{ nickname: '', routingNumber: '', accountNumber: '' }]);
    setRequestCompleted(false);
  };

  const handleResetKYC = () => {
    setKycVerified(false);
    setSsn('');
    setUploadedFiles([]);
    setBankLinked(false);
    setRequestCompleted(false);
  };

  const handleResetBankLink = () => {
    setBankLinked(false);
    setBankCards([{ nickname: '', routingNumber: '', accountNumber: '' }]);
    setRequestCompleted(false);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Verification Status
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ position: 'relative' }}>
            <Chip
              label="Verified"
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                backgroundColor: '#39FF14', // Neon green
                color: '#004d00', // Dark green text
              }}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                Alpaca
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This allows operations with traditional market bots.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ position: 'relative' }}>
            <Chip
              label="Unverified"
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                backgroundColor: '#8B0000', // Crimson dark red
                color: '#FF3030', // Neon red text
              }}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                Alpaca: Unverified
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This broker is not yet verified for use.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Accordion expanded={!walletRequested}>
                  <AccordionSummary expandIcon={walletRequested ? <LockIcon /> : <ExpandMoreIcon />}>
                    <Typography>Step 1: Request a wallet</Typography>
                    {walletRequested && !requestCompleted && (
                      <Box sx={{ ml: 2 }}>
                        <Link component="button" variant="body2" onClick={handleGoBack}>
                          Go Back
                        </Link>
                      </Box>
                    )}
                    {walletRequested && requestCompleted && (
                      <Button
                        variant="outlined"
                        color="primary"
                        sx={{ ml: 2 }}
                        disabled
                      >
                        Requesting Wallet...
                      </Button>
                    )}
                  </AccordionSummary>
                  <AccordionDetails>
                    <Step1RequestWallet
                      fullName={fullName}
                      setFullName={setFullName}
                      phoneNumber={phoneNumber}
                      setPhoneNumber={setPhoneNumber}
                      email={email}
                      setEmail={setEmail}
                      birthdate={birthdate}
                      setBirthdate={setBirthdate}
                      walletRequested={walletRequested}
                      handleRequestWallet={handleRequestWallet}
                    />
                  </AccordionDetails>
                </Accordion>
                <Accordion disabled={!walletRequested} expanded={walletRequested && !kycVerified}>
                  <AccordionSummary expandIcon={kycVerified ? <LockIcon /> : <ExpandMoreIcon />}>
                    <Typography color={!walletRequested ? 'text.disabled' : 'text.primary'}>Step 2: KYC verification</Typography>
                    {kycVerified && !requestCompleted && (
                      <Box sx={{ ml: 2 }}>
                        <Link component="button" variant="body2" onClick={handleResetKYC}>
                          Go Back
                        </Link>
                      </Box>
                    )}
                    {kycVerified && requestCompleted && (
                      <Button
                        variant="outlined"
                        color="primary"
                        sx={{ ml: 2 }}
                        disabled
                      >
                        Verifying KYC...
                      </Button>
                    )}
                  </AccordionSummary>
                  <AccordionDetails>
                    <Step2KYCVerification
                      ssn={ssn}
                      setSsn={setSsn}
                      uploadedFiles={uploadedFiles}
                      handleFileUpload={handleFileUpload}
                      kycVerified={kycVerified}
                      handleKycVerification={handleKycVerification}
                    />
                  </AccordionDetails>
                </Accordion>
                <Accordion disabled={!kycVerified} expanded={kycVerified && !bankLinked}>
                  <AccordionSummary expandIcon={bankLinked ? <LockIcon /> : <ExpandMoreIcon />}>
                    <Typography color={!kycVerified ? 'text.disabled' : 'text.primary'}>Step 3: Link bank account</Typography>
                    {bankLinked && !requestCompleted && (
                      <Box sx={{ ml: 2 }}>
                        <Link component="button" variant="body2" onClick={handleResetBankLink}>
                          Go Back
                        </Link>
                      </Box>
                    )}
                    {bankLinked && requestCompleted && (
                      <Button
                        variant="outlined"
                        color="primary"
                        sx={{ ml: 2 }}
                        disabled
                      >
                        Linking bank to wallet...
                      </Button>
                    )}
                  </AccordionSummary>
                  <AccordionDetails>
                    <Step3LinkBank
                      bankCards={bankCards}
                      handleBankInputChange={handleBankInputChange}
                      handleAddBankCard={handleAddBankCard}
                      handleBankLink={handleBankLink}
                      bankLinked={bankLinked}
                    />
                  </AccordionDetails>
                </Accordion>
                <Accordion disabled={!bankLinked} expanded={bankLinked && !requestCompleted}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography color={!bankLinked ? 'text.disabled' : 'text.primary'}>Step 4: Complete request</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Typography sx={{ mb: 2 }}>
                        Submit your account creation request. Typically this process can take a few days. If anything goes wrong or your account has been approved, we will update the status here and email you.
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCompleteRequest}
                        disabled={requestCompleted}
                      >
                        {requestCompleted ? 'Request Submitted' : 'Complete Request'}
                      </Button>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Verification;
