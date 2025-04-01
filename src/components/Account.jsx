// src/components/Account.jsx
import React, { useState } from 'react';
import { Container, Card, CardContent, Typography, Box, Grid, Button, TextField, List, ListItem, ListItemText, Switch } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Account = () => {
  const theme = useTheme();
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contactInfo, setContactInfo] = useState({ email: '', phone: '' });
  const [taxRecords, setTaxRecords] = useState(['2022_Tax_Record.pdf', '2021_Tax_Record.pdf', '2020_Tax_Record.pdf']);

  const handlePasswordReset = () => {
    // Add logic for password reset
    console.log('Password reset requested');
  };

  const handleContactUpdate = () => {
    // Add logic for updating contact information
    console.log('Contact information updated');
  };

  const handleToggleEmailNotifications = () => {
    setEmailNotifications(!emailNotifications);
  };

  const handleToggleSmsNotifications = () => {
    setSmsNotifications(!smsNotifications);
  };

  const handleTogglePushNotifications = () => {
    setPushNotifications(!pushNotifications);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Account Settings
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Notification Settings
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                <Typography>Email Notifications</Typography>
                <Switch checked={emailNotifications} onChange={handleToggleEmailNotifications} />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                <Typography>SMS Notifications</Typography>
                <Switch checked={smsNotifications} onChange={handleToggleSmsNotifications} />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                <Typography>Push Notifications</Typography>
                <Switch checked={pushNotifications} onChange={handleTogglePushNotifications} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Password Reset
              </Typography>
              <TextField
                label="Current Password"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                label="New Password"
                type="password"
                fullWidth
                margin="normal"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <TextField
                label="Confirm New Password"
                type="password"
                fullWidth
                margin="normal"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handlePasswordReset}
                sx={{ mt: 2 }}
                disabled={!password || !newPassword || newPassword !== confirmPassword}
              >
                Reset Password
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Update Contact Information
              </Typography>
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                value={contactInfo.email}
                onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
              />
              <TextField
                label="Phone"
                fullWidth
                margin="normal"
                value={contactInfo.phone}
                onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleContactUpdate}
                sx={{ mt: 2 }}
                disabled={!contactInfo.email || !contactInfo.phone}
              >
                Update Information
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                View Tax Records
              </Typography>
              <List>
                {taxRecords.map((record, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={record}
                      primaryTypographyProps={{ color: 'primary', textDecoration: 'underline', cursor: 'pointer' }}
                      onClick={() => window.open(`/path/to/tax/records/${record}`, '_blank')}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Account;
