import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/home/index';
import Editor from './pages/editor/index';
import CsvPage from './pages/csvUploader';
import LoginPage from './pages/login';
import RegisterPage from './pages/registerPage';
import PrivateRoute from './PrivateRoute';
import PerfilPage from './pages/perfilPage';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="App">
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/editor" element={<PrivateRoute><Layout><Editor /></Layout></PrivateRoute>} />
            <Route path='/csvUploader' element={<PrivateRoute><Layout><CsvPage/></Layout></PrivateRoute>}/>
            <Route path='/profile' element={<Layout><PerfilPage/></Layout>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
          </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
