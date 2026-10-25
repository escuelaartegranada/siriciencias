export type VitalFunction = 'nutrición' | 'relación' | 'reproducción';

export type BodySystem = 'digestivo' | 'respiratorio' | 'circulatorio' | 'excretor';

export interface Medal {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  earnedAt?: string;
}

export interface SoundSettings {
  bgmEnabled: boolean;
  bgmVolume: number; // 0 to 1
  sfxEnabled: boolean;
  sfxVolume: number; // 0 to 1
  voiceEnabled: boolean;
  voiceVolume: number; // 0 to 1
  voiceEngine?: 'gemini_child' | 'gemini_puck' | 'gemini_kore' | 'browser';
  voicePitch?: number; // 0.8 to 1.6
  voiceSpeed?: number; // 0.7 to 1.3
}

export interface UserProgress {
  studentName: string;
  avatarId: string;
  completedMissions: string[];
  medalsEarned: string[];
  currentMissionId: string;
  soundSettings: SoundSettings;
  customDorsal?: {
    number: string;
    text: string;
    color: string;
  };
  customPatio?: {
    zones: string[];
    rules: string[];
  };
  totalStars: number;
  points?: number;
}
