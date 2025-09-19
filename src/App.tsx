import React from 'react';
import './App.css';
import HangmanGame from './components/HangmanGame';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>AHORKADO</h1>
      </header>
      <main>
        <HangmanGame />
      </main>
    </div>
  );
}

export default App;
