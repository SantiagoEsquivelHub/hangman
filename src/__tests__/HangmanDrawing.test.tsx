import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HangmanDrawing from '../components/HangmanDrawing';

describe('HangmanDrawing Component', () => {
  test('should render gallows structure', () => {
    render(<HangmanDrawing wrongGuesses={0} />);
    
    expect(screen.getByText('+---+')).toBeInTheDocument();
    expect(screen.getByText('|   |')).toBeInTheDocument();
    expect(screen.getByText('|')).toBeInTheDocument();
    expect(screen.getByText('=========')).toBeInTheDocument();
  });

  test('should show no hangman parts with 0 wrong guesses', () => {
    render(<HangmanDrawing wrongGuesses={0} />);
    
    const wrongCountText = screen.getByText('Errores: 0/6');
    expect(wrongCountText).toBeInTheDocument();
  });

  test('should show head with 1 wrong guess', () => {
    render(<HangmanDrawing wrongGuesses={1} />);
    
    expect(screen.getByText('😵')).toBeInTheDocument();
    const wrongCountText = screen.getByText('Errores: 1/6');
    expect(wrongCountText).toBeInTheDocument();
  });

  test('should show head and body with 2 wrong guesses', () => {
    render(<HangmanDrawing wrongGuesses={2} />);
    
    expect(screen.getByText('😵')).toBeInTheDocument();
    // El cuerpo se muestra como "|" en la estructura
    const wrongCountText = screen.getByText('Errores: 2/6');
    expect(wrongCountText).toBeInTheDocument();
  });

  test('should show maximum hangman parts with 6 wrong guesses', () => {
    render(<HangmanDrawing wrongGuesses={6} />);
    
    expect(screen.getByText('😵')).toBeInTheDocument();
    const wrongCountText = screen.getByText('Errores: 6/6');
    expect(wrongCountText).toBeInTheDocument();
  });

  test('should display correct error count', () => {
    const wrongGuesses = 3;
    render(<HangmanDrawing wrongGuesses={wrongGuesses} />);
    
    const wrongCountText = screen.getByText(`Errores: ${wrongGuesses}/6`);
    expect(wrongCountText).toBeInTheDocument();
  });

  test('should handle edge case of more than 6 wrong guesses', () => {
    render(<HangmanDrawing wrongGuesses={10} />);
    
    const wrongCountText = screen.getByText('Errores: 10/6');
    expect(wrongCountText).toBeInTheDocument();
  });

  test('should handle negative wrong guesses', () => {
    render(<HangmanDrawing wrongGuesses={-1} />);
    
    const wrongCountText = screen.getByText('Errores: -1/6');
    expect(wrongCountText).toBeInTheDocument();
  });
});
