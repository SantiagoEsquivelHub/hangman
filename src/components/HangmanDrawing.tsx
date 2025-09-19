// src/components/HangmanDrawing.tsx
import React, { useMemo } from "react";
import "./HangmanDrawing.css";

export interface HangmanDrawingProps {
  wrongGuesses: number;
}

const HangmanDrawing: React.FC<HangmanDrawingProps> = React.memo(
  ({ wrongGuesses }) => {
    const clamped = Math.min(Math.max(wrongGuesses, 0), 6);
    const stageClass = `stage-${clamped}`;

    const parts = useMemo(
      () => ["😵", "|", "/", "\\", "/", "\\"],
      []
    );

    return (
      <section
        className={`hangman-drawing ${stageClass}`}
        aria-label={`Dibujo del ahorcado, errores ${clamped} de 6`}
        data-testid="hangman-drawing"
      >
        <figure className="gallows" role="img" aria-hidden={false}>
          {/* Poste y soga “dibujados” con texto monoespaciado, pero estilizados como tiza */}
          <pre className="gallows-top">+---+</pre>
          <pre className="gallows-rope">|   |</pre>

          <div className="hangman-parts" aria-live="polite" aria-atomic="true">
            <div className="head">{clamped >= 1 ? parts[0] : " "}</div>

            <div className="body-line" aria-hidden={clamped < 2}>
              <span className="left-arm">{clamped >= 3 ? parts[2] : " "}</span>
              <span className="body">{clamped >= 2 ? parts[1] : " "}</span>
              <span className="right-arm">{clamped >= 4 ? parts[3] : " "}</span>
            </div>

            <div className="legs-line" aria-hidden={clamped < 5}>
              <span className="left-leg">{clamped >= 5 ? parts[4] : " "}</span>
              <span className="right-leg">{clamped >= 6 ? parts[5] : " "}</span>
            </div>
          </div>

          <pre className="gallows-base">|</pre>
          <pre className="ground">=========</pre>

          <figcaption className="sr-only">
            {`Errores: ${clamped} de 6`}
          </figcaption>
        </figure>
      </section>
    );
  }
);

HangmanDrawing.displayName = "HangmanDrawing";
export default HangmanDrawing;
