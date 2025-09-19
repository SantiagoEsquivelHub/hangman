import React from 'react';
import './HangmanDrawing.css';

interface HangmanDrawingProps {
  wrongGuesses: number;
}

const HangmanDrawing: React.FC<HangmanDrawingProps> = ({ wrongGuesses }) => {
  const parts = [
    '😵', // head (1)
    '|',  // body (2)
    '/',  // left arm (3)
    '\\', // right arm (4)
    '/',  // left leg (5)
    '\\', // right leg (6)
  ];

  return (
    <div className="hangman-drawing">
      <div className="gallows">
        <div className="gallows-top">+---+</div>
        <div className="gallows-rope">|   |</div>
        <div className="hangman-parts">
          <div className="head">{wrongGuesses >= 1 ? parts[0] : ' '}</div>
          <div className="body-line">
            <span className="left-arm">{wrongGuesses >= 3 ? parts[2] : ' '}</span>
            <span className="body">{wrongGuesses >= 2 ? parts[1] : ' '}</span>
            <span className="right-arm">{wrongGuesses >= 4 ? parts[3] : ' '}</span>
          </div>
          <div className="legs-line">
            <span className="left-leg">{wrongGuesses >= 5 ? parts[4] : ' '}</span>
            <span className="right-leg">{wrongGuesses >= 6 ? parts[5] : ' '}</span>
          </div>
        </div>
        <div className="gallows-base">|</div>
        <div className="ground">=========</div>
      </div>
      <div className="wrong-count">
        Errores: {wrongGuesses}/6
      </div>
    </div>
  );
};

export default HangmanDrawing;
