import React from 'react';
import './GameStatus.css';

interface GameStatusProps {
  status: 'playing' | 'won' | 'lost';
  word: string;
  wrongGuesses: number;
  maxWrongGuesses: number;
  onRestart: () => void;
}

const GameStatus: React.FC<GameStatusProps> = ({ 
  status, 
  word, 
  wrongGuesses, 
  maxWrongGuesses, 
  onRestart 
}) => {
  const getStatusMessage = () => {
    switch (status) {
      case 'won':
        return {
          title: '🎉 ¡Felicitaciones!',
          message: '¡Has ganado! Adivinaste la palabra.',
          className: 'status-won'
        };
      case 'lost':
        return {
          title: '💀 ¡Perdiste!',
          message: `La palabra era: ${word}`,
          className: 'status-lost'
        };
      default:
        return {
          title: '🎮 ¡Adivina la palabra!',
          message: `Te quedan ${maxWrongGuesses - wrongGuesses} intentos`,
          className: 'status-playing'
        };
    }
  };

  const statusInfo = getStatusMessage();

  return (
    <div className={`game-status ${statusInfo.className}`}>
      <h3 className="status-title">{statusInfo.title}</h3>
      <p className="status-message">{statusInfo.message}</p>
      
      {status !== 'playing' && (
        <div className="game-over-actions">
          <button 
            className="restart-button" 
            onClick={onRestart}
          >
            🔄 Jugar de nuevo
          </button>
        </div>
      )}
      
      <div className="game-stats">
        <div className="stat">
          <span className="stat-label">Palabra:</span>
          <span className="stat-value">{word.length} letras</span>
        </div>
        <div className="stat">
          <span className="stat-label">Errores:</span>
          <span className="stat-value">{wrongGuesses}/{maxWrongGuesses}</span>
        </div>
      </div>
    </div>
  );
};

export default GameStatus;
