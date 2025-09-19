import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GameStatus from '../components/GameStatus';

describe('GameStatus Component', () => {
  const mockOnRestart = jest.fn();

  beforeEach(() => {
    mockOnRestart.mockClear();
  });

  test('should display playing status correctly', () => {
    render(
      <GameStatus 
        status="playing"
        word="REACT"
        wrongGuesses={2}
        maxWrongGuesses={6}
        onRestart={mockOnRestart}
      />
    );
    
    expect(screen.getByText('🎮 ¡Adivina la palabra!')).toBeInTheDocument();
    expect(screen.getByText('Te quedan 4 intentos')).toBeInTheDocument();
    expect(screen.getByText('5 letras')).toBeInTheDocument();
    expect(screen.getByText('2/6')).toBeInTheDocument();
  });

  test('should display won status correctly', () => {
    render(
      <GameStatus 
        status="won"
        word="REACT"
        wrongGuesses={3}
        maxWrongGuesses={6}
        onRestart={mockOnRestart}
      />
    );
    
    expect(screen.getByText('🎉 ¡Felicitaciones!')).toBeInTheDocument();
    expect(screen.getByText('¡Has ganado! Adivinaste la palabra.')).toBeInTheDocument();
    
    const restartButton = screen.getByText('🔄 Jugar de nuevo');
    expect(restartButton).toBeInTheDocument();
  });

  test('should display lost status correctly', () => {
    render(
      <GameStatus 
        status="lost"
        word="REACT"
        wrongGuesses={6}
        maxWrongGuesses={6}
        onRestart={mockOnRestart}
      />
    );
    
    expect(screen.getByText('💀 ¡Perdiste!')).toBeInTheDocument();
    expect(screen.getByText('La palabra era: REACT')).toBeInTheDocument();
    
    const restartButton = screen.getByText('🔄 Jugar de nuevo');
    expect(restartButton).toBeInTheDocument();
  });

  test('should call onRestart when restart button is clicked', () => {
    render(
      <GameStatus 
        status="won"
        word="REACT"
        wrongGuesses={3}
        maxWrongGuesses={6}
        onRestart={mockOnRestart}
      />
    );
    
    const restartButton = screen.getByText('🔄 Jugar de nuevo');
    fireEvent.click(restartButton);
    
    expect(mockOnRestart).toHaveBeenCalledTimes(1);
  });

  test('should not show restart button during playing status', () => {
    render(
      <GameStatus 
        status="playing"
        word="REACT"
        wrongGuesses={2}
        maxWrongGuesses={6}
        onRestart={mockOnRestart}
      />
    );
    
    const restartButton = screen.queryByText('🔄 Jugar de nuevo');
    expect(restartButton).not.toBeInTheDocument();
  });

  test('should apply correct CSS class for each status', () => {
    const { rerender } = render(
      <GameStatus 
        status="playing"
        word="REACT"
        wrongGuesses={2}
        maxWrongGuesses={6}
        onRestart={mockOnRestart}
      />
    );
    
    let container = screen.getByText('🎮 ¡Adivina la palabra!').closest('.game-status');
    expect(container).toHaveClass('status-playing');
    
    rerender(
      <GameStatus 
        status="won"
        word="REACT"
        wrongGuesses={2}
        maxWrongGuesses={6}
        onRestart={mockOnRestart}
      />
    );
    
    container = screen.getByText('🎉 ¡Felicitaciones!').closest('.game-status');
    expect(container).toHaveClass('status-won');
    
    rerender(
      <GameStatus 
        status="lost"
        word="REACT"
        wrongGuesses={6}
        maxWrongGuesses={6}
        onRestart={mockOnRestart}
      />
    );
    
    container = screen.getByText('💀 ¡Perdiste!').closest('.game-status');
    expect(container).toHaveClass('status-lost');
  });

  test('should display game statistics correctly', () => {
    render(
      <GameStatus 
        status="playing"
        word="JAVASCRIPT"
        wrongGuesses={4}
        maxWrongGuesses={6}
        onRestart={mockOnRestart}
      />
    );
    
    expect(screen.getByText('10 letras')).toBeInTheDocument();
    expect(screen.getByText('4/6')).toBeInTheDocument();
  });

  test('should handle zero wrong guesses', () => {
    render(
      <GameStatus 
        status="playing"
        word="TEST"
        wrongGuesses={0}
        maxWrongGuesses={6}
        onRestart={mockOnRestart}
      />
    );
    
    expect(screen.getByText('Te quedan 6 intentos')).toBeInTheDocument();
    expect(screen.getByText('0/6')).toBeInTheDocument();
  });

  test('should handle maximum wrong guesses', () => {
    render(
      <GameStatus 
        status="playing"
        word="TEST"
        wrongGuesses={6}
        maxWrongGuesses={6}
        onRestart={mockOnRestart}
      />
    );
    
    expect(screen.getByText('Te quedan 0 intentos')).toBeInTheDocument();
    expect(screen.getByText('6/6')).toBeInTheDocument();
  });
});
