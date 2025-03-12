import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CsvProvider } from './context/CsvContext';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
  <CsvProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </CsvProvider>
  </AuthProvider>
);

reportWebVitals();
