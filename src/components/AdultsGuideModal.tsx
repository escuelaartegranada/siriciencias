import React from 'react';
import { ShieldCheck, Tablet, Sparkles, BookOpen, RotateCcw, X, Heart, Award, CheckCircle2 } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onResetProgress: () => void;
}

export const AdultsGuideModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onResetProgress,
}) => {
  if (!isOpen) return null;

  const handleReset = () => {
    playClickSound();
    if (window.confirm('¿Seguro que deseas reiniciar todo el progreso de la aplicación? Se borrarán las medallas y estrellas para que tu hija pueda comenzar de nuevo.')) {
      onResetProgress();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="game-dialog-card max-w-3xl w-full max-h-[92vh] flex flex-col relative overflow-hidden shadow-2xl"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-purple-400/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 border-2 border-amber-500 shadow-[0_2px_0_0_#b45309] flex items-center justify-center text-amber-950 text-2xl">
              🛡️
            </div>
            <div>
              <h2 className="text-xl font-black text-white">Guía para Familias y Docentes</h2>
              <p className="text-xs text-amber-300 font-bold">Ciencias Naturales · 2º de Primaria (7 años)</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/20"
            aria-label="Cerrar guía"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 text-purple-100 text-sm leading-relaxed">
          {/* Pedagogical summary */}
          <div className="bg-purple-950/70 p-4 rounded-2xl border-2 border-purple-400/40">
            <h3 className="font-black text-white text-base mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>Objetivo Educativo de la App</span>
            </h3>
            <p className="text-xs sm:text-sm text-purple-200 leading-relaxed mb-3">
              Esta app interactiva está diseñada a medida para una <strong>niña de 7 años (2º de Primaria)</strong> para consolidar y disfrutar del <strong>Tema 1 de Ciencias de la Naturaleza (Editorial SM): "Mi cuerpo funciona"</strong>.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
              <div className="p-3 bg-purple-900/60 rounded-xl border border-purple-400/30 text-xs text-white">
                <span className="font-black text-amber-300 block mb-1">1. Refuerzo Positivo</span>
                Nunca hay estados de error o frustración. Las opciones no penalizan y motivan a seguir investigando.
              </div>
              <div className="p-3 bg-purple-900/60 rounded-xl border border-purple-400/30 text-xs text-white">
                <span className="font-black text-amber-300 block mb-1">2. Voz Humana Natural</span>
                Integración de voz infantil dulce generada por IA (Gemini) para que no suene como un robot.
              </div>
              <div className="p-3 bg-purple-900/60 rounded-xl border border-purple-400/30 text-xs text-white">
                <span className="font-black text-amber-300 block mb-1">3. Estrellas y Puntos</span>
                Sistema de motivación con niveles y estrellas para reforzar cada logro con alegría.
              </div>
            </div>
          </div>

          {/* Tips for parents */}
          <div className="bg-purple-950/70 p-4 rounded-2xl border-2 border-purple-400/40">
            <h3 className="font-black text-white text-base mb-2 flex items-center gap-2">
              <Tablet className="w-5 h-5 text-sky-300" />
              <span>Recomendaciones de Uso en Tablet / Ordenador</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-purple-200">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-lime-400 flex-shrink-0 mt-0.5" />
                <span><strong>Pantalla completa / Icono en inicio:</strong> En iPad (Safari: botón Compartir &rarr; "Añadir a pantalla de inicio") o en Android (Chrome: tres puntos &rarr; "Instalar app / Añadir a pantalla principal") se ejecuta a pantalla completa sin barras.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-lime-400 flex-shrink-0 mt-0.5" />
                <span><strong>Botones grandes:</strong> Diseñados con más de 48px de área táctil para manos de 7 años.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-lime-400 flex-shrink-0 mt-0.5" />
                <span><strong>Audio adaptativo:</strong> Toda explicación o pregunta incluye el botón amarillo <em>"Escuchar"</em> con música que se atenúa suavemente durante la lectura.</span>
              </li>
            </ul>
          </div>

          {/* Reset progress action */}
          <div className="pt-2 border-t border-purple-400/30 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-purple-300">¿Quieres que otra persona o tu hija repita las actividades desde cero?</p>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 font-bold text-xs flex items-center gap-2 border border-rose-500/40 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reiniciar Progreso</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-purple-400/30 bg-purple-950/40 flex justify-end">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="game-button-ok w-full sm:w-auto px-8 py-3 font-black text-sm text-slate-950 uppercase tracking-wider rounded-2xl min-h-[48px]"
          >
            Entendido, volver al juego
          </button>
        </div>
      </div>
    </div>
  );
};
