import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Box, Typography } from '@mui/material';
import { navigationItems } from './navigation';
import { useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 240;
const collapsedWidth = 64;

export default function Sidebar({ collapsed }: { collapsed: boolean }) {
  const location = useLocation();
  const navigate = useNavigate();

  // DEVELOPMENT MODE: Sidebar role filtering bypassed, all navigation items visible
  // To restore, uncomment the original filtering logic below

  // const filteredNavigationItems = navigationItems.filter(
  //   (item) =>
  //     item.path !== '/superadmin/admins' || (user && user.role === 'SuperAdmin')
  // );

  // For development, show all navigation items
  const filteredNavigationItems = navigationItems;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? collapsedWidth : drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: collapsed ? collapsedWidth : drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#1f2937',
          color: 'white',
          transition: 'width 0.2s',
          overflowX: 'hidden',
          position: 'fixed',
          height: '100vh',
          overflowY: 'auto',
        },
      }}
    >
      <Box sx={{ p: 3, textAlign: 'center' }}>
        {!collapsed && (
          <>
            <Typography variant="h5" fontWeight="bold" sx={{ color: 'white' }}>
              Kuinbee
            </Typography>
            <Typography variant="body2" sx={{ color: '#9ca3af', mt: 0.5 }}>
              Admin Panel
            </Typography>
          </>
        )}
      </Box>
      <Divider sx={{ borderColor: '#374151' }} />
      <List sx={{ px: 2, py: 1 }}>
        {filteredNavigationItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5, justifyContent: 'center' }}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: 2,
                  color: isActive ? '#ffffff' : '#9ca3af',
                  backgroundColor: isActive ? '#111827' : 'transparent',
                  minHeight: 48,
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  px: collapsed ? 1 : 2,
                  '&:hover': {
                    backgroundColor: isActive ? '#111827' : '#374151',
                    color: '#ffffff',
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 40, justifyContent: 'center' }}>
                  {item.icon}
                </ListItemIcon>
                {!collapsed && (
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: '0.95rem',
                      fontWeight: isActive ? 600 : 400,
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}