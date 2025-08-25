import { store } from '@/core/store';
import { clearAuth } from '@/features/auth/store/authSlice';
import axios from 'axios';

// Attach a global axios response interceptor to handle 401 Unauthorized errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Dispatch logout/clearAuth action to update UI and clear state
      store.dispatch(clearAuth());
    }
    return Promise.reject(error);
  }
);

// You can import this file in your main entry point (e.g., main.tsx) to activate the interceptor
