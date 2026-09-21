import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { Volume2, VolumeX } from 'lucide-react';
import { setMuted } from '../../utils/audio';
import '../../styles/nav.css';

const phasesList = [
  { id: 'wonder', num: '01', icon: '🤖', name: 'Wonder' },
  { id: 'story', num: '02', icon: '📖', name: 'Story' },
  { id: 'simulate', num: '03', icon: '🧪', name: 'Simulate' },
  { id: 'practice', num: '04', icon: '🎮', name: 'Practice' },
  { id: 'reflect', num: '05', icon: '📝', name: 'Reflect' },
];

export const TopPillNav = () => {
  const {
    phase,
    setPhase,
    completed,
    audioEnabled,
    toggleAudio,
  } = useGameStore();

  const handleAudioToggle = () => {
    const nextState = !audioEnabled;
    toggleAudio();
    setMuted(!nextState);
  };

  return (
    <header className="top-nav-container">
      {/* Top Left Home Button */}
      <button
        onClick={() => setPhase('landing')}
        className="nav-home-btn"
        title="Return to Home"
      >
        <span>🏠</span>
        <span>Home</span>
      </button>

      {/* Center Nav Bar (Pill style matching screenshot) */}
      <nav className="nav-pill-bar">
        {phasesList.map((p, idx) => {
          const isActive = phase === p.id;
          const isDone = completed[p.id];

          return (
            <React.Fragment key={p.id}>
              {idx > 0 && (
                <span className={`nav-connector ${isDone ? 'done' : ''}`} />
              )}
              <button
                onClick={() => setPhase(p.id)}
                className={`nav-phase-btn ${
                  isActive ? 'active' : isDone ? 'completed' : ''
                }`}
              >
                <span className="nav-num-badge">
                  {isDone ? '✓' : p.num}
                </span>
                <span>{p.icon}</span>
                <span>{p.name}</span>
              </button>
            </React.Fragment>
          );
        })}

        <span className="nav-connector" />

        {/* Audio Toggle Button inside nav pill */}
        <button
          onClick={handleAudioToggle}
          className={`nav-audio-btn ${!audioEnabled ? 'muted' : ''}`}
          title={audioEnabled ? 'Mute Audio' : 'Unmute Audio'}
        >
          {audioEnabled ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-cyan-300" />
              <span>Audio</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-rose-300" />
              <span>Muted</span>
            </>
          )}
        </button>
      </nav>

      {/* Top Right Exit Blue Square Button */}
      <button
        onClick={() => {
          if (confirm('Exit lesson?')) {
            setPhase('landing');
          }
        }}
        className="nav-exit-btn"
        title="Close"
      >
        ✕
      </button>
    </header>
  );
};

