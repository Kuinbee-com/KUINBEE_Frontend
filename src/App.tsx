import * as React from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Core imports
import { store } from './core/store';
import { theme } from './core/config/theme';

// Shared imports
// Update the import paths to the correct files for ProtectedRoute and AuthInitializer
import ProtectedRoute from './features/auth/components/ProtectedRoute';
import AuthInitializer from './features/auth/components/AuthInitializer';
import BrowserCompatibilityChecker from './shared/components/ui/BrowserCompatibilityChecker';
import ViewportNormalizer from './shared/components/ui/ViewportNormalizer';

// Feature imports
import { AdminLogin } from './features/auth';
import DataMarketplace from './features/user/pages/DataMarketplace';
import UserDatasetDetailPage from './features/user/pages/DatasetDetailPage';
import { OverlayProvider } from './features/user/components/GlobalOverlaySystem';
import Careers from './features/user/pages/Careers';
import Support from './features/user/pages/Support';
        
import Analytics from './features/user/pages/Analytics';
import Landing from './features/user/pages/Landing';
import SignupPage from './features/user/pages/SignupPage';
import LoginPage from './features/user/pages/LoginPage';

// Admin feature imports
import AdminLayout from './features/admin/components/AdminLayout';
import AdminDashboard from './features/admin/pages/dashboard/AdminDashboard';
import AdminDatasets from './features/admin/pages/datasets/AdminDatasets';
import AddMultipleDatasets from './features/admin/pages/datasets/AddMultipleDatasets';
import CreateDatasetPage from './features/admin/pages/datasets/CreateDatasetPage';
import AdminDatasetDetailPage from './features/admin/pages/datasets/DatasetDetailPage';
import CategoryManagementPage from './features/admin/pages/category/CategoryManagementPage';
import Community from './features/user/pages/Community';
import About from './features/user/pages/About';
import TermsAndConditions from './features/user/pages/TermsAndConditions';
import LegalCompliance from './features/user/pages/LegalCompliance';
import Pricing from './features/user/pages/Pricing';
import CreateCategoryPage from './features/admin/pages/category/CreateCategoryPage';
import SourceManagementPage from './features/admin/pages/source/SourceManagementPage';
import CreateSourcePage from './features/admin/pages/source/CreateSourcePage';
import PendingUploadsPage from './features/admin/pages/datasets/uploads/PendingUploadsPage';
import UploadedDatasetsPage from './features/admin/pages/datasets/uploads/UploadedDatasetsPage';

// SuperAdmin feature imports
import AdminManagementPage from './features/superadmin/pages/AdminManagementPage';
import CreateAdminPage from './features/superadmin/pages/CreateAdminPage';
import AdminDetailPage from './features/superadmin/pages/AdminDetailPage';
import SuperAdminLayout from './features/superadmin/components/SuperAdminLayout';
import { Toaster } from 'sonner';
// import CartPage from './features/user/pages/CartPage'; // Now using overlay instead

