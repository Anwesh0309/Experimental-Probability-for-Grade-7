import React, { useEffect } from 'react';
import { useGameStore } from '../../store/gameStore';
import { narrate } from '../../utils/audio';
import '../../styles/wonder.css';

export const WonderHook = () => {
  const { setPhase, markPhaseComplete, audioEnabled, resetGameProgress } = useGameStore();

  const introSpeech = "Alex flipped a mystery coin 10 times and got 7 heads. Does that mean the coin is unfair? How can we find out without guessing?";

  useEffect(() => {
    if (audioEnabled) {
      narrate(introSpeech);
    }
  }, [audioEnabled]);

  const handleNext = () => {
    markPhaseComplete('wonder');
    setPhase('story');
  };

  return (
    <div className="wonder-page-bg">
      {/* Background Watermark Numbers (Matching SS layout) */}
      <span className="watermark-text" style={{ top: '8%', left: '12%', fontSize: '72px' }}>100</span>
      <span className="watermark-text" style={{ top: '35%', left: '8%', fontSize: '60px', fontStyle: 'italic' }}>H</span>
      <span className="watermark-text" style={{ bottom: '15%', left: '14%', fontSize: '66px' }}>200</span>
      <span className="watermark-text" style={{ top: '8%', right: '18%', fontSize: '72px' }}>500</span>
      <span className="watermark-text" style={{ top: '26%', right: '9%', fontSize: '68px' }}>347</span>
      <span className="watermark-text" style={{ top: '50%', right: '15%', fontSize: '44px' }}>123</span>
      <span className="watermark-text" style={{ bottom: '18%', right: '20%', fontSize: '76px' }}>999</span>

      {/* Main Glassmorphic Modal Card */}
      <div className="wonder-modal-card">
        {/* Top Handle Accent Bar */}
        <div className="wonder-modal-handle" />

        {/* Card Title */}
        <div className="wonder-modal-title">
          <span>🔮</span>
          <span>Wonder Hook</span>
        </div>

        {/* Robot Avatar Icon */}
        <div className="wonder-robot-avatar">
          🤖
        </div>

        {/* Hero Featured Box with Dashed Yellow Border */}
        <div className="wonder-hero-box">
          <div className="wonder-hero-icon">🎲</div>
          <div className="wonder-hero-giant-text">7 Heads!</div>
          <div className="wonder-hero-subtitle">
            <span className="checkmark">✓</span>
            <span>TOTAL EXPERIMENT RECORDED!</span>
          </div>
        </div>

        {/* Description Prompt Text */}
        <div className="wonder-description-text">
          <p>
            Alex flipped a mystery coin <span className="highlight-val">10 times</span> and got{' '}
            <span className="highlight-val">7 heads</span>.
          </p>
          <p style={{ marginTop: '4px' }}>
            Does that mean the coin is unfair? How can we find out without guessing?
          </p>
        </div>

        {/* Primary CTA Yellow Glowing Button */}
        <button onClick={handleNext} className="wonder-primary-cta">
          <span>Discover the Story →</span>
        </button>
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
