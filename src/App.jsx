import React from 'react';
import { useGameStore } from './store/gameStore';
import { TopPillNav } from './components/shell/TopPillNav';
import LandingScreen from './components/landing/LandingScreen';
import { WonderHook } from './components/wonder/WonderHook';
import { StoryCarousel } from './components/story/StoryCarousel';
import { SimulationStations } from './components/simulate/SimulationStations';
import { WorldMap } from './components/practice/WorldMap';
import { PracticePlay } from './components/practice/PracticePlay';
import { ReflectScoreboard } from './components/reflect/ReflectScoreboard';
import './styles/tokens.css';

export default function App() {
  const { phase, setPhase, activeWorldId } = useGameStore();

  return (
    <div className="w-full h-dvh flex flex-col justify-between overflow-hidden bg-radial-purple select-none">
      {/* Top Header Pill Nav - Only shown during active module phases */}
      {phase !== 'landing' && <TopPillNav />}

      {/* Main View Area */}
      <main className="flex-1 w-full overflow-hidden flex items-center justify-center">
        {phase === 'landing' && (
          <LandingScreen
            onStart={() => setPhase('wonder')}
            onGoPhase={(targetPhase) => setPhase(targetPhase === 'play' ? 'practice' : targetPhase)}
            onClose={() => {
              if (confirm('Exit lesson?')) {
                window.close();
              }
            }}
          />
        )}
        {phase === 'wonder' && <WonderHook />}
        {phase === 'story' && <StoryCarousel />}
        {phase === 'simulate' && <SimulationStations />}
        {phase === 'practice' && (!activeWorldId ? <WorldMap /> : <PracticePlay />)}
        {phase === 'reflect' && <ReflectScoreboard />}
      </main>
    </div>
  );
}
