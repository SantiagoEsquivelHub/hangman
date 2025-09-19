// Lista de palabras para el juego del ahorcado
const WORDS = [
  'REACT',
  'JAVASCRIPT',
  'TYPESCRIPT',
  'PROGRAMACION',
  'DESARROLLO',
  'FRONTEND',
  'BACKEND',
  'COMPONENTE',
  'ESTADO',
  'PROPIEDADES',
  'HOOKS',
  'INTERFACE',
  'FUNCTION',
  'VARIABLE',
  'OBJETO',
  'ARRAY',
  'STRING',
  'BOOLEAN',
  'NUMBER',
  'ALGORITHM',
  'ESTRUCTURA',
  'DATOS',
  'RECURSION',
  'ITERACION',
  'BUCLE',
  'CONDICIONAL',
  'CLASE',
  'METODO',
  'HERENCIA',
  'POLIMORFISMO',
  'ENCAPSULACION',
  'ABSTRACCION',
  'PARADIGMA',
  'PATRON',
  'ARQUITECTURA',
  'FRAMEWORK',
  'LIBRERIA',
  'MODULO',
  'PAQUETE',
  'DEPENDENCIA'
];

/**
 * Obtiene una palabra aleatoria de la lista
 * @returns Una palabra aleatoria en mayúsculas
 */
export const getRandomWord = (): string => {
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  return WORDS[randomIndex];
};

/**
 * Valida si una letra es válida (a-z, A-Z)
 * @param letter - La letra a validar
 * @returns true si es una letra válida
 */
export const isValidLetter = (letter: string): boolean => {
  return /^[a-zA-Z]$/.test(letter);
};

/**
 * Normaliza una letra a minúscula
 * @param letter - La letra a normalizar
 * @returns La letra en minúscula
 */
export const normalizeLetter = (letter: string): string => {
  return letter.toLowerCase();
};

/**
 * Verifica si todas las letras de una palabra han sido adivinadas
 * @param word - La palabra a verificar
 * @param guessedLetters - Set de letras adivinadas
 * @returns true si todas las letras han sido adivinadas
 */
export const isWordGuessed = (word: string, guessedLetters: Set<string>): boolean => {
  const wordLetters = new Set(word.toLowerCase().split(''));
  for (const letter of Array.from(wordLetters)) {
    if (!guessedLetters.has(letter)) {
      return false;
    }
  }
  return true;
};

/**
 * Obtiene las letras únicas de una palabra
 * @param word - La palabra
 * @returns Set con las letras únicas de la palabra
 */
export const getWordLetters = (word: string): Set<string> => {
  return new Set(word.toLowerCase().split(''));
};
