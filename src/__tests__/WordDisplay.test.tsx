import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WordDisplay from '../components/WordDisplay';

describe('WordDisplay Component', () => {
  test('should render the word with guessed letters visible', () => {
    const word = 'VISION';
    const guessedLetters: Set<string> = new Set(['v', 'i', 's']);
    
    render(<WordDisplay word={word} guessedLetters={guessedLetters} />);
    
    const wordText = screen.getByText('V I S I _ _');
    expect(wordText).toBeInTheDocument();
  });

  test('should render all underscores when no letters are guessed', () => {
    const word = 'MISION';
    const guessedLetters: Set<string> = new Set();
    
    render(<WordDisplay word={word} guessedLetters={guessedLetters} />);
    
    const wordText = screen.getByText('_ _ _ _ _ _');
    expect(wordText).toBeInTheDocument();
  });

  test('should render complete word when all letters are guessed', () => {
    const word = 'VALOR';
    const guessedLetters: Set<string> = new Set(['v', 'a', 'l', 'o', 'r']);
    
    render(<WordDisplay word={word} guessedLetters={guessedLetters} />);
    
    const wordText = screen.getByText('V A L O R');
    expect(wordText).toBeInTheDocument();
  });

  test('should display word length information', () => {
    const word = 'EMPRENDIMIENTO';
    const guessedLetters: Set<string> = new Set();
    
    render(<WordDisplay word={word} guessedLetters={guessedLetters} />);
    
    const lengthText = screen.getByText('Letras: 14');
    expect(lengthText).toBeInTheDocument();
  });

  test('should handle single letter word', () => {
    const word = 'A';
    const guessedLetters: Set<string> = new Set(['a']);
    
    render(<WordDisplay word={word} guessedLetters={guessedLetters} />);
    
    const wordText = screen.getByText('A');
    expect(wordText).toBeInTheDocument();
    
    const lengthText = screen.getByText('Letras: 1');
    expect(lengthText).toBeInTheDocument();
  });

  test('should handle words with repeated letters', () => {
    const word = 'CALIDAD';
    const guessedLetters: Set<string> = new Set(['a']);
    
    render(<WordDisplay word={word} guessedLetters={guessedLetters} />);
    
    const wordText = screen.getByText('_ A _ _ _ A _');
    expect(wordText).toBeInTheDocument();
  });
});
