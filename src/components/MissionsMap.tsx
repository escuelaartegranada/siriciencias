import React from 'react';
import { MISSIONS } from '../data/missionsData';
import { Sparkles, Star, CheckCircle, ArrowRight, BookOpen, Volume2, Trophy } from 'lucide-react';
import { NarratorSpeaker } from './NarratorSpeaker';
import { playClickSound } from '../utils/audio';
import {
  RabbitIllustration,
  PlantIllustration,
  StomachIllustration,
  LungsIllustration,
  HeartIllustration,
  KidneysIllustration,
  BrainIllustration,
  SkeletonIllustration,
  MusclesIllustration,
} from './Illustrations';

interface Props {
  onSelectMission: (missionId: string) => void;
  earnedMedalIds: string[];
  studentName: string;
  totalStars?: number;
  points?: number;
  onOpenReview?: () => void;
  onOpenQuickSummary?: () => void;
}

export const MissionsMap: React.FC<Props> = ({
  onSelectMission,
  earnedMedalIds,
  studentName,
  totalStars = 0,
  points = 0,
  onOpenReview,
  onOpenQuickSummary,
}) => {
  const getLevelInfo = (stars: number) => {
    if (stars >= 36) return { level: 5, title: 'Maestra de las Ciencias', badge: '👑', next: 50 };
    if (stars >= 26) return { level: 4, title: 'Gran Médica Investigadora', badge: '💎', next: 36 };
    if (stars >= 16) return { level: 3, title: 'Superdoctora Tina', badge: '🥇', next: 26 };
    if (stars >= 6) return { level: 2, title: 'Exploradora de Órganos', badge: '🥈', next: 16 };
    return { level: 1, title: 'Curiosa del Cuerpo', badge: '🥉', next: 6 };
  };

  const currentLvl = getLevelInfo(totalStars);
  const neededForNext = Math.max(0, currentLvl.next - totalStars);

  // Helper to render playful vector drawing scene per mission
  const renderMissionDrawing = (missionId: string) => {
    switch (missionId) {
      case 'mission_1':
        return (
          <div className="w-full h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600 flex items-center justify-around px-3 py-1">
            <RabbitIllustration className="w-14 h-14 drop-shadow-md" />
            <span className="text-3xl animate-bounce">🌱</span>
            <PlantIllustration className="w-14 h-14 drop-shadow-md" />
          </div>
        );
      case 'mission_2':
        return (
          <div className="w-full h-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 flex items-center justify-around px-3 py-1">
            <StomachIllustration className="w-14 h-14 drop-shadow-md" />
            <HeartIllustration className="w-14 h-14 drop-shadow-md" />
            <KidneysIllustration className="w-14 h-14 drop-shadow-md" />
          </div>
        );
      case 'mission_3':
        return (
          <div className="w-full h-full bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 flex items-center justify-around px-4 py-1">
            <LungsIllustration className="w-16 h-16 drop-shadow-md" inflated={true} />
            <div className="flex flex-col items-center">
              <span className="text-3xl">🔬</span>
              <span className="text-[11px] font-black text-sky-100 uppercase mt-0.5">Taller</span>
            </div>
          </div>
        );
      case 'mission_4':
        return (
          <div className="w-full h-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 flex items-center justify-around px-3 py-1">
            <BrainIllustration className="w-14 h-14 drop-shadow-md" />
            <SkeletonIllustration className="w-14 h-14 drop-shadow-md" />
            <MusclesIllustration className="w-14 h-14 drop-shadow-md" />
          </div>
        );
      case 'mission_5':
        return (
          <div className="w-full h-full bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 flex items-center justify-around px-4 py-1">
            <HeartIllustration className="w-14 h-14 drop-shadow-md" />
            <div className="flex items-center gap-1 text-3xl">
              <span>🤰</span>
              <span>👶</span>
            </div>
          </div>
        );
      case 'mission_6':
        return (
          <div className="w-full h-full bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-600 flex items-center justify-around px-3 text-3xl">
            <span title="Dieta">🍎</span>
            <span title="Deporte">⚽</span>
            <span title="Higiene">🧼</span>
            <span title="Sueño">🌙</span>
            <span title="Naturaleza">🌳</span>
          </div>
        );
      case 'mission_7':
        return (
          <div className="w-full h-full bg-gradient-to-r from-purple-500 via-violet-600 to-indigo-700 flex items-center justify-around px-4 py-1">
            <span className="text-4xl">🏃‍♀️</span>
            <div className="bg-white/20 border-2 border-white/40 px-3 py-1 rounded-xl text-center">
              <span className="block text-xs font-black text-amber-300">DORSAL</span>
              <span className="text-lg font-black text-white">261</span>
            </div>
            <span className="text-3xl">🏅</span>
          </div>
        );
      case 'mission_8':
      default:
        return (
          <div className="w-full h-full bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-600 flex items-center justify-around px-4 py-1">
            <span className="text-4xl animate-bounce">🏆</span>
            <div className="flex items-center gap-1.5 text-2xl">
              <span>🏀</span>
              <span>🧩</span>
              <span>🌳</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Welcome Hero Banner with Game Dialog Styling */}
      <div className="relative pt-4">
        {/* Top ribbon */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
          <div className="game-ribbon-yellow px-6 py-2 text-xs sm:text-sm font-black uppercase tracking-wider shadow-md flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-800" />
            <span>Ciencias Naturales · 2º de Primaria</span>
          </div>
        </div>

        <div className="game-dialog-card p-6 sm:p-8 pt-8 text-white relative">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="max-w-xl">
              <h2 className="text-2xl sm:text-4xl font-black leading-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                ¡Hola, {studentName}!
              </h2>
              <p className="text-sm sm:text-base font-semibold text-purple-100 mt-1">
                Bienvenida al mapa de misiones del <strong>Tema 1: Mi cuerpo funciona</strong>. ¡Resuelve los retos ilustrados para ganar estrellas, puntos y medallas!
              </p>

              {/* Child Motivation Progress Capsule */}
              <div className="mt-4 flex flex-wrap items-center gap-2.5 bg-purple-950/70 p-3 rounded-2xl border-2 border-purple-400/40">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-amber-950 font-black text-xl flex items-center justify-center border-2 border-amber-500 shadow-[0_2px_0_0_#b45309]">
                  {currentLvl.badge}
                </div>
                <div className="text-left flex-1 min-w-[200px]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-amber-300 uppercase tracking-wider">
                      Nivel {currentLvl.level}: {currentLvl.title}
                    </span>
                    <span className="text-[11px] font-extrabold text-lime-300 bg-lime-950/60 px-2 py-0.5 rounded-full border border-lime-400/30">
                      {points} Puntos
                    </span>
                  </div>
                  <div className="text-xs text-purple-200 mt-0.5 font-medium">
                    ⭐ {totalStars} Estrellas conseguidas {neededForNext > 0 ? `(¡Faltan ${neededForNext} para subir a Nivel ${currentLvl.level + 1}!)` : '¡Nivel Máximo alcanzado!'}
                  </div>
                </div>
              </div>
            </div>

            <div className="self-end md:self-center">
              <NarratorSpeaker
                text={`¡Hola ${studentName}! Estás en el Nivel ${currentLvl.level}, ${currentLvl.title}, con ${totalStars} estrellas y ${points} puntos. Elige cualquiera de las 8 misiones o pulsa en el botón dorado de Súper Repaso para repasar todo el tema jugando.`}
                label="Escuchar guía"
                size="md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Big Quick Book Summary Banner (User requested fast visual review with drawings) */}
      {onOpenQuickSummary && (
        <div className="relative pt-3 cursor-pointer group" onClick={() => {
          playClickSound();
          onOpenQuickSummary();
        }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
            <div className="game-ribbon-yellow px-5 py-1 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md">
              <span className="text-sm">⚡</span>
              <span>¡NUEVO! RESUMEN RÁPIDO VISUAL DE TODO EL LIBRO</span>
            </div>
          </div>

          <div className="game-dialog-card p-6 sm:p-7 pt-8 bg-gradient-to-r from-emerald-800 via-teal-800 to-cyan-900 border-4 border-emerald-400 hover:scale-[1.01] transition-transform duration-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-b from-teal-300 to-emerald-500 border-3 border-emerald-600 shadow-[0_4px_0_0_#065f46] flex items-center justify-center text-4xl sm:text-5xl flex-shrink-0 animate-pulse">
                  📖
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-emerald-400 text-emerald-950 font-black text-[11px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      8 Fichas Rápidas
                    </span>
                    <span className="text-emerald-200 text-xs font-bold">100% Dibujos y Audio</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white drop-shadow">
                    Repasa todo el libro en 5 minutos de forma rápida
                  </h3>
                  <p className="text-xs sm:text-sm text-teal-100 font-semibold mt-1 max-w-xl">
                    Todos los conceptos clave que caen en el examen: 3 funciones vitales, los 4 aparatos, sentidos, huesos y músculos, reproducción y los 5 hábitos de oro. ¡Gana +1 ⭐ por cada ficha que domines!
                  </p>
                </div>
              </div>

              <div className="flex-shrink-0">
                <button
                  type="button"
                  className="game-button-ok py-3 px-8 text-sm font-black uppercase tracking-wider flex items-center gap-2 shadow-lg bg-gradient-to-b from-amber-300 to-amber-500 text-amber-950 border-amber-600 shadow-[0_6px_0_0_#b45309]"
                >
                  <span>⚡</span>
                  <span>¡Ver Resumen Rápido!</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Featured Big Súper Repaso Banner (Illustrated, no photos) */}
      {onOpenReview && (
        <div className="relative pt-3 cursor-pointer group" onClick={() => {
          playClickSound();
          onOpenReview();
        }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
            <div className="game-ribbon-yellow px-5 py-1 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-800" />
              <span>⭐ SÚPER REPASO COMPLETO DEL TEMA 1</span>
            </div>
          </div>

          <div className="game-dialog-card p-6 sm:p-7 pt-8 bg-gradient-to-r from-purple-800 via-indigo-800 to-purple-900 border-4 border-amber-400 hover:scale-[1.01] transition-transform duration-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-b from-amber-300 to-amber-500 border-3 border-amber-600 shadow-[0_4px_0_0_#b45309] flex items-center justify-center text-4xl sm:text-5xl flex-shrink-0 animate-bounce">
                  🧠
                </div>
                <div className="text-left">
                  <h3 className="text-xl sm:text-2xl font-black text-white drop-shadow">
                    ¿Quieres repasar todo el tema para el examen?
                  </h3>
                  <p className="text-xs sm:text-sm text-purple-100 font-semibold mt-1 max-w-xl">
                    Esquemas visuales interactivos de los 4 aparatos, juego de clasificar órganos, el caso práctico de Nerea y Adrián y preguntas de examen con estrellas.
                  </p>
                </div>
              </div>

              <div className="flex-shrink-0">
                <button
                  type="button"
                  className="game-button-ok py-3 px-8 text-sm font-black uppercase tracking-wider flex items-center gap-2 shadow-lg"
                >
                  <Sparkles className="w-4 h-4 text-amber-900" />
                  <span>¡Entrar al Repaso!</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Missions styled with Vector Drawings (NO tiny book screenshots) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
        {MISSIONS.map((mission) => {
          const isCompleted = earnedMedalIds.includes(mission.id);

          return (
            <div
              key={mission.id}
              className="relative pt-3 flex flex-col group cursor-pointer"
              onClick={() => {
                playClickSound();
                onSelectMission(mission.id);
              }}
            >
              {/* Top Golden Ribbon: "MISIÓN X" */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
                <div className="game-ribbon-yellow px-4 py-1 text-xs sm:text-sm font-black uppercase tracking-wider">
                  Misión {mission.order}
                </div>
              </div>

              {/* Main Purple Game Container */}
              <div className="game-dialog-card p-4 pt-6 flex-1 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-200">
                {/* Colorful Illustrated Drawing Container (NO screenshots) */}
                <div className="relative h-28 w-full rounded-2xl overflow-hidden border-2 border-purple-300/40 shadow-inner mb-3">
                  {renderMissionDrawing(mission.id)}

                  {/* Floating Orb Badge (left corner) */}
                  <div className="absolute top-2 left-2 w-10 h-10 rounded-full bg-gradient-to-b from-sky-300 to-indigo-600 border-2 border-white text-xl flex items-center justify-center shadow-[0_3px_0_0_#1e1b4b]">
                    <span>{mission.badgeIcon}</span>
                  </div>

                  {isCompleted && (
                    <div className="absolute top-2 right-2 bg-emerald-500 text-white font-black text-xs px-2.5 py-0.5 rounded-full border border-emerald-300 shadow-xs flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>¡Superada!</span>
                    </div>
                  )}
                </div>

                {/* Enhanced White Game Box for Title & Subtitle with dark, high-contrast text */}
                <div className="game-card-info-box p-3.5 sm:p-4 text-left mb-6 flex-1 flex flex-col justify-center min-h-[115px]">
                  {/* Category Chip */}
                  <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-indigo-900 bg-indigo-100/95 px-2.5 py-1 rounded-full mb-1.5 w-fit border border-indigo-200 shadow-2xs">
                    <span>{mission.badgeIcon}</span>
                    <span className="truncate max-w-[190px]">{mission.badgeName}</span>
                  </div>

                  <h3 className="font-black text-slate-900 text-base sm:text-lg leading-snug tracking-tight">
                    {mission.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-700 font-bold mt-1 leading-snug">
                    {mission.subtitle}
                  </p>
                </div>

                {/* Bottom 3D Green "OK" style Action Button */}
                <div className="flex justify-center -mb-7 z-10">
                  <button
                    type="button"
                    className="game-button-ok px-6 py-2 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{isCompleted ? 'REPASAR' : '¡JUGAR!'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

