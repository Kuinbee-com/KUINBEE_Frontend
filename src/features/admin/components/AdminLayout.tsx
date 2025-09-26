import { useState } from 'react';
import Box from '@mui/material/Box';
import Sidebar from './Sidebar';
import Header from './Header';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSidebar = () => setCollapsed((prev) => !prev);

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar collapsed={collapsed} />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          backgroundColor: '#f9fafb', 
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflow: 'hidden'
        }}
      >
        <Header collapsed={collapsed} onToggle={handleToggleSidebar} />
        <Box 
          sx={{ 
            mt: 8, 
            p: 3, 
            flexGrow: 1,
            overflow: 'auto',
            height: 'calc(100vh - 64px)' // Account for header height
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;