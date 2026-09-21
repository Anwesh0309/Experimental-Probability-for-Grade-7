import React from 'react';

/**
 * Mascot Component - Leo the Lion Explorer & Learning Companion
 *
 * Props:
 * - type: 'leo' (default)
 * - mood: 'idle' | 'excited' | 'thinking' | 'celebrate' | 'happy'
 * - size: 'small' (48px) | 'medium' (80px) | 'large' (120px) | 'hero' (170px)
 * - className: optional CSS string
 */
export default function Mascot({ type = 'leo', mood = 'idle', size = 'medium', className = '' }) {
  const isLeo = type === 'leo';
  const sizePxMap = {
    small: '48px',
    medium: '80px',
    large: '120px',
    hero: 'clamp(140px, 16vh, 200px)'
  };

  const dimension = sizePxMap[size] || sizePxMap.medium;

  return (
    <div
      className={`mascot-container ${className}`}
      style={{
        width: dimension,
        height: dimension,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        filter: 'drop-shadow(0 12px 24px rgba(0, 0, 0, 0.35))',
        transition: 'transform 0.3s ease',
        cursor: 'pointer'
      }}
    >
      <style>{`
        @keyframes mascotBob {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(2deg); }
        }
        @keyframes earWiggle {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(6deg); }
        }
        @keyframes sparklePulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .mascot-svg {
          animation: mascotBob 3.5s ease-in-out infinite;
          width: 100%;
          height: 100%;
        }
        .mascot-ear-left {
          transform-origin: 35px 35px;
          animation: earWiggle 4s ease-in-out infinite;
        }
        .mascot-ear-right {
          transform-origin: 165px 35px;
          animation: earWiggle 4s ease-in-out 0.5s infinite;
        }
        .mascot-sparkle {
          animation: sparklePulse 2s ease-in-out infinite;
        }
      `}</style>

      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mascot-svg"
      >
        <defs>
          {/* Mane Gradient */}
          <radialGradient id="maneGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="70%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#c2410c" />
          </radialGradient>

          {/* Face Gradient */}
          <linearGradient id="faceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="60%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#eab308" />
          </linearGradient>

          {/* Snout Gradient */}
          <linearGradient id="snoutGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#fef3c7" />
          </linearGradient>

          {/* Explorer Hat Gradient */}
          <linearGradient id="hatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#65a30d" />
            <stop offset="100%" stopColor="#3f6212" />
          </linearGradient>

          {/* Hat Ribbon */}
          <linearGradient id="hatRibbon" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          {/* Cheeks */}
          <radialGradient id="cheekGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer Glow */}
        <circle cx="100" cy="100" r="92" fill="#fbbf24" opacity="0.15" />

        {/* Lion Mane (Tufted Sunburst Shape) */}
        <path
          d="M 100,10 
             C 115,20 130,10 142,24 
             C 155,20 166,33 174,47 
             C 186,55 190,70 190,85 
             C 196,100 192,118 186,132 
             C 184,148 172,162 160,172 
             C 148,184 132,188 116,192 
             C 100,196 84,192 68,188 
             C 52,184 40,172 28,160 
             C 16,148 12,132 10,116 
             C 8,100 14,84 22,70 
             C 28,54 42,42 54,30 
             C 68,18 84,14 100,10 Z"
          fill="url(#maneGrad)"
          stroke="#9a3412"
          strokeWidth="4"
        />

        {/* Ears */}
        {/* Left Ear */}
        <g className="mascot-ear-left">
          <circle cx="45" cy="45" r="22" fill="url(#maneGrad)" stroke="#9a3412" strokeWidth="3" />
          <circle cx="45" cy="45" r="13" fill="#fde047" />
        </g>
        {/* Right Ear */}
        <g className="mascot-ear-right">
          <circle cx="155" cy="45" r="22" fill="url(#maneGrad)" stroke="#9a3412" strokeWidth="3" />
          <circle cx="155" cy="45" r="13" fill="#fde047" />
        </g>

        {/* Main Face Base */}
        <circle cx="100" cy="108" r="62" fill="url(#faceGrad)" stroke="#ca8a04" strokeWidth="4" />

        {/* Explorer Hat */}
        <g>
          {/* Hat Brim */}
          <ellipse cx="100" cy="58" rx="68" ry="14" fill="url(#hatGrad)" stroke="#1a2e05" strokeWidth="3" />
          {/* Hat Dome */}
          <path
            d="M 52,56 C 52,22 148,22 148,56 Z"
            fill="url(#hatGrad)"
            stroke="#1a2e05"
            strokeWidth="3"
          />
          {/* Hat Band / Ribbon */}
          <path
            d="M 53,50 C 70,44 130,44 147,50 L 148,56 C 130,50 70,50 52,56 Z"
            fill="url(#hatRibbon)"
          />
          {/* Explorer Badge / Compass Icon on Hat */}
          <circle cx="100" cy="40" r="9" fill="#fef08a" stroke="#b45309" strokeWidth="2" />
          <polygon points="100,34 103,40 100,46 97,40" fill="#dc2626" />
        </g>

        {/* Cheeks */}
        <circle cx="68" cy="122" r="14" fill="url(#cheekGrad)" />
        <circle cx="132" cy="122" r="14" fill="url(#cheekGrad)" />

        {/* Snout Base */}
        <ellipse cx="100" cy="126" rx="28" ry="20" fill="url(#snoutGrad)" stroke="#f59e0b" strokeWidth="2" />

        {/* Nose */}
        <path
          d="M 90,114 C 95,112 105,112 110,114 C 114,120 104,127 100,128 C 96,127 86,120 90,114 Z"
          fill="#451a03"
        />

        {/* Mouth */}
        {mood === 'celebrate' || mood === 'excited' ? (
          /* Wide Happy Open Mouth */
          <path
            d="M 88,129 Q 100,146 112,129 Q 100,152 88,129 Z"
            fill="#9f1239"
            stroke="#451a03"
            strokeWidth="2"
          />
        ) : (
          /* Cute Smile */
          <path
            d="M 88,128 Q 100,138 112,128"
            fill="none"
            stroke="#451a03"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        )}

        {/* Eyes */}
        {mood === 'thinking' ? (
          /* Thinking Eyes (Curved / Looking Up) */
          <g stroke="#451a03" strokeWidth="4" strokeLinecap="round" fill="none">
            <path d="M 68,100 Q 76,92 84,100" />
            <path d="M 116,96 Q 124,88 132,96" />
          </g>
        ) : (
          /* Sparkly Big Expressive Eyes */
          <g>
            {/* Left Eye */}
            <ellipse cx="74" cy="98" rx="10" ry="13" fill="#0f172a" />
            <circle cx="71" cy="94" r="4" fill="#ffffff" />
            <circle cx="76" cy="102" r="1.8" fill="#ffffff" />

            {/* Right Eye */}
            <ellipse cx="126" cy="98" rx="10" ry="13" fill="#0f172a" />
            <circle cx="123" cy="94" r="4" fill="#ffffff" />
            <circle cx="128" cy="102" r="1.8" fill="#ffffff" />
          </g>
        )}

        {/* Whiskers */}
        <g stroke="#92400e" strokeWidth="2" strokeLinecap="round" opacity="0.7">
          <line x1="52" y1="122" x2="34" y2="118" />
          <line x1="50" y1="128" x2="32" y2="128" />
          <line x1="148" y1="122" x2="166" y2="118" />
          <line x1="150" y1="128" x2="168" y2="128" />
        </g>

        {/* Decorative Sparkles for Excitement */}
        <g className="mascot-sparkle">
          <path d="M 24,40 L 27,48 L 35,51 L 27,54 L 24,62 L 21,54 L 13,51 L 21,48 Z" fill="#facc15" />
          <path d="M 175,44 L 177,50 L 183,52 L 177,54 L 175,60 L 173,54 L 167,52 L 173,50 Z" fill="#38bdf8" />
        </g>
      </svg>
    </div>
  );
}
