import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// ✅ Small enhancement for future token-based persistent login
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);