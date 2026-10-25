import React, { useState } from 'react';
import { BookOpen, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { playClickSound } from '../utils/audio';
import { NarratorSpeaker } from './NarratorSpeaker';
import {
  StomachIllustration,
  LungsIllustration,
  HeartIllustration,
  KidneysIllustration,
  BrainIllustration,
  SkeletonIllustration,
  MusclesIllustration,
  RabbitIllustration,
  PlantIllustration,
  ScarecrowIllustration,
  GirlIllustration,
  RobotIllustration,
} from './Illustrations';

interface PageItem {
  pageNum: number;
  imagePath: string;
  title: string;
}

interface Props {
  pages: PageItem[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export const BookViewerModal: React.FC<Props> = ({
  pages,
  isOpen,
  onClose,
  initialIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  if (!isOpen || pages.length === 0) return null;

  const currentPage = pages[currentIndex] || pages[0];

  const handleNext = () => {
    playClickSound();
    if (currentIndex < pages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    playClickSound();
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Helper to render customized illustrated page content per textbook page number
  const renderIllustratedPageContent = (pageNum: number, title: string) => {
    switch (pageNum) {
      case 9:
      case 10:
        return (
          <div className="space-y-4 max-w-2xl mx-auto text-slate-900">
            <div className="bg-amber-100 p-4 rounded-2xl border-2 border-amber-300 flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase text-amber-900">Ficha 1 · Ciencias Naturales</span>
                <h3 className="text-lg font-black text-amber-950">¿Vivos o espantapájaros?</h3>
              </div>
              <NarratorSpeaker
                text="Los seres vivos nos diferenciamos de los objetos inertes porque realizamos tres funciones vitales: nutrición, relación y reproducción."
                size="sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-4 rounded-2xl border-2 border-emerald-300 text-center space-y-2 shadow-sm">
                <RabbitIllustration className="w-16 h-16 mx-auto" />
                <h4 className="font-black text-emerald-900 text-sm">Ser Vivo (Conejo)</h4>
                <p className="text-xs text-slate-600 font-semibold">Nace, se alimenta, crece y tiene crías.</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border-2 border-slate-300 text-center space-y-2 shadow-sm">
                <ScarecrowIllustration className="w-16 h-16 mx-auto" />
                <h4 className="font-black text-slate-800 text-sm">Ser Inerte (Espantapájaros)</h4>
                <p className="text-xs text-slate-600 font-semibold">No tiene vida, no come ni siente.</p>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200 space-y-1.5 text-xs text-purple-950 font-bold">
              <div>⚡ <strong>Nutrición:</strong> Conseguir energía comiendo y respirando.</div>
              <div>👁️ <strong>Relación:</strong> Sentir el entorno y moverse.</div>
              <div>👶 <strong>Reproducción:</strong> Tener descendientes semejantes.</div>
            </div>
          </div>
        );

      case 11:
      case 12:
        return (
          <div className="space-y-4 max-w-2xl mx-auto text-slate-900">
            <div className="bg-amber-100 p-4 rounded-2xl border-2 border-amber-300 flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase text-amber-900">Ficha 2 · Nutrición</span>
                <h3 className="text-lg font-black text-amber-950">¿Cómo consigo la energía para funcionar?</h3>
              </div>
              <NarratorSpeaker
                text="La función de nutrición necesita de cuatro aparatos: digestivo para transformar alimentos, respiratorio para tomar oxígeno, circulatorio para repartir la sangre y excretor para limpiar los desechos."
                size="sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-3.5 rounded-2xl border-2 border-amber-300 flex items-center gap-3">
                <StomachIllustration className="w-12 h-12 flex-shrink-0" />
                <div>
                  <h4 className="font-black text-xs text-amber-950">Digestivo</h4>
                  <p className="text-[11px] text-slate-600 font-bold">Boca, estómago, intestinos</p>
                </div>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border-2 border-sky-300 flex items-center gap-3">
                <LungsIllustration className="w-12 h-12 flex-shrink-0" inflated={true} />
                <div>
                  <h4 className="font-black text-xs text-sky-950">Respiratorio</h4>
                  <p className="text-[11px] text-slate-600 font-bold">Tráquea y pulmones</p>
                </div>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border-2 border-rose-300 flex items-center gap-3">
                <HeartIllustration className="w-12 h-12 flex-shrink-0" />
                <div>
                  <h4 className="font-black text-xs text-rose-950">Circulatorio</h4>
                  <p className="text-[11px] text-slate-600 font-bold">Corazón y vasos sanguíneos</p>
                </div>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border-2 border-yellow-300 flex items-center gap-3">
                <KidneysIllustration className="w-12 h-12 flex-shrink-0" />
                <div>
                  <h4 className="font-black text-xs text-yellow-950">Excretor</h4>
                  <p className="text-[11px] text-slate-600 font-bold">Riñones y vejiga urinaria</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 13:
      case 14:
        return (
          <div className="space-y-4 max-w-2xl mx-auto text-slate-900">
            <div className="bg-sky-100 p-4 rounded-2xl border-2 border-sky-300 flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase text-sky-900">Ficha 3 · Taller de Tina</span>
                <h3 className="text-lg font-black text-sky-950">¿Podemos vivir con un solo pulmón?</h3>
              </div>
              <NarratorSpeaker
                text="En el taller de ciencias construimos una maqueta con pajitas y bolsas. Como la tráquea se divide en dos bronquios, el aire puede entrar a un pulmón aunque el otro falte."
                size="sm"
              />
            </div>
            <div className="bg-white p-5 rounded-2xl border-2 border-sky-200 text-center space-y-3">
              <LungsIllustration className="w-20 h-20 mx-auto" inflated={true} />
              <h4 className="font-black text-sky-900 text-base">Conclusión del Experimento</h4>
              <p className="text-xs text-slate-700 font-semibold leading-relaxed max-w-md mx-auto">
                Las personas tenemos dos pulmones para respirar mejor. Si una persona pierde un pulmón por enfermedad, puede seguir viviendo con el otro porque funcionan con ramas independientes.
              </p>
            </div>
          </div>
        );

      case 15:
      case 16:
        return (
          <div className="space-y-4 max-w-2xl mx-auto text-slate-900">
            <div className="bg-indigo-100 p-4 rounded-2xl border-2 border-indigo-300 flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase text-indigo-900">Ficha 4 · Relación y Movimiento</span>
                <h3 className="text-lg font-black text-indigo-950">Aparato Locomotor y Sentidos</h3>
              </div>
              <NarratorSpeaker
                text="Para movernos intervienen los sentidos, el cerebro que decide y el aparato locomotor formado por huesos y músculos."
                size="sm"
              />
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-white p-3 rounded-2xl border-2 border-indigo-200">
                <BrainIllustration className="w-12 h-12 mx-auto" />
                <h5 className="font-black text-xs text-indigo-950 mt-1">Cerebro</h5>
                <p className="text-[11px] text-slate-600 font-bold">Procesa y ordena</p>
              </div>
              <div className="bg-white p-3 rounded-2xl border-2 border-indigo-200">
                <SkeletonIllustration className="w-12 h-12 mx-auto" />
                <h5 className="font-black text-xs text-indigo-950 mt-1">Huesos</h5>
                <p className="text-[11px] text-slate-600 font-bold">Sostienen y protegen</p>
              </div>
              <div className="bg-white p-3 rounded-2xl border-2 border-indigo-200">
                <MusclesIllustration className="w-12 h-12 mx-auto" />
                <h5 className="font-black text-xs text-indigo-950 mt-1">Músculos</h5>
                <p className="text-[11px] text-slate-600 font-bold">Flexionan y tiran</p>
              </div>
            </div>
          </div>
        );

      case 17:
      case 18:
        return (
          <div className="space-y-4 max-w-2xl mx-auto text-slate-900">
            <div className="bg-rose-100 p-4 rounded-2xl border-2 border-rose-300 flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase text-rose-900">Ficha 5 · Reproducción</span>
                <h3 className="text-lg font-black text-rose-950">¿Una persona con dos corazones?</h3>
              </div>
              <NarratorSpeaker
                text="Durante el embarazo, el bebé se forma en el útero materno durante nueve meses. Además, aprendemos a cuidar nuestra intimidad personal."
                size="sm"
              />
            </div>
            <div className="bg-white p-5 rounded-2xl border-2 border-rose-200 flex items-center justify-around">
              <HeartIllustration className="w-16 h-16" />
              <div className="text-center">
                <span className="text-4xl block">🤰</span>
                <span className="text-xs font-black text-rose-900 mt-1 block">9 Meses de Embarazo</span>
              </div>
              <span className="text-4xl">👶</span>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-4 max-w-2xl mx-auto text-slate-900">
            <div className="bg-amber-100 p-4 rounded-2xl border-2 border-amber-300 flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase text-amber-900">Tema 1 Ciencias SM · Página {pageNum}</span>
                <h3 className="text-lg font-black text-amber-950">{title}</h3>
              </div>
              <NarratorSpeaker
                text={`Página ${pageNum}: ${title}. Repaso ilustrado de ciencias.`}
                size="sm"
              />
            </div>
            <div className="bg-white p-5 rounded-2xl border-2 border-slate-300 space-y-3">
              <div className="flex items-center justify-center gap-3 text-3xl">
                <span>🍎</span>
                <span>🫁</span>
                <span>❤️</span>
                <span>🧠</span>
                <span>🦴</span>
              </div>
              <p className="text-xs text-slate-700 font-semibold text-center leading-relaxed">
                Este cuaderno digital presenta todos los contenidos del Tema 1 con dibujos grandes y claros para que puedas repasar sin esfuerzo.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-2 sm:p-4 animate-in fade-in duration-200">
      <div
        className="game-dialog-card max-w-3xl w-full max-h-[90vh] flex flex-col relative overflow-hidden shadow-2xl"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-4 border-b border-purple-400/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 border-2 border-amber-500 shadow-[0_2px_0_0_#b45309] flex items-center justify-center text-amber-950">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-white text-sm sm:text-base leading-tight">
                Cuaderno Ilustrado: Página {currentPage.pageNum}
              </h3>
              <p className="text-xs text-amber-300 font-bold">{currentPage.title}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/20 cursor-pointer"
            aria-label="Cerrar cuaderno"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body with Vector Drawings (NO tiny screenshot) */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 bg-slate-950/40 flex items-center justify-center">
          <div className="w-full">
            {renderIllustratedPageContent(currentPage.pageNum, currentPage.title)}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="p-3.5 border-t border-purple-400/30 bg-purple-950/60 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-1.5 min-h-[46px] transition-transform cursor-pointer ${
              currentIndex === 0
                ? 'opacity-40 cursor-not-allowed bg-purple-950/40 text-purple-400 border border-purple-800'
                : 'bg-gradient-to-b from-indigo-600 to-indigo-800 text-white border border-indigo-500 shadow-[0_3px_0_0_#1e1b4b] active:scale-95'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Página Anterior</span>
          </button>

          <span className="text-xs sm:text-sm font-black text-amber-300">
            {currentIndex + 1} de {pages.length}
          </span>

          <button
            type="button"
            onClick={handleNext}
            disabled={currentIndex === pages.length - 1}
            className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-1.5 min-h-[46px] transition-transform cursor-pointer ${
              currentIndex === pages.length - 1
                ? 'opacity-40 cursor-not-allowed bg-purple-950/40 text-purple-400 border border-purple-800'
                : 'bg-gradient-to-b from-amber-300 to-amber-500 text-amber-950 border border-amber-600 shadow-[0_3px_0_0_#b45309] active:scale-95'
            }`}
          >
            <span>Siguiente Página</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
