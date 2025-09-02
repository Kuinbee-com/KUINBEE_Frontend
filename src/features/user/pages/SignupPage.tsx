"use client";

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOverlay } from '../components/GlobalOverlaySystem';
import Landing from './Landing';

const SignupPage = () => {
  const { showRegister, isRegisterOpen } = useOverlay();
  const navigate = useNavigate();

  useEffect(() => {
    // Show register modal immediately when component mounts
    showRegister();
  }, [showRegister]);

  // Redirect to home when modal is closed
  useEffect(() => {
    if (!isRegisterOpen) {
      navigate('/', { replace: true });
    }
  }, [isRegisterOpen, navigate]);

  // Render the landing page as background while modal opens
  return <Landing />;
};

export default SignupPage;
