import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { AccountCircle, Logout } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: 'linear-gradient(90deg, #1976d2 0%, #1565c0 100%)',
        color: 'white',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        left: { xs: 0, md: 240 }, // Account for sidebar on desktop
        width: { xs: '100%', md: 'calc(100% - 240px)' },
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 }, flexGrow: 1 }}>
          {/* Remove company name from navbar completely */}
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
          {!isMobile && (
            <Typography variant="body2" sx={{ 
              color: 'rgba(255,255,255,0.9)',
              display: { xs: 'none', sm: 'block' }
            }}>
              Welcome, {user?.full_name || user?.username}
            </Typography>
          )}
          
          <IconButton
            size={isMobile ? "medium" : "large"}
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            sx={{ 
              color: 'white',
              p: { xs: 1, sm: 1.5 }
            }}
          >
            <Avatar 
              sx={{ 
                width: { xs: 28, sm: 32 }, 
                height: { xs: 28, sm: 32 }, 
                bgcolor: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: '2px solid rgba(255,255,255,0.3)',
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}
            >
              {(user?.full_name || user?.username)?.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
          
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              sx: {
                minWidth: 160,
                '& .MuiMenuItem-root': {
                  py: 1.5,
                  px: 2,
                  fontSize: '0.875rem'
                }
              }
            }}
          >
            {isMobile && (
              <MenuItem onClick={handleClose} disabled sx={{ opacity: 0.7 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {user?.full_name || user?.username}
                </Typography>
              </MenuItem>
            )}
            <MenuItem onClick={handleClose}>
              <AccountCircle sx={{ mr: 1.5, fontSize: 20 }} />
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Logout sx={{ mr: 1.5, fontSize: 20 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
