import React from 'react';
import { useGameStore } from '../../store/gameStore';
import '../../styles/practice.css';

const WORLDS_CONFIG = [
  { id: 1, name: 'Chance Camp', qRange: 'Questions 1–10', icon: '⛺', focus: 'Trial, Outcome, Event' },
  { id: 2, name: 'Tally Town', qRange: 'Questions 11–20', icon: '📊', focus: 'Tallies & Frequencies' },
  { id: 3, name: 'Frequency Falls', qRange: 'Questions 21–30', icon: '🌊', focus: 'Frequency vs Total' },
  { id: 4, name: 'Relative Bay', qRange: 'Questions 31–40', icon: '⛵', focus: 'f ÷ n Fractions & Decimals' },
  { id: 5, name: 'Coin Cove', qRange: 'Questions 41–50', icon: '🪙', focus: 'Coin Experiments & Simplifying' },
  { id: 6, name: 'Dice Dunes', qRange: 'Questions 51–60', icon: '🎲', focus: 'Dice Rolls & Face Probabilities' },
  { id: 7, name: 'Spinner Springs', qRange: 'Questions 61–70', icon: '🎡', focus: 'Spinners & Marble Drawers' },
  { id: 8, name: 'Variation Valley', qRange: 'Questions 71–80', icon: '🏔️', focus: 'Repeat Experiment Variation' },
  { id: 9, name: 'Big Numbers Bridge', qRange: 'Questions 81–90', icon: '🌉', focus: 'Law of Large Numbers' },
  { id: 10, name: 'Predict Palace', qRange: 'Questions 91–100', icon: '🏰', focus: 'Expected Count P × N' },
];

export const WorldMap = () => {
  const {
    unlockedWorld,
    startWorldPractice,
    resetGameProgress
  } = useGameStore();

  return (
    <div className="practice-page-bg">
      {/* Background Translucent Watermarks (Matching SS layout) */}
      <span className="watermark-text" style={{ top: '6%', left: '4%', fontSize: '76px' }}>50</span>
      <span className="watermark-text" style={{ top: '10%', left: '16%', fontSize: '84px', fontStyle: 'italic' }}>3</span>
      <span className="watermark-text" style={{ top: '6%', right: '12%', fontSize: '72px' }}>1015</span>
      <span className="watermark-text" style={{ top: '8%', right: '6%', fontSize: '88px' }}>5</span>

      {/* Header Container */}
      <div className="practice-header-container">
        <h2 className="practice-main-title">
          <span>🎮</span>
          <span>Practice — Choose Your World!</span>
        </h2>
        <p className="practice-subtitle">
          Answer questions in each world. Earn stars and XP!
        </p>
      </div>

      {/* 10 World Cards Grid (2 rows x 5 cols) */}
      <div className="practice-grid">
        {WORLDS_CONFIG.map((w) => {
          const isUnlocked = w.id <= unlockedWorld;

          return isUnlocked ? (
            <button
              key={w.id}
              onClick={() => startWorldPractice(w.id)}
              className="practice-card-unlocked"
            >
              <div className="practice-card-icon">{w.icon}</div>
              <div>
                <div className="practice-card-title">{w.name}</div>
                <div className="practice-card-qrange">{w.qRange}</div>
              </div>
              <div className="practice-card-cta">
                <span>▶ PRACTICE</span>
              </div>
            </button>
          ) : (
            <div key={w.id} className="practice-card-locked">
              <span className="practice-lock-icon">🔒</span>
              <div className="practice-card-icon locked">{w.icon}</div>
              <div>
                <div className="practice-card-title locked">{w.name}</div>
                <div className="practice-card-qrange locked">{w.qRange}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Reset Progress Button */}
      <button
        onClick={() => {
          if (confirm('Reset lesson progress?')) {
            resetGameProgress();
          }
        }}
        className="wonder-reset-btn"
      >
        Reset Lesson Progress
      </button>
    </div>
  );
};
