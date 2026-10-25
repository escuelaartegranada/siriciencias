import React from 'react';
import { Award, Star, BookOpen, HelpCircle, Menu, Volume2, Home, Sparkles, Type } from 'lucide-react';
import { MISSIONS } from '../data/missionsData';
import { AudioControls } from './AudioControls';
import { FullscreenButton } from './FullscreenButton';
import { SoundSettings } from '../types';
import { playClickSound } from '../utils/audio';

interface Props {
  currentMissionId: string;
  onSelectMission: (id: string) => void;
  earnedMedalIds: string[];
  totalStars: number;
  points?: number;
  studentName: string;
  avatarEmoji: string;
  soundSettings: SoundSettings;
  onUpdateSoundSettings: (s: SoundSettings) => void;
  onOpenMedals: () => void;
  onOpenBook: () => void;
  onOpenAdultsGuide: () => void;
  onOpenReview: () => void;
  onOpenQuickSummary?: () => void;
  onGoHome: () => void;
  isLargeText?: boolean;
  onToggleLargeText?: () => void;
}

export const Navbar: React.FC<Props> = ({
  currentMissionId,
  onSelectMission,
  earnedMedalIds,
  totalStars,
  points = 0,
  studentName,
  avatarEmoji,
  soundSettings,
  onUpdateSoundSettings,
  onOpenMedals,
  onOpenBook,
  onOpenAdultsGuide,
  onOpenReview,
  onOpenQuickSummary,
  onGoHome,
  isLargeText = false,
  onToggleLargeText,
}) => {
  const currentMission = MISSIONS.find(m => m.id === currentMissionId) || MISSIONS[0];

  // Calculate Level and Title
  const getLevelInfo = (stars: number) => {
    if (stars >= 36) return { level: 5, title: 'Maestra', badge: '👑' };
    if (stars >= 26) return { level: 4, title: 'Gran Médica', badge: '💎' };
    if (stars >= 16) return { level: 3, title: 'Doctora Tina', badge: '🥇' };
    if (stars >= 6) return { level: 2, title: 'Exploradora', badge: '🥈' };
    return { level: 1, title: 'Curiosa', badge: '🥉' };
  };

  const levelInfo = getLevelInfo(totalStars);

  return (
    <header className="sticky top-0 z-40 bg-[#121933]/95 backdrop-blur-md border-b-2 border-[#2b396b] shadow-xl px-2.5 sm:px-6 py-2 space-y-2">
      {/* Top Row: User profile, Stats & Utility Controls */}
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Brand & Home */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onGoHome();
            }}
            className="flex items-center gap-2 p-1 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer"
            title="Ir al mapa de misiones"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-b from-amber-300 to-amber-500 border-2 border-amber-600 shadow-[0_3px_0_0_#b45309] flex items-center justify-center text-2xl flex-shrink-0">
              {avatarEmoji || '👩‍🔬'}
            </div>
            <div className="text-left">
              <span className="block text-[11px] sm:text-xs font-black text-amber-300 uppercase tracking-wider drop-shadow-xs">
                Tema 1 Ciencias
              </span>
              <span className="text-xs sm:text-sm text-white font-extrabold truncate max-w-[130px] sm:max-w-[200px] block">
                {studentName}
              </span>
            </div>
          </button>
        </div>

        {/* Right: Stats and Utility Tools */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Stars & Points Badge */}
          <div 
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-2xl bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 border-2 border-amber-600 text-amber-950 font-black text-xs sm:text-sm shadow-[0_3px_0_0_#b45309]"
            title={`Nivel ${levelInfo.level}: ${levelInfo.title} · ${totalStars} Estrellas · ${points} Puntos`}
          >
            <span className="text-base drop-shadow-xs">{levelInfo.badge}</span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-700 text-amber-800" />
              <span>{totalStars}</span>
            </div>
            <span className="text-amber-800/60 font-bold hidden sm:inline">|</span>
            <span className="text-xs text-amber-900 font-extrabold hidden sm:inline">
              {points} pts
            </span>
          </div>

          {/* Medals button */}
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onOpenMedals();
            }}
            className="px-2.5 sm:px-3 py-1.5 bg-gradient-to-b from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-amber-950 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-1.5 transition-transform active:translate-y-0.5 border border-amber-300 shadow-[0_3px_0_0_#b45309] min-h-[42px] cursor-pointer"
            title="Álbum de medallas y diploma"
          >
            <Award className="w-4 h-4 text-amber-900" />
            <span className="hidden sm:inline">{earnedMedalIds.length}/8 Medallas</span>
            <span className="sm:hidden font-black">{earnedMedalIds.length}</span>
          </button>

          {/* Text Size Zoom for Tablets */}
          {onToggleLargeText && (
            <button
              type="button"
              onClick={() => {
                playClickSound();
                onToggleLargeText();
              }}
              className={`p-2 rounded-2xl min-w-[42px] min-h-[42px] flex items-center justify-center font-black text-xs transition-all border shadow-[0_2px_0_0_#1e1b4b] cursor-pointer ${
                isLargeText
                  ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-[0_2px_0_0_#b45309]'
                  : 'bg-indigo-900/80 hover:bg-indigo-800 text-indigo-200 hover:text-white border-indigo-400/40'
              }`}
              title={isLargeText ? 'Texto Normal' : 'Texto Más Grande (para tablet)'}
              aria-label="Cambiar tamaño de letra"
            >
              <div className="flex items-center gap-0.5">
                <span className="text-sm font-black">A</span>
                <span className="text-[10px] font-black">{isLargeText ? '▼' : '▲'}</span>
              </div>
            </button>
          )}

          {/* Fullscreen Button for Tablet / Desktop */}
          <FullscreenButton
            className="flex-shrink-0"
            showLabel={false}
          />

          {/* Audio Controls */}
          <AudioControls
            settings={soundSettings}
            onUpdateSettings={onUpdateSoundSettings}
          />

          {/* Family / Adult Guide */}
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onOpenAdultsGuide();
            }}
            className="p-2 bg-white/10 hover:bg-white/20 text-slate-200 border border-white/20 rounded-2xl min-w-[42px] min-h-[42px] flex items-center justify-center transition-colors cursor-pointer"
            title="Guía didáctica para familias y modo tablet"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Bottom Row: ALL 8 MISSIONS CLEARLY NUMBERED + Activity shortcuts (NEVER clipped!) */}
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-1.5 sm:gap-3 overflow-x-auto py-0.5 scrollbar-none">
        {/* Missions Numbers Bar: 1 2 3 4 5 6 7 8 */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 bg-indigo-950/70 p-1 sm:p-1.5 rounded-2xl border border-indigo-700/60 shadow-inner">
          <span className="text-xs font-black uppercase text-amber-300 px-1 hidden md:inline">
            Misiones:
          </span>
          {MISSIONS.map((m) => {
            const isActive = m.id === currentMissionId;
            const isCompleted = earnedMedalIds.includes(m.id);
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  playClickSound();
                  onSelectMission(m.id);
                }}
                className={`flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center font-black text-sm sm:text-base transition-all relative cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-b from-amber-300 to-amber-500 text-amber-950 border-2 border-amber-600 shadow-[0_4px_0_0_#b45309] scale-105 z-10'
                    : isCompleted
                    ? 'bg-gradient-to-b from-emerald-400 to-emerald-600 text-white border-2 border-emerald-700 shadow-[0_3px_0_0_#065f46] hover:scale-102'
                    : 'bg-gradient-to-b from-indigo-800 to-indigo-950 text-indigo-200 border-2 border-indigo-700 shadow-[0_3px_0_0_#1e1b4b] hover:text-white hover:border-indigo-500'
                }`}
                title={`Misión ${m.order}: ${m.title}`}
              >
                <span>{m.order}</span>
                {isCompleted && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-lime-400 text-emerald-950 font-black text-[10px] rounded-full border border-emerald-800 flex items-center justify-center shadow-xs">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Fast Action Buttons: Resumen, Súper Repaso, Libro */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          {/* Quick Book Summary Button */}
          {onOpenQuickSummary && (
            <button
              type="button"
              onClick={() => {
                playClickSound();
                onOpenQuickSummary();
              }}
              className={`px-2.5 sm:px-3 py-1.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-1.5 transition-transform active:translate-y-0.5 min-h-[40px] cursor-pointer ${
                currentMissionId === 'quick_summary'
                  ? 'bg-gradient-to-b from-amber-300 to-amber-500 text-amber-950 border-2 border-amber-600 shadow-[0_4px_0_0_#b45309]'
                  : 'bg-gradient-to-b from-teal-500 to-emerald-700 hover:from-teal-400 hover:to-emerald-600 text-white border border-teal-300 shadow-[0_3px_0_0_#064e3b]'
              }`}
              title="Resumen Rápido con dibujos de todo el libro"
            >
              <span className="text-sm">⚡</span>
              <span>Resumen</span>
            </button>
          )}

          {/* Súper Repaso Button */}
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onOpenReview();
            }}
            className={`px-2.5 sm:px-3 py-1.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-1.5 transition-transform active:translate-y-0.5 min-h-[40px] cursor-pointer ${
              currentMissionId === 'review'
                ? 'bg-gradient-to-b from-amber-300 to-amber-500 text-amber-950 border-2 border-amber-600 shadow-[0_4px_0_0_#b45309]'
                : 'bg-gradient-to-b from-purple-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-600 text-white border border-purple-300 shadow-[0_3px_0_0_#3b0764]'
            }`}
            title="Súper Repaso con juegos del examen"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Repaso</span>
          </button>

          {/* Textbook Button */}
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onOpenBook();
            }}
            className="px-2.5 sm:px-3 py-1.5 bg-gradient-to-b from-sky-400 to-sky-600 hover:from-sky-300 hover:to-sky-500 text-white rounded-2xl font-black text-xs sm:text-sm flex items-center gap-1.5 transition-transform active:translate-y-0.5 border border-sky-300 shadow-[0_3px_0_0_#0369a1] min-h-[40px] cursor-pointer"
            title="Ver páginas originales del libro"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Libro</span>
          </button>
        </div>
      </div>
    </header>
  );
};
