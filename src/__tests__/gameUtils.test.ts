import { 
  getRandomWord, 
  isValidLetter, 
  normalizeLetter, 
  isWordGuessed, 
  getWordLetters 
} from '../utils/gameUtils';

describe('gameUtils', () => {
  describe('getRandomWord', () => {
    test('should return a string', () => {
      const word = getRandomWord();
      expect(typeof word).toBe('string');
    });

    test('should return a word with length greater than 0', () => {
      const word = getRandomWord();
      expect(word.length).toBeGreaterThan(0);
    });

    test('should return an uppercase word', () => {
      const word = getRandomWord();
      expect(word).toBe(word.toUpperCase());
    });

    test('should return different words on multiple calls (statistically)', () => {
      const words = new Set();
      for (let i = 0; i < 20; i++) {
        words.add(getRandomWord());
      }
      // Con 20 llamadas, deberíamos tener al menos 2 palabras diferentes
      expect(words.size).toBeGreaterThanOrEqual(2);
    });
  });

  describe('isValidLetter', () => {
    test('should return true for lowercase letters', () => {
      expect(isValidLetter('a')).toBe(true);
      expect(isValidLetter('z')).toBe(true);
      expect(isValidLetter('m')).toBe(true);
    });

    test('should return true for uppercase letters', () => {
      expect(isValidLetter('A')).toBe(true);
      expect(isValidLetter('Z')).toBe(true);
      expect(isValidLetter('M')).toBe(true);
    });

    test('should return false for non-letters', () => {
      expect(isValidLetter('1')).toBe(false);
      expect(isValidLetter('!')).toBe(false);
      expect(isValidLetter(' ')).toBe(false);
      expect(isValidLetter('')).toBe(false);
      expect(isValidLetter('ab')).toBe(false);
    });
  });

  describe('normalizeLetter', () => {
    test('should convert uppercase to lowercase', () => {
      expect(normalizeLetter('A')).toBe('a');
      expect(normalizeLetter('Z')).toBe('z');
    });

    test('should keep lowercase as lowercase', () => {
      expect(normalizeLetter('a')).toBe('a');
      expect(normalizeLetter('z')).toBe('z');
    });
  });

  describe('isWordGuessed', () => {
    test('should return true when all letters are guessed', () => {
      const word = 'REACT';
      const guessedLetters = new Set(['r', 'e', 'a', 'c', 't']);
      expect(isWordGuessed(word, guessedLetters)).toBe(true);
    });

    test('should return false when some letters are missing', () => {
      const word = 'REACT';
      const guessedLetters = new Set(['r', 'e', 'a']);
      expect(isWordGuessed(word, guessedLetters)).toBe(false);
    });

    test('should return true for single letter word', () => {
      const word = 'A';
      const guessedLetters = new Set(['a']);
      expect(isWordGuessed(word, guessedLetters)).toBe(true);
    });

    test('should handle duplicate letters in word', () => {
      const word = 'HELLO';
      const guessedLetters = new Set(['h', 'e', 'l', 'o']);
      expect(isWordGuessed(word, guessedLetters)).toBe(true);
    });

    test('should return false with extra guessed letters but missing word letters', () => {
      const word = 'REACT';
      const guessedLetters = new Set(['r', 'e', 'x', 'y', 'z']); // missing 'a', 'c', 't'
      expect(isWordGuessed(word, guessedLetters)).toBe(false);
    });
  });

  describe('getWordLetters', () => {
    test('should return unique letters from a word', () => {
      const word = 'HELLO';
      const letters = getWordLetters(word);
      expect(letters).toEqual(new Set(['h', 'e', 'l', 'o']));
    });

    test('should handle single letter word', () => {
      const word = 'A';
      const letters = getWordLetters(word);
      expect(letters).toEqual(new Set(['a']));
    });

    test('should convert to lowercase', () => {
      const word = 'REACT';
      const letters = getWordLetters(word);
      expect(letters).toEqual(new Set(['r', 'e', 'a', 'c', 't']));
    });

    test('should handle empty string', () => {
      const word = '';
      const letters = getWordLetters(word);
      expect(letters).toEqual(new Set(['']));
    });
  });
});
