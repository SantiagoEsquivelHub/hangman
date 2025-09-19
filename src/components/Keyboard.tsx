import React from 'react';
import './Keyboard.css';

interface KeyboardProps {
  guessedLetters: Set<string>;
  word: string;
  onGuess: (letter: string) => void;
  disabled: boolean;
}

const Keyboard: React.FC<KeyboardProps> = ({ guessedLetters, word, onGuess, disabled }) => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const getLetterStatus = (letter: string) => {
    const lowerLetter = letter.toLowerCase();
    if (!guessedLetters.has(lowerLetter)) {
      return 'unguessed';
    }
    return word.toLowerCase().includes(lowerLetter) ? 'correct' : 'incorrect';
  };

  return (
    <div className="keyboard">
      <div className="keyboard-grid">
        {letters.map(letter => {
          const status = getLetterStatus(letter);
          const isGuessed = guessedLetters.has(letter.toLowerCase());
          
          return (
            <button
              key={letter}
              className={`keyboard-key ${status}`}
              onClick={() => onGuess(letter.toLowerCase())}
              disabled={disabled || isGuessed}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Keyboard;
