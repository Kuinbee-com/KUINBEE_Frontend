"use client";

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOverlay } from '../components/GlobalOverlaySystem';
import Landing from './Landing';

const LoginPage = () => {
  const { showLogin, isLoginOpen } = useOverlay();
  const navigate = useNavigate();

  useEffect(() => {
    // Show login modal immediately when component mounts
    showLogin();
  }, [showLogin]);

  // Redirect to home when modal is closed
  useEffect(() => {
    if (!isLoginOpen) {
      navigate('/', { replace: true });
    }
  }, [isLoginOpen, navigate]);

  // Render the landing page as background while modal opens
  return <Landing />;
};

export default LoginPage;
