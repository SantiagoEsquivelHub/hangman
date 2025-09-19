import React, { useMemo } from "react";
import "./WordDisplay.css";

export interface WordDisplayProps {
  word: string;
  guessedLetters: Set<string>;
}

const WordDisplay: React.FC<WordDisplayProps> = ({ word, guessedLetters }) => {
  const letters = useMemo(() => word.split(""), [word]);

  return (
    <section
      className="word-display centered" /* ← quita 'centered' si no quieres centrado vertical */
      aria-label={`Palabra con ${word.length} caracteres`}
      data-testid="word-display"
    >
      <h2 className="word-text" aria-live="polite" aria-atomic="true">
        {letters.map((ch, i) => {
          const lower = ch.toLowerCase();
          const isLetter = /[a-záéíóúüñ]/i.test(lower);
          const revealed = isLetter ? guessedLetters.has(lower) : true;

          // Mostrar espacios y signos tal cual (si los hubiera)
          if (!isLetter) {
            return (
              <span
                key={`${ch}-${i}`}
                className={`letter symbol ${ch === " " ? "space" : ""}`}
                aria-hidden={ch === " "}
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
            );
          }

          return (
            <span
              key={`${ch}-${i}`}
              className={`letter ${revealed ? "revealed" : "placeholder"}`}
              aria-label={revealed ? ch : "sin revelar"}
            >
              <span className="letter-inner">
                {revealed ? ch : "_"}
              </span>
            </span>
          );
        })}
      </h2>

      <div className="word-info">
        <span className="word-length" aria-label="Cantidad de letras">
          Letras: {word.length}
        </span>
      </div>
    </section>
  );
};

export default WordDisplay;
