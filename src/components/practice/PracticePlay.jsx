import React, { useState, useEffect, useRef } from 'react';
import { useGameStore } from '../../store/gameStore';
import { generateWorldQuestions } from '../../engine/questions/questionGenerator';
import confetti from 'canvas-confetti';
import { narrate, stopNarration } from '../../utils/audio';
import '../../styles/practice.css';

export const PracticePlay = () => {
  const {
    activeWorldId,
    closeWorldPractice,
    recordWorldResult,
    audioEnabled,
    resetGameProgress
  } = useGameStore();

  const [questions, setQuestions] = useState([]);
  const [qIndex, setQIndex] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [score, setScore] = useState(0);
  const [gainedXp, setGainedXp] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const autoNextTimerRef = useRef(null);

  useEffect(() => {
    if (activeWorldId) {
      stopNarration();
      const generated = generateWorldQuestions(activeWorldId);
      setQuestions(generated);
      setQIndex(0);
      setHearts(3);
      setStreak(0);
      setMaxStreak(0);
      setScore(0);
      setGainedXp(0);
      setSelectedOpt(null);
      setFeedback(null);
      setIsFinished(false);
      setShowHint(false);
    }
    return () => {
      stopNarration();
    };
  }, [activeWorldId]);

  const currentQ = questions[qIndex];

  useEffect(() => {
    if (audioEnabled && currentQ && !feedback && !isFinished) {
      narrate(currentQ.prompt);
    }
    return () => {
      stopNarration();
    };
  }, [qIndex, currentQ, feedback, isFinished, audioEnabled]);

  // Clean up timer and narration on unmount
  useEffect(() => {
    return () => {
      stopNarration();
      if (autoNextTimerRef.current) {
        clearTimeout(autoNextTimerRef.current);
      }
    };
  }, []);

  const handleNextQuestion = () => {
    stopNarration();
    setFeedback(null);
    setSelectedOpt(null);
    setShowHint(false);

    if (hearts <= 0) return;

    if (qIndex < questions.length - 1) {
      setQIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
      recordWorldResult(activeWorldId, score + 1, gainedXp, maxStreak);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  };

  const handleSelectOption = (opt) => {
    if (feedback || isFinished) return;
    stopNarration();
    setSelectedOpt(opt);

    const isRight = opt.isCorrect;

    if (isRight) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setMaxStreak(Math.max(maxStreak, newStreak));
      setScore((prev) => prev + 1);

      const streakBonus = Math.min(newStreak, 5) * 5;
      const questionXp = 10 + streakBonus;
      setGainedXp((prev) => prev + questionXp);

      setFeedback({ ok: true, explanation: currentQ.explanation });
      if (audioEnabled) narrate("feedback_correct");
    } else {
      const newHearts = hearts - 1;
      setHearts(newHearts);
      setStreak(0);

      setFeedback({ ok: false, explanation: currentQ.explanation });
      if (audioEnabled) {
        if (newHearts <= 0) {
          narrate("out_of_hearts");
        } else {
          narrate("feedback_wrong");
        }
      }
    }

    // Automatically switch to the next question after 1.2 seconds
    autoNextTimerRef.current = setTimeout(() => {
      handleNextQuestion();
    }, 1200);
  };

  const handleRetry = () => {
    stopNarration();
    if (autoNextTimerRef.current) clearTimeout(autoNextTimerRef.current);
    const freshQuestions = generateWorldQuestions(activeWorldId);
    setQuestions(freshQuestions);
    setQIndex(0);
    setHearts(3);
    setStreak(0);
    setMaxStreak(0);
    setScore(0);
    setGainedXp(0);
    setSelectedOpt(null);
    setFeedback(null);
    setIsFinished(false);
    setShowHint(false);
  };

  if (!currentQ) return null;

  const progressPct = Math.round((qIndex / 10) * 100);

  return (
    <div className="practice-page-bg">
      {/* Background Watermark Numbers */}
      <span className="watermark-text" style={{ top: '8%', left: '10%', fontSize: '72px' }}>100</span>
      <span className="watermark-text" style={{ top: '38%', left: '6%', fontSize: '64px', fontStyle: 'italic' }}>180°</span>
      <span className="watermark-text" style={{ bottom: '15%', left: '12%', fontSize: '66px' }}>200</span>
      <span className="watermark-text" style={{ bottom: '12%', left: '26%', fontSize: '54px' }}>90°</span>
      <span className="watermark-text" style={{ top: '8%', right: '18%', fontSize: '72px' }}>500</span>
      <span className="watermark-text" style={{ top: '26%', right: '9%', fontSize: '68px' }}>347</span>
      <span className="watermark-text" style={{ top: '50%', right: '15%', fontSize: '44px' }}>123</span>
      <span className="watermark-text" style={{ bottom: '18%', right: '20%', fontSize: '76px' }}>999</span>

      {/* Top Controls Sub-Header Row */}
      <div className="w-full max-w-2xl flex items-center justify-between z-20 my-1 px-2">
        {/* Left: ← Worlds Button */}
        <button
          onClick={() => {
            stopNarration();
            closeWorldPractice();
          }}
          className="practice-back-map-btn"
          title="Back to World Selection Map"
        >
          <span>🗺️</span>
          <span>← Back to Worlds Map</span>
        </button>

        {/* Center Top World Title Badge */}
        <div className="qplayer-world-badge">
          <span>⭐</span>
          <span>World {activeWorldId} Challenge</span>
        </div>
      </div>

      {/* Stats Strip (Stars, Hearts, Streak) */}
      <div className="qplayer-stats-strip">
        <div className="qplayer-stat-pill text-amber-300">
          <span>⭐</span>
          <span>{score}</span>
        </div>

        <div className="qplayer-hearts-container">
          {[1, 2, 3].map((h) => (
            <span key={h} className={h <= hearts ? 'opacity-100 scale-105 transition-all' : 'opacity-30 filter grayscale'}>
              ❤️
            </span>
          ))}
        </div>

        <div className="qplayer-stat-pill text-pink-400">
          <span>🔥</span>
          <span>{streak}x</span>
        </div>
      </div>

      {/* Question Progress Track Bar */}
      <div className="qplayer-progress-container">
        <div className="qplayer-progress-header">
          <span>Question {qIndex + 1}/10</span>
          <span>{progressPct}%</span>
        </div>
        <div className="qplayer-progress-track">
          <div className="qplayer-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {/* Main Question Card & Options */}
      {!isFinished && hearts > 0 ? (
        <div className="qplayer-modal-card">
          {/* Inner Question Hero Box with Floating Top Badge & Hint Button */}
          <div className="qplayer-hero-box">
            <div className="flex items-center justify-between w-full mb-1">
              <div className="qplayer-floating-badge">
                ✦ {currentQ.topicTag || 'EXPERIMENTAL PROBABILITY RULE'}
              </div>
              <button
                onClick={() => {
                  const nextHint = !showHint;
                  setShowHint(nextHint);
                  if (nextHint) {
                    narrate(currentQ.explanation, true);
                  } else {
                    stopNarration();
                  }
                }}
                className="text-xs text-yellow-300 font-bold flex items-center gap-1 bg-yellow-950/70 px-3 py-1 rounded-full border border-yellow-400/40 hover:bg-yellow-900/90 cursor-pointer transition-all"
                title="Listen to question hint"
              >
                <span>💡 Hint</span>
              </button>
            </div>

            {/* Hint Box if expanded */}
            {showHint && (
              <div className="bg-purple-950/90 p-2.5 rounded-xl border border-yellow-400/50 text-xs text-yellow-200 text-left my-1">
                💡 <strong>Hint & Explanation:</strong> {currentQ.explanation}
              </div>
            )}

            <p className="qplayer-prompt-text">{currentQ.prompt}</p>
          </div>

          {/* 2x2 Answer Options Grid */}
          <div className="qplayer-options-grid">
            {currentQ.options.map((opt, idx) => {
              const isSel = selectedOpt === opt;
              return (
                <button
                  key={idx}
                  disabled={feedback !== null}
                  onClick={() => handleSelectOption(opt)}
                  className={`qplayer-option-btn ${
                    isSel ? (opt.isCorrect ? 'correct' : 'incorrect') : ''
                  }`}
                >
                  <span>{opt.text}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : isFinished ? (
        /* Completion Summary Modal */
        <div className="qplayer-modal-card">
          <div className="text-5xl animate-bounce">🎉</div>
          <h2 className="text-2xl font-black text-amber-300 font-display">
            World {activeWorldId} Completed!
          </h2>
          <div className="grid grid-cols-3 gap-2 w-full my-2 text-center text-xs font-bold">
            <div className="bg-[#130833] p-2.5 rounded-xl border border-purple-400/30">
              <div className="text-purple-300">Score</div>
              <div className="text-xl font-black text-amber-400">{score}/10</div>
            </div>
            <div className="bg-[#130833] p-2.5 rounded-xl border border-purple-400/30">
              <div className="text-purple-300">XP Gained</div>
              <div className="text-xl font-black text-cyan-300">+{gainedXp}</div>
            </div>
            <div className="bg-[#130833] p-2.5 rounded-xl border border-purple-400/30">
              <div className="text-purple-300">Stars</div>
              <div className="text-xl font-black text-yellow-300">
                {score >= 9 ? '⭐⭐⭐' : score >= 7 ? '⭐⭐' : score >= 5 ? '⭐' : '0'}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleRetry} className="wonder-reset-btn">
              <span>Retry World</span>
            </button>
            <button
              onClick={() => {
                stopNarration();
                closeWorldPractice();
              }}
              className="wonder-primary-cta"
            >
              <span>Back to Map →</span>
            </button>
          </div>
        </div>
      ) : (
        /* Out of Hearts Game Over Modal */
        <div className="qplayer-modal-card">
          <div className="out-of-hearts-emoji">💔</div>
          <h2 className="out-of-hearts-title">Out of Hearts!</h2>
          <p className="out-of-hearts-text">
            Don't worry! Experimental probability takes practice. Try again with a new set of questions!
          </p>
          <button onClick={handleRetry} className="wonder-primary-cta">
            <span>Try Again 🔄</span>
          </button>
        </div>
      )}

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

      {/* Interactive Feedback Popup Overlays */}
      {feedback && (
        <div className="popup-overlay">
          {feedback.ok ? (
            /* Green Correct Popup */
            <div className="popup-card-correct">
              <div className="popup-emoji">🎉</div>
              <h3 className="popup-title">Correct! 🎉</h3>
              <p className="popup-explanation">{feedback.explanation}</p>
            </div>
          ) : (
            /* Red Incorrect Popup */
            <div className="popup-card-incorrect">
              <div className="popup-emoji">🥺</div>
              <h3 className="popup-title">Not quite!</h3>
              <p className="popup-explanation">{feedback.explanation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
