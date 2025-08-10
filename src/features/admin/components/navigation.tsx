import {
  Dashboard as DashboardIcon,
  FolderCopySharp as DatasetsIcon,
  Category as CategoryIcon,
  TrendingUp as SalesIcon,
  DeviceHub as SourcesIcon,
  AdminPanelSettings as AdminManagementIcon,
} from '@mui/icons-material';

export const navigationItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
  { text: 'Datasets', icon: <DatasetsIcon />, path: '/admin/datasets' },
  { text: 'Categories', icon: <CategoryIcon />, path: '/admin/categories' },
  { text: 'Statistics', icon: <SalesIcon />, path: '/admin/sales' },
  { text: 'Sources', icon: <SourcesIcon />, path: '/admin/sources' },
  { text: 'Admin Management', icon: <AdminManagementIcon />, path: '/superadmin/admins' },
];

export const superAdminNavigationItems = [
  
  { text: 'Admin Management', icon: <AdminManagementIcon />, path: '/superadmin/admins' },
];