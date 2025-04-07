// src/App.jsx
import usePageAnalytics from './usePageAnalytics';
import React from 'react';
import { CssBaseline } from '@mui/material';
import Header from './components/Header';
import Hero from './components/Landing/Hero';
import Section from './components/Landing/Section';
import Footer from './components/Landing/Footer';
import ThemeProvider from './context/ThemeContext';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Interface from './components/Interface';
import QuantifyDetail from './components/QuantifyDetail';
import About from './components/About';
import TradingAlgorithms from './components/TradingAlgorithms';
import MarketInsights from './components/MarketInsights';
import ModifyPortfolio from './components/ModifyPortfolio';
import Verification from './components/Verification';
import Account from './components/Account';
import Docs from './components/Docs';
const sections = [
  {
    id: 'quantify',
    title: 'The Quantify Team',
    description: 'Welcome to Quantify, your automated trading platform. A dedicated Team of American military veterans created highly sophisticated Automated Trading Portfolios to upend the traditional market and practices.',
    lightImage: '/clouds.jpg',
    darkImage: '/blue.png',
    overlayLightImage: '/businessmenlight.png',
    overlayDarkImage: '/businessmendark.png',
  },
  {
    id: 'algorithms',
    title: 'Smart Trading Algorithms',
    description: 'Quantify offers advanced trading algorithms that adapt to market conditions in real-time to maximize your trading potential.',
    lightImage: '/theeye.jpg',
    darkImage: '/coolgen.jpg',
  },
  {
    id: 'insights',
    title: 'Market Analysis and Insights',
    description: 'The Quantify Team of experienced traders provides deep market analysis and insights to help you make informed trading decisions, leveraging cutting-edge technology.',
    lightImage: 'mountain.jpg',
    darkImage: '/fff.webp',
  },
  {
    id: 'use-cases',
    title: 'Use Cases',
    description: '',
    lightImage: '',
    darkImage: '',
    useCases: [
      {
        title: 'Automated Stock Trading',
        description: 'Automate your stock trading strategies with precision and speed.',
        lightImage: '/path/to/stock-trading-light.png',
        darkImage: '/path/to/stock-trading-dark.png',
      },
      {
        title: 'Cryptocurrency Trading',
        description: 'Take advantage of cryptocurrency market volatility with our automated bots.',
        lightImage: '/path/to/crypto-trading-light.png',
        darkImage: '/path/to/crypto-trading-dark.png',
      },
      {
        title: 'Leveraged Trading',
        description: 'Automatic Leveraging based on market conditions ensures maximum profit in uptrends and minimum loss in downtrends.',
        lightImage: '/path/to/forex-trading-light.png',
        darkImage: '/path/to/forex-trading-dark.png',
      },
    ],
  },
];

const AppContent = () => {
  const location = useLocation();
  const isInterfacePage = location.pathname.startsWith('/interface') ||
                          location.pathname === '/verification' ||
                          location.pathname === '/modify-portfolio' ||
                          location.pathname === '/account' ||
                          location.pathname === '/docs';
                          usePageAnalytics();
  return (
    <>
      <Header isInterfacePage={isInterfacePage} />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            {sections.map((section) => (
              <Section key={section.id} {...section} />
            ))}
            <Footer />
          </>
        } />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/interface" element={<Interface />} />
        <Route path="/quantify-detail" element={<QuantifyDetail />} />
        <Route path="/algorithms-detail" element={<TradingAlgorithms />} />
        <Route path="/insights-detail" element={<MarketInsights />} />
        <Route path="/about" element={<About />} />
        <Route path="/trading-algorithms" element={<TradingAlgorithms />} />
        <Route path="/market-insights" element={<MarketInsights />} />
        <Route path="/modify-portfolio" element={<ModifyPortfolio />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/account" element={<Account />} />
        <Route path="/docs" element={<Docs />} />
      </Routes>
    </>
  );
};

const App = () => (
  <ThemeProvider>
    <CssBaseline />
    <Router>
      <AppContent />
    </Router>
  </ThemeProvider>
);

export default App;
