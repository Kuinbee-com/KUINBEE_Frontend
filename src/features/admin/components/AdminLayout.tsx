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

export default AdminLayout;