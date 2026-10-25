import { UserProgress, SoundSettings } from '../types';

const STORAGE_KEY = 'ciencias_t1_progress_v1';

export const DEFAULT_SOUND_SETTINGS: SoundSettings = {
  bgmEnabled: true,
  bgmVolume: 0.25,
  sfxEnabled: true,
  sfxVolume: 0.6,
  voiceEnabled: true,
  voiceVolume: 1.0,
  voiceEngine: 'gemini_child',
  voicePitch: 1.15,
  voiceSpeed: 0.95,
};

export const INITIAL_PROGRESS: UserProgress = {
  studentName: 'Científica',
  avatarId: 'girl_scientist',
  completedMissions: [],
  medalsEarned: [],
  currentMissionId: 'mission_1',
  soundSettings: DEFAULT_SOUND_SETTINGS,
  totalStars: 0,
  points: 0,
};

export function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_PROGRESS;
    const parsed = JSON.parse(raw);
    return {
      ...INITIAL_PROGRESS,
      ...parsed,
      soundSettings: {
        ...DEFAULT_SOUND_SETTINGS,
        ...(parsed.soundSettings || {}),
      },
    };
  } catch (e) {
    console.error('Failed to load progress from localStorage:', e);
    return INITIAL_PROGRESS;
  }
}

export function saveProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress to localStorage:', e);
  }
}

export function resetProgress(): UserProgress {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to reset progress:', e);
  }
  return INITIAL_PROGRESS;
}
