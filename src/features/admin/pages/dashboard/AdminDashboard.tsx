import { useState, useEffect } from 'react';
// Modern font import for global use
import '@fontsource/inter/index.css';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Storage as DatasetIcon,
  Category as CategoryIcon,
  Source as SourceIcon,
  ShoppingCart as SalesIcon,
  Add as AddIcon,
  Assignment as ReportIcon,
  People as UsersIcon,
} from '@mui/icons-material';

// Types for our data
interface DashboardMetrics {
  totalDatasets: number;
  totalCategories: number;
  totalSources: number;
  totalDownloads: number;
  totalUsers: number;
}

interface RecentActivity {
  date: string;
  datasetName: string;
  datasetId: string;
  adminId: string;
  reason: string;
}

// Mock API functions (replace with actual API calls)
const fetchDashboardMetrics = async (): Promise<DashboardMetrics> => {
  // Return zeroed metrics for now
  return {
    totalDatasets: 0,
    totalCategories: 0,
    totalSources: 5,
    totalDownloads: 0,
    totalUsers: 0,
  };
};

const fetchRecentActivity = async (): Promise<RecentActivity[]> => {
  // Return empty activity for now
  return [];
};

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [metricsData, activityData] = await Promise.all([
          fetchDashboardMetrics(),
          fetchRecentActivity(),
        ]);
        
        setMetrics(metricsData);
        setRecentActivity(activityData);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Dashboard data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
  };

  const metricsCards = [
    {
      title: 'Total Datasets',
      value: metrics?.totalDatasets || 0,
      icon: <DatasetIcon sx={{ fontSize: 28, color: '#3b82f6' }} />,
      color: '#3b82f6',
    },
    {
      title: 'Categories',
      value: metrics?.totalCategories || 0,
      icon: <CategoryIcon sx={{ fontSize: 28, color: '#8b5cf6' }} />,
      color: '#8b5cf6',
    },
    {
      title: 'Sources',
      value: metrics?.totalSources || 0,
      icon: <SourceIcon sx={{ fontSize: 28, color: '#f59e0b' }} />,
      color: '#f59e0b',
    },
    {
      title: 'Total Downloads',
      value: metrics?.totalDownloads || 0,
      icon: <SalesIcon sx={{ fontSize: 28, color: '#10b981' }} />, // You can use Download icon if you prefer
      color: '#10b981',
    },
    {
      title: 'Total Users',
      value: metrics?.totalUsers || 0,
      icon: <UsersIcon sx={{ fontSize: 28, color: '#f59e42' }} />, // Or use PeopleIcon from MUI
      color: '#f59e42',
    },
  ];

  const quickTasks = [
    {
      title: 'Add New Dataset',
      description: 'Upload a new dataset to the marketplace',
      icon: <AddIcon sx={{ color: '#3b82f6' }} />,
    },
    {
      title: 'Create Category',
      description: 'Add a new category for datasets',
      icon: <CategoryIcon sx={{ color: '#8b5cf6' }} />,
    },
    {
      title: 'Create New Source',
      description: 'Add a new data source for datasets',
      icon: <ReportIcon sx={{ color: '#10b981' }} />,
    },
      {
      title: 'Update Dataset',
      description: 'Make changes to an existing dataset',
      icon: <ReportIcon sx={{ color: '#10b981' }} />,
    },
  ];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress size={48} sx={{ color: '#111827' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" sx={{ color: '#111827', mb: 1 }}>
          Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: '#6b7280' }}>
          Welcome to the Kuinbee admin dashboard.
        </Typography>
      </Box>

      {/* Metrics Cards */}
      <Box 
        sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
          gap: 3,
          mb: 4 
        }}
      >
        {metricsCards.map((card) => (
          <Card 
            key={card.title}
            sx={{ 
              height: '100%',
              border: '1px solid #e5e7eb',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              cursor: card.title === 'Categories' || card.title === 'Sources' ? 'pointer' : 'default',
              '&:hover': {
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.2s ease',
            }}
            onClick={() => {
              if (card.title === 'Categories') {
                navigate('/admin/categories');
              } else if (card.title === 'Sources') {
                navigate('/admin/sources');
              }
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="body2" sx={{ color: '#6b7280', mb: 1 }}>
                    {card.title}
                  </Typography>
                  <Typography variant="h4" sx={{ color: '#111827', fontWeight: 700 }}>
                    {card.value}
                  </Typography>
                </Box>
                <Box sx={{ p: 1.5, backgroundColor: `${card.color}20`, borderRadius: 2 }}>
                  {card.icon}
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box 
        sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
          gap: 3 
        }}
      >
        {/* Recent Activity Table */}
        <Card sx={{ border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
          <CardContent sx={{ p: 0 }}>
            <Box sx={{ p: 3, borderBottom: '1px solid #e5e7eb' }}>
              <Typography variant="h6" fontWeight="600" sx={{ color: '#111827' }}>
                Recent Activity
              </Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, color: '#6b7280', fontSize: '1.08rem', background: '#f9fafc', padding: '18px 28px', letterSpacing: 0.2, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#6b7280', fontSize: '1.08rem', background: '#f9fafc', padding: '18px 28px', letterSpacing: 0.2, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>Dataset</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#6b7280', fontSize: '1.08rem', background: '#f9fafc', padding: '18px 28px', letterSpacing: 0.2, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>Dataset ID</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#6b7280', fontSize: '1.08rem', background: '#f9fafc', padding: '18px 28px', letterSpacing: 0.2, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>Admin ID</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#6b7280', fontSize: '1.08rem', background: '#f9fafc', padding: '18px 28px', letterSpacing: 0.2, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>Reason / Changes Made</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentActivity.map((activity, index) => (
                    <TableRow 
                      key={index}
                      hover
                      sx={{ 
                        cursor: 'pointer',
                        background: '#fff',
                        borderRadius: 2,
                        boxShadow: '0 1px 6px rgba(0,0,0,0.03)',
                        border: 'none',
                        mb: 2,
                        transition: 'box-shadow 0.2s, background 0.2s',
                        '&:hover': {
                          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                          background: '#f3f4f6',
                        },
                      }}
                    >
                      <TableCell sx={{ color: '#374151', fontWeight: 500, fontSize: '1.02rem', padding: '16px 28px', border: 'none', borderRadius: 2, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>{formatDate(activity.date)}</TableCell>
                      <TableCell sx={{ color: '#111827', fontWeight: 600, fontSize: '1.02rem', padding: '16px 28px', border: 'none', borderRadius: 2, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>{activity.datasetName}</TableCell>
                      <TableCell sx={{ color: '#6b7280', fontSize: '1rem', padding: '16px 28px', border: 'none', borderRadius: 2, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>{activity.datasetId}</TableCell>
                      <TableCell sx={{ color: '#6b7280', fontSize: '1rem', padding: '16px 28px', border: 'none', borderRadius: 2, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>{activity.adminId}</TableCell>
                      <TableCell sx={{ color: '#111827', fontWeight: 500, fontSize: '1rem', padding: '16px 28px', border: 'none', borderRadius: 2, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>{activity.reason}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Quick Tasks */}
        <Card sx={{ border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
          <CardContent sx={{ p: 0 }}>
            <Box sx={{ p: 3, borderBottom: '1px solid #e5e7eb' }}>
              <Typography variant="h6" fontWeight="600" sx={{ color: '#111827' }}>
                Quick Tasks
              </Typography>
            </Box>
            <List sx={{ p: 2 }}>
              {quickTasks.map((task, index) => (
                <ListItem
                  key={index}
                  sx={{
                    borderRadius: 2,
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#f3f4f6',
                    },
                    transition: 'background-color 0.2s ease',
                  }}
                  onClick={() => {
                    if (task.title === 'Add New Dataset') {
                      navigate('/admin/datasets/create');
                    } else if (task.title === 'Create Category') {
                      navigate('/admin/categories/create');
                    } else if (task.title === 'Create New Source') {
                      navigate('/admin/sources/create');
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {task.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={task.title}
                    secondary={task.description}
                    primaryTypographyProps={{
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      color: '#111827',
                    }}
                    secondaryTypographyProps={{
                      fontSize: '0.85rem',
                      color: '#6b7280',
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
