import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { CheckCircle2, RotateCcw, HelpCircle, Sparkles } from 'lucide-react';
import { narrate } from '../../utils/audio';
import '../../styles/simulate.css';

export const SimulationStations = () => {
  const {
    activeStation,
    setActiveStation,
    stationTargetsDone,
    completeStationTarget,
    setPhase,
    markPhaseComplete,
    resetGameProgress
  } = useGameStore();

  const stationTabs = [
    { id: 1, title: 'Station 1: Carnival Coin', icon: '🪙', concept: 'Trial & Relative Frequency' },
    { id: 2, title: 'Station 2: Dice Dojo', icon: '🎲', concept: 'Frequencies & Factions' },
    { id: 3, title: 'Station 3: Prize Spinner', icon: '🎡', concept: 'Color Sector Probabilities' },
    { id: 4, title: 'Station 4: Large Numbers', icon: '📈', concept: 'Law of Large Numbers' },
    { id: 5, title: 'Station 5: Predict Engine', icon: '🔮', concept: 'Expected Count E = P × N' },
  ];

  return (
    <div className="simulate-page-bg">
      {/* Background Watermark Numbers */}
      <span className="watermark-text" style={{ top: '8%', left: '12%', fontSize: '72px' }}>100</span>
      <span className="watermark-text" style={{ top: '35%', left: '8%', fontSize: '60px', fontStyle: 'italic' }}>H</span>
      <span className="watermark-text" style={{ bottom: '15%', left: '14%', fontSize: '66px' }}>200</span>
      <span className="watermark-text" style={{ top: '8%', right: '18%', fontSize: '72px' }}>500</span>
      <span className="watermark-text" style={{ top: '26%', right: '9%', fontSize: '68px' }}>347</span>
      <span className="watermark-text" style={{ top: '50%', right: '15%', fontSize: '44px' }}>123</span>
      <span className="watermark-text" style={{ bottom: '18%', right: '20%', fontSize: '76px' }}>999</span>

      {/* Main Glassmorphic Modal Card */}
      <div className="simulate-modal-card">
        {/* Top Cyan Accent Handle Bar */}
        <div className="simulate-modal-handle" />

        {/* Modal Title */}
        <div className="simulate-modal-title">
          <span>🧪</span>
          <span>Simulation Stations — Chance Corner Lab</span>
        </div>

        {/* 2-Column Split Workspace */}
        <div className="simulate-body-grid">
          {/* Left Station Sidebar */}
          <div className="simulate-sidebar">
            <div className="simulate-station-list">
              {stationTabs.map((st) => {
                const isActive = activeStation === st.id;
                const isDone = stationTargetsDone[st.id];

                return (
                  <button
                    key={st.id}
                    onClick={() => setActiveStation(st.id)}
                    className={`simulate-station-tab ${isActive ? 'active' : ''}`}
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <span className="simulate-station-icon">{st.icon}</span>
                      <div className="flex flex-col text-left truncate">
                        <span className="truncate">{st.title}</span>
                        <span className="text-[11px] text-purple-300 font-bold opacity-80">{st.concept}</span>
                      </div>
                    </div>
                    {isDone && <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Bottom Left CTA */}
            <button
              onClick={() => {
                markPhaseComplete('simulate');
                setPhase('practice');
              }}
              className="simulate-sidebar-cta"
            >
              <span>Go to Practice Phase! →</span>
            </button>
          </div>

          {/* Right Active Workspace */}
          <div className="simulate-workspace">
            {activeStation === 1 && <CoinLabStation onComplete={() => completeStationTarget(1)} />}
            {activeStation === 2 && <DiceDojoStation onComplete={() => completeStationTarget(2)} />}
            {activeStation === 3 && <SpinnerStudioStation onComplete={() => completeStationTarget(3)} />}
            {activeStation === 4 && <LargeNumbersStation onComplete={() => completeStationTarget(4)} />}
            {activeStation === 5 && <PredictEngineStation onComplete={() => completeStationTarget(5)} />}
          </div>
        </div>
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

/* ---------------- STATION 1: CARNIVAL COIN LAB ---------------- */
const CoinLabStation = ({ onComplete }) => {
  const [flips, setFlips] = useState([]);
  const [lastFlipped, setLastFlipped] = useState(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);

  const total = flips.length;
  const headsCount = flips.filter((f) => f === 'H').length;
  const tailsCount = total - headsCount;
  const relFreqHeads = total === 0 ? 0 : headsCount / total;
  const headsPct = Math.round(relFreqHeads * 100);

  const doFlips = (count) => {
    setIsFlipping(true);
    setTimeout(() => {
      setIsFlipping(false);
    }, 500);

    const newFlips = [];
    let last = null;
    for (let i = 0; i < count; i++) {
      last = Math.random() < 0.70 ? 'H' : 'T'; // Carnival Mystery Coin (biased 70% heads like Alex's coin!)
      newFlips.push(last);
    }
    setLastFlipped(last);
    setFlips((prev) => [...prev, ...newFlips]);
  };

  const handleReset = () => {
    setFlips([]);
    setUserAnswer('');
    setFeedback(null);
    setLastFlipped(null);
  };

  const handleCheck = () => {
    if (total < 10) {
      setFeedback({ ok: false, msg: 'Flip at least 10 times first to gather carnival data!' });
      return;
    }
    const cleaned = userAnswer.trim().replace('%', '');
    const parsed = parseFloat(cleaned);

    if (isNaN(parsed)) {
      setFeedback({ ok: false, msg: 'Please enter a valid number or percentage (e.g. 70% or 0.70)!' });
      return;
    }

    const expectedDecimal = relFreqHeads;
    const expectedPct = headsPct;

    const matchesPct = Math.abs(parsed - expectedPct) <= 2;
    const matchesDec = Math.abs(parsed - expectedDecimal) <= 0.05;

    if (matchesPct || matchesDec) {
      setFeedback({
        ok: true,
        msg: `🎉 Spot on! Live P(Heads) is ${headsCount}/${total} = ${relFreqHeads.toFixed(2)} (${headsPct}%).`
      });
      onComplete();
      narrate(`Awesome job! ${headsCount} out of ${total} is ${headsPct} percent experimental probability!`);
    } else {
      setFeedback({
        ok: false,
        msg: `Not quite! You recorded ${headsCount} Heads out of ${total} total flips. Calculate (Heads ÷ Total) × 100%.`
      });
    }
  };

  return (
    <div className="flex flex-col gap-3 text-left">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-purple-500/30 pb-2">
        <div>
          <h3 className="text-lg sm:text-xl font-black text-white font-display flex items-center gap-2">
            <span>🪙 Station 1: Alex's Carnival Coin Flip</span>
          </h3>
          <div className="text-yellow-400 font-black text-xs sm:text-sm">
            Story Link: Alex flipped 10 times at Chance Corner and got 7 Heads!
          </div>
        </div>
        <button onClick={handleReset} className="p-1.5 rounded-lg bg-purple-900/60 text-purple-200 hover:text-white" title="Reset Flips">
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Visual Animated Coin & Live Tally Board */}
      <div className="sim-workspace-card">
        <div className="flex items-center justify-between w-full">
          <div className="sim-workspace-card-label">Carnival Tally Board (Groups of 5)</div>
          <div className="text-xs text-cyan-300 font-extrabold">Total Trials (N): {total}</div>
        </div>

        {/* 3D Animated Coin Flip Display */}
        <div className="flex items-center gap-4 py-2 relative">
          {lastFlipped && !isFlipping && (
            <div className="float-outcome-badge">
              +{lastFlipped === 'H' ? '1 Heads 👑' : '1 Tails 🦅'}
            </div>
          )}
          <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 border-2 border-yellow-200 flex items-center justify-center text-slate-950 font-black text-3xl shadow-xl ${isFlipping ? 'coin-3d-flip' : 'animate-bounce'}`}>
            {lastFlipped ? (lastFlipped === 'H' ? '👑' : '🦅') : '🪙'}
          </div>
          <div className="flex flex-col">
            <span className="text-white font-black text-base">
              Last Flip: {isFlipping ? 'Flipping in 3D... 💫' : lastFlipped ? (lastFlipped === 'H' ? 'Heads 👑' : 'Tails 🦅') : 'Ready to Flip!'}
            </span>
            <span className="text-purple-300 text-xs font-bold">
              Heads (f): <strong className="text-amber-300 text-sm">{headsCount}</strong> | Tails: <strong className="text-cyan-300 text-sm">{tailsCount}</strong>
            </span>
          </div>
        </div>

        {/* Detailed Tallies Breakdown */}
        <div className="grid grid-cols-2 gap-3 w-full bg-[#11062e] p-2.5 rounded-xl border border-purple-500/20 text-xs">
          <div>
            <div className="text-amber-300 font-black mb-1">Heads Tallies ({headsCount})</div>
            <div className="font-mono text-amber-200 tracking-widest font-black text-sm">
              {headsCount > 0 ? 'llll '.repeat(Math.floor(headsCount / 5)) + 'l'.repeat(headsCount % 5) : '—'}
            </div>
          </div>
          <div>
            <div className="text-cyan-300 font-black mb-1">Tails Tallies ({tailsCount})</div>
            <div className="font-mono text-cyan-200 tracking-widest font-black text-sm">
              {tailsCount > 0 ? 'llll '.repeat(Math.floor(tailsCount / 5)) + 'l'.repeat(tailsCount % 5) : '—'}
            </div>
          </div>
        </div>

        {/* Formula breakdown */}
        <div className="flex items-center justify-between w-full text-xs font-bold px-2 pt-1 border-t border-purple-500/20">
          <span className="text-purple-200">Fraction: {headsCount}/{total || 1}</span>
          <span className="text-cyan-300">Decimal: {relFreqHeads.toFixed(2)}</span>
          <span className="text-yellow-300 font-black">Percentage: {headsPct}%</span>
        </div>
      </div>

      {/* Flip Action Buttons */}
      <div className="flex items-center gap-2 justify-center">
        <button onClick={() => doFlips(1)} disabled={isFlipping} className="sim-action-btn py-2 px-4 text-xs">
          <span>Flip 1x 🪙</span>
        </button>
        <button onClick={() => doFlips(10)} disabled={isFlipping} className="sim-action-btn">
          <span>Flip 10x 🪙</span>
        </button>
        <button onClick={() => doFlips(50)} disabled={isFlipping} className="sim-action-btn py-2 px-4 text-xs">
          <span>Batch 50x 🚀</span>
        </button>
      </div>

      {/* Target Task Box */}
      <div className="sim-task-card">
        <div className="flex items-center justify-between">
          <div className="sim-task-header">Target Task 1 of 5</div>
          <button onClick={() => setShowHint(!showHint)} className="text-xs text-yellow-300 font-bold flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Hint</span>
          </button>
        </div>

        {showHint && (
          <div className="text-xs text-purple-200 bg-purple-950/80 p-2 rounded-lg border border-purple-400/30">
            💡 <strong>Hint:</strong> Experimental Probability = (Heads Frequency ÷ Total Flips). Multiply decimal by 100 for percentage!
          </div>
        )}

        <p className="sim-task-prompt">
          Flip at least 10 times, then calculate the live experimental probability of Heads as a percentage (e.g. {headsPct}%):
        </p>

        <div className="sim-task-input-row">
          <input
            type="text"
            placeholder={`e.g. ${headsPct}%`}
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="sim-task-input"
          />
          <button onClick={handleCheck} className="sim-task-check-btn">
            Check
          </button>
        </div>

        {feedback && (
          <div className={`sim-task-feedback ${feedback.ok ? 'ok' : 'error'}`}>
            {feedback.msg}
          </div>
        )}
      </div>
    </div>
  );
};

/* ---------------- STATION 2: DICE DOJO ---------------- */
const DiceDojoStation = ({ onComplete }) => {
  const [rolls, setRolls] = useState([]);
  const [lastRoll, setLastRoll] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [userGuess, setUserGuess] = useState('');
  const [feedback, setFeedback] = useState(null);

  const total = rolls.length;
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  rolls.forEach((r) => counts[r]++);

  const diceIcons = { 1: '⚀', 2: '⚁', 3: '⚂', 4: '⚃', 5: '⚄', 6: '⚅' };

  const doRolls = (count) => {
    setIsRolling(true);
    setTimeout(() => {
      setIsRolling(false);
    }, 450);

    const newRolls = [];
    let last = null;
    for (let i = 0; i < count; i++) {
      last = Math.floor(Math.random() * 6) + 1;
      newRolls.push(last);
    }
    setLastRoll(last);
    setRolls((prev) => [...prev, ...newRolls]);
  };

  const handleReset = () => {
    setRolls([]);
    setUserGuess('');
    setFeedback(null);
    setLastRoll(null);
  };

  const handleCheck = () => {
    if (total < 12) {
      setFeedback({ ok: false, msg: 'Roll the die at least 12 times first at the Dice Dojo!' });
      return;
    }
    const cleaned = userGuess.trim();
    let parsedDecimal = null;

    if (cleaned.includes('/')) {
      const parts = cleaned.split('/');
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1]) && parseFloat(parts[1]) !== 0) {
        parsedDecimal = parseFloat(parts[0]) / parseFloat(parts[1]);
      }
    } else {
      parsedDecimal = parseFloat(cleaned.replace('%', ''));
      if (!isNaN(parsedDecimal) && parsedDecimal > 1) parsedDecimal = parsedDecimal / 100;
    }

    if (parsedDecimal === null || isNaN(parsedDecimal)) {
      setFeedback({ ok: false, msg: 'Please enter a fraction (e.g. 2/10 or 1/5) or decimal (e.g. 0.20)!' });
      return;
    }

    const rel6 = total === 0 ? 0 : counts[6] / total;

    if (Math.abs(parsedDecimal - rel6) <= 0.06) {
      setFeedback({
        ok: true,
        msg: `🎉 Excellent! Live P(6) = ${counts[6]}/${total} = ${rel6.toFixed(2)}.`
      });
      onComplete();
      narrate('Great job! You calculated the experimental probability for face 6 at the Dice Dojo!');
    } else {
      setFeedback({
        ok: false,
        msg: `Not quite! Face 6 landed ${counts[6]} times out of ${total} rolls. Calculate (Count of 6 ÷ Total Rolls).`
      });
    }
  };

  return (
    <div className="flex flex-col gap-3 text-left">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-purple-500/30 pb-2">
        <div>
          <h3 className="text-lg sm:text-xl font-black text-white font-display flex items-center gap-2">
            <span>🎲 Station 2: Maya's Dice Dojo Booth</span>
          </h3>
          <div className="text-yellow-400 font-black text-xs sm:text-sm">
            Story Link: Maya tracks frequencies for all 6 faces using tallies!
          </div>
        </div>
        <button onClick={handleReset} className="p-1.5 rounded-lg bg-purple-900/60 text-purple-200 hover:text-white" title="Reset Rolls">
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* 3D Tumbling Dice Preview */}
      <div className="flex items-center justify-center gap-3 py-1">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-700 border-2 border-purple-300 flex items-center justify-center text-white text-4xl shadow-xl ${isRolling ? 'dice-3d-roll' : ''}`}>
          {lastRoll ? diceIcons[lastRoll] : '🎲'}
        </div>
        <div className="text-xs font-black text-purple-200">
          <div>Last Roll: <span className="text-amber-300 text-sm">{lastRoll ? `Face ${lastRoll}` : 'Ready to Roll!'}</span></div>
          <div className="text-[11px] text-cyan-300">Total Rolls: {total}</div>
        </div>
      </div>

      {/* Frequency Bar Chart for Faces 1-6 */}
      <div className="sim-workspace-card">
        <div className="flex items-center justify-between w-full">
          <div className="sim-workspace-card-label">Live Face Frequency Chart (1 to 6)</div>
          <div className="text-xs text-amber-300 font-extrabold">Total Rolls: {total}</div>
        </div>

        {/* Animated Bar Graph */}
        <div className="flex items-end justify-around w-full h-28 pt-2 pb-1 bg-[#0e0524] rounded-xl border border-purple-500/20 px-2">
          {[1, 2, 3, 4, 5, 6].map((f) => {
            const rel = total === 0 ? 0 : (counts[f] / total) * 100;
            const barH = Math.max(12, Math.min(80, counts[f] * 6));

            return (
              <div key={f} className="flex flex-col items-center gap-1 flex-1">
                <span className="text-[11px] text-amber-300 font-black">{counts[f]}</span>
                <div
                  className="w-7 rounded-t-lg bg-gradient-to-t from-purple-600 to-cyan-400 border-t border-cyan-200 transition-all duration-300 shadow-md"
                  style={{ height: `${barH}px` }}
                />
                <span className="text-xs text-white font-black">
                  {f === 6 ? '🎲 6' : `Face ${f}`}
                </span>
                <span className="text-[10px] text-purple-300 font-bold">{rel.toFixed(0)}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Roll Action Buttons */}
      <div className="flex items-center gap-2 justify-center">
        <button onClick={() => doRolls(1)} disabled={isRolling} className="sim-action-btn py-2 px-4 text-xs">
          <span>Roll 1x 🎲</span>
        </button>
        <button onClick={() => doRolls(6)} disabled={isRolling} className="sim-action-btn">
          <span>Roll 6x 🎲</span>
        </button>
        <button onClick={() => doRolls(60)} disabled={isRolling} className="sim-action-btn py-2 px-4 text-xs">
          <span>Batch 60x 🚀</span>
        </button>
      </div>

      {/* Target Task Card */}
      <div className="sim-task-card">
        <div className="sim-task-header">Target Task 2 of 5</div>
        <p className="sim-task-prompt">
          Roll at least 12 times, then calculate the live experimental probability of face '6' (fraction like {counts[6]}/{total || 12} or decimal):
        </p>
        <div className="sim-task-input-row">
          <input
            type="text"
            placeholder={`e.g. ${counts[6]}/${total || 12}`}
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            className="sim-task-input"
          />
          <button onClick={handleCheck} className="sim-task-check-btn">
            Check
          </button>
        </div>
        {feedback && (
          <div className={`sim-task-feedback ${feedback.ok ? 'ok' : 'error'}`}>
            {feedback.msg}
          </div>
        )}
      </div>
    </div>
  );
};

/* ---------------- STATION 3: PRIZE SPINNER ---------------- */
const SpinnerStudioStation = ({ onComplete }) => {
  const [spins, setSpins] = useState([]);
  const [lastColor, setLastColor] = useState(null);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [userGuess, setUserGuess] = useState('');
  const [feedback, setFeedback] = useState(null);

  const colors = [
    { name: 'Red', code: '#ef4444', emoji: '🔴', angle: 54 },
    { name: 'Blue', code: '#3b82f6', emoji: '🔵', angle: 180 },
    { name: 'Green', code: '#22c55e', emoji: '🟢', angle: 288 },
    { name: 'Yellow', code: '#eab308', emoji: '🟡', angle: 342 },
  ];

  const total = spins.length;
  const counts = { Red: 0, Blue: 0, Green: 0, Yellow: 0 };
  spins.forEach((s) => counts[s]++);

  const doSpins = (count) => {
    setIsSpinning(true);

    const newSpins = [];
    let last = null;
    let targetAngle = 180; // default Blue

    for (let i = 0; i < count; i++) {
      // Prize spinner: Blue sector is 40% big, Red 30%, Green 20%, Yellow 10%
      const rand = Math.random();
      if (rand < 0.40) { last = 'Blue'; targetAngle = 180; }
      else if (rand < 0.70) { last = 'Red'; targetAngle = 54; }
      else if (rand < 0.90) { last = 'Green'; targetAngle = 288; }
      else { last = 'Yellow'; targetAngle = 342; }
      newSpins.push(last);
    }

    setWheelRotation((prev) => prev + 1440 + targetAngle);
    setLastColor(last);
    setSpins((prev) => [...prev, ...newSpins]);

    setTimeout(() => {
      setIsSpinning(false);
    }, 1200);
  };

  const handleReset = () => {
    setSpins([]);
    setUserGuess('');
    setFeedback(null);
    setLastColor(null);
    setWheelRotation(0);
  };

  const handleCheck = () => {
    if (total < 10) {
      setFeedback({ ok: false, msg: 'Spin the prize wheel at least 10 times first!' });
      return;
    }

    const cleaned = userGuess.trim().replace('%', '');
    let decimalVal = parseFloat(cleaned);
    if (decimalVal > 1) decimalVal = decimalVal / 100;

    if (isNaN(decimalVal)) {
      setFeedback({ ok: false, msg: 'Please enter a valid decimal (e.g. 0.40) or percentage (e.g. 40%)!' });
      return;
    }

    const relBlue = total === 0 ? 0 : counts.Blue / total;

    if (Math.abs(decimalVal - relBlue) <= 0.06) {
      setFeedback({
        ok: true,
        msg: `🎉 Perfect! Live P(Blue) = ${counts.Blue}/${total} = ${relBlue.toFixed(2)}.`
      });
      onComplete();
      narrate('Awesome spinning! You calculated relative frequency for the carnival prize wheel!');
    } else {
      setFeedback({
        ok: false,
        msg: `Not quite! Blue landed ${counts.Blue} times out of ${total} spins. Divide (${counts.Blue} ÷ ${total}).`
      });
    }
  };

  return (
    <div className="flex flex-col gap-3 text-left">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-purple-500/30 pb-2">
        <div>
          <h3 className="text-lg sm:text-xl font-black text-white font-display flex items-center gap-2">
            <span>🎡 Station 3: Carnival Color Prize Wheel</span>
          </h3>
          <div className="text-yellow-400 font-black text-xs sm:text-sm">
            Story Link: Alex & Maya test sector relative frequencies on the prize wheel!
          </div>
        </div>
        <button onClick={handleReset} className="p-1.5 rounded-lg bg-purple-900/60 text-purple-200 hover:text-white" title="Reset Spins">
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Physical Interactive Animated Prize Wheel */}
      <div className="sim-workspace-card">
        <div className="flex items-center justify-between w-full">
          <div className="sim-workspace-card-label">Interactive Carnival Wheel</div>
          <div className="text-xs text-cyan-300 font-extrabold">Total Spins: {total}</div>
        </div>

        {/* Animated Circular Spinning Wheel */}
        <div className="wheel-container">
          <div className={`wheel-pointer ${isSpinning ? 'wheel-pointer-tick' : ''}`} />
          <div
            className="wheel-disc"
            style={{ transform: `rotate(${wheelRotation}deg)` }}
          >
            <div className="wheel-center-cap">🎡</div>
          </div>
        </div>

        <div className="text-xs text-center font-black text-purple-200 pt-1">
          Last Spin Sector: <span className="text-amber-300">{lastColor ? `${lastColor}` : 'Spin the Wheel!'}</span>
        </div>

        {/* Sector Tally Grid */}
        <div className="grid grid-cols-4 gap-2 w-full pt-1">
          {colors.map((c) => {
            const count = counts[c.name];
            const pct = total === 0 ? 0 : Math.round((count / total) * 100);

            return (
              <div key={c.name} className="flex flex-col items-center bg-[#0c0422] p-2 rounded-xl border border-purple-500/20">
                <span className="text-xl">{c.emoji}</span>
                <span className="text-xs font-black text-white">{c.name}</span>
                <span className="text-xs font-black text-amber-300">{count}</span>
                <span className="text-[10px] text-purple-300 font-bold">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Spin Action Buttons */}
      <div className="flex items-center gap-2 justify-center">
        <button onClick={() => doSpins(1)} disabled={isSpinning} className="sim-action-btn py-2 px-4 text-xs">
          <span>Spin 1x 🎡</span>
        </button>
        <button onClick={() => doSpins(10)} disabled={isSpinning} className="sim-action-btn">
          <span>Spin 10x 🎡</span>
        </button>
        <button onClick={() => doSpins(40)} disabled={isSpinning} className="sim-action-btn py-2 px-4 text-xs">
          <span>Batch 40x 🚀</span>
        </button>
      </div>

      {/* Target Task Card */}
      <div className="sim-task-card">
        <div className="sim-task-header">Target Task 3 of 5</div>
        <p className="sim-task-prompt">
          Spin at least 10 times, then enter the live experimental probability of landing on Blue (decimal like {(counts.Blue / (total || 10)).toFixed(2)}):
        </p>
        <div className="sim-task-input-row">
          <input
            type="text"
            placeholder={`e.g. ${(counts.Blue / (total || 10)).toFixed(2)}`}
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            className="sim-task-input"
          />
          <button onClick={handleCheck} className="sim-task-check-btn">
            Check
          </button>
        </div>
        {feedback && (
          <div className={`sim-task-feedback ${feedback.ok ? 'ok' : 'error'}`}>
            {feedback.msg}
          </div>
        )}
      </div>
    </div>
  );
};

/* ---------------- STATION 4: LAW OF LARGE NUMBERS ---------------- */
const LargeNumbersStation = ({ onComplete }) => {
  const [trialsN, setTrialsN] = useState(10);
  const [expResult, setExpResult] = useState(0.70); // Starts at 70% for N=10 like Alex's coin!
  const [isRunning, setIsRunning] = useState(false);
  const [userChoice, setUserChoice] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const runSimulation = (n) => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
    }, 500);

    setTrialsN(n);
    let heads = 0;
    for (let i = 0; i < n; i++) {
      if (Math.random() < 0.50) heads++;
    }
    const rel = heads / n;
    setExpResult(rel);
  };

  const handleCheckChoice = (choice) => {
    setUserChoice(choice);
    if (choice === 'closer') {
      setFeedback({
        ok: true,
        msg: '🎉 Correct! Law of Large Numbers: As N increases (10 → 1000), experimental probability gets CLOSER to theoretical (50%)!'
      });
      onComplete();
      narrate('Bingo! As the number of trials increases, experimental probability settles near the true value!');
    } else {
      setFeedback({
        ok: false,
        msg: 'Not quite! Watch the meter: Larger sample sizes reduce random variation and bring P(exp) closer to 50%.'
      });
    }
  };

  const errorMargin = Math.abs(expResult - 0.50) * 100;

  return (
    <div className="flex flex-col gap-3 text-left">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-purple-500/30 pb-2">
        <div>
          <h3 className="text-lg sm:text-xl font-black text-white font-display flex items-center gap-2">
            <span>📈 Station 4: Law of Large Numbers Lab</span>
          </h3>
          <div className="text-yellow-400 font-black text-xs sm:text-sm">
            Story Link: Alex vs Maya: 10 flips vary, 1,000 flips settle near steady 50%!
          </div>
        </div>
      </div>

      {/* Interactive Trials Comparison Card */}
      <div className="sim-workspace-card">
        <div className="flex items-center justify-between w-full">
          <div className="sim-workspace-card-label">Live Trial Batch (N = {trialsN})</div>
          <div className="text-xs text-cyan-300 font-extrabold">Theoretical Target: 50%</div>
        </div>

        {/* Visual Convergence Meter */}
        <div className={`flex flex-col gap-2 w-full bg-[#0d0424] p-3 rounded-xl border border-purple-500/20 ${isRunning ? 'convergence-meter-active' : ''}`}>
          <div className="flex justify-between text-xs font-black">
            <span className="text-purple-300">Sample Size: N = {trialsN} Flips</span>
            <span className="text-yellow-300">Experimental P(Heads): {(expResult * 100).toFixed(1)}%</span>
          </div>

          {/* Progress bar comparing vs 50% */}
          <div className="relative w-full h-6 bg-purple-950 rounded-full border border-purple-400/40 overflow-hidden">
            {/* Target 50% mark line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-yellow-400 z-10 shadow-md" title="True 50% Target" />
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-500"
              style={{ width: `${(expResult * 100).toFixed(1)}%` }}
            />
          </div>

          <div className="flex justify-between text-[11px] text-purple-300 font-bold">
            <span>0%</span>
            <span className="text-yellow-300 font-black">True 50% Line</span>
            <span>100%</span>
          </div>

          <div className="text-center text-xs font-black text-cyan-300 pt-1">
            Distance from 50%: {errorMargin.toFixed(1)}% {errorMargin < 3 ? '🎯 Steady!' : '⚡ Fluctuation'}
          </div>
        </div>
      </div>

      {/* Trial Run Buttons */}
      <div className="flex items-center gap-2 justify-center">
        <button onClick={() => runSimulation(10)} className={`sim-action-btn py-2 px-3 text-xs ${trialsN === 10 ? 'ring-2 ring-yellow-300' : ''}`}>
          <span>Run 10 Flips (Short)</span>
        </button>
        <button onClick={() => runSimulation(100)} className={`sim-action-btn py-2 px-3 text-xs ${trialsN === 100 ? 'ring-2 ring-yellow-300' : ''}`}>
          <span>Run 100 Flips</span>
        </button>
        <button onClick={() => runSimulation(1000)} className={`sim-action-btn py-2 px-3 text-xs ${trialsN === 1000 ? 'ring-2 ring-yellow-300' : ''}`}>
          <span>Run 1,000 Flips (Large N) 🚀</span>
        </button>
      </div>

      {/* Target Task Card */}
      <div className="sim-task-card">
        <div className="sim-task-header">Target Task 4 of 5</div>
        <p className="sim-task-prompt">
          Test 10, 100, and 1,000 flips. As total trials (N) grow larger, does experimental probability get CLOSER to or FARTHER from 50%?
        </p>

        <div className="flex items-center gap-3 justify-center mt-2">
          <button
            onClick={() => handleCheckChoice('closer')}
            className={`px-6 py-3 rounded-full font-black text-sm transition-all cursor-pointer ${
              userChoice === 'closer'
                ? 'bg-emerald-400 text-slate-950 border-2 border-emerald-200 shadow-lg scale-105'
                : 'bg-purple-900/80 text-white border border-purple-400/40 hover:bg-purple-800'
            }`}
          >
            <span>🎯 CLOSER to 50%</span>
          </button>
          <button
            onClick={() => handleCheckChoice('farther')}
            className={`px-6 py-3 rounded-full font-black text-sm transition-all cursor-pointer ${
              userChoice === 'farther'
                ? 'bg-rose-500 text-white border-2 border-rose-200 shadow-lg scale-105'
                : 'bg-purple-900/80 text-white border border-purple-400/40 hover:bg-purple-800'
            }`}
          >
            <span>⚡ FARTHER from 50%</span>
          </button>
        </div>

        {feedback && (
          <div className={`sim-task-feedback ${feedback.ok ? 'ok' : 'error'}`}>
            {feedback.msg}
          </div>
        )}
      </div>
    </div>
  );
};

/* ---------------- STATION 5: PREDICT ENGINE (E = P x N) ---------------- */
const PredictEngineStation = ({ onComplete }) => {
  const [probP, setProbP] = useState(0.35); // P = 0.35
  const [trialsN, setTrialsN] = useState(200); // N = 200
  const [isCalculating, setIsCalculating] = useState(false);
  const [userExpected, setUserExpected] = useState('');
  const [feedback, setFeedback] = useState(null);

  const expectedCount = Math.round(probP * trialsN); // E = 0.35 * 200 = 70

  const handleProbChange = (p) => {
    setProbP(p);
    setIsCalculating(true);
    setTimeout(() => setIsCalculating(false), 400);
  };

  const handleNChange = (n) => {
    setTrialsN(n);
    setIsCalculating(true);
    setTimeout(() => setIsCalculating(false), 400);
  };

  const handleCheck = () => {
    const parsed = parseInt(userExpected.trim(), 10);
    if (isNaN(parsed)) {
      setFeedback({ ok: false, msg: 'Please enter a valid whole number for expected count!' });
      return;
    }

    if (parsed === expectedCount) {
      setFeedback({
        ok: true,
        msg: `🎉 Spot on! Expected Count E = P × N = ${probP} × ${trialsN} = ${expectedCount} wins!`
      });
      onComplete();
      narrate(`Fantastic prediction! Expected count equals probability times total trials! ${probP} times ${trialsN} is ${expectedCount}!`);
    } else {
      setFeedback({
        ok: false,
        msg: `Not quite! Multiply probability by total trials: E = ${probP} × ${trialsN} = ${expectedCount}.`
      });
    }
  };

  return (
    <div className="flex flex-col gap-3 text-left">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-purple-500/30 pb-2">
        <div>
          <h3 className="text-lg sm:text-xl font-black text-white font-display flex items-center gap-2">
            <span>🔮 Station 5: Carnival Prediction Engine</span>
          </h3>
          <div className="text-yellow-400 font-black text-xs sm:text-sm">
            Story Link: Predict future wins using Expected Count (E = P × N)!
          </div>
        </div>
      </div>

      {/* Glowing Crystal Orb & Interactive Formula Widget */}
      <div className="sim-workspace-card">
        <div className="flex items-center justify-between w-full">
          <div className="sim-workspace-card-label">Interactive Prediction Engine (E = P × N)</div>
          <div className="text-xs text-amber-300 font-extrabold">Formula Machine</div>
        </div>

        {/* Crystal Orb & Laser Energy Flow */}
        <div className="flex items-center justify-center gap-4 py-2 w-full">
          <div className="predict-crystal-orb">
            🔮
          </div>

          <div className="flex-1 flex flex-col gap-1 max-w-[200px]">
            <div className="predict-beam-line" />
            <div className="text-[10px] text-center text-cyan-300 font-black uppercase tracking-wider">
              {isCalculating ? 'Computing Energy Beam... ⚡' : 'Laser Calculation Active'}
            </div>
          </div>

          <div className="predict-counter-box text-center">
            <div className="text-[10px] text-purple-300 font-bold uppercase">Predicted Wins</div>
            <div className="text-2xl font-black text-yellow-300">
              {isCalculating ? '??' : expectedCount}
            </div>
          </div>
        </div>

        {/* Interactive P & N Selector Controls */}
        <div className="grid grid-cols-2 gap-3 w-full bg-[#0c0422] p-3 rounded-xl border border-purple-500/20 text-xs">
          {/* Win Probability P Selectors */}
          <div className="flex flex-col gap-1.5">
            <span className="text-cyan-300 font-black">1. Select Win Probability (P):</span>
            <div className="flex gap-1.5 flex-wrap">
              {[0.25, 0.35, 0.50, 0.75].map((pVal) => (
                <button
                  key={pVal}
                  onClick={() => handleProbChange(pVal)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                    probP === pVal
                      ? 'bg-cyan-400 text-slate-950 border border-white scale-105'
                      : 'bg-purple-900/60 text-purple-200 hover:bg-purple-800'
                  }`}
                >
                  P = {pVal}
                </button>
              ))}
            </div>
          </div>

          {/* Total Trials N Selectors */}
          <div className="flex flex-col gap-1.5">
            <span className="text-amber-300 font-black">2. Select Total Trials (N):</span>
            <div className="flex gap-1.5 flex-wrap">
              {[100, 200, 500, 1000].map((nVal) => (
                <button
                  key={nVal}
                  onClick={() => handleNChange(nVal)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                    trialsN === nVal
                      ? 'bg-amber-400 text-slate-950 border border-white scale-105'
                      : 'bg-purple-900/60 text-purple-200 hover:bg-purple-800'
                  }`}
                >
                  N = {nVal}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Formula breakdown */}
        <div className="flex items-center justify-around w-full text-xs font-bold px-2 pt-1 border-t border-purple-500/20">
          <span className="text-cyan-300">P = {probP}</span>
          <span className="text-yellow-300">×</span>
          <span className="text-amber-300">N = {trialsN}</span>
          <span className="text-yellow-300">=</span>
          <span className="text-emerald-400 font-black text-sm">Expected E = {expectedCount}</span>
        </div>
      </div>

      {/* Target Task Card */}
      <div className="sim-task-card">
        <div className="sim-task-header">Target Task 5 of 5</div>
        <p className="sim-task-prompt">
          If the carnival prize win probability is P = {probP} and Leo plays N = {trialsN} trials, calculate the expected number of winning trials (E = P × N):
        </p>
        <div className="sim-task-input-row">
          <input
            type="text"
            placeholder="e.g. 70"
            value={userExpected}
            onChange={(e) => setUserExpected(e.target.value)}
            className="sim-task-input"
          />
          <button onClick={handleCheck} className="sim-task-check-btn">
            Check
          </button>
        </div>
        {feedback && (
          <div className={`sim-task-feedback ${feedback.ok ? 'ok' : 'error'}`}>
            {feedback.msg}
          </div>
        )}
      </div>
    </div>
  );
};

