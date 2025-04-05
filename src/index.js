import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CsvProvider } from './context/CsvContext';
import { AuthProvider } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
  <AuthProvider>
  <CsvProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </CsvProvider>
  </AuthProvider>
  </Router>
);

reportWebVitals();
