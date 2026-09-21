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
    currentAudio.pause();
    currentAudio = null;
  }
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
};

export const narrate = (text, force = false) => {
  if (!text || (isMuted && !force)) return;

  stopNarration();

  // 1. Check pre-generated audio map first
  const mappedUrl = audioMap[text];
  if (mappedUrl) {
    try {
      const audio = new Audio(mappedUrl);
      currentAudio = audio;
      audio.play().catch(() => {
        // Fallback to Web Speech API if audio playback blocked
        speakWebSpeech(text);
      });
      return;
    } catch (e) {
      console.warn('Audio playback error, falling back to Web Speech API', e);
    }
  }

  // 2. Web Speech API Fallback
  speakWebSpeech(text);
};

const speakWebSpeech = (text) => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;

  try {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95; // Slightly slower for clear teaching
    utterance.pitch = 1.05; // Friendly pitch

    // Try to pick an English voice if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Female') || v.name.includes('Google') || v.name.includes('Natural')));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('Web Speech API error:', err);
  }
};
