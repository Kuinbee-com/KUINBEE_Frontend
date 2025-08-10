import { AppBar, Toolbar, IconButton, Box, Avatar, Typography } from '@mui/material';
import { ChevronLeft, Dashboard as DashboardIcon } from '@mui/icons-material';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '@/core/store';
import { logoutUser } from '@/features/auth';
import { useNavigate } from 'react-router-dom';

// Define hooks directly in this file to avoid import issues
const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default function Header({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser()).unwrap();
    navigate('/admin/login');
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        left: collapsed ? 64 : 240,
        width: `calc(100% - ${collapsed ? 64 : 240}px)`,
        backgroundColor: 'white',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        borderBottom: '1px solid #e5e7eb',
        transition: 'left 0.2s, width 0.2s',
      }}
    >
      <Toolbar>
        <IconButton onClick={onToggle} sx={{ color: '#4b5563', mr: 2 }}>
          {collapsed ? <DashboardIcon /> : <ChevronLeft />}
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <Avatar sx={{ width: 32, height: 32, backgroundColor: '#111827', mr: 2 }}>
                {user?.email?.charAt(0) || 'A'}
              </Avatar>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="body2" sx={{ color: '#111827', fontWeight: 600 }}>
                  {user?.email || 'Admin User'}
                </Typography>
                {user?.role && (
                  <Typography variant="caption" sx={{ color: '#6b7280' }}>
                    {user.role}
                  </Typography>
                )}
              </Box>
            </Box>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={8} align="end" style={{ minWidth: 180, background: "#fff", borderRadius: 8, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", padding: 8 }}>
            <DropdownMenuItem onClick={() => {}} style={{ padding: "10px 16px", fontWeight: 500, color: "#111827", cursor: "pointer" }}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator style={{ margin: "4px 0", background: "#e5e7eb" }} />
            <DropdownMenuItem onClick={handleLogout} style={{ padding: "10px 16px", fontWeight: 500, color: "#ef4444", cursor: "pointer" }}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Toolbar>
    </AppBar>
  );
}
