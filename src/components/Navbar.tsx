import React from 'react';
import { Award, Star, BookOpen, HelpCircle, Menu, Volume2, Home, Sparkles } from 'lucide-react';
import { MISSIONS } from '../data/missionsData';
import { AudioControls } from './AudioControls';
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
    <header className="sticky top-0 z-40 bg-[#121933]/90 backdrop-blur-md border-b-2 border-[#2b396b] shadow-lg px-3 sm:px-6 py-2.5">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Brand & Home */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onGoHome();
            }}
            className="flex items-center gap-2.5 p-1.5 rounded-2xl hover:bg-white/10 transition-colors"
            title="Ir al mapa de misiones"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-b from-amber-300 to-amber-500 border-2 border-amber-600 shadow-[0_3px_0_0_#b45309] flex items-center justify-center text-2xl">
              {avatarEmoji || '👩‍🔬'}
            </div>
            <div className="hidden md:block text-left">
              <span className="block text-xs font-black text-amber-300 uppercase tracking-wider drop-shadow-xs">Tema 1 Ciencias</span>
              <span className="text-xs text-white font-extrabold">{studentName}</span>
            </div>
          </button>
        </div>

        {/* Center: Mission pills with 3D game style */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 px-1 max-w-[440px] scrollbar-none">
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
                className={`flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center font-black text-sm transition-all relative ${
                  isActive
                    ? 'bg-gradient-to-b from-amber-300 to-amber-500 text-amber-950 border-2 border-amber-600 shadow-[0_4px_0_0_#b45309] scale-105'
                    : isCompleted
                    ? 'bg-gradient-to-b from-emerald-400 to-emerald-600 text-white border-2 border-emerald-700 shadow-[0_3px_0_0_#065f46] hover:scale-102'
                    : 'bg-gradient-to-b from-indigo-800 to-indigo-950 text-indigo-200 border-2 border-indigo-700 shadow-[0_3px_0_0_#1e1b4b] hover:text-white'
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

          {/* Quick Review Pill */}
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onOpenReview();
            }}
            className={`flex-shrink-0 px-2.5 h-9 sm:h-10 rounded-2xl flex items-center justify-center font-black text-xs transition-all relative gap-1 ${
              currentMissionId === 'review'
                ? 'bg-gradient-to-b from-amber-300 to-amber-500 text-amber-950 border-2 border-amber-600 shadow-[0_4px_0_0_#b45309] scale-105'
                : 'bg-gradient-to-b from-purple-700 to-purple-900 text-purple-200 border-2 border-purple-500 shadow-[0_3px_0_0_#3b0764] hover:text-white'
            }`}
            title="Súper Repaso del Tema 1 (Páginas 25 a 28)"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Repaso</span>
          </button>

          {/* Quick Book Summary Pill */}
          {onOpenQuickSummary && (
            <button
              type="button"
              onClick={() => {
                playClickSound();
                onOpenQuickSummary();
              }}
              className={`flex-shrink-0 px-2.5 h-9 sm:h-10 rounded-2xl flex items-center justify-center font-black text-xs transition-all relative gap-1 ${
                currentMissionId === 'quick_summary'
                  ? 'bg-gradient-to-b from-amber-300 to-amber-500 text-amber-950 border-2 border-amber-600 shadow-[0_4px_0_0_#b45309] scale-105'
                  : 'bg-gradient-to-b from-teal-700 to-emerald-900 text-teal-200 border-2 border-teal-500 shadow-[0_3px_0_0_#064e3b] hover:text-white'
              }`}
              title="Resumen Rápido de todo el libro con dibujos"
            >
              <span>⚡</span>
              <span className="hidden sm:inline">Resumen</span>
            </button>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Stars & Points 3D Badge */}
          <div 
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-2xl bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 border-2 border-amber-600 text-amber-950 font-black text-xs shadow-[0_3px_0_0_#b45309] animate-in fade-in"
            title={`Nivel ${levelInfo.level}: ${levelInfo.title} · ${totalStars} Estrellas · ${points} Puntos`}
          >
            <span className="text-sm drop-shadow-xs">{levelInfo.badge}</span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-700 text-amber-800" />
              <span>{totalStars}</span>
            </div>
            <span className="text-amber-800/60 font-bold hidden sm:inline">|</span>
            <span className="text-[11px] text-amber-900 font-extrabold hidden sm:inline">
              {points} pts
            </span>
          </div>

          {/* Quick Book Summary Action Button */}
          {onOpenQuickSummary && (
            <button
              type="button"
              onClick={() => {
                playClickSound();
                onOpenQuickSummary();
              }}
              className={`px-2.5 sm:px-3 py-2 rounded-2xl font-black text-xs flex items-center gap-1.5 transition-transform active:translate-y-0.5 min-h-[44px] cursor-pointer ${
                currentMissionId === 'quick_summary'
                  ? 'bg-gradient-to-b from-amber-300 to-amber-500 text-amber-950 border-2 border-amber-600 shadow-[0_4px_0_0_#b45309]'
                  : 'bg-gradient-to-b from-teal-500 to-emerald-700 hover:from-teal-400 hover:to-emerald-600 text-white border border-teal-300 shadow-[0_3px_0_0_#064e3b]'
              }`}
              title="Abrir Resumen Visual de todo el Libro (8 Conceptos)"
            >
              <span>⚡</span>
              <span className="hidden lg:inline">Resumen Libro</span>
              <span className="lg:hidden">Resumen</span>
            </button>
          )}

          {/* Súper Repaso Direct Button */}
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onOpenReview();
            }}
            className={`px-2.5 sm:px-3 py-2 rounded-2xl font-black text-xs flex items-center gap-1.5 transition-transform active:translate-y-0.5 min-h-[44px] cursor-pointer ${
              currentMissionId === 'review'
                ? 'bg-gradient-to-b from-amber-300 to-amber-500 text-amber-950 border-2 border-amber-600 shadow-[0_4px_0_0_#b45309]'
                : 'bg-gradient-to-b from-purple-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-600 text-white border border-purple-300 shadow-[0_3px_0_0_#3b0764]'
            }`}
            title="Abrir Súper Repaso interactivo del Tema 1"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="hidden lg:inline">Súper Repaso</span>
            <span className="lg:hidden">Repaso</span>
          </button>

          {/* Textbook button */}
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onOpenBook();
            }}
            className="px-2.5 sm:px-3 py-2 bg-gradient-to-b from-sky-400 to-sky-600 hover:from-sky-300 hover:to-sky-500 text-white rounded-2xl font-black text-xs flex items-center gap-1.5 transition-transform active:translate-y-0.5 border border-sky-300 shadow-[0_3px_0_0_#0369a1] min-h-[44px]"
            title="Ver las páginas originales del libro de texto"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Libro</span>
          </button>

          {/* Medals button */}
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onOpenMedals();
            }}
            className="px-2.5 sm:px-3 py-2 bg-gradient-to-b from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-amber-950 rounded-2xl font-black text-xs flex items-center gap-1.5 transition-transform active:translate-y-0.5 border border-amber-300 shadow-[0_3px_0_0_#b45309] min-h-[44px]"
            title="Álbum de medallas y diploma"
          >
            <Award className="w-4 h-4 text-amber-900" />
            <span className="hidden sm:inline">{earnedMedalIds.length}/8 Medallas</span>
            <span className="sm:hidden font-black">{earnedMedalIds.length}</span>
          </button>

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
            className="p-2 bg-white/10 hover:bg-white/20 text-slate-200 border border-white/20 rounded-2xl min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors"
            title="Guía didáctica para familias"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
