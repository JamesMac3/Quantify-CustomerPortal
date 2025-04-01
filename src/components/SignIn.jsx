// src/components/SignIn.jsx
import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Button, TextField, Container, Typography, Paper, Box } from '@mui/material';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    if (email && password) {
      navigate('/interface');
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} style={{ padding: 20 }}>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <form noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSignIn}
            >
              Sign In
            </Button>
            <Box mt={2}>
              <RouterLink to="/signup" style={{ textDecoration: 'none', color: '#3EB9BB' }}>
                Don't have an account? Sign Up
              </RouterLink>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignIn;
