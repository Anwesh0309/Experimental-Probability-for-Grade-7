import { create } from 'zustand';

export const useGameStore = create((set, get) => ({
  // Current Phase: landing | wonder | story | simulate | practice | reflect
  phase: 'landing',
  setPhase: (phase) => set({ phase }),

  // Phase Lock/Completed States
  completed: {
    wonder: false,
    story: false,
    simulate: false,
    practice: false,
    reflect: false,
  },
  markPhaseComplete: (phaseKey) =>
    set((state) => ({
      completed: { ...state.completed, [phaseKey]: true },
    })),

  // Audio Toggle State
  audioEnabled: true,
  toggleAudio: () => set((state) => ({ audioEnabled: !state.audioEnabled })),

  // Story Carousel State
  storyIndex: 0,
  setStoryIndex: (index) => set({ storyIndex: index }),

  // Simulation Lab State
  activeStation: 1,
  setActiveStation: (station) => set({ activeStation: station }),
  stationTargetsDone: { 1: false, 2: false, 3: false, 4: false, 5: false },
  completeStationTarget: (stationId) =>
    set((state) => ({
      stationTargetsDone: { ...state.stationTargetsDone, [stationId]: true },
    })),

  // Practice Phase State
  unlockedWorld: 1,
  activeWorldId: null,
  worldsData: {
    1: { stars: 0, attempts: 0 },
    2: { stars: 0, attempts: 0 },
    3: { stars: 0, attempts: 0 },
    4: { stars: 0, attempts: 0 },
    5: { stars: 0, attempts: 0 },
    6: { stars: 0, attempts: 0 },
    7: { stars: 0, attempts: 0 },
    8: { stars: 0, attempts: 0 },
    9: { stars: 0, attempts: 0 },
    10: { stars: 0, attempts: 0 },
  },
  xp: 0,
  bestStreak: 0,

  startWorldPractice: (worldId) => set({ activeWorldId: worldId }),
  closeWorldPractice: () => set({ activeWorldId: null }),

  recordWorldResult: (worldId, scoreOutof10, gainedXp, maxStreakInRun) => {
    const stars = scoreOutof10 >= 9 ? 3 : scoreOutof10 >= 7 ? 2 : scoreOutof10 >= 5 ? 1 : 0;

    set((state) => {
      const prevWorld = state.worldsData[worldId] || { stars: 0, attempts: 0 };
      const newStars = Math.max(prevWorld.stars, stars);
      const nextUnlocked = stars >= 1 ? Math.min(10, Math.max(state.unlockedWorld, worldId + 1)) : state.unlockedWorld;

      return {
        xp: state.xp + gainedXp,
        bestStreak: Math.max(state.bestStreak, maxStreakInRun),
        unlockedWorld: nextUnlocked,
        worldsData: {
          ...state.worldsData,
          [worldId]: {
            stars: newStars,
            attempts: prevWorld.attempts + 1,
          },
        },
      };
    });
  },

  // Reflection State
  reflectionText: '',
  reflectionDone: false,
  setReflectionText: (text) => set({ reflectionText: text }),
  setReflectionDone: (done) => set({ reflectionDone: done }),

  // Global Reset
  resetGameProgress: () =>
    set({
      phase: 'landing',
      completed: { wonder: false, story: false, simulate: false, practice: false, reflect: false },
      storyIndex: 0,
      activeStation: 1,
      stationTargetsDone: { 1: false, 2: false, 3: false, 4: false, 5: false },
      unlockedWorld: 1,
      activeWorldId: null,
      worldsData: {
        1: { stars: 0, attempts: 0 },
        2: { stars: 0, attempts: 0 },
        3: { stars: 0, attempts: 0 },
        4: { stars: 0, attempts: 0 },
        5: { stars: 0, attempts: 0 },
        6: { stars: 0, attempts: 0 },
        7: { stars: 0, attempts: 0 },
        8: { stars: 0, attempts: 0 },
        9: { stars: 0, attempts: 0 },
        10: { stars: 0, attempts: 0 },
      },
      xp: 0,
      bestStreak: 0,
      reflectionText: '',
      reflectionDone: false,
    }),
}));
