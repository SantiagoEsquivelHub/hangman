import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WordDisplay from '../components/WordDisplay';

describe('WordDisplay Component', () => {
  test('should render the word with guessed letters visible', () => {
    const word = 'REACT';
    const guessedLetters: Set<string> = new Set(['r', 'e', 'a']);
    
    render(<WordDisplay word={word} guessedLetters={guessedLetters} />);
    
    const wordText = screen.getByText('R E A _ _');
    expect(wordText).toBeInTheDocument();
  });

  test('should render all underscores when no letters are guessed', () => {
    const word = 'HELLO';
    const guessedLetters: Set<string> = new Set();
    
    render(<WordDisplay word={word} guessedLetters={guessedLetters} />);
    
    const wordText = screen.getByText('_ _ _ _ _');
    expect(wordText).toBeInTheDocument();
  });

  test('should render complete word when all letters are guessed', () => {
    const word = 'TEST';
    const guessedLetters: Set<string> = new Set(['t', 'e', 's']);
    
    render(<WordDisplay word={word} guessedLetters={guessedLetters} />);
    
    const wordText = screen.getByText('T E S T');
    expect(wordText).toBeInTheDocument();
  });

  test('should display word length information', () => {
    const word = 'PROGRAMMING';
    const guessedLetters: Set<string> = new Set();
    
    render(<WordDisplay word={word} guessedLetters={guessedLetters} />);
    
    const lengthText = screen.getByText('Letras: 11');
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
    const word = 'HELLO';
    const guessedLetters: Set<string> = new Set(['l']);
    
    render(<WordDisplay word={word} guessedLetters={guessedLetters} />);
    
    const wordText = screen.getByText('_ _ L L _');
    expect(wordText).toBeInTheDocument();
  });
});
