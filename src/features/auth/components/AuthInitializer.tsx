import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import { verifyToken } from '../store/authSlice';

/**
 * AuthInitializer Component
 * Handles authentication state initialization on app load
 */
const AuthInitializer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);

  React.useEffect(() => {
    // Verify token on app load
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(verifyToken());
    }
  }, [dispatch]);

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        Loading...
      </div>
    );
  }

  return null;
};

export default AuthInitializer;
