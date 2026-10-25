// Web Audio API and Speech Synthesis helper
import { SoundSettings } from '../types';

let audioCtx: AudioContext | null = null;
let bgmGainNode: GainNode | null = null;
let sfxGainNode: GainNode | null = null;
let bgmInterval: number | null = null;
let isBgmPlaying = false;
let isDucked = false;

let currentSettings: SoundSettings = {
  bgmEnabled: true,
  bgmVolume: 0.25,
  sfxEnabled: true,
  sfxVolume: 0.6,
  voiceEnabled: true,
  voiceVolume: 1.0,
};

let speakingListeners: Array<(isSpeaking: boolean) => void> = [];
let isCurrentlySpeaking = false;

export function notifySpeaking(speaking: boolean) {
  isCurrentlySpeaking = speaking;
  speakingListeners.forEach(listener => listener(speaking));
}

export function subscribeSpeaking(callback: (isSpeaking: boolean) => void) {
  speakingListeners.push(callback);
  return () => {
    speakingListeners = speakingListeners.filter(l => l !== callback);
  };
}

export function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
    
    // SFX master gain
    sfxGainNode = audioCtx.createGain();
    sfxGainNode.gain.setValueAtTime(currentSettings.sfxEnabled ? currentSettings.sfxVolume : 0, audioCtx.currentTime);
    sfxGainNode.connect(audioCtx.destination);

    // BGM master gain
    bgmGainNode = audioCtx.createGain();
    bgmGainNode.gain.setValueAtTime(currentSettings.bgmEnabled ? currentSettings.bgmVolume : 0, audioCtx.currentTime);
    bgmGainNode.connect(audioCtx.destination);
  }

  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function updateSoundSettings(newSettings: SoundSettings) {
  currentSettings = { ...newSettings };
  if (audioCtx && bgmGainNode && sfxGainNode) {
    const targetBgm = currentSettings.bgmEnabled ? (isDucked ? currentSettings.bgmVolume * 0.2 : currentSettings.bgmVolume) : 0;
    bgmGainNode.gain.setTargetAtTime(targetBgm, audioCtx.currentTime, 0.1);
    
    const targetSfx = currentSettings.sfxEnabled ? currentSettings.sfxVolume : 0;
    sfxGainNode.gain.setTargetAtTime(targetSfx, audioCtx.currentTime, 0.05);
  }

  if (!currentSettings.bgmEnabled && isBgmPlaying) {
    pauseBgm();
  } else if (currentSettings.bgmEnabled && !isBgmPlaying && audioCtx) {
    startBgm();
  }
}

// Gentle musical arpeggiator (pentatonic warm bells / marimba style)
const pentatonicScale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25]; // C4 to E5
const bgmChords = [
  [0, 2, 4, 7], // C - E - G - E
  [3, 5, 7, 5], // G - B - D - B
  [5, 7, 9, 7], // A - C - E - C
  [3, 5, 7, 5], // F/G
];

let chordStep = 0;
let noteStep = 0;

function playBgmNote() {
  if (!audioCtx || !bgmGainNode || !isBgmPlaying) return;

  const currentChord = bgmChords[chordStep % bgmChords.length];
  const scaleIdx = currentChord[noteStep % currentChord.length] % pentatonicScale.length;
  const freq = pentatonicScale[scaleIdx];

  const osc = audioCtx.createOscillator();
  const noteGain = audioCtx.createGain();

  osc.type = 'triangle'; // warm, sweet sound
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

  // Soft marimba-like envelope
  noteGain.gain.setValueAtTime(0, audioCtx.currentTime);
  noteGain.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 0.04);
  noteGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.6);

  osc.connect(noteGain);
  noteGain.connect(bgmGainNode);

  osc.start(audioCtx.currentTime);
  osc.stop(audioCtx.currentTime + 0.65);

  noteStep++;
  if (noteStep % 4 === 0) {
    chordStep++;
  }
}

