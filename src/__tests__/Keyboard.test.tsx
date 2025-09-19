import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Keyboard from '../components/Keyboard';

describe('Keyboard Component', () => {
  const mockOnGuess = jest.fn();

  beforeEach(() => {
    mockOnGuess.mockClear();
  });

  test('should render all 26 letters', () => {
    const guessedLetters: Set<string> = new Set();
    const word = 'VALOR';
    
    render(
      <Keyboard 
        guessedLetters={guessedLetters} 
        word={word} 
        onGuess={mockOnGuess}
        disabled={false}
      />
    );
    
    // Verificar que todas las letras del alfabeto estén presentes
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    letters.forEach(letter => {
      expect(screen.getByText(letter)).toBeInTheDocument();
    });
  });

  test('should call onGuess when a letter is clicked', () => {
    const guessedLetters: Set<string> = new Set();
    const word = 'VALOR';
    
    render(
      <Keyboard 
        guessedLetters={guessedLetters} 
        word={word} 
        onGuess={mockOnGuess}
        disabled={false}
      />
    );
    
    const letterA = screen.getByText('A');
    fireEvent.click(letterA);
    
    expect(mockOnGuess).toHaveBeenCalledWith('a');
    expect(mockOnGuess).toHaveBeenCalledTimes(1);
  });

  test('should show correct letters in green', () => {
    const guessedLetters: Set<string> = new Set(['v', 'a']);
    const word = 'VALOR';
    
    render(
      <Keyboard 
        guessedLetters={guessedLetters} 
        word={word} 
        onGuess={mockOnGuess}
        disabled={false}
      />
    );
    
    const letterV = screen.getByText('V');
    const letterA = screen.getByText('A');
    
    expect(letterV).toHaveClass('correct');
    expect(letterA).toHaveClass('correct');
  });

  test('should show incorrect letters in red', () => {
    const guessedLetters: Set<string> = new Set(['x', 'y', 'z']);
    const word = 'VALOR';
    
    render(
      <Keyboard 
        guessedLetters={guessedLetters} 
        word={word} 
        onGuess={mockOnGuess}
        disabled={false}
      />
    );
    
    const letterX = screen.getByText('X');
    const letterY = screen.getByText('Y');
    const letterZ = screen.getByText('Z');
    
    expect(letterX).toHaveClass('incorrect');
    expect(letterY).toHaveClass('incorrect');
    expect(letterZ).toHaveClass('incorrect');
  });

  test('should disable guessed letters', () => {
    const guessedLetters: Set<string> = new Set(['a', 'b']);
    const word = 'VALOR';
    
    render(
      <Keyboard 
        guessedLetters={guessedLetters} 
        word={word} 
        onGuess={mockOnGuess}
        disabled={false}
      />
    );
    
    const letterA = screen.getByText('A');
    const letterB = screen.getByText('B');
    
    expect(letterA).toBeDisabled();
    expect(letterB).toBeDisabled();
  });

  test('should disable all letters when disabled prop is true', () => {
    const guessedLetters: Set<string> = new Set();
    const word = 'VALOR';
    
    render(
      <Keyboard 
        guessedLetters={guessedLetters} 
        word={word} 
        onGuess={mockOnGuess}
        disabled={true}
      />
    );
    
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    letters.forEach(letter => {
      expect(screen.getByText(letter)).toBeDisabled();
    });
  });

  test('should not call onGuess when disabled letter is clicked', () => {
    const guessedLetters: Set<string> = new Set(['a']);
    const word = 'VALOR';
    
    render(
      <Keyboard 
        guessedLetters={guessedLetters} 
        word={word} 
        onGuess={mockOnGuess}
        disabled={false}
      />
    );
    
    const letterA = screen.getByText('A');
    fireEvent.click(letterA);
    
    expect(mockOnGuess).not.toHaveBeenCalled();
  });

  test('should show unguessed letters with default styling', () => {
    const guessedLetters: Set<string> = new Set(['a']);
    const word = 'VALOR';
    
    render(
      <Keyboard 
        guessedLetters={guessedLetters} 
        word={word} 
        onGuess={mockOnGuess}
        disabled={false}
      />
    );
    
    const letterB = screen.getByText('B');
    expect(letterB).toHaveClass('unguessed');
    expect(letterB).not.toHaveClass('correct');
    expect(letterB).not.toHaveClass('incorrect');
  });
});
