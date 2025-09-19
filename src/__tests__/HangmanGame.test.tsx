import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import HangmanGame from '../components/HangmanGame';
import * as gameUtils from '../utils/gameUtils';

// Mock del módulo gameUtils para tener control sobre la palabra
jest.mock('../utils/gameUtils');
const mockedGameUtils = gameUtils as jest.Mocked<typeof gameUtils>;

describe('HangmanGame Integration Tests', () => {
  beforeEach(() => {
    // Configurar el mock para retornar una palabra conocida
    mockedGameUtils.getRandomWord.mockReturnValue('REACT');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should initialize game correctly', () => {
    render(<HangmanGame />);
    
    // Verificar que se muestra la palabra oculta
    expect(screen.getByText('_ _ _ _ _')).toBeInTheDocument();
    
    // Verificar que se muestra el estado inicial
    expect(screen.getByText('🎮 ¡Adivina la palabra!')).toBeInTheDocument();
    expect(screen.getByText('Te quedan 6 intentos')).toBeInTheDocument();
    
    // Verificar que todas las letras del teclado están disponibles
    const letterA = screen.getByText('A');
    expect(letterA).not.toBeDisabled();
    
    // Verificar que no hay partes del ahorcado
    expect(screen.getByText('Errores: 0/6')).toBeInTheDocument();
  });

  test('should handle correct letter guess', async () => {
    render(<HangmanGame />);
    
    // Hacer clic en la letra R (que está en REACT)
    const letterR = screen.getByText('R');
    fireEvent.click(letterR);
    
    await waitFor(() => {
      // La letra R debería aparecer en la palabra
      expect(screen.getByText('R _ _ _ _')).toBeInTheDocument();
      
      // La letra R debería estar marcada como correcta
      expect(letterR).toHaveClass('correct');
      expect(letterR).toBeDisabled();
      
      // No debería incrementar los errores
      expect(screen.getByText('Errores: 0/6')).toBeInTheDocument();
    });
  });

  test('should handle incorrect letter guess', async () => {
    render(<HangmanGame />);
    
    // Hacer clic en la letra X (que no está en REACT)
    const letterX = screen.getByText('X');
    fireEvent.click(letterX);
    
    await waitFor(() => {
      // La palabra no debería cambiar
      expect(screen.getByText('_ _ _ _ _')).toBeInTheDocument();
      
      // La letra X debería estar marcada como incorrecta
      expect(letterX).toHaveClass('incorrect');
      expect(letterX).toBeDisabled();
      
      // Debería incrementar los errores
      expect(screen.getByText('Errores: 1/6')).toBeInTheDocument();
    });
  });

  test('should win the game when all letters are guessed', async () => {
    render(<HangmanGame />);
    
    // Adivinar todas las letras de REACT
    const letters = ['R', 'E', 'A', 'C', 'T'];
    
    for (const letter of letters) {
      const letterButton = screen.getByText(letter);
      fireEvent.click(letterButton);
    }
    
    await waitFor(() => {
      // Debería mostrar la palabra completa
      expect(screen.getByText('R E A C T')).toBeInTheDocument();
      
      // Debería mostrar el mensaje de victoria
      expect(screen.getByText('🎉 ¡Felicitaciones!')).toBeInTheDocument();
      expect(screen.getByText('¡Has ganado! Adivinaste la palabra.')).toBeInTheDocument();
      
      // Debería mostrar el botón de reinicio
      expect(screen.getByText('🔄 Jugar de nuevo')).toBeInTheDocument();
    });
  });

  test('should lose the game after 6 wrong guesses', async () => {
    render(<HangmanGame />);
    
    // Hacer 6 adivinanzas incorrectas
    const wrongLetters = ['X', 'Y', 'Z', 'Q', 'W', 'B'];
    
    for (const letter of wrongLetters) {
      const letterButton = screen.getByText(letter);
      fireEvent.click(letterButton);
    }
    
    await waitFor(() => {
      // Debería mostrar el mensaje de derrota
      expect(screen.getByText('💀 ¡Perdiste!')).toBeInTheDocument();
      expect(screen.getByText('La palabra era: REACT')).toBeInTheDocument();
      
      // Debería mostrar el botón de reinicio
      expect(screen.getByText('🔄 Jugar de nuevo')).toBeInTheDocument();
      
      // Debería mostrar 6 errores
      expect(screen.getByText('Errores: 6/6')).toBeInTheDocument();
    });
  });

  test('should restart the game when restart button is clicked', async () => {
    render(<HangmanGame />);
    
    // Hacer algunas adivinanzas para cambiar el estado
    fireEvent.click(screen.getByText('X'));
    fireEvent.click(screen.getByText('Y'));
    
    await waitFor(() => {
      expect(screen.getByText('Errores: 2/6')).toBeInTheDocument();
    });
    
    // Perder el juego para que aparezca el botón de reinicio
    const wrongLetters = ['Z', 'Q', 'W', 'B'];
    for (const letter of wrongLetters) {
      const letterButton = screen.getByText(letter);
      fireEvent.click(letterButton);
    }
    
    await waitFor(() => {
      expect(screen.getByText('🔄 Jugar de nuevo')).toBeInTheDocument();
    });
    
    // Hacer clic en reiniciar
    const restartButton = screen.getByText('🔄 Jugar de nuevo');
    fireEvent.click(restartButton);
    
    await waitFor(() => {
      // El juego debería reiniciarse
      expect(screen.getByText('_ _ _ _ _')).toBeInTheDocument();
      expect(screen.getByText('🎮 ¡Adivina la palabra!')).toBeInTheDocument();
      expect(screen.getByText('Errores: 0/6')).toBeInTheDocument();
      
      // Las letras deberían estar disponibles de nuevo
      const letterX = screen.getByText('X');
      expect(letterX).not.toBeDisabled();
      expect(letterX).not.toHaveClass('incorrect');
    });
  });

  test('should disable keyboard when game is over', async () => {
    render(<HangmanGame />);
    
    // Perder el juego
    const wrongLetters = ['X', 'Y', 'Z', 'Q', 'W', 'B'];
    for (const letter of wrongLetters) {
      const letterButton = screen.getByText(letter);
      fireEvent.click(letterButton);
    }
    
    await waitFor(() => {
      expect(screen.getByText('💀 ¡Perdiste!')).toBeInTheDocument();
    });
    
    // Intentar hacer clic en una letra no adivinada
    const letterA = screen.getByText('A');
    expect(letterA).toBeDisabled();
  });

  test('should handle keyboard input', async () => {
    render(<HangmanGame />);
    
    // Simular presionar la tecla 'r'
    fireEvent.keyDown(window, { key: 'r', code: 'KeyR' });
    
    await waitFor(() => {
      // La letra R debería aparecer en la palabra
      expect(screen.getByText('R _ _ _ _')).toBeInTheDocument();
      
      // La letra R debería estar marcada como correcta
      const letterR = screen.getByText('R');
      expect(letterR).toHaveClass('correct');
    });
  });

  test('should ignore invalid keyboard input', async () => {
    render(<HangmanGame />);
    
    // Simular presionar teclas inválidas
    fireEvent.keyDown(window, { key: '1', code: 'Digit1' });
    fireEvent.keyDown(window, { key: ' ', code: 'Space' });
    fireEvent.keyDown(window, { key: 'Enter', code: 'Enter' });
    
    await waitFor(() => {
      // El estado del juego no debería cambiar
      expect(screen.getByText('_ _ _ _ _')).toBeInTheDocument();
      expect(screen.getByText('Errores: 0/6')).toBeInTheDocument();
    });
  });
});
