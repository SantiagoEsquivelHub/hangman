import React from 'react';
import './WordDisplay.css';

interface WordDisplayProps {
  word: string;
  guessedLetters: Set<string>;
}

const WordDisplay: React.FC<WordDisplayProps> = ({ word, guessedLetters }) => {
  const displayWord = word
    .split('')
    .map(letter => {
      const lowerLetter = letter.toLowerCase();
      return guessedLetters.has(lowerLetter) ? letter : '_';
    })
    .join(' ');

  return (
    <div className="word-display">
      <h2 className="word-text">{displayWord}</h2>
      <div className="word-info">
        <span className="word-length">Letras: {word.length}</span>
      </div>
    </div>
  );
};

export default WordDisplay;
