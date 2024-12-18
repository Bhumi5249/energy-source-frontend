// src/components/Layout.js
'use client';
import React from 'react';
import { Box, CssBaseline, Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SourceIcon from '@mui/icons-material/Source';
import ProductionIcon from '@mui/icons-material/ProductionQuantityLimits';
import PersonIcon from '@mui/icons-material/Person';
import { useRouter, usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUserData, setUserToken } from '@/redux/slice/authSlice';
import Cookies from "js-cookie";
import UseAuthorization from '@/app/utility/useAuthorization';

const drawerWidth = 240;

export default function Layout({ children }) {
  const router = useRouter();
  const pathname = usePathname(); // Get current path
  const dispatch = useDispatch()
  const handleNavigation = (path) => {
    router.push(path);
  };
  const canViewAnalytics = UseAuthorization('LIST_ANALYTICS')
  const canViewSource = UseAuthorization('LIST_SOURCE')
  const canViewProduction = UseAuthorization('LIST_PRODUCTION')
  const canViewUser = UseAuthorization('LIST_USER')
  const handleLogout = () => {
    dispatch(setUserToken(null))
    dispatch(setUserData(null))
    router.push('/login')
    Cookies.remove('token')
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap component="div">
            Energy Source
          </Typography>
          <Button onClick={handleLogout} sx={{ color: '#fff' }}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          {canViewAnalytics && <ListItem
            onClick={() => handleNavigation('/dashboard')}
            selected={pathname === '/dashboard'}
            sx={{
              backgroundColor: pathname === '/dashboard' ? 'primary.light' : 'inherit',
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'white',
              },
            }}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>}

          {canViewSource && <ListItem
            onClick={() => handleNavigation('/source')}
            selected={pathname === '/source'}
            sx={{
              backgroundColor: pathname === '/source' ? 'primary.light' : 'inherit',
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'white',
              },
            }}
          >
            <ListItemIcon>
              <SourceIcon />
            </ListItemIcon>
            <ListItemText primary="Source" />
          </ListItem>}

          {canViewProduction && <ListItem
            onClick={() => handleNavigation('/production')}
            selected={pathname === '/production'}
            sx={{
              backgroundColor: pathname === '/production' ? 'primary.light' : 'inherit',
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'white',
              },
            }}
          >
            <ListItemIcon>
              <ProductionIcon />
            </ListItemIcon>
            <ListItemText primary="Production" />
          </ListItem>}

          {canViewUser && <ListItem
            onClick={() => handleNavigation('/user')}
            selected={pathname === '/user'}
            sx={{
              backgroundColor: pathname === '/user' ? 'primary.light' : 'inherit',
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'white',
              },
            }}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="User" />
          </ListItem>}

        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          width: `calc(100% - ${drawerWidth}px)`,
          mt: 8, // Adjust for AppBar height
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