/**
 * Main App Content Component
 * Handles routing only
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const AppContent: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes>
          {/* User Routes */}
          <Route path="/community" element={
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <Community />
            </motion.div>
          } />
          <Route path="/marketplace" element={
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <DataMarketplace />
            </motion.div>
          } />
          <Route path="/user/dataset/:id" element={
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <UserDatasetDetailPage />
            </motion.div>
          } />
          <Route path="/careers" element={
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <Careers />
            </motion.div>
          } />
          <Route path="/about" element={
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <About />
            </motion.div>
          } />
          <Route path="/terms-and-conditions" element={
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <TermsAndConditions />
            </motion.div>
          } />
          <Route path="/legal-compliance" element={
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <LegalCompliance />
            </motion.div>
          } />
          <Route path="/pricing" element={
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <Pricing />
            </motion.div>
          } />
          <Route path="/analytics" element={
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <Analytics />
            </motion.div>} />
            <Route path="/support" element={
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <Support />
            </motion.div>
          } />
          <Route path="/signup" element={
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <SignupPage />
            </motion.div>
          } />
          <Route path="/login" element={
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <LoginPage />
            </motion.div>
          } />
          
         
          {/* Admin Routes */}
          <Route path="/admin/login" element={
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <AdminLogin />
            </motion.div>
          } />

          {/* Protected Admin Routes */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute allowedRoles={['ADMIN', 'SUPERADMIN']}>
              <AdminLayout>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  <AdminDashboard />
                </motion.div>
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/datasets" element={
            <ProtectedRoute allowedRoles={['ADMIN', 'SUPERADMIN']}>
              <AdminLayout>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  <AdminDatasets />
                </motion.div>
              </AdminLayout>
            </ProtectedRoute>
          } />
          {/* New route for dataset creation */}
          <Route path="/admin/datasets/create" element={
            <ProtectedRoute allowedRoles={['ADMIN', 'SUPERADMIN']}>
              <AdminLayout>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  <CreateDatasetPage />
                </motion.div>
              </AdminLayout>
            </ProtectedRoute>
          } />
          {/* New route for multiple dataset upload */}
          <Route path="/admin/datasets/add-multiple" element={
            <ProtectedRoute allowedRoles={['ADMIN', 'SUPERADMIN']}>
              <AdminLayout>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  <AddMultipleDatasets />
                </motion.div>
              </AdminLayout>
            </ProtectedRoute>
          } />
          {/* Route for dataset detail/view */}
          <Route path="/admin/datasets/:id" element={
            <ProtectedRoute allowedRoles={['ADMIN', 'SUPERADMIN']}>
              <AdminLayout>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  <AdminDatasetDetailPage />
                </motion.div>
              </AdminLayout>
            </ProtectedRoute>
          } />
          {/* Route for dataset edit (can reuse CreateDatasetPage with edit mode) */}
          <Route path="/admin/datasets/edit/:id" element={
            <ProtectedRoute allowedRoles={['ADMIN', 'SUPERADMIN']}>
              <AdminLayout>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  <CreateDatasetPage />
                </motion.div>
              </AdminLayout>
            </ProtectedRoute>
          } />
          {/* Route for pending uploads */}
          <Route path="/admin/datasets/pending-uploads" element={
            <ProtectedRoute allowedRoles={['ADMIN', 'SUPERADMIN']}>
              <AdminLayout>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  <PendingUploadsPage />
                </motion.div>
              </AdminLayout>
            </ProtectedRoute>
          } />
          {/* Route for uploaded datasets */}
          <Route path="/admin/datasets/uploaded" element={
            <ProtectedRoute allowedRoles={['ADMIN', 'SUPERADMIN']}>
              <AdminLayout>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  <UploadedDatasetsPage />
                </motion.div>
              </AdminLayout>
            </ProtectedRoute>
          } />
          {/* Route for pending uploads */}
          <Route path="/admin/datasets/pending-uploads" element={
            <ProtectedRoute allowedRoles={['ADMIN', 'SUPERADMIN']}>
              <AdminLayout>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  <PendingUploadsPage />
                </motion.div>
              </AdminLayout>
            </ProtectedRoute>
          } />
          {/* Route for uploaded datasets */}
          <Route path="/admin/datasets/uploaded" element={
            <ProtectedRoute allowedRoles={['ADMIN', 'SUPERADMIN']}>
              <AdminLayout>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  <UploadedDatasetsPage />
                </motion.div>
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/categories" element={
            <ProtectedRoute allowedRoles={['ADMIN', 'SUPERADMIN']}>
              <AdminLayout>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  <CategoryManagementPage />
                </motion.div>
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/categories/create" element={
            <ProtectedRoute allowedRoles={['ADMIN', 'SUPERADMIN']}>
              <AdminLayout>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  <CreateCategoryPage />
                </motion.div>
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/categories/edit/:id" element={
            <ProtectedRoute allowedRoles={['ADMIN', 'SUPERADMIN']}>
              <AdminLayout>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  <CreateCategoryPage />
                </motion.div>
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/sources" element={
            <ProtectedRoute allowedRoles={['ADMIN', 'SUPERADMIN']}>
              <AdminLayout>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  <SourceManagementPage />
                </motion.div>
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/sources/create" element={
            <ProtectedRoute allowedRoles={['ADMIN', 'SUPERADMIN']}>
              <AdminLayout>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  <CreateSourcePage />
                </motion.div>
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/sources/edit/:id" element={
            <ProtectedRoute allowedRoles={['ADMIN', 'SUPERADMIN']}>
              <AdminLayout>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  <CreateSourcePage />
                </motion.div>
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/sales" element={
            <ProtectedRoute allowedRoles={['ADMIN', 'SUPERADMIN']}>
              <AdminLayout>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  <div>Sales Analytics (Coming Soon)</div>
                </motion.div>
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/*" element={
            <ProtectedRoute allowedRoles={['ADMIN', 'SUPERADMIN']}>
              <AdminLayout>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  <AdminDashboard />
                </motion.div>
              </AdminLayout>
            </ProtectedRoute>
          } />

          {/* Default redirects */}
        {/* Superadmin routes */}
        <Route path="/superadmin/admins" element={
          <ProtectedRoute allowedRoles={['SUPERADMIN']}>
            <SuperAdminLayout>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                <AdminManagementPage />
              </motion.div>
            </SuperAdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/superadmin/admins/create" element={
          <ProtectedRoute allowedRoles={['SUPERADMIN']}>
            <SuperAdminLayout>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                <CreateAdminPage />
              </motion.div>
            </SuperAdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/superadmin/admins/edit/:id" element={
          <ProtectedRoute allowedRoles={['SUPERADMIN']}>
            <SuperAdminLayout>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                <CreateAdminPage />
              </motion.div>
            </SuperAdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/superadmin/admins/:id" element={
          <ProtectedRoute allowedRoles={['SUPERADMIN']}>
            <SuperAdminLayout>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                <AdminDetailPage />
              </motion.div>
            </SuperAdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/" element={
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <Landing />
            </motion.div>
          } />
        {/* Catch all - redirect to marketplace for development */}
        <Route path="*" element={<Navigate to="/marketplace" replace />} />
        </Routes>
      </AnimatePresence>
      <Toaster />
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <OverlayProvider>
          <ViewportNormalizer />
          <AuthInitializer />
          <AppContent />
          {/* <BrowserCompatibilityChecker /> */}
        </OverlayProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
