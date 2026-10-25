import React, { useState } from 'react';
import { Sparkles, Check, HelpCircle, ArrowRight, RotateCcw, Award } from 'lucide-react';
import { NarratorSpeaker } from '../NarratorSpeaker';
import { playClickSound, playSuccessSound, playTryAgainSound, playBadgeSound } from '../../utils/audio';
import {
  RabbitIllustration,
  ScarecrowIllustration,
  PlantIllustration,
  RockIllustration,
  GirlIllustration,
  RobotIllustration,
  CactusIllustration,
  HenChicksIllustration,
  AppleEatingIllustration
} from '../Illustrations';

interface Props {
  onComplete: () => void;
  onOpenBook: () => void;
}

export const Mission1VitalFunctions: React.FC<Props> = ({ onComplete, onOpenBook }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Exercise 1: Match 3 functions to definitions
  const [matchAnswers, setMatchAnswers] = useState<{ [key: string]: string }>({});
  const [matchChecked, setMatchChecked] = useState(false);

  // Exercise 2: Classify Living vs Inanimate
  const [classified, setClassified] = useState<{ [key: string]: 'vivo' | 'inerte' }>({});
  const [classifyChecked, setClassifyChecked] = useState(false);

  // Exercise 3: Situations from page 10
  const [situations, setSituations] = useState<{ [key: string]: string }>({});
  const [situationsChecked, setSituationsChecked] = useState(false);

  // Feedback messages
  const [feedback, setFeedback] = useState<string | null>(null);

  // --- Step 1: Matching ---
  const handleSelectMatch = (questionId: string, answer: string) => {
    playClickSound();
    setMatchAnswers(prev => ({ ...prev, [questionId]: answer }));
    setFeedback(null);
  };

  const checkMatch = () => {
    const isCorrect = 
      matchAnswers['alimentar'] === 'nutrición' &&
      matchAnswers['relacionar'] === 'relación' &&
      matchAnswers['hijos'] === 'reproducción';

    if (isCorrect) {
      playSuccessSound();
      setFeedback('¡Extraordinario! Has identificado perfectamente las 3 funciones vitales que compartimos todos los seres vivos.');
      setMatchChecked(true);
    } else {
      playTryAgainSound();
      setFeedback('¡Casi lo tienes! Recuerda: alimentarse es nutrición, sentir el mundo es relación y tener hijos es reproducción. ¡Inténtalo otra vez!');
    }
  };

  // --- Step 2: Living vs Inanimate ---
  const items = [
    { id: 'conejo', name: 'Conejo saltarín', illustration: <RabbitIllustration className="w-16 h-16" />, type: 'vivo' },
    { id: 'espantapajaros', name: 'Espantapájaros de paja', illustration: <ScarecrowIllustration className="w-16 h-16" />, type: 'inerte' },
    { id: 'tomate', name: 'Planta de tomate', illustration: <PlantIllustration className="w-16 h-16" />, type: 'vivo' },
    { id: 'piedra', name: 'Roca del camino', illustration: <RockIllustration className="w-16 h-16" />, type: 'inerte' },
    { id: 'nina', name: 'Niña jugando', illustration: <GirlIllustration className="w-16 h-16" />, type: 'vivo' },
    { id: 'robot', name: 'Robot de juguete', illustration: <RobotIllustration className="w-16 h-16" />, type: 'inerte' }
  ];

  const handleClassify = (id: string, group: 'vivo' | 'inerte') => {
    playClickSound();
    setClassified(prev => ({ ...prev, [id]: group }));
    setFeedback(null);
  };

  const checkClassify = () => {
    const allDone = items.every(item => classified[item.id] !== undefined);
    if (!allDone) {
      setFeedback('Por favor, clasifica todos los elementos antes de comprobar.');
      playTryAgainSound();
      return;
    }

    const allCorrect = items.every(item => classified[item.id] === item.type);
    if (allCorrect) {
      playSuccessSound();
      setFeedback('¡Genial! Los seres vivos nacen, crecen y necesitan energía; los seres inertes no tienen vida.');
      setClassifyChecked(true);
    } else {
      playTryAgainSound();
      setFeedback('Revisa bien: las plantas y animales sí están vivos porque crecen y se nutren; las piedras y muñecos son inertes.');
    }
  };

  // --- Step 3: Page 10 Situations ---
  const situationsList = [
    {
      id: 'cactus',
      title: '1. Tina se pincha con un cactus',
      desc: 'Siente el pinchazo en su dedo y aparta la mano rápidamente.',
      correct: 'relación',
      hint: 'Usa el tacto para sentir y reacciona moviendo la mano.',
      illustration: <CactusIllustration className="w-14 h-14" />
    },
    {
      id: 'gallina',
      title: '2. Gallina con sus pollitos',
      desc: 'Cuida de sus crías en el nido después de nacer del huevo.',
      correct: 'reproducción',
      hint: 'Tiene descendientes de su misma especie.',
      illustration: <HenChicksIllustration className="w-14 h-14" />
    },
    {
      id: 'manzana',
      title: '3. Enzo merendando fruta',
      desc: 'Come una rica manzana para conseguir energía para jugar.',
      correct: 'nutrición',
      hint: 'Obtiene nutrientes a partir del alimento.',
      illustration: <AppleEatingIllustration className="w-14 h-14" />
    }
  ];

  const handleSelectSituation = (id: string, func: string) => {
    playClickSound();
    setSituations(prev => ({ ...prev, [id]: func }));
    setFeedback(null);
  };

  const checkSituations = () => {
    const allDone = situationsList.every(s => situations[s.id] !== undefined);
    if (!allDone) {
      setFeedback('Elige una función para cada una de las 3 imágenes.');
      playTryAgainSound();
      return;
    }

    const allCorrect = situationsList.every(s => situations[s.id] === s.correct);
    if (allCorrect) {
      playSuccessSound();
      setFeedback('¡Increíble! Has resuelto exactamente las situaciones del libro escolar.');
      setSituationsChecked(true);
    } else {
      playTryAgainSound();
      setFeedback('Observa bien las pistas: comer es nutrición, sentir y reaccionar es relación, y tener crías es reproducción.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pt-2">
      {/* Top Ribbon & Game Dialog Banner */}
      <div className="relative pt-3">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
          <div className="game-ribbon-yellow px-6 py-1.5 text-xs sm:text-sm font-black uppercase tracking-wider shadow-md flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-800" />
            <span>Misión 1 · Ficha 1 del Libro (Págs. 9 y 10)</span>
          </div>
        </div>

        <div className="game-dialog-card p-5 sm:p-7 pt-7 text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                ¿Podríamos vivir como un espantapájaros?
              </h2>
              <p className="text-purple-100 text-xs sm:text-sm font-semibold mt-1">
                Descubre las 3 funciones vitales: nutrición, relación y reproducción.
              </p>
            </div>

            <NarratorSpeaker
              text="Misión 1: ¿Podríamos vivir como un espantapájaros? Los espantapájaros tienen forma humana, pero son seres inertes. Todos los seres vivos nacemos, crecemos, nos alimentamos, sentimos y tenemos crías. Realizamos 3 funciones vitales: nutrición, relación y reproducción."
              label="Escuchar explicación"
              size="md"
            />
          </div>
        </div>
      </div>

      {/* Tabs / Step Navigation */}
      <div className="flex items-center gap-2 bg-[#121933]/80 p-2 rounded-2xl border border-indigo-700/60 shadow-md">
        {[
          { num: 1, label: '1. Las 3 Funciones' },
          { num: 2, label: '2. ¿Vivo o Inerte?' },
          { num: 3, label: '3. Casos Reales' },
          { num: 4, label: '4. ¡Medalla!' }
        ].map((s) => (
          <button
            key={s.num}
            type="button"
            onClick={() => {
              playClickSound();
              setStep(s.num as 1 | 2 | 3 | 4);
              setFeedback(null);
            }}
            className={`flex-1 py-2.5 px-3 rounded-full font-black text-xs sm:text-sm min-h-[44px] transition-all ${
              step === s.num
                ? 'game-ribbon-yellow text-amber-950 scale-102'
                : 'text-indigo-200 hover:text-white hover:bg-white/10'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* STEP 1: Las 3 funciones vitales */}
      {step === 1 && (
        <div className="game-dialog-card p-5 sm:p-7 space-y-6 text-slate-800">
          <div className="flex items-center justify-between text-white">
            <div>
              <h3 className="text-xl font-black drop-shadow-xs">Relaciona cada necesidad con su función vital:</h3>
              <p className="text-xs sm:text-sm text-purple-200 font-semibold">Toca la cápsula correcta para cada frase del libro.</p>
            </div>
            <NarratorSpeaker
              text="Relaciona cada necesidad con su función vital. Primera: conseguimos energía de los alimentos y el oxígeno. Segunda: nos mantiene informados de lo que ocurre alrededor. Tercera: tenemos descendientes parecidos a nosotros."
              size="sm"
            />
          </div>

          {/* Illustrated banner (NO screenshot) */}
          <div className="bg-gradient-to-r from-purple-900/60 to-indigo-900/60 rounded-2xl p-4 border-2 border-purple-300/40 flex flex-col sm:flex-row items-center gap-4 text-purple-100 backdrop-blur-sm">
            <div className="flex items-center gap-2 p-2 bg-white/10 rounded-2xl border border-white/20">
              <ScarecrowIllustration className="w-14 h-14 drop-shadow" />
              <span className="text-xl font-black text-amber-300">vs</span>
              <GirlIllustration className="w-14 h-14 drop-shadow" />
            </div>
            <div className="text-xs sm:text-sm">
              <strong className="text-amber-300 block text-base mb-1 drop-shadow-xs">¡El misterio del espantapájaros!</strong>
              Aunque tiene ropa y sombrero como nosotros, no nace, no crece ni se alimenta: es un ser inerte. ¡Nosotros los seres vivos hacemos las 3 funciones vitales!
            </div>
          </div>

          <div className="space-y-4">
            {/* Question 1 */}
            <div className="p-4 bg-white/95 rounded-3xl border-2 border-indigo-200 shadow-[0_4px_0_0_#9cb0e2]">
              <span className="font-black text-slate-800 text-sm sm:text-base block mb-2.5">
                🍎 Conseguir energía y nutrientes de los alimentos y del oxígeno:
              </span>
              <div className="grid grid-cols-3 gap-2.5">
                {['nutrición', 'relación', 'reproducción'].map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => handleSelectMatch('alimentar', f)}
                    className={`py-3 px-3 capitalize text-xs sm:text-sm font-black min-h-[48px] ${
                      matchAnswers['alimentar'] === f
                        ? 'game-pill-active scale-102'
                        : 'game-pill-row text-slate-700'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2 */}
            <div className="p-4 bg-white/95 rounded-3xl border-2 border-indigo-200 shadow-[0_4px_0_0_#9cb0e2]">
              <span className="font-black text-slate-800 text-sm sm:text-base block mb-2.5">
                👀 Mantenernos informados de lo que ocurre y reaccionar:
              </span>
              <div className="grid grid-cols-3 gap-2.5">
                {['nutrición', 'relación', 'reproducción'].map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => handleSelectMatch('relacionar', f)}
                    className={`py-3 px-3 capitalize text-xs sm:text-sm font-black min-h-[48px] ${
                      matchAnswers['relacionar'] === f
                        ? 'game-pill-active scale-102'
                        : 'game-pill-row text-slate-700'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 3 */}
            <div className="p-4 bg-white/95 rounded-3xl border-2 border-indigo-200 shadow-[0_4px_0_0_#9cb0e2]">
              <span className="font-black text-slate-800 text-sm sm:text-base block mb-2.5">
                👶 Tener descendientes con características parecidas a nosotros:
              </span>
              <div className="grid grid-cols-3 gap-2.5">
                {['nutrición', 'relación', 'reproducción'].map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => handleSelectMatch('hijos', f)}
                    className={`py-3 px-3 capitalize text-xs sm:text-sm font-black min-h-[48px] ${
                      matchAnswers['hijos'] === f
                        ? 'game-pill-active scale-102'
                        : 'game-pill-row text-slate-700'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Feedback & Actions */}
          {feedback && (
            <div className={`p-4 rounded-2xl font-black text-sm border-2 ${matchChecked ? 'bg-emerald-500/90 text-white border-emerald-300 shadow-md' : 'bg-amber-400 text-amber-950 border-amber-500 shadow-md'}`}>
              {feedback}
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={checkMatch}
              className="game-button-ok py-3 px-8 text-sm font-black uppercase tracking-wider"
            >
              Comprobar respuestas
            </button>

            {matchChecked && (
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setStep(2);
                  setFeedback(null);
                }}
                className="game-button-ok py-3 px-8 text-sm font-black uppercase tracking-wider flex items-center gap-2 bg-gradient-to-b from-amber-300 to-amber-500 border-amber-600 shadow-[0_6px_0_0_#b45309] text-amber-950"
              >
                <span>Siguiente juego</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* STEP 2: Clasificar seres vivos vs seres inertes */}
      {step === 2 && (
        <div className="game-dialog-card p-5 sm:p-7 space-y-6 text-slate-800">
          <div className="flex items-center justify-between text-white">
            <div>
              <h3 className="text-xl font-black drop-shadow-xs">¿Ser vivo o ser inerte?</h3>
              <p className="text-xs sm:text-sm text-purple-200 font-semibold">Toca cada cápsula para decidir si tiene vida o no.</p>
            </div>
            <NarratorSpeaker
              text="Clasifica cada uno de estos elementos en ser vivo o ser inerte. Recuerda que los seres vivos nacen, crecen, se alimentan y mueren."
              size="sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {items.map((it) => {
              const currentChoice = classified[it.id];
              return (
                <div key={it.id} className="p-4 bg-white/95 rounded-3xl border-2 border-indigo-200 shadow-[0_4px_0_0_#9cb0e2] flex flex-col items-center text-center">
                  <div className="mb-2 p-1.5 bg-slate-50 rounded-2xl shadow-inner border border-slate-200">
                    {it.illustration}
                  </div>
                  <span className="font-black text-slate-800 text-sm mb-3">{it.name}</span>

                  <div className="grid grid-cols-2 gap-2 w-full">
                    <button
                      type="button"
                      onClick={() => handleClassify(it.id, 'vivo')}
                      className={`py-2 px-2 text-xs font-black min-h-[44px] transition-all ${
                        currentChoice === 'vivo'
                          ? 'game-pill-active scale-102'
                          : 'game-pill-row text-slate-700'
                      }`}
                    >
                      🌿 Ser Vivo
                    </button>
                    <button
                      type="button"
                      onClick={() => handleClassify(it.id, 'inerte')}
                      className={`py-2 px-2 text-xs font-black min-h-[44px] transition-all ${
                        currentChoice === 'inerte'
                          ? 'game-ribbon-yellow text-amber-950 scale-102'
                          : 'game-pill-row text-slate-700'
                      }`}
                    >
                      🪨 Inerte
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {feedback && (
            <div className={`p-4 rounded-2xl font-black text-sm border-2 ${classifyChecked ? 'bg-emerald-500/90 text-white border-emerald-300 shadow-md' : 'bg-amber-400 text-amber-950 border-amber-500 shadow-md'}`}>
              {feedback}
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={checkClassify}
              className="game-button-ok py-3 px-8 text-sm font-black uppercase tracking-wider"
            >
              Comprobar clasificación
            </button>

            {classifyChecked && (
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setStep(3);
                  setFeedback(null);
                }}
                className="game-button-ok py-3 px-8 text-sm font-black uppercase tracking-wider flex items-center gap-2 bg-gradient-to-b from-amber-300 to-amber-500 border-amber-600 shadow-[0_6px_0_0_#b45309] text-amber-950"
              >
                <span>Siguiente juego</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* STEP 3: Situaciones del libro (Página 10) */}
      {step === 3 && (
        <div className="game-dialog-card p-5 sm:p-7 space-y-6 text-slate-800">
          <div className="flex items-center justify-between text-white">
            <div>
              <h3 className="text-xl font-black drop-shadow-xs">Demuestra lo que sabes (Pág. 10 del libro)</h3>
              <p className="text-xs sm:text-sm text-purple-200 font-semibold">¿Qué función vital representa cada imagen real?</p>
            </div>
            <NarratorSpeaker
              text="Demuestra lo que sabes. ¿Qué función vital representa cada imagen? Primera: Tina se pincha con un cactus y aparta la mano con dolor. Segunda: Una gallina cuida a sus pollitos en el nido. Tercera: Enzo merienda una rica manzana."
              size="sm"
            />
          </div>

          {/* Illustrated header banner (NO screenshot) */}
          <div className="bg-purple-950/60 rounded-2xl p-4 border-2 border-purple-400/30 flex flex-col sm:flex-row items-center gap-4 text-purple-100">
            <div className="flex items-center gap-3 p-2.5 bg-white/10 rounded-2xl border border-white/20">
              <span className="text-3xl">🌵</span>
              <span className="text-3xl">🐔</span>
              <span className="text-3xl">🍎</span>
            </div>
            <div className="text-xs sm:text-sm">
              <strong className="text-amber-300 block text-sm mb-1 drop-shadow-xs">¡Descubre la función vital en cada escena!</strong>
              Observa a Tina y el cactus, a la gallina con sus pollitos y a Enzo merendando. ¿A qué función vital corresponde cada una?
            </div>
          </div>

          <div className="space-y-4">
            {situationsList.map((sit) => {
              const choice = situations[sit.id];
              return (
                <div key={sit.id} className="p-4 bg-white/95 rounded-3xl border-2 border-indigo-200 shadow-[0_4px_0_0_#9cb0e2] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-1 bg-slate-50 rounded-2xl shadow-inner border border-slate-200">
                      {sit.illustration}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-sm sm:text-base">{sit.title}</h4>
                      <p className="text-xs text-slate-600 font-medium">{sit.desc}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 w-full sm:w-auto">
                    {['nutrición', 'relación', 'reproducción'].map((fn) => (
                      <button
                        key={fn}
                        type="button"
                        onClick={() => handleSelectSituation(sit.id, fn)}
                        className={`py-2 px-3 capitalize text-xs sm:text-sm font-black min-h-[44px] transition-all ${
                          choice === fn
                            ? 'game-pill-active scale-102'
                            : 'game-pill-row text-slate-700'
                        }`}
                      >
                        {fn}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {feedback && (
            <div className={`p-4 rounded-2xl font-black text-sm border-2 ${situationsChecked ? 'bg-emerald-500/90 text-white border-emerald-300 shadow-md' : 'bg-amber-400 text-amber-950 border-amber-500 shadow-md'}`}>
              {feedback}
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={checkSituations}
              className="game-button-ok py-3 px-8 text-sm font-black uppercase tracking-wider"
            >
              Comprobar casos
            </button>

            {situationsChecked && (
              <button
                type="button"
                onClick={() => {
                  playBadgeSound();
                  setStep(4);
                  onComplete();
                }}
                className="game-button-ok py-3 px-8 text-sm font-black uppercase tracking-wider flex items-center gap-2 bg-gradient-to-b from-amber-300 to-amber-500 border-amber-600 shadow-[0_6px_0_0_#b45309] text-amber-950 animate-bounce"
              >
                <span>¡Reclamar mi Medalla!</span>
                <Award className="w-5 h-5 text-amber-950" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* STEP 4: Medalla conseguida */}
      {step === 4 && (
        <div className="game-dialog-card p-6 sm:p-8 text-center text-white space-y-4">
          <div className="w-24 h-24 mx-auto bg-gradient-to-b from-emerald-300 to-emerald-600 border-4 border-white text-white rounded-full shadow-[0_6px_0_0_#065f46] flex items-center justify-center text-5xl animate-bounce">
            🌱
          </div>
          <span className="game-ribbon-yellow inline-block px-4 py-1 text-xs uppercase tracking-widest">
            ¡Misión 1 Completada!
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white drop-shadow-md">
            ¡Has ganado la Medalla de Exploradora de la Vida!
          </h3>
          <p className="text-sm text-purple-100 font-semibold max-w-md mx-auto">
            Ya sabes distinguir a los seres vivos por sus 3 funciones vitales: nutrición, relación y reproducción.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={onOpenBook}
              className="game-pill-row py-3 px-6 text-slate-800 font-black text-xs uppercase tracking-wider"
            >
              📖 Ver Ficha 1 en el Libro
            </button>
            <button
              type="button"
              onClick={() => {
                playClickSound();
                const nextBtn = document.querySelector('[title="Misión 2: Nuestra energía para funcionar"]') as HTMLButtonElement;
                if (nextBtn) nextBtn.click();
              }}
              className="game-button-ok py-3 px-8 text-sm uppercase tracking-wider flex items-center gap-2"
            >
              <span>Ir a la Misión 2</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
