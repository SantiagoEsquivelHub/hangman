import React, { useState, useEffect, useCallback } from 'react';
import WordDisplay from './WordDisplay';
import Keyboard from './Keyboard';
import HangmanDrawing from './HangmanDrawing';
import GameStatus from './GameStatus';
import { getRandomWord } from '../utils/gameUtils';
import './HangmanGame.css';

const HangmanGame: React.FC = () => {
  const [word, setWord] = useState<string>('');
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [wrongGuesses, setWrongGuesses] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');

  const MAX_WRONG_GUESSES = 6;

  // Inicializar el juego con una palabra aleatoria
  const initializeGame = useCallback(() => {
    const newWord = getRandomWord();
    setWord(newWord);
    setGuessedLetters(new Set());
    setWrongGuesses(0);
    setGameStatus('playing');
  }, []);

  // Inicializar el juego al montar el componente
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Verificar el estado del juego cuando cambian las letras adivinadas o errores
  useEffect(() => {
    if (word) {
      const wordLetters = new Set(word.toLowerCase().split(''));
      const correctGuesses = Array.from(guessedLetters).filter(letter => 
        wordLetters.has(letter)
      );
      
      // Verificar si ganó
      if (correctGuesses.length === wordLetters.size && gameStatus === 'playing') {
        setGameStatus('won');
      }
      
      // Verificar si perdió
      if (wrongGuesses >= MAX_WRONG_GUESSES && gameStatus === 'playing') {
        setGameStatus('lost');
      }
    }
  }, [guessedLetters, wrongGuesses, word, gameStatus]);

  // Manejar la adivinanza de una letra
  const handleGuess = (letter: string) => {
    if (gameStatus !== 'playing' || guessedLetters.has(letter)) {
      return;
    }

    const newGuessedLetters = new Set(guessedLetters);
    newGuessedLetters.add(letter);
    setGuessedLetters(newGuessedLetters);

    // Si la letra no está en la palabra, incrementar errores
    if (!word.toLowerCase().includes(letter)) {
      setWrongGuesses(prev => prev + 1);
    }
  };

  // Manejar teclas del teclado
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const letter = event.key.toLowerCase();
      if (letter >= 'a' && letter <= 'z') {
        handleGuess(letter);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [guessedLetters, gameStatus, word]);

  return (
    <div className="hangman-game">
      <div className="game-container">
        <div className="game-left">
          <HangmanDrawing wrongGuesses={wrongGuesses} />
          <GameStatus 
            status={gameStatus} 
            word={word}
            wrongGuesses={wrongGuesses}
            maxWrongGuesses={MAX_WRONG_GUESSES}
            onRestart={initializeGame}
          />
        </div>
        
        <div className="game-right">
          <WordDisplay word={word} guessedLetters={guessedLetters} />
          <Keyboard 
            guessedLetters={guessedLetters} 
            word={word}
            onGuess={handleGuess}
            disabled={gameStatus !== 'playing'}
          />
        </div>
      </div>
    </div>
  );
};

export default HangmanGame;