export function startBgm() {
  if (isBgmPlaying || !currentSettings.bgmEnabled) return;
  getAudioContext();
  isBgmPlaying = true;
  
  if (bgmInterval) window.clearInterval(bgmInterval);
  bgmInterval = window.setInterval(() => {
    if (isBgmPlaying && audioCtx && audioCtx.state === 'running') {
      playBgmNote();
    }
  }, 420); // ~142 bpm quarter/eighth notes
}

export function pauseBgm() {
  isBgmPlaying = false;
  if (bgmInterval) {
    window.clearInterval(bgmInterval);
    bgmInterval = null;
  }
}

export function duckBgm(duck: boolean) {
  isDucked = duck;
  if (!audioCtx || !bgmGainNode) return;
  const target = currentSettings.bgmEnabled ? (duck ? currentSettings.bgmVolume * 0.15 : currentSettings.bgmVolume) : 0;
  bgmGainNode.gain.setTargetAtTime(target, audioCtx.currentTime, 0.2);
}

// Sound Effects
export function playClickSound() {
  if (!currentSettings.sfxEnabled) return;
  const ctx = getAudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(600, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.06);

  gain.gain.setValueAtTime(0.2, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

  osc.connect(gain);
  gain.connect(sfxGainNode || ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.07);
}

export function playSuccessSound() {
  if (!currentSettings.sfxEnabled) return;
  const ctx = getAudioContext();
  const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

    gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.08);
    gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + idx * 0.08 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.4);

    osc.connect(gain);
    gain.connect(sfxGainNode || ctx.destination);

    osc.start(ctx.currentTime + idx * 0.08);
    osc.stop(ctx.currentTime + idx * 0.08 + 0.45);
  });
}

export function playTryAgainSound() {
  if (!currentSettings.sfxEnabled) return;
  const ctx = getAudioContext();
  // Friendly warm two-tone (G4 -> E4) - gentle and positive
  const notes = [392.00, 329.63];
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.14);

    gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.14);
    gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + idx * 0.14 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.14 + 0.35);

    osc.connect(gain);
    gain.connect(sfxGainNode || ctx.destination);

    osc.start(ctx.currentTime + idx * 0.14);
    osc.stop(ctx.currentTime + idx * 0.14 + 0.4);
  });
}

export function playCompleteSound() {
  if (!currentSettings.sfxEnabled) return;
  const ctx = getAudioContext();
  // Celebratory flourish (C5 - D5 - E5 - G5 - C6 long)
  const notes = [523.25, 587.33, 659.25, 783.99, 1046.50];
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);

    const isLast = idx === notes.length - 1;
    const duration = isLast ? 0.9 : 0.3;

    gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.1);
    gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + idx * 0.1 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + duration);

    osc.connect(gain);
    gain.connect(sfxGainNode || ctx.destination);

    osc.start(ctx.currentTime + idx * 0.1);
    osc.stop(ctx.currentTime + idx * 0.1 + duration + 0.05);
  });
}

export function playBadgeSound() {
  if (!currentSettings.sfxEnabled) return;
  const ctx = getAudioContext();
  const notes = [659.25, 783.99, 987.77, 1318.51];
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.09);

    gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.09);
    gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + idx * 0.09 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.09 + 0.5);

    osc.connect(gain);
    gain.connect(sfxGainNode || ctx.destination);

    osc.start(ctx.currentTime + idx * 0.09);
    osc.stop(ctx.currentTime + idx * 0.09 + 0.55);
  });
}

// Gemini AI Child TTS & Web Speech fallback
let currentAudioElement: HTMLAudioElement | null = null;
const clientAudioCache = new Map<string, string>();
let availableSpanishVoice: SpeechSynthesisVoice | null = null;

function findSpanishVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  // Prefer natural Spanish female/expressive voices
  const preferred = voices.find(v => 
    v.lang.startsWith('es') && 
    (v.name.includes('Monica') || v.name.includes('Paulina') || v.name.includes('Helena') || v.name.includes('Lucia') || v.name.includes('Google español') || v.name.includes('Natural'))
  );
  if (preferred) return preferred;

  const esVoice = voices.find(v => v.lang === 'es-ES' || v.lang === 'es_ES') ||
                  voices.find(v => v.lang.startsWith('es'));
  return esVoice || null;
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    availableSpanishVoice = findSpanishVoice();
  };
  availableSpanishVoice = findSpanishVoice();
}

