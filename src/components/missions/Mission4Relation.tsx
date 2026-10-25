import React, { useState } from 'react';
import { Sparkles, Check, HelpCircle, ArrowRight, RotateCcw, Award, Activity } from 'lucide-react';
import { NarratorSpeaker } from '../NarratorSpeaker';
import { playClickSound, playSuccessSound, playTryAgainSound, playBadgeSound, speakText } from '../../utils/audio';
import {
  BrainIllustration,
  SkeletonIllustration,
  MusclesIllustration,
  EarIllustration,
  EyeIllustration,
  HandIllustration
} from '../Illustrations';

interface Props {
  onComplete: () => void;
  onOpenBook: () => void;
}

export const Mission4Relation: React.FC<Props> = ({ onComplete, onOpenBook }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Exercise 1: 3 steps of relation (Skater / Tennis)
  const [skaterSteps, setSkaterSteps] = useState<{ [pos: string]: string }>({});
  const [step1Checked, setStep1Checked] = useState(false);

  // Exercise 2: Bones vs Muscles functions
  const [locomotorMatches, setLocomotorMatches] = useState<{ [func: string]: 'huesos' | 'musculos' }>({});
  const [step2Checked, setStep2Checked] = useState(false);

  // Exercise 3: Divertidato: Esternocleidomastoideo & Animal sin huesos
  const [animalAnswer, setAnimalAnswer] = useState<string | null>(null);
  const [saidMuscle, setSaidMuscle] = useState(false);

  // Exercise 4: Hurdle race order (Page 16)
  const [hurdleOrder, setHurdleOrder] = useState<string[]>([]);
  const [step4Checked, setStep4Checked] = useState(false);

  const [feedback, setFeedback] = useState<string | null>(null);

  // --- Step 1: 3 Steps ---
  const handleSelectSkater = (pos: string, val: string) => {
    playClickSound();
    setSkaterSteps(prev => ({ ...prev, [pos]: val }));
    setFeedback(null);
  };

  const checkStep1 = () => {
    // 1st: Oído / sentidos, 2nd: Cerebro, 3rd: Huesos y músculos
    const isCorrect = 
      skaterSteps['1'] === 'sentidos' &&
      skaterSteps['2'] === 'cerebro' &&
      skaterSteps['3'] === 'locomotor';

    if (isCorrect) {
      playSuccessSound();
      setFeedback('¡Bravo! Primero el oído escucha la música, luego el cerebro piensa el baile y finalmente los huesos y músculos se mueven.');
      setStep1Checked(true);
    } else {
      playTryAgainSound();
      setFeedback('Revisa el orden: 1º los sentidos reciben la información, 2º el cerebro procesa y decide, 3º el aparato locomotor ejecuta el movimiento.');
    }
  };

  // --- Step 2: Huesos vs Músculos ---
  const locomotorFunctions = [
    { id: 'proteger', label: 'Proteger órganos delicados (como el cráneo al cerebro o las costillas)', target: 'huesos' },
    { id: 'sostener', label: 'Sostener el cuerpo y mantenernos erguidos', target: 'huesos' },
    { id: 'contraer', label: 'Contraerse para tirar de los huesos', target: 'musculos' },
    { id: 'relajar', label: 'Relajarse para volver a la posición original', target: 'musculos' },
  ];

  const handleMatchLocomotor = (funcId: string, type: 'huesos' | 'musculos') => {
    playClickSound();
    setLocomotorMatches(prev => ({ ...prev, [funcId]: type }));
    setFeedback(null);
  };

  const checkStep2 = () => {
    const allAssigned = locomotorFunctions.every(f => locomotorMatches[f.id] !== undefined);
    if (!allAssigned) {
      setFeedback('Indica si cada función corresponde a los huesos o a los músculos.');
      playTryAgainSound();
      return;
    }

    const allCorrect = locomotorFunctions.every(f => locomotorMatches[f.id] === f.target);
    if (allCorrect) {
      playSuccessSound();
      setFeedback('¡Perfecto! Los huesos sostienen y protegen; los músculos se contraen y relajan para producir movimiento.');
      setStep2Checked(true);
    } else {
      playTryAgainSound();
      setFeedback('Recuerda: los huesos son rígidos (sostienen y protegen), mientras que los músculos son elásticos (se contraen y relajan).');
    }
  };

  // --- Step 4: Hurdle race order (Page 16) ---
  const hurdleCards = [
    { id: 'veo', label: '1. Veo la valla', desc: 'Los ojos (sentido de la vista) perciben el obstáculo en la pista.', emoji: '👀' },
    { id: 'pienso', label: '2. Pienso en el salto', desc: 'El cerebro calcula la distancia y decide la fuerza del salto.', emoji: '🧠' },
    { id: 'salto', label: '3. Salto la valla', desc: 'Las piernas (huesos y músculos) realizan el salto.', emoji: '🏃‍♂️' },
  ];

  const toggleHurdleCard = (id: string) => {
    playClickSound();
    if (hurdleOrder.includes(id)) {
      setHurdleOrder(hurdleOrder.filter(x => x !== id));
    } else {
      if (hurdleOrder.length < 3) {
        setHurdleOrder([...hurdleOrder, id]);
      }
    }
    setFeedback(null);
  };

  const checkStep4 = () => {
    if (hurdleOrder.length < 3) {
      setFeedback('Selecciona las 3 viñetas en el orden en que ocurren.');
      playTryAgainSound();
      return;
    }

    const isCorrect = hurdleOrder[0] === 'veo' && hurdleOrder[1] === 'pienso' && hurdleOrder[2] === 'salto';
    if (isCorrect) {
      playSuccessSound();
      setFeedback('¡Brillante! Primero vemos la valla, luego pensamos en el salto y por último saltamos.');
      setStep4Checked(true);
    } else {
      playTryAgainSound();
      setFeedback('¡Cuidado! No podemos saltar antes de ver la valla. Primero ves, luego piensas y después saltas.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Banner */}
      <div className="game-dialog-card p-6 sm:p-7 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="game-ribbon-yellow mb-3">
              MISIÓN 4 · FICHA 4 (PÁGS. 15 Y 16)
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white drop-shadow">¿Solo utilizamos la mano para mover la raqueta?</h2>
            <p className="text-indigo-100 text-sm sm:text-base font-bold mt-1">
              La función de relación: sentidos, cerebro y aparato locomotor (huesos y músculos).
            </p>
          </div>

          <NarratorSpeaker
            text="Misión 4: ¿Solo utilizamos la mano para mover la raqueta? En el cuerpo de Sofía pasan muchas cosas antes de darle a la pelota: 1. Órganos de los sentidos ven la pelota. 2. El cerebro procesa y decide. 3. El aparato locomotor, con huesos y músculos, realiza el golpe."
            label="Escuchar explicación"
            size="md"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-2 rounded-2xl bg-indigo-950/60 border-2 border-indigo-400/30 backdrop-blur-md">
        {[
          { num: 1, label: '1. Los 3 Pasos' },
          { num: 2, label: '2. Huesos y Músculos' },
          { num: 3, label: '3. ¡Divertidato!' },
          { num: 4, label: '4. Carrera de Vallas' },
          { num: 5, label: '5. ¡Medalla!' }
        ].map((s) => (
          <button
            key={s.num}
            type="button"
            onClick={() => {
              playClickSound();
              setStep(s.num as 1 | 2 | 3 | 4 | 5);
              setFeedback(null);
            }}
            className={`flex-1 py-2.5 px-2 sm:px-3 rounded-xl font-black text-xs sm:text-sm min-h-[44px] transition-all cursor-pointer ${
              step === s.num
                ? 'game-pill-active ring-2 ring-emerald-300'
                : 'text-indigo-200 hover:text-white hover:bg-white/10'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* STEP 1: Los 3 pasos de la relación */}
      {step === 1 && (
        <div className="game-dialog-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="game-ribbon-yellow">
              FUNCIÓN DE RELACIÓN (PÁG. 15)
            </div>
            <NarratorSpeaker
              text="¿En qué consiste la función de relación? Coloca en cada viñeta la parte del cuerpo que actúa: el oído que escucha, el cerebro que piensa o los huesos y músculos que se mueven."
              size="sm"
            />
          </div>

          <p className="text-sm font-bold text-indigo-100 bg-indigo-950/40 p-3 rounded-2xl border border-indigo-400/30">
            La bailarina escucha la música, piensa el movimiento y salta sobre el hielo.
          </p>

          {/* Illustrated 3-step sequence banner (NO screenshot) */}
          <div className="bg-gradient-to-r from-indigo-900/60 to-purple-900/60 rounded-2xl p-4 border-2 border-indigo-300/30 flex flex-col sm:flex-row items-center gap-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 p-2.5 bg-white/10 rounded-2xl border border-white/20">
              <EyeIllustration className="w-10 h-10" />
              <span className="text-xl">➡️</span>
              <BrainIllustration className="w-10 h-10" />
              <span className="text-xl">➡️</span>
              <MusclesIllustration className="w-10 h-10" />
            </div>
            <div className="text-xs sm:text-sm text-indigo-100 font-bold">
              <strong className="text-amber-300 block text-base mb-1 drop-shadow">¿Solo usamos la mano para la raqueta?</strong>
              ¡No! En el cuerpo ocurren 3 cosas a toda velocidad: los ojos ven la pelota, el cerebro calcula la jugada y los músculos y huesos golpean con precisión.
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Paso 1 */}
            <div className="p-4 bg-white/10 rounded-2xl border-2 border-indigo-300/30 flex flex-col items-center text-center backdrop-blur-sm">
              <span className="w-9 h-9 rounded-full bg-gradient-to-b from-amber-300 to-amber-500 border-2 border-amber-200 text-amber-950 font-black text-sm flex items-center justify-center mb-2 shadow-md">1</span>
              <div className="p-2 bg-indigo-950/50 rounded-2xl border border-indigo-400/40 mb-2">
                <EarIllustration className="w-12 h-12" />
              </div>
              <span className="font-black text-white text-sm mb-3 drop-shadow">1º Escucha la música con:</span>
              <div className="space-y-2 w-full">
                {[
                  { id: 'sentidos', label: 'El oído (Sentidos)' },
                  { id: 'cerebro', label: 'El cerebro' },
                  { id: 'locomotor', label: 'Huesos y músculos' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectSkater('1', opt.id)}
                    className={`w-full py-2.5 px-2 rounded-xl font-black text-xs min-h-[44px] transition-all cursor-pointer shadow-md ${
                      skaterSteps['1'] === opt.id
                        ? 'bg-gradient-to-b from-emerald-400 to-emerald-600 text-white border-2 border-emerald-700 shadow-[0_3px_0_0_#065f46] scale-102'
                        : 'bg-white text-slate-900 hover:bg-slate-50 border-2 border-slate-300 shadow-[0_3px_0_0_#94a3b8]'
                    }`}
                  >
                    <span className={skaterSteps['1'] === opt.id ? 'text-white' : 'text-slate-900 font-bold'}>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Paso 2 */}
            <div className="p-4 bg-white/10 rounded-2xl border-2 border-indigo-300/30 flex flex-col items-center text-center backdrop-blur-sm">
              <span className="w-9 h-9 rounded-full bg-gradient-to-b from-amber-300 to-amber-500 border-2 border-amber-200 text-amber-950 font-black text-sm flex items-center justify-center mb-2 shadow-md">2</span>
              <div className="p-2 bg-indigo-950/50 rounded-2xl border border-indigo-400/40 mb-2">
                <BrainIllustration className="w-12 h-12" />
              </div>
              <span className="font-black text-white text-sm mb-3 drop-shadow">2º Piensa los pasos con:</span>
              <div className="space-y-2 w-full">
                {[
                  { id: 'sentidos', label: 'El oído (Sentidos)' },
                  { id: 'cerebro', label: 'El cerebro' },
                  { id: 'locomotor', label: 'Huesos y músculos' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectSkater('2', opt.id)}
                    className={`w-full py-2.5 px-2 rounded-xl font-black text-xs min-h-[44px] transition-all cursor-pointer shadow-md ${
                      skaterSteps['2'] === opt.id
                        ? 'bg-gradient-to-b from-emerald-400 to-emerald-600 text-white border-2 border-emerald-700 shadow-[0_3px_0_0_#065f46] scale-102'
                        : 'bg-white text-slate-900 hover:bg-slate-50 border-2 border-slate-300 shadow-[0_3px_0_0_#94a3b8]'
                    }`}
                  >
                    <span className={skaterSteps['2'] === opt.id ? 'text-white' : 'text-slate-900 font-bold'}>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Paso 3 */}
            <div className="p-4 bg-white/10 rounded-2xl border-2 border-indigo-300/30 flex flex-col items-center text-center backdrop-blur-sm">
              <span className="w-9 h-9 rounded-full bg-gradient-to-b from-amber-300 to-amber-500 border-2 border-amber-200 text-amber-950 font-black text-sm flex items-center justify-center mb-2 shadow-md">3</span>
              <div className="p-2 bg-indigo-950/50 rounded-2xl border border-indigo-400/40 mb-2">
                <MusclesIllustration className="w-12 h-12" />
              </div>
              <span className="font-black text-white text-sm mb-3 drop-shadow">3º Salta y gira con:</span>
              <div className="space-y-2 w-full">
                {[
                  { id: 'sentidos', label: 'El oído (Sentidos)' },
                  { id: 'cerebro', label: 'El cerebro' },
                  { id: 'locomotor', label: 'Huesos y músculos' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectSkater('3', opt.id)}
                    className={`w-full py-2.5 px-2 rounded-xl font-black text-xs min-h-[44px] transition-all cursor-pointer shadow-md ${
                      skaterSteps['3'] === opt.id
                        ? 'bg-gradient-to-b from-emerald-400 to-emerald-600 text-white border-2 border-emerald-700 shadow-[0_3px_0_0_#065f46] scale-102'
                        : 'bg-white text-slate-900 hover:bg-slate-50 border-2 border-slate-300 shadow-[0_3px_0_0_#94a3b8]'
                    }`}
                  >
                    <span className={skaterSteps['3'] === opt.id ? 'text-white' : 'text-slate-900 font-bold'}>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {feedback && (
            <div className={`p-4 rounded-2xl font-black text-sm border-2 ${step1Checked ? 'bg-emerald-500/90 text-white border-emerald-300 shadow-md' : 'bg-amber-400 text-amber-950 border-amber-500 shadow-md'}`}>
              {feedback}
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={checkStep1}
              className="game-button-ok py-3 px-8 text-sm font-black uppercase tracking-wider"
            >
              Comprobar los 3 pasos
            </button>

            {step1Checked && (
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setStep(2);
                  setFeedback(null);
                }}
                className="game-button-ok py-3 px-8 text-sm font-black uppercase tracking-wider flex items-center gap-2 bg-gradient-to-b from-amber-300 to-amber-500 border-amber-600 shadow-[0_6px_0_0_#b45309] text-amber-950"
              >
                <span>Siguiente: Huesos y Músculos</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* STEP 2: ¿Para qué sirven las partes del aparato locomotor? */}
      {step === 2 && (
        <div className="game-dialog-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="game-ribbon-yellow">
              HUESOS Y MÚSCULOS (PÁG. 16)
            </div>
            <NarratorSpeaker
              text="¿Para qué sirven las partes del aparato locomotor? Los huesos se encargan de proteger y sostener. Los músculos se encargan de contraerse y relajarse."
              size="sm"
            />
          </div>

          <p className="text-sm font-bold text-indigo-100 bg-indigo-950/40 p-3 rounded-2xl border border-indigo-400/30">
            Une cada acción con los Huesos (💀) o los Músculos (💪).
          </p>

          {/* Illustrated skeleton and muscles banner (NO screenshot) */}
          <div className="bg-gradient-to-r from-purple-900/60 to-indigo-900/60 rounded-2xl p-4 border-2 border-indigo-300/30 flex flex-col sm:flex-row items-center gap-4 backdrop-blur-sm">
            <div className="flex items-center gap-3 p-2 bg-white/10 rounded-2xl border border-white/20">
              <SkeletonIllustration className="w-12 h-12" />
              <span className="text-xl">➕</span>
              <MusclesIllustration className="w-12 h-12" />
            </div>
            <div className="text-xs sm:text-sm text-indigo-100 font-bold">
              <strong className="text-amber-300 block text-base mb-1 drop-shadow">¡El aparato locomotor en acción!</strong>
              Los huesos forman el esqueleto que sostiene nuestro cuerpo y protege los órganos delicados. Los músculos tiran de los huesos para que podamos correr, bailar y saltar.
            </div>
          </div>

          <div className="space-y-3">
            {locomotorFunctions.map((fn) => {
              const currentChoice = locomotorMatches[fn.id];
              return (
                <div key={fn.id} className="p-4 bg-white/10 rounded-2xl border-2 border-indigo-300/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 backdrop-blur-sm">
                  <span className="font-bold text-white text-sm sm:text-base drop-shadow">
                    • {fn.label}
                  </span>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => handleMatchLocomotor(fn.id, 'huesos')}
                      className={`flex-1 sm:flex-initial py-2.5 px-4 rounded-xl font-black text-xs sm:text-sm min-h-[46px] transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        currentChoice === 'huesos'
                          ? 'game-pill-active ring-2 ring-emerald-300'
                          : 'game-pill-row hover:brightness-105'
                      }`}
                    >
                      <SkeletonIllustration className="w-6 h-6" />
                      <span>Huesos</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMatchLocomotor(fn.id, 'musculos')}
                      className={`flex-1 sm:flex-initial py-2.5 px-4 rounded-xl font-black text-xs sm:text-sm min-h-[46px] transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        currentChoice === 'musculos'
                          ? 'game-pill-active ring-2 ring-rose-300'
                          : 'game-pill-row hover:brightness-105'
                      }`}
                    >
                      <MusclesIllustration className="w-6 h-6" />
                      <span>Músculos</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {feedback && (
            <div className={`p-4 rounded-2xl font-black text-sm border-2 ${step2Checked ? 'bg-emerald-500/90 text-white border-emerald-300 shadow-md' : 'bg-amber-400 text-amber-950 border-amber-500 shadow-md'}`}>
              {feedback}
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={checkStep2}
              className="game-button-ok py-3 px-8 text-sm font-black uppercase tracking-wider"
            >
              Comprobar locomotor
            </button>

            {step2Checked && (
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setStep(3);
                  setFeedback(null);
                }}
                className="game-button-ok py-3 px-8 text-sm font-black uppercase tracking-wider flex items-center gap-2 bg-gradient-to-b from-amber-300 to-amber-500 border-amber-600 shadow-[0_6px_0_0_#b45309] text-amber-950"
              >
                <span>Siguiente: ¡Divertidato!</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* STEP 3: Divertidato del libro */}
      {step === 3 && (
        <div className="game-dialog-card p-6 sm:p-8 space-y-6">
          <div className="bg-gradient-to-r from-amber-400/20 to-orange-400/20 p-5 rounded-3xl border-2 border-amber-300/40 backdrop-blur-sm">
            <div className="game-ribbon-yellow mb-3">
              DIVERTIDATO (PÁG. 16 DEL LIBRO)
            </div>
            <p className="text-sm sm:text-base text-indigo-100 font-bold leading-relaxed">
              El <strong className="text-amber-300 underline">esternocleidomastoideo</strong> es el músculo con el nombre más largo. 
              Está ubicado a cada lado del cuello. Gracias a él podemos realizar movimientos con la cabeza hacia los lados.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  speakText('¡Es-ter-no-clei-do-mas-toi-de-o! Es el músculo del cuello que mueve tu cabeza.');
                  setSaidMuscle(true);
                }}
                className="game-button-ok py-3 px-6 text-sm font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer"
              >
                <span>🗣️ Escuchar pronunciación</span>
              </button>
              {saidMuscle && (
                <span className="text-xs font-black text-amber-200 bg-amber-950/60 px-3 py-2 rounded-xl border border-amber-400">
                  ¡Tócate el cuello y di su nombre en voz alta!
                </span>
              )}
            </div>
          </div>

          {/* Pregunta del animal */}
          <div className="p-4 bg-white/10 rounded-2xl border-2 border-indigo-300/30 space-y-3 backdrop-blur-sm">
            <span className="font-black text-amber-300 text-sm sm:text-base block drop-shadow">
              🐙 ¿Como qué animal nos desplazaríamos si no tuviéramos huesos? (Pág. 16)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'pulpo', label: 'Como un pulpo o babosa (blanditos y reptando)', correct: true },
                { id: 'jirafa', label: 'Como una jirafa alta y firme', correct: false },
                { id: 'caballo', label: 'Como un caballo galopando veloz', correct: false },
              ].map((an) => (
                <button
                  key={an.id}
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setAnimalAnswer(an.id);
                    if (an.correct) {
                      playSuccessSound();
                      setFeedback('¡Correcto! Sin esqueleto no tendríamos rigidez ni podríamos ponernos en pie; seríamos como un pulpo o una medusa en el agua.');
                    } else {
                      playTryAgainSound();
                      setFeedback('Las jirafas y los caballos tienen huesos muy fuertes en las patas para correr erguidos.');
                    }
                  }}
                  className={`p-3.5 rounded-2xl font-black text-xs sm:text-sm min-h-[48px] transition-all text-left cursor-pointer ${
                    animalAnswer === an.id
                      ? an.correct
                        ? 'game-pill-active ring-2 ring-emerald-300'
                        : 'bg-rose-500 text-white border-2 border-rose-300 shadow-md'
                      : 'game-pill-row hover:brightness-105'
                  }`}
                >
                  {an.label}
                </button>
              ))}
            </div>
          </div>

          {feedback && (
            <div className={`p-4 rounded-2xl font-black text-sm border-2 ${animalAnswer === 'pulpo' ? 'bg-emerald-500/90 text-white border-emerald-300 shadow-md' : 'bg-amber-400 text-amber-950 border-amber-500 shadow-md'}`}>
              {feedback}
            </div>
          )}

          <div className="flex justify-end pt-2">
            {animalAnswer === 'pulpo' && (
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setStep(4);
                  setFeedback(null);
                }}
                className="game-button-ok py-3 px-8 text-sm font-black uppercase tracking-wider flex items-center gap-2 bg-gradient-to-b from-amber-300 to-amber-500 border-amber-600 shadow-[0_6px_0_0_#b45309] text-amber-950"
              >
                <span>Siguiente: Carrera de Vallas</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* STEP 4: Carrera de vallas (Demuestra lo que sabes) */}
      {step === 4 && (
        <div className="game-dialog-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="game-ribbon-yellow">
              CARRERA DE VALLAS (PÁG. 16)
            </div>
            <NarratorSpeaker
              text="¿Cómo ocurre la función de relación en una carrera de obstáculos? Toca las tarjetas en el orden correcto en que suceden."
              size="sm"
            />
          </div>

          <p className="text-sm font-bold text-indigo-100 bg-indigo-950/40 p-3 rounded-2xl border border-indigo-400/30">
            Ordena del 1 al 3 los pasos del atleta en la carrera de vallas:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {hurdleCards.map((card) => {
              const orderIndex = hurdleOrder.indexOf(card.id);
              const isSelected = orderIndex !== -1;
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => toggleHurdleCard(card.id)}
                  className={`p-4 rounded-2xl border-2 text-left flex flex-col justify-between min-h-[140px] transition-all cursor-pointer shadow-md ${
                    isSelected
                      ? 'bg-gradient-to-b from-emerald-400 to-emerald-600 text-white border-2 border-emerald-700 shadow-[0_4px_0_0_#065f46] scale-102'
                      : 'bg-white text-slate-900 hover:bg-slate-50 border-2 border-slate-300 shadow-[0_4px_0_0_#94a3b8]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className="text-3xl">{card.emoji}</span>
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shadow-md ${
                      isSelected ? 'bg-emerald-800 text-white' : 'bg-slate-200 text-slate-800'
                    }`}>
                      {isSelected ? orderIndex + 1 : '—'}
                    </span>
                  </div>
                  <div>
                    <h4 className={`font-black text-sm mb-1 ${isSelected ? 'text-white' : 'text-slate-900'}`}>{card.label}</h4>
                    <p className={`text-xs font-semibold ${isSelected ? 'text-emerald-100' : 'text-slate-700'}`}>{card.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {feedback && (
            <div className={`p-4 rounded-2xl font-black text-sm border-2 ${step4Checked ? 'bg-emerald-500/90 text-white border-emerald-300 shadow-md' : 'bg-amber-400 text-amber-950 border-amber-500 shadow-md'}`}>
              {feedback}
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={checkStep4}
              className="game-button-ok py-3 px-8 text-sm font-black uppercase tracking-wider"
            >
              Comprobar orden
            </button>

            {step4Checked && (
              <button
                type="button"
                onClick={() => {
                  playBadgeSound();
                  setStep(5);
                  onComplete();
                }}
                className="game-button-ok py-3 px-8 text-sm font-black uppercase tracking-wider flex items-center gap-2 animate-bounce"
              >
                <span>¡Reclamar mi Medalla!</span>
                <Award className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* STEP 5: Medalla */}
      {step === 5 && (
        <div className="game-dialog-card p-8 sm:p-10 text-center space-y-6">
          <div className="game-ribbon-yellow mx-auto">
            ¡MISIÓN 4 SUPERADA!
          </div>

          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-b from-amber-300 to-amber-500 border-4 border-amber-200 shadow-[0_8px_0_0_#b45309] flex items-center justify-center text-5xl animate-bounce">
            🎾
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white drop-shadow">
            ¡Has ganado la Medalla de Atleta del Movimiento!
          </h3>
          <p className="text-sm font-bold text-indigo-100 max-w-md mx-auto">
            ¡Comprendes a la perfección cómo los sentidos, el cerebro y el aparato locomotor se coordinan a toda velocidad!
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenBook}
              className="game-pill-row py-3 px-6 text-sm font-black cursor-pointer hover:brightness-105"
            >
              📖 Ver Ficha 4 en el Libro
            </button>
            <button
              type="button"
              onClick={() => {
                playClickSound();
                const nextBtn = document.querySelector('[title="Misión 5: ¿Una persona con dos corazones?"]') as HTMLButtonElement;
                if (nextBtn) nextBtn.click();
              }}
              className="game-button-ok py-3.5 px-8 text-sm font-black uppercase tracking-wider flex items-center gap-2"
            >
              <span>Ir a la Misión 5: Reproducción</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

