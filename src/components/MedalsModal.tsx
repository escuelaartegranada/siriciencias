import React, { useState } from 'react';
import { Award, Star, X, Check, Printer, Sparkles } from 'lucide-react';
import { ALL_MEDALS } from '../data/missionsData';
import { playClickSound, playBadgeSound } from '../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  earnedMedalIds: string[];
  studentName: string;
  totalStars?: number;
  points?: number;
}

export const MedalsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  earnedMedalIds,
  studentName,
  totalStars = 0,
  points = 0,
}) => {
  const [showDiploma, setShowDiploma] = useState(false);

  if (!isOpen) return null;

  const earnedCount = earnedMedalIds.length;
  const totalCount = ALL_MEDALS.length;
  const isMaster = earnedCount >= totalCount;

  const handlePrint = () => {
    playClickSound();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-sm p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="game-dialog-card max-w-2xl w-full max-h-[92vh] flex flex-col relative overflow-hidden shadow-2xl"
        role="dialog"
        aria-modal="true"
      >
        {/* Header with Yellow Ribbon */}
        <div className="p-4 sm:p-5 border-b border-purple-400/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 border-2 border-amber-500 shadow-[0_3px_0_0_#b45309] flex items-center justify-center text-amber-950 text-2xl">
              🏆
            </div>
            <div>
              <h2 className="text-xl font-black text-white drop-shadow-sm">
                Álbum de Medallas y Trofeos
              </h2>
              <p className="text-xs font-bold text-amber-300">
                ¡Has conseguido {earnedCount} de {totalCount} medallas de Ciencias!
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/20"
            aria-label="Cerrar álbum"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {!showDiploma ? (
            <>
              {/* Star & Points Trophy Bar */}
              <div className="bg-purple-950/70 p-4 rounded-2xl border-2 border-purple-400/40 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-black text-amber-300 uppercase tracking-wider block">
                    Progreso Científico de {studentName}
                  </span>
                  <span className="text-base sm:text-lg font-black text-white">
                    {isMaster
                      ? '🎉 ¡Colección completa de Ciencias!'
                      : '¡Supera misiones para ganarlas todas!'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-gradient-to-b from-amber-300 to-amber-500 px-3 py-1.5 rounded-xl border border-amber-600 text-amber-950 font-black text-xs shadow-[0_2px_0_0_#b45309]">
                    <Star className="w-4 h-4 fill-amber-700 text-amber-800" />
                    <span>{totalStars} Estrellas</span>
                  </div>
                  <div className="flex items-center gap-1 bg-lime-400 px-3 py-1.5 rounded-xl border border-lime-600 text-slate-950 font-black text-xs shadow-[0_2px_0_0_#4d7c0f]">
                    <span>{points} pts</span>
                  </div>
                </div>
              </div>

              {/* Medals Grid with 3D Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {ALL_MEDALS.map((medal) => {
                  const isEarned = earnedMedalIds.includes(medal.id);
                  return (
                    <div
                      key={medal.id}
                      className={`p-3.5 rounded-2xl border-2 flex flex-col items-center text-center transition-all ${
                        isEarned
                          ? 'bg-purple-900/60 border-amber-400/60 shadow-lg scale-100'
                          : 'bg-purple-950/30 border-purple-800/40 opacity-40 grayscale'
                      }`}
                    >
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-amber-300 to-amber-500 border-2 border-amber-600 shadow-[0_3px_0_0_#b45309] flex items-center justify-center text-3xl mb-2 relative">
                        <span>{medal.icon}</span>
                        {isEarned && (
                          <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-lime-400 rounded-full text-slate-950 font-black flex items-center justify-center border border-lime-600 shadow-sm text-xs">
                            ✓
                          </div>
                        )}
                      </div>
                      <span className="text-xs font-black text-white leading-snug mb-0.5">
                        {medal.title}
                      </span>
                      <span className="text-[10px] text-amber-300 font-bold leading-tight">
                        {isEarned ? '¡Conseguida!' : 'Por desbloquear'}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Diploma Banner */}
              <div className="p-4 bg-gradient-to-r from-indigo-900/80 to-purple-900/80 rounded-2xl border-2 border-indigo-400/50 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3 text-center sm:text-left">
                  <Sparkles className="w-8 h-8 text-amber-300 flex-shrink-0 hidden sm:block animate-pulse" />
                  <div>
                    <h4 className="font-black text-white text-sm">
                      Diploma Oficial de Ciencias (SM 2º Primaria)
                    </h4>
                    <p className="text-xs text-purple-200">
                      {isMaster
                        ? '¡Enhorabuena! Has completado todas las misiones y ganado tu diploma.'
                        : `Gana las 8 medallas para desbloquear tu diploma con nombre (${earnedCount}/8).`}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    playBadgeSound();
                    setShowDiploma(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-b from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 text-amber-950 font-black text-xs border border-amber-600 shadow-[0_3px_0_0_#b45309] transition-transform active:scale-95 whitespace-nowrap min-h-[44px]"
                >
                  Ver Diploma 📜
                </button>
              </div>
            </>
          ) : (
            /* Diploma View */
            <div className="space-y-4">
              <div className="p-6 bg-amber-50 rounded-3xl border-4 border-amber-400 text-center relative shadow-xl text-slate-900">
                <div className="w-16 h-16 mx-auto bg-amber-400 rounded-2xl flex items-center justify-center text-3xl shadow-sm mb-3 border-2 border-amber-500">
                  🏆
                </div>
                <h3 className="text-xs uppercase tracking-widest font-black text-amber-800">
                  Diploma de Honor · Ciencias de la Naturaleza
                </h3>
                <h2 className="text-2xl font-black text-slate-900 mt-1 mb-2">
                  ¡Gran Experta en el Cuerpo Humano!
                </h2>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Se certifica con alegría que:
                </p>
                <div className="my-3 py-2 px-6 bg-white inline-block rounded-2xl border-2 border-dashed border-amber-500 shadow-sm">
                  <span className="text-2xl font-black text-purple-700 tracking-wide">
                    {studentName || 'Pequeña Científica'}
                  </span>
                </div>
                <p className="text-xs text-slate-700 max-w-lg mx-auto leading-relaxed font-medium">
                  Ha completado con éxito y curiosidad todas las misiones del <strong>Tema 1: Mi cuerpo funciona</strong> (2º de Primaria): funciones vitales, nutrición y respiración, relación y sentidos, reproducción, hábitos saludables e igualdad deportiva.
                </p>
                <div className="mt-4 pt-4 border-t border-amber-300 flex justify-around text-xs font-bold text-slate-600">
                  <div>📅 2º de Primaria</div>
                  <div>⭐ {totalStars} Estrellas</div>
                  <div>🏫 SM Ciencias Naturales</div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setShowDiploma(false)}
                  className="px-4 py-2.5 bg-purple-900/80 hover:bg-purple-800 text-white font-bold rounded-xl text-xs min-h-[44px] border border-purple-400/40"
                >
                  &larr; Volver a las medallas
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-4 py-2.5 bg-gradient-to-b from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 text-amber-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-[0_2px_0_0_#b45309] border border-amber-600 min-h-[44px]"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimir Diploma</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer OK */}
        <div className="p-4 border-t border-purple-400/30 bg-purple-950/40 flex justify-end">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="game-button-ok w-full py-3 px-4 font-black text-sm text-slate-950 uppercase tracking-wider rounded-2xl min-h-[48px]"
          >
            ¡Genial! Cerrar Álbum
          </button>
        </div>
      </div>
    </div>
  );
};
