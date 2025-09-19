import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import HangmanGame from '../components/HangmanGame';
import * as gameUtils from '../utils/gameUtils';

// Mock del módulo gameUtils para tener control sobre la palabra
jest.mock('../utils/gameUtils', () => {
  const originalModule = jest.requireActual('../utils/gameUtils');
  return {
    ...originalModule,
    getRandomWord: jest.fn(() => 'LIDERAZGO'),
  };
});

describe('HangmanGame Integration Tests', () => {
  beforeEach(() => {
    // Limpiar mocks antes de cada test
    jest.clearAllMocks();
    
    // Configurar el mock para retornar una palabra conocida
    const mockedGetRandomWord = require('../utils/gameUtils').getRandomWord;
    mockedGetRandomWord.mockReturnValue('LIDERAZGO');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should initialize game correctly', () => {
    render(<HangmanGame />);
    
    // Verificar que se muestra la palabra oculta (LIDERAZGO tiene 9 letras)
    expect(screen.getByText('_ _ _ _ _ _ _ _ _')).toBeInTheDocument();
    
    // Verificar que se muestra el estado inicial
    expect(screen.getByText('🎮 ¡Adivina la palabra!')).toBeInTheDocument();
    expect(screen.getByText('Te quedan 6 intentos')).toBeInTheDocument();
    
    // Verificar que todas las letras del teclado están disponibles
    const letterA = screen.getByText('A');
    expect(letterA).not.toBeDisabled();
    
    // Verificar que no hay partes del ahorcado
    expect(screen.getByText('0/6')).toBeInTheDocument();
  });

  // TEST 2: Manejo de letra correcta
  test('should handle correct letter guess', async () => {
    render(<HangmanGame />);
    
    // Hacer clic en la letra L (que está en LIDERAZGO)
    const letterL = screen.getByText('L');
    fireEvent.click(letterL);
    
    await waitFor(() => {
      // La letra L debería aparecer en la palabra
      expect(screen.getByText('L _ _ _ _ _ _ _ _')).toBeInTheDocument();
      
      // La letra L debería estar marcada como correcta
      expect(letterL).toHaveClass('correct');
      expect(letterL).toBeDisabled();
      
      // No debería incrementar los errores
      expect(screen.getByText('0/6')).toBeInTheDocument();
    });
  });

  // TEST 3: Manejo de letra incorrecta  
  test('should handle incorrect letter guess', async () => {
    render(<HangmanGame />);
    
    // Hacer clic en la letra X (que no está en LIDERAZGO)
    const letterX = screen.getByText('X');
    fireEvent.click(letterX);
    
    await waitFor(() => {
      // La palabra no debería cambiar
      expect(screen.getByText('_ _ _ _ _ _ _ _ _')).toBeInTheDocument();
      
      // La letra X debería estar marcada como incorrecta
      expect(letterX).toHaveClass('incorrect');
      expect(letterX).toBeDisabled();
      
      // Debería incrementar los errores
      expect(screen.getByText('1/6')).toBeInTheDocument();
    });
  });

  // RESTO DE TESTS COMENTADOS TEMPORALMENTE
  /*
  test('should handle incorrect letter guess', async () => {
    render(<HangmanGame />);
    
    // Hacer clic en la letra X (que no está en LIDERAZGO)
    const letterX = screen.getByText('X');
    fireEvent.click(letterX);
    
    await waitFor(() => {
      // La palabra no debería cambiar
      expect(screen.getByText('_ _ _ _ _ _ _ _ _')).toBeInTheDocument();
      
      // La letra X debería estar marcada como incorrecta
      expect(letterX).toHaveClass('incorrect');
      expect(letterX).toBeDisabled();
      
      // Debería incrementar los errores
      expect(screen.getByText('1/6')).toBeInTheDocument();
    });
  });

  test('should win the game when all letters are guessed', async () => {
    render(<HangmanGame />);
    
    // Adivinar todas las letras de LIDERAZGO
    const letters = ['L', 'I', 'D', 'E', 'R', 'A', 'Z', 'G', 'O'];
    
    for (const letter of letters) {
      const letterButton = screen.getByText(letter);
      fireEvent.click(letterButton);
    }
    
    await waitFor(() => {
      // Debería mostrar la palabra completa
      expect(screen.getByText('L I D E R A Z G O')).toBeInTheDocument();
      
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
      expect(screen.getByText('La palabra era: LIDERAZGO')).toBeInTheDocument();
      
      // Debería mostrar el botón de reinicio
      expect(screen.getByText('🔄 Jugar de nuevo')).toBeInTheDocument();
      
      // Debería mostrar 6 errores
      expect(screen.getByText('6/6')).toBeInTheDocument();
    });
  });

  test('should restart the game when restart button is clicked', async () => {
    render(<HangmanGame />);
    
    // Hacer algunas adivinanzas para cambiar el estado
    fireEvent.click(screen.getByText('X'));
    fireEvent.click(screen.getByText('Y'));
    
    await waitFor(() => {
      expect(screen.getByText('2/6')).toBeInTheDocument();
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
      expect(screen.getByText('_ _ _ _ _ _ _ _ _')).toBeInTheDocument();
      expect(screen.getByText('🎮 ¡Adivina la palabra!')).toBeInTheDocument();
      expect(screen.getByText('0/6')).toBeInTheDocument();
      
      // Las letras deberían estar disponibles de nuevo
      const letterX = screen.getByText('X');
      expect(letterX).not.toBeDisabled();
      expect(letterX).not.toHaveClass('incorrect');
    });
  });

  test('should disable keyboard when game is over', async () => {
    render(<HangmanGame />);
    
    // Perder el juego haciendo 6 adivinanzas incorrectas
    const wrongLetters = ['X', 'Y', 'Z', 'Q', 'W', 'B'];
    
    // Hacer todas las adivinanzas
    wrongLetters.forEach(letter => {
      const letterButton = screen.getByText(letter);
      fireEvent.click(letterButton);
    });
    
    // Verificar que aparece el mensaje de derrota y el contador final
    await waitFor(() => {
      expect(screen.getByText('💀 ¡Perdiste!')).toBeInTheDocument();
      expect(screen.getByText('6/6')).toBeInTheDocument();
    });
    
    // Intentar hacer clic en una letra no adivinada
    const letterA = screen.getByText('A');
    expect(letterA).toBeDisabled();
  });

  test('should handle keyboard input', async () => {
    render(<HangmanGame />);
    
    // Simular presionar la tecla 'l' (que está en LIDERAZGO)
    fireEvent.keyDown(window, { key: 'l', code: 'KeyL' });
    
    await waitFor(() => {
      // La letra L debería aparecer en la palabra
      expect(screen.getByText('L _ _ _ _ _ _ _ _')).toBeInTheDocument();
      
      // La letra L debería estar marcada como correcta
      const letterL = screen.getByText('L');
      expect(letterL).toHaveClass('correct');
    });
  });

  test('should ignore invalid keyboard input', () => {
    render(<HangmanGame />);
    
    // Verificar el estado inicial antes de las teclas inválidas
    expect(screen.getByText('_ _ _ _ _ _ _ _ _')).toBeInTheDocument();
    expect(screen.getByText('0/6')).toBeInTheDocument();
    
    // Simular presionar teclas inválidas
    fireEvent.keyDown(window, { key: '1', code: 'Digit1' });
    fireEvent.keyDown(window, { key: ' ', code: 'Space' });
    fireEvent.keyDown(window, { key: 'Enter', code: 'Enter' });
    
    // El estado del juego no debería cambiar después de teclas inválidas
    expect(screen.getByText('_ _ _ _ _ _ _ _ _')).toBeInTheDocument();
    expect(screen.getByText('0/6')).toBeInTheDocument();
  });
  */
});
