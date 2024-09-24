import React from 'react';
import './App.css';
import ReportEditor from './components/ReportEditor';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Gerador de Relatórios Dinâmicos</h1>
      </header>
      <main>
        <ReportEditor />
      </main>
    </div>
  );
}

export default App;
