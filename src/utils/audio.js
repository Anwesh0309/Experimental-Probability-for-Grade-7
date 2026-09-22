import { audioMap } from './audioMap.js';

let isMuted = false;
let currentAudio = null;

export const setMuted = (muted) => {
  isMuted = muted;
  if (isMuted) {
    stopNarration();
  }
};

export const getMuted = () => isMuted;

export const stopNarration = () => {
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio.onended = null;
      currentAudio.onerror = null;
    } catch (e) {
      // Ignore pause errors
    }
    currentAudio = null;
  }
};

export const narrate = (textOrKey, force = false) => {
  if (!textOrKey || (isMuted && !force)) return;

  // Always stop previous narration immediately so no overlapping audio occurs!
  stopNarration();

  // Look up pre-generated ElevenLabs MP3 audio file (voice ID Xb7hH8MSUJpSbSDYk0k2)
  const mappedUrl = audioMap[textOrKey];
  if (mappedUrl) {
    try {
      const audio = new Audio(mappedUrl);
      currentAudio = audio;

      audio.onended = () => {
        if (currentAudio === audio) {
          currentAudio = null;
        }
      };

      audio.play().catch((err) => {
        // Log audio play rejection if autoplay blocked, but DO NOT fallback to Web Speech API
        console.warn('ElevenLabs audio playback deferred or blocked by browser policy:', err);
      });
    } catch (e) {
      console.warn('ElevenLabs audio playback error:', e);
    }
  } else {
    console.warn(`[AudioMap] No ElevenLabs audio file mapped for: "${textOrKey}"`);
  }
};
