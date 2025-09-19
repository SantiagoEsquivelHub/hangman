// Lista de palabras para el juego del ahorcado - Enfocadas en innovación, liderazgo y emprendimiento
const WORDS = [
  // Innovación y Tecnología
  'INNOVACION',
  'CREATIVIDAD',
  'DISRUPCION',
  'TRANSFORMACION',
  'DIGITALIZACION',
  'AUTOMATIZACION',
  'INTELIGENCIA',
  'ARTIFICIAL',
  'CADENA',
  'BLOQUES',
  'EMPRESA',
  'EMERGENTE',
  'UNICORNIO',
  'PROTOTIPO',
  'ESCALABILIDAD',
  'AGIL',
  'METODOLOGIA',
  
  // Liderazgo y Management
  'LIDERAZGO',
  'VISION',
  'MISION',
  'ESTRATEGIA',
  'MOTIVACION',
  'INSPIRACION',
  'ENTRENAMIENTO',
  'MENTORIA',
  'DELEGACION',
  'COMUNICACION',
  'NEGOCIACION',
  'INFLUENCIA',
  'CARISMA',
  'RESILENCIA',
  'ADAPTABILIDAD',
  
  // Emprendimiento y Negocios
  'EMPRENDIMIENTO',
  'EMPRENDEDOR',
  'ECOSISTEMA',
  'INCUBADORA',
  'ACELERADORA',
  'CAPITAL',
  'INVERSION',
  'FINANCIAMIENTO',
  'MODELO',
  'PROPUESTA',
  'VALOR',
  'MERCADO',
  'CLIENTE',
  'SEGMENTACION',
  'MONETIZACION',
  'VALIDACION',
  'PIVOTE',
  'CRECIMIENTO',
  'EXPANSION',
  'CONEXIONES',
  
  // Metodologías y Conceptos
  'MAGRO',
  'LIENZO',
  'LLUVIA',
  'IDEAS',
  'DISEÑO',
  'PENSAMIENTO',
  'USUARIO',
  'EXPERIENCIA',
  'OPTIMIZACION',
  'MEJORA',
  'CONTINUA',
  'CALIDAD',
  'EXCELENCIA',
  'PRODUCTIVIDAD',
  'EFICIENCIA',
  'COMPETITIVIDAD'
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
