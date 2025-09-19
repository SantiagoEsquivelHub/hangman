import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

// Mock del componente HangmanGame para aislar el test de App
jest.mock('../components/HangmanGame', () => {
  return function MockHangmanGame() {
    return <div data-testid="hangman-game">Mocked Hangman Game</div>;
  };
});

describe('App Component', () => {
  test('should render app header with title', () => {
    render(<App />);
    
    const title = screen.getByText('🎮 Juego del Ahorcado');
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H1');
  });

  test('should render hangman game component', () => {
    render(<App />);
    
    const hangmanGame = screen.getByTestId('hangman-game');
    expect(hangmanGame).toBeInTheDocument();
  });

  test('should have proper semantic structure', () => {
    render(<App />);
    
    // Verificar que existe un header
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    
    // Verificar que existe un main
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  test('should have correct CSS classes', () => {
    const { container } = render(<App />);
    
    const appDiv = container.firstChild;
    expect(appDiv).toHaveClass('App');
    
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('App-header');
  });
});
