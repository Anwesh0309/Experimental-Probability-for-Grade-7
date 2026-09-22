import React, { useEffect } from 'react';
import { useGameStore } from '../../store/gameStore';
import { Star, Trophy, Flame, CheckCircle2, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { narrate, stopNarration } from '../../utils/audio';
import '../../styles/reflect.css';

export const ReflectScoreboard = () => {
  const {
    xp,
    bestStreak,
    worldsData,
    reflectionText,
    setReflectionText,
    reflectionDone,
    setReflectionDone,
    markPhaseComplete,
    audioEnabled,
    resetGameProgress
  } = useGameStore();

  const totalStars = Object.values(worldsData).reduce((sum, w) => sum + (w.stars || 0), 0);
  const minCharCount = 10;
  const isTextValid = reflectionText.trim().length >= minCharCount;

  useEffect(() => {
    if (audioEnabled) {
      narrate("reflect_prompt");
    }
    return () => {
      stopNarration();
    };
  }, [audioEnabled]);

  const handleCompleteLesson = () => {
    if (!isTextValid) return;
    stopNarration();
    setReflectionDone(true);
    markPhaseComplete('reflect');
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.5 } });
    if (audioEnabled) narrate("reflect_complete");
  };

  return (
    <div className="reflect-page-bg">
      {/* Background Watermark Numbers */}
      <span className="watermark-text" style={{ top: '8%', left: '12%', fontSize: '72px' }}>100</span>
      <span className="watermark-text" style={{ top: '35%', left: '8%', fontSize: '60px', fontStyle: 'italic' }}>H</span>
      <span className="watermark-text" style={{ bottom: '15%', left: '14%', fontSize: '66px' }}>200</span>
      <span className="watermark-text" style={{ top: '8%', right: '18%', fontSize: '72px' }}>500</span>
      <span className="watermark-text" style={{ top: '26%', right: '9%', fontSize: '68px' }}>347</span>
      <span className="watermark-text" style={{ top: '50%', right: '15%', fontSize: '44px' }}>123</span>
      <span className="watermark-text" style={{ bottom: '18%', right: '20%', fontSize: '76px' }}>999</span>

      {/* Main Glassmorphic Modal Card */}
      <div className="reflect-modal-card">
        {/* Top Accent Handle Line */}
        <div className="reflect-modal-handle" />

        {/* Title */}
        <div className="reflect-modal-title">
          <span>🏆</span>
          <span>Reflect & Scoreboard</span>
        </div>

        {/* 3 Stat Cards Row */}
        <div className="reflect-stats-grid">
          <div className="reflect-stat-card">
            <div className="reflect-stat-icon">✨</div>
            <div className="reflect-stat-value">{xp}</div>
            <div className="reflect-stat-label">Total XP</div>
          </div>

          <div className="reflect-stat-card">
            <div className="reflect-stat-icon">⭐</div>
            <div className="reflect-stat-value">{totalStars} / 30</div>
            <div className="reflect-stat-label">Stars</div>
          </div>

          <div className="reflect-stat-card">
            <div className="reflect-stat-icon">🔥</div>
            <div className="reflect-stat-value">{bestStreak}</div>
            <div className="reflect-stat-label">Best Streak</div>
          </div>
        </div>

        {/* World Results Section */}
        <div className="reflect-world-container">
          <div className="reflect-world-header">WORLD RESULTS</div>
          <div className="reflect-world-grid">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((wId) => {
              const stars = worldsData[wId]?.stars || 0;
              return (
                <div key={wId} className="reflect-world-pill">
                  <div className="reflect-world-name">W{wId}</div>
                  <div className="reflect-world-stars">
                    {stars > 0 ? '⭐'.repeat(stars) : '—'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Horizontal Divider Line */}
        <div className="reflect-divider" />

        {/* Reflection Question Header */}
        <p className="reflect-prompt-title">
          What did you learn about experimental probability? Explain it to Leo with an example!
        </p>

        {/* Robot Avatar + Textarea Row */}
        <div className="reflect-input-row">
          <div className="reflect-robot-avatar">🤖</div>
          <div className="reflect-textarea-wrapper">
            <textarea
              value={reflectionText}
              disabled={reflectionDone}
              onChange={(e) => setReflectionText(e.target.value)}
              placeholder="Dear Leo, experimental probability is when we..."
              className="reflect-textarea"
            />
            <div className="reflect-char-count">
              {reflectionText.trim().length} / {minCharCount} min chars
            </div>
          </div>
        </div>

        {/* Primary Action Button */}
        {!reflectionDone ? (
          <button
            disabled={!isTextValid}
            onClick={handleCompleteLesson}
            className="reflect-complete-cta"
          >
            <span>Complete Lesson! 🎉</span>
          </button>
        ) : (
          <div className="flex items-center gap-1.5 text-emerald-400 font-black text-sm bg-emerald-950/80 px-5 py-2 rounded-full border border-emerald-500/40">
            <CheckCircle2 className="w-4 h-4" />
            <span>Lesson Completed! Master Badge Awarded 🏆</span>
          </div>
        )}
      </div>

      {/* Footer Reset Progress Button */}
      <button
        onClick={() => {
          stopNarration();
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
