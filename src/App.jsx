import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, CssBaseline, ThemeProvider, createTheme, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Dashboard, School, Stars, HowToVote, AccountBox, Group } from '@mui/icons-material';

import { AppProvider, useApp } from './context/AppContext';
import DashboardComponent from './components/Dashboard';
import NFTCertificates from './components/NFTCertificates';
import SkillToken from './components/SkillToken';
import DAOVoting from './components/DAOVoting';
import Portfolio from './components/Portfolio';
import PeerReview from './components/PeerReview';

const drawerWidth = 240;

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 600,
    },
  },
});

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/' },
  { text: 'NFT Certificates', icon: <School />, path: '/certificates' },
  { text: 'Skill Tokens (SKL)', icon: <Stars />, path: '/tokens' },
  { text: 'DAO Voting', icon: <HowToVote />, path: '/voting' },
  { text: 'Portfolio', icon: <AccountBox />, path: '/portfolio' },
  { text: 'Peer Review', icon: <Group />, path: '/review' },
];

function AppLayout() {
  const location = useLocation();
  const { wallet, connectWallet, disconnectWallet, sklBalance } = useApp();

  const pageTitle = menuItems.find(item => item.path === location.pathname)?.text || 'SkillChain';

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            SkillChain
          </Typography>
          {wallet ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ mr: 2 }}>SKL: {sklBalance}</Typography>
              <Button color="inherit" onClick={disconnectWallet}>
                {`${wallet.substring(0, 6)}...${wallet.substring(wallet.length - 4)}`}
              </Button>
            </Box>
          ) : (
            <Button color="inherit" onClick={connectWallet}>Connect Wallet</Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component={Link} to={item.path} selected={location.pathname === item.path}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h5" gutterBottom>
          {pageTitle}
        </Typography>
        <Routes>
          <Route path="/" element={<DashboardComponent />} />
          <Route path="/certificates" element={<NFTCertificates />} />
          <Route path="/tokens" element={<SkillToken />} />
          <Route path="/voting" element={<DAOVoting />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/review" element={<PeerReview />} />
        </Routes>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <Router>
          <AppLayout />
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
