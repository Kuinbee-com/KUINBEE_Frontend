import React from 'react';
import Box from '@mui/material/Box';
import Sidebar from '@/features/admin/components/Sidebar';
import Header from'@/features/admin/components/Header';

interface SuperAdminLayoutProps {
  children: React.ReactNode;
}

const SuperAdminLayout = ({ children }: SuperAdminLayoutProps) => {
  const [collapsed, setCollapsed] = React.useState(false);

  const handleToggleSidebar = () => setCollapsed((prev) => !prev);

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar collapsed={collapsed} />
      <Box component="main" sx={{ flexGrow: 1, backgroundColor: '#f9fafb', minHeight: '100vh' }}>
        <Header collapsed={collapsed} onToggle={handleToggleSidebar} />
        <Box sx={{ mt: 8, p: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default SuperAdminLayout;
