import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

type HeaderProps = {
  onToggle: () => void;
  drawerOpen: boolean;
};

const Header: React.FC<HeaderProps> = ({ onToggle, drawerOpen }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: drawerOpen ? `calc(100% - 240px)` : '100%', // Adjust width based on drawer state
        transition: (theme) =>
          theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          SMR Bank Employee Portal
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
