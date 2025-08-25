
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import '@/core/store/axiosInterceptor';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
