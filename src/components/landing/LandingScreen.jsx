import React from 'react';
import { LANDING } from '../../content/landing';
import Mascot from '../shared/Mascot';

export default function LandingScreen({ onStart, onGoPhase, onClose }) {
  const handleStepClick = (phaseKey) => {
    if (onGoPhase) {
      onGoPhase(phaseKey);
    } else if (onStart) {
      onStart();
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'clamp(6px, 1.2vh, 16px) clamp(16px, 3vw, 40px)',
        boxSizing: 'border-box',
        overflowY: 'auto',
        textAlign: 'center',
        zIndex: 5
      }}
    >
      {/* Top Right Close Button (✕) */}
      <button
        type="button"
        onClick={onClose || onStart}
        style={{
          position: 'absolute',
          top: 'clamp(10px, 1.6vh, 20px)',
          right: 'clamp(16px, 2.5vw, 32px)',
          width: 'clamp(44px, 5.2vh, 52px)',
          height: 'clamp(44px, 5.2vh, 52px)',
          background: '#0ea5e9',
          borderRadius: '14px',
          border: 'none',
          color: '#ffffff',
          fontSize: 'clamp(22px, 2.8vh, 28px)',
          fontWeight: 900,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 20px rgba(14, 165, 233, 0.5)',
          transition: 'transform 0.15s, background 0.15s',
          zIndex: 50
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = '#0284c7')}
        onMouseLeave={(e) => (e.currentTarget.style.background = '#0ea5e9')}
        title="Close"
      >
        ✕
      </button>

      {/* 1. Curriculum Pill (Enlarged, Clear & High Contrast) */}
      <div style={{ marginTop: 'clamp(2px, 0.4vh, 5px)' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(46, 26, 107, 0.88)',
            border: 'none',
            borderRadius: '50px',
            padding: 'clamp(7px, 1.1vh, 11px) clamp(22px, 3vw, 36px)',
            color: '#ffffff',
            fontFamily: 'Fredoka, Nunito, sans-serif',
            fontSize: 'clamp(16px, 2.3vh, 22px)',
            fontWeight: 900,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
            letterSpacing: '0.5px'
          }}
        >
          <span style={{ fontSize: 'clamp(20px, 2.7vh, 26px)' }}>✨</span>
          <span>{LANDING.badge.replace(/^✨\s*/, '')}</span>
        </div>
      </div>

      {/* 2. Main Title (Extra-Bold, High Contrast, Grade 3 Visibility) */}
      <div style={{ margin: 'clamp(1px, 0.4vh, 5px) 0' }}>
        <h1
          style={{
            fontFamily: 'Fredoka, Nunito, sans-serif',
            fontSize: 'clamp(46px, 6.8vh, 78px)',
            fontWeight: 900,
            color: '#ffffff',
            lineHeight: 1.08,
            margin: 0,
            letterSpacing: '-0.5px',
            textShadow: '0 4px 18px rgba(0, 0, 0, 0.65)'
          }}
        >
          {LANDING.titleLine1}
          <br />
          <span
            style={{
              color: '#facc15',
              fontSize: 'clamp(50px, 7.8vh, 88px)',
              textShadow: '0 0 38px rgba(250, 204, 21, 0.7), 0 4px 18px rgba(0,0,0,0.65)'
            }}
          >
            {LANDING.titleLine2}
          </span>
        </h1>
      </div>

      {/* 3. Mascot Image & Speech Bubble (Further Enlarged Avatar & Bubble) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(14px, 2.2vw, 26px)',
          margin: 'clamp(1px, 0.4vh, 5px) 0'
        }}
      >
        {/* Enlarged Mascot Image */}
        <div style={{ flexShrink: 0, transform: 'scale(1.08)' }}>
          <Mascot type="leo" mood="idle" size="hero" />
        </div>

        {/* Speech Bubble with Tail */}
        <div
          style={{
            position: 'relative',
            background: '#ffffff',
            color: '#0f172a',
            fontFamily: 'Fredoka, Nunito, sans-serif',
            fontSize: 'clamp(21px, 3.1vh, 31px)',
            fontWeight: 900,
            padding: 'clamp(11px, 1.7vh, 18px) clamp(24px, 3.2vw, 40px)',
            borderRadius: '50px',
            boxShadow: '0 12px 38px rgba(0, 0, 0, 0.45)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          {/* Bubble Tail pointing left */}
          <div
            style={{
              position: 'absolute',
              left: '-14px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: 0,
              height: 0,
              borderTop: '11px solid transparent',
              borderBottom: '11px solid transparent',
              borderRight: '16px solid #ffffff'
            }}
          />
          <span>{LANDING.bubble}</span>
        </div>
      </div>

      {/* 4. Description Text (Larger, Clearer, Grade 3 High Readability) */}
      <p
        style={{
          fontFamily: 'Nunito, sans-serif',
          fontSize: 'clamp(17px, 2.6vh, 24px)',
          fontWeight: 800,
          color: '#f8fafc',
          maxWidth: '860px',
          lineHeight: 1.38,
          margin: '0 auto',
          textAlign: 'center',
          textShadow: '0 2px 10px rgba(0,0,0,0.6)'
        }}
      >
        {LANDING.description}
      </p>

      {/* 5. "YOUR LEARNING JOURNEY" Card (All Phases Unlocked & Clickable) */}
      <div
        style={{
          background: 'rgba(26, 15, 60, 0.72)',
          border: '2.5px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '28px',
          padding: 'clamp(8px, 1.3vh, 15px) clamp(18px, 2.8vw, 36px)',
          maxWidth: '860px',
          width: '100%',
          boxShadow: '0 18px 48px rgba(0, 0, 0, 0.55)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          margin: 'clamp(1px, 0.3vh, 5px) auto'
        }}
      >
        {/* Card Gold Header */}
        <div
          style={{
            fontFamily: 'Fredoka, sans-serif',
            fontSize: 'clamp(13px, 1.8vh, 16px)',
            letterSpacing: '2.5px',
            color: '#facc15',
            textTransform: 'uppercase',
            fontWeight: 900,
            marginBottom: 'clamp(6px, 0.9vh, 10px)'
          }}
        >
          YOUR LEARNING JOURNEY
        </div>

        {/* 2-Row Journey Stepper with Big Badges (All Steps Directly Clickable) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px, 0.8vh, 10px)' }}>
          {/* Row 1: Wonder -> Story -> Simulate */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(12px, 2vw, 28px)'
            }}
          >
            {/* Step: Wonder */}
            <button
              type="button"
              onClick={() => handleStepClick('wonder')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 8px',
                borderRadius: '16px',
                transition: 'transform 0.15s, background 0.15s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.background = 'rgba(192, 132, 252, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = 'none';
              }}
              title="Jump to Wonder Phase"
            >
              <div
                style={{
                  width: 'clamp(48px, 6.2vh, 60px)',
                  height: 'clamp(48px, 6.2vh, 60px)',
                  borderRadius: '50%',
                  border: '3px solid #c084fc',
                  background: 'rgba(192, 132, 252, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'clamp(24px, 3.2vh, 32px)',
                  flexShrink: 0,
                  boxShadow: '0 0 18px rgba(192, 132, 252, 0.4)'
                }}
              >
                🔍
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 'clamp(16px, 2.3vh, 21px)', fontWeight: 900, color: '#ffffff' }}>
                  Wonder
                </div>
                <div style={{ fontSize: 'clamp(12px, 1.7vh, 15px)', color: '#e2e8f0', fontWeight: 800 }}>
                  Spark curiosity
                </div>
              </div>
            </button>

            <span style={{ color: '#94a3b8', fontSize: 'clamp(20px, 2.8vh, 26px)', fontWeight: 900 }}>→</span>

            {/* Step: Story */}
            <button
              type="button"
              onClick={() => handleStepClick('story')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 8px',
                borderRadius: '16px',
                transition: 'transform 0.15s, background 0.15s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.background = 'rgba(251, 146, 60, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = 'none';
              }}
              title="Jump to Story Phase"
            >
              <div
                style={{
                  width: 'clamp(48px, 6.2vh, 60px)',
                  height: 'clamp(48px, 6.2vh, 60px)',
                  borderRadius: '50%',
                  border: '3px solid #fb923c',
                  background: 'rgba(251, 146, 60, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'clamp(24px, 3.2vh, 32px)',
                  flexShrink: 0,
                  boxShadow: '0 0 18px rgba(251, 146, 60, 0.4)'
                }}
              >
                📖
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 'clamp(16px, 2.3vh, 21px)', fontWeight: 900, color: '#ffffff' }}>
                  Story
                </div>
                <div style={{ fontSize: 'clamp(12px, 1.7vh, 15px)', color: '#e2e8f0', fontWeight: 800 }}>
                  Hear the tale
                </div>
              </div>
            </button>

            <span style={{ color: '#94a3b8', fontSize: 'clamp(20px, 2.8vh, 26px)', fontWeight: 900 }}>→</span>

            {/* Step: Simulate */}
            <button
              type="button"
              onClick={() => handleStepClick('simulate')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 8px',
                borderRadius: '16px',
                transition: 'transform 0.15s, background 0.15s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.background = 'rgba(56, 189, 248, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = 'none';
              }}
              title="Jump to Simulation Phase"
            >
              <div
                style={{
                  width: 'clamp(48px, 6.2vh, 60px)',
                  height: 'clamp(48px, 6.2vh, 60px)',
                  borderRadius: '50%',
                  border: '3px solid #38bdf8',
                  background: 'rgba(56, 189, 248, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'clamp(24px, 3.2vh, 32px)',
                  flexShrink: 0,
                  boxShadow: '0 0 18px rgba(56, 189, 248, 0.4)'
                }}
              >
                🧪
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 'clamp(16px, 2.3vh, 21px)', fontWeight: 900, color: '#ffffff' }}>
                  Simulate
                </div>
                <div style={{ fontSize: 'clamp(12px, 1.7vh, 15px)', color: '#e2e8f0', fontWeight: 800 }}>
                  Explore & discover
                </div>
              </div>
            </button>
          </div>

          {/* Row 2: Practice -> Reflect */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(18px, 3vw, 36px)'
            }}
          >
            {/* Step: Practice */}
            <button
              type="button"
              onClick={() => handleStepClick('play')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 8px',
                borderRadius: '16px',
                transition: 'transform 0.15s, background 0.15s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.background = 'rgba(74, 222, 128, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = 'none';
              }}
              title="Jump to Practice Phase"
            >
              <div
                style={{
                  width: 'clamp(48px, 6.2vh, 60px)',
                  height: 'clamp(48px, 6.2vh, 60px)',
                  borderRadius: '50%',
                  border: '3px solid #4ade80',
                  background: 'rgba(74, 222, 128, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'clamp(24px, 3.2vh, 32px)',
                  flexShrink: 0,
                  boxShadow: '0 0 18px rgba(74, 222, 128, 0.4)'
                }}
              >
                🎮
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 'clamp(16px, 2.3vh, 21px)', fontWeight: 900, color: '#ffffff' }}>
                  Practice
                </div>
                <div style={{ fontSize: 'clamp(12px, 1.7vh, 15px)', color: '#e2e8f0', fontWeight: 800 }}>
                  Test your skills
                </div>
              </div>
            </button>

            <span style={{ color: '#94a3b8', fontSize: 'clamp(20px, 2.8vh, 26px)', fontWeight: 900 }}>→</span>

            {/* Step: Reflect */}
            <button
              type="button"
              onClick={() => handleStepClick('reflect')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 8px',
                borderRadius: '16px',
                transition: 'transform 0.15s, background 0.15s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.background = 'rgba(129, 140, 248, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = 'none';
              }}
              title="Jump to Reflect Phase"
            >
              <div
                style={{
                  width: 'clamp(48px, 6.2vh, 60px)',
                  height: 'clamp(48px, 6.2vh, 60px)',
                  borderRadius: '50%',
                  border: '3px solid #818cf8',
                  background: 'rgba(129, 140, 248, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'clamp(24px, 3.2vh, 32px)',
                  flexShrink: 0,
                  boxShadow: '0 0 18px rgba(129, 140, 248, 0.4)'
                }}
              >
                📋
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 'clamp(16px, 2.3vh, 21px)', fontWeight: 900, color: '#ffffff' }}>
                  Reflect
                </div>
                <div style={{ fontSize: 'clamp(12px, 1.7vh, 15px)', color: '#e2e8f0', fontWeight: 800 }}>
                  What did you learn?
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>


      {/* 6. Primary CTA Button (Extra-Bold, Large & High Impact) */}
      <div style={{ margin: 'clamp(1px, 0.4vh, 5px) 0' }}>
        <button
          type="button"
          onClick={onStart}
          className="btn-gold"
          style={{
            fontFamily: 'Fredoka, sans-serif',
            fontSize: 'clamp(22px, 3.2vh, 30px)',
            fontWeight: 900,
            padding: 'clamp(13px, 1.9vh, 20px) clamp(44px, 6vw, 74px)',
            borderRadius: '50px',
            background: 'linear-gradient(135deg, #ffe033 0%, #ffca00 100%)',
            border: '2.5px solid #fff59d',
            color: '#1a0033',
            boxShadow: '0 0 44px rgba(250, 204, 21, 0.75), 0 12px 32px rgba(0,0,0,0.48)',
            cursor: 'pointer',
            letterSpacing: '0.5px',
            transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s, background 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 0 55px rgba(255, 202, 0, 0.9), 0 16px 36px rgba(0,0,0,0.55)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) translateY(0)';
            e.currentTarget.style.boxShadow = '0 0 44px rgba(250, 204, 21, 0.75), 0 12px 32px rgba(0,0,0,0.48)';
          }}
        >
          {LANDING.cta}
        </button>
      </div>

      {/* 7. Bottom 3 Feature Cards (Enlarged Graphic Icons & Clear Bold Text) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'clamp(12px, 2vw, 22px)',
          maxWidth: '860px',
          width: '100%',
          marginBottom: 'clamp(1px, 0.3vh, 5px)'
        }}
      >
        {LANDING.features.map((feat, idx) => (
          <div
            key={idx}
            style={{
              background: 'rgba(26, 15, 60, 0.72)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '24px',
              padding: 'clamp(8px, 1.3vh, 14px) 16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              boxShadow: '0 10px 28px rgba(0, 0, 0, 0.38)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)'
            }}
          >
            {/* Enlarged Graphic Icon */}
            <div style={{ fontSize: 'clamp(38px, 5.2vh, 52px)', marginBottom: '4px', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.35))' }}>
              {feat.icon}
            </div>
            <div
              style={{
                fontFamily: 'Fredoka, sans-serif',
                fontSize: 'clamp(16px, 2.3vh, 21px)',
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.25
              }}
            >
              {feat.title}
            </div>
            <div
              style={{
                fontSize: 'clamp(12px, 1.7vh, 15px)',
                color: '#cbd5e1',
                fontWeight: 800,
                marginTop: '3px',
                lineHeight: 1.2
              }}
            >
              {feat.caption}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


