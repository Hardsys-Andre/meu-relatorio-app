import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/home/index';
import Editor from './pages/editor/index';
import CsvPage from './pages/csvUploader';

function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/editor" element={<Editor />} />
            <Route path='csvUploader' element={<CsvPage/>}/>
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