export function stopSpeaking() {
  if (currentAudioElement) {
    currentAudioElement.pause();
    currentAudioElement.currentTime = 0;
    currentAudioElement = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  duckBgm(false);
  notifySpeaking(false);
}

function speakWithBrowser(clean: string, onDone?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onDone) onDone();
    return;
  }

  const utterance = new SpeechSynthesisUtterance(clean);
  if (!availableSpanishVoice) {
    availableSpanishVoice = findSpanishVoice();
  }
  if (availableSpanishVoice) {
    utterance.voice = availableSpanishVoice;
  }
  utterance.lang = 'es-ES';
  // Use child-like pitch and lively tempo to avoid sounding robotic
  utterance.rate = currentSettings.voiceSpeed || 0.96;
  utterance.pitch = currentSettings.voicePitch || 1.25; // warmer and higher child pitch
  utterance.volume = currentSettings.voiceVolume;

  duckBgm(true);
  notifySpeaking(true);

  utterance.onend = () => {
    duckBgm(false);
    notifySpeaking(false);
    if (onDone) onDone();
  };

  utterance.onerror = () => {
    duckBgm(false);
    notifySpeaking(false);
    if (onDone) onDone();
  };

  window.speechSynthesis.speak(utterance);
}

export async function speakText(text: string, onDone?: () => void) {
  if (!currentSettings.voiceEnabled) {
    if (onDone) onDone();
    return;
  }

  stopSpeaking();

  const clean = text.replace(/[*_#`~[\]]/g, '').trim();
  if (!clean) {
    if (onDone) onDone();
    return;
  }

  const engine = currentSettings.voiceEngine || 'gemini_child';

  // If user selected browser engine, use speech synthesis directly
  if (engine === 'browser') {
    speakWithBrowser(clean, onDone);
    return;
  }

  // Map engine to Gemini voice config
  let voiceName = 'Puck';
  let styleName = 'cheerful_kid';

  if (engine === 'gemini_puck') {
    voiceName = 'Puck';
    styleName = 'child';
  } else if (engine === 'gemini_kore') {
    voiceName = 'Kore';
    styleName = 'tutor';
  } else if (engine === 'gemini_child') {
    voiceName = 'Puck';
    styleName = 'cheerful_kid';
  }

  const cacheKey = `${voiceName}:${styleName}:${clean}`;

  try {
    let base64Audio = clientAudioCache.get(cacheKey);

    if (!base64Audio) {
      duckBgm(true);
      notifySpeaking(true);

      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: clean,
          voice: voiceName,
          style: styleName,
        }),
      });

      if (!res.ok) {
        throw new Error(`TTS server responded with ${res.status}`);
      }

      const data = await res.json();
      if (!data.audio) {
        throw new Error('No audio returned');
      }
      base64Audio = data.audio;
      clientAudioCache.set(cacheKey, base64Audio!);
    }

    if (!base64Audio) {
      throw new Error('No audio available');
    }

    const audioUrl = `data:audio/wav;base64,${base64Audio}`;
    const audio = new Audio(audioUrl);
    currentAudioElement = audio;

    audio.volume = Math.min(1, Math.max(0, currentSettings.voiceVolume));
    audio.playbackRate = currentSettings.voiceSpeed || 1.0;

    duckBgm(true);
    notifySpeaking(true);

    audio.onended = () => {
      currentAudioElement = null;
      duckBgm(false);
      notifySpeaking(false);
      if (onDone) onDone();
    };

    audio.onerror = () => {
      console.warn('Audio playback error, falling back to browser speech');
      currentAudioElement = null;
      speakWithBrowser(clean, onDone);
    };

    await audio.play();
  } catch (err) {
    console.warn('Gemini AI TTS failed or offline, falling back to local speech:', err);
    speakWithBrowser(clean, onDone);
  }
}

