// src/context/ThemeContext.jsx
import React, { createContext, useState, useMemo, useContext, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) return storedTheme === 'dark';

    // Default to system preference if no stored value
    return window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Store the theme mode in localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

    // Optional: update a class or data attribute on the body
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const lightTheme = {
    palette: {
      mode: 'light',
      primary: {
        main: '#0C7887',
      },
      secondary: {
        main: '#3EB9BB',
      },
      background: {
        default: '#ffffff',
        paper: '#ffffff',
      },
      text: {
        primary: '#000000',
        secondary: '#5f6368',
      },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
    },
  };

  const darkTheme = {
    palette: {
      mode: 'dark',
      primary: {
        main: '#0C7887',
      },
      background: {
        default: '#0a1929',
        paper: '#0a1929',
      },
      text: {
        primary: '#B4F3E9',
        secondary: '#B7D0D4',
      },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderColor: '#3EB9BB',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: '#0a1929',
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            backgroundColor: '#0a1929',
          },
        },
      },
    },
  };

  const theme = useMemo(
    () => createTheme(isDarkMode ? darkTheme : lightTheme),
    [isDarkMode]
  );

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;