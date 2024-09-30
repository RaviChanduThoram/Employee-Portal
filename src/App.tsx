import React, { useState,useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, Grid } from '@mui/material';
import theme from './styles/themes'; // Ensure you have a theme file
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import axios from 'axios';




const App: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Header onToggle={handleDrawerToggle} drawerOpen={drawerOpen} />
        <Sidebar openDrawer={drawerOpen} onItemSelect={(item) => console.log(item)} />
        <Box component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            marginLeft: drawerOpen ? 240 : 0, // Adjust margin based on drawer state
            transition: theme.transitions.create('margin', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }} >
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
