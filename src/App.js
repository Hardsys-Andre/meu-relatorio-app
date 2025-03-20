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
import TermsOfUse from './pages/termsOfUse'

function App() {
  return (
    <AuthProvider>
    <Router>
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/editor" element={<PrivateRoute><Editor /></PrivateRoute>} />
            <Route path='/csvUploader' element={<PrivateRoute><CsvPage/></PrivateRoute>}/>
            <Route path='/profile' element={<PerfilPage/>}/>
            <Route path='/pageLogin' element={<LoginPage/>}/>
            <Route path='/registerPage' element={<RegisterPage/>}/>
            <Route path='/termsOfUse' element={<TermsOfUse/>}/>
          </Routes>
        </Layout>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
