// src/components/GameStatus.tsx
import React, { useMemo } from "react";
import "./GameStatus.css";

export interface GameStatusProps {
  status: "playing" | "won" | "lost";
  word: string;
  wrongGuesses: number;
  maxWrongGuesses: number;
  onRestart: () => void;
}

type StatusInfo = {
  title: string;
  message: string;
  className: string;
  ariaLive?: "polite" | "assertive";
};

const getStatusInfo = (
  status: GameStatusProps["status"],
  word: string,
  wrongGuesses: number,
  maxWrongGuesses: number
): StatusInfo => {
  switch (status) {
    case "won":
      return {
        title: "🎉 ¡Felicitaciones!",
        message: "¡Has ganado! Adivinaste la palabra.",
        className: "status-won",
        ariaLive: "assertive",
      };
    case "lost":
      return {
        title: "💀 ¡Perdiste!",
        message: `La palabra era: ${word}`,
        className: "status-lost",
        ariaLive: "assertive",
      };
    default:
      return {
        title: "🎮 ¡Adivina la palabra!",
        message: `Te quedan ${Math.max(
          0,
          maxWrongGuesses - wrongGuesses
        )} intentos`,
        className: "status-playing",
        ariaLive: "polite",
      };
  }
};

const GameStatus: React.FC<GameStatusProps> = React.memo(
  ({ status, word, wrongGuesses, maxWrongGuesses, onRestart }) => {
    const info = useMemo(
      () => getStatusInfo(status, word, wrongGuesses, maxWrongGuesses),
      [status, word, wrongGuesses, maxWrongGuesses]
    );

    // Stats derivadas (si mañana quieres mostrar más datos, salen de aquí)
    const stats = useMemo(
      () => [
        { label: "Palabra", value: `${word.length} letras`, id: "word-length" },
        {
          label: "Errores",
          value: `${wrongGuesses}/${maxWrongGuesses}`,
          id: "errors",
        },
      ],
      [word.length, wrongGuesses, maxWrongGuesses]
    );

    return (
      <section
        className={`game-status ${info.className}`}
        role="status"
        aria-live={info.ariaLive}
        aria-atomic="true"
        data-testid="game-status"
      >
        <header className="game-status__header">
          <h3 className="status-title">{info.title}</h3>
        </header>

        <p className="status-message">{info.message}</p>

        {status !== "playing" && (
          <div className="game-over-actions">
            <button
              type="button"
              className="restart-button"
              onClick={onRestart}
              aria-label="Jugar de nuevo"
              data-testid="restart-button"
            >
              🔄 Jugar de nuevo
            </button>
          </div>
        )}

        <dl className="game-stats" data-testid="game-stats">
          {stats.map((s) => (
            <div className="stat" key={s.id}>
              <dt className="stat-label">{s.label}:</dt>
              <dd className="stat-value">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>
    );
  }
);

GameStatus.displayName = "GameStatus";
export default GameStatus;
