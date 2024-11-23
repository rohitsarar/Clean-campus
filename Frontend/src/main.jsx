import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/Authcontext';
import { AdminAuthContextProvider } from './context/AdminAuthContext';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <AdminAuthContextProvider>
        <App />
      </AdminAuthContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
