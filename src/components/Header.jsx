// src/components/Header.jsx
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Switch, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useThemeContext } from '../context/ThemeContext';

const Header = ({ isInterfacePage }) => {
  const { isDarkMode, toggleTheme } = useThemeContext();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const logo = isDarkMode ? '/darkmodelogo.png' : '/lightmodelogo.png';

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const mainMenuItems = [
    { label: 'Quantify', path: '/quantify-detail' },
    { label: 'Algorithms', path: '/algorithms-detail' },
    { label: 'Insights', path: '/insights-detail' },
    { label: 'About', path: '/about' },
  ];

  const interfaceMenuItems = [
    { label: 'Interface', path: '/interface' },
    { label: 'Verification', path: '/verification' },
    { label: 'Modify Portfolio', path: '/modify-portfolio' },
    { label: 'Account', path: '/account' },
    { label: 'Docs', path: '/docs' },
  ];

  const menuItems = isInterfacePage ? interfaceMenuItems : mainMenuItems;

  const list = () => (
    <Box
      sx={{
        width: 250,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        backgroundColor: isDarkMode ? '#0a1929' : '#0C7887',
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems
          .filter((item) => location.pathname !== item.path)
          .map((item) => (
            <ListItem button key={item.label} component={RouterLink} to={item.path}>
              <ListItemText primary={item.label} sx={{ color: '#ffffff' }} />
            </ListItem>
          ))}
      </List>
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <img src={logo} alt="Quantify Logo" style={{ height: '200px' }} />
      </Box>
    </Box>
  );

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: isDarkMode ? '#0a1929' : '#0C7887',
        color: isDarkMode ? '#B4F3E9' : '#ffffff',
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <RouterLink to={isInterfacePage ? '/interface' : '/'} style={{ textDecoration: 'none', color: isDarkMode ? '#B4F3E9' : '#ffffff' }}>
            <img src={logo} alt="Quantify Logo" style={{ height: '40px' }} />
          </RouterLink>
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          {menuItems.map((item) => (
            <Button
              key={item.label}
              component={RouterLink}
              to={item.path}
              sx={{
                color: isDarkMode ? '#B4F3E9' : '#ffffff',
                border: location.pathname === item.path ? `2px solid ${isDarkMode ? '#3EB9BB' : '#32A4A7'}` : 'none',
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
        <IconButton
          color="inherit"
          sx={{ display: { xs: 'flex', md: 'none' } }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
        >
          {list()}
        </Drawer>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            color="secondary"
            variant="contained"
            sx={{
              backgroundColor: '#3EB9BB',
              '&:hover': {
                backgroundColor: '#32A4A7',
              },
            }}
            component={RouterLink}
            to={isInterfacePage ? '/' : '/signin'}
          >
            {isInterfacePage ? 'Sign out' : 'Sign in'}
          </Button>
          <Switch checked={isDarkMode} onChange={toggleTheme} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
