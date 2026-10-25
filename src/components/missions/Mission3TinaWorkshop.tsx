import React, { useState } from 'react';
import { Sparkles, Check, HelpCircle, ArrowRight, RotateCcw, Award, Wind, FlaskConical } from 'lucide-react';
import { NarratorSpeaker } from '../NarratorSpeaker';
import { playClickSound, playSuccessSound, playTryAgainSound, playBadgeSound } from '../../utils/audio';

interface Props {
  onComplete: () => void;
  onOpenBook: () => void;
}

export const Mission3TinaWorkshop: React.FC<Props> = ({ onComplete, onOpenBook }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Workshop assembly steps
  const [assemblyStep, setAssemblyStep] = useState(1);
  const [isBlowing, setIsBlowing] = useState(false);
  const [lungsInflated, setLungsInflated] = useState(false);
  const [oneLungRemoved, setOneLungRemoved] = useState(false);

  // Page 14 Hypotheses
  const [hypothesis, setHypothesis] = useState<string | null>(null);
  const [trueFalse, setTrueFalse] = useState<{ [qId: string]: 'V' | 'F' }>({});
  const [tfChecked, setTfChecked] = useState(false);

  // Can we live with one lung?
  const [oneLungAnswer, setOneLungAnswer] = useState<string | null>(null);
  const [oneLungChecked, setOneLungChecked] = useState(false);

  const [feedback, setFeedback] = useState<string | null>(null);

  const handleBlow = () => {
    playClickSound();
    setIsBlowing(true);
    setLungsInflated(true);
    playSuccessSound();
    setTimeout(() => {
      setIsBlowing(false);
    }, 1800);
  };

  const toggleOneLung = () => {
    playClickSound();
    setOneLungRemoved(prev => !prev);
    setLungsInflated(false);
  };

  const checkTrueFalse = () => {
    // Q1: Al introducir aire por la nariz y la boca, los pulmones se hinchan -> V
    // Q2: Si quitamos un pulmón y soplamos, no entra aire al otro pulmón -> F
    // Q3: Si quitamos un pulmón y soplamos, entra aire al otro pulmón -> V
    const q1 = trueFalse['q1'] === 'V';
    const q2 = trueFalse['q2'] === 'F';
    const q3 = trueFalse['q3'] === 'V';

    if (q1 && q2 && q3) {
      playSuccessSound();
      setFeedback('¡Extraordinario! Como las pajitas se bifurcan en dos ramas independientes, al tapar o quitar un pulmón, el aire sigue entrando al otro.');
      setTfChecked(true);
    } else {
      playTryAgainSound();
      setFeedback('Revisa tus respuestas: los pulmones se hinchan al soplar, y si tapas uno, el aire sí llega al otro.');
    }
  };

  const checkFinalQuestion = () => {
    if (oneLungAnswer === 'si') {
      playSuccessSound();
      setFeedback('¡Muy bien razonado! Sí se puede vivir con un solo pulmón. El cuerpo se adapta, aunque la persona se cansa un poquito más rápido.');
      setOneLungChecked(true);
    } else {
      playTryAgainSound();
      setFeedback('Piénsalo bien: el cuerpo humano es asombroso. Un solo pulmón puede captar suficiente oxígeno para vivir.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Banner */}
      <div className="game-dialog-card p-6 sm:p-7 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="game-ribbon-yellow mb-3">
              MISIÓN 3 · FICHA 3 (PÁGS. 13 Y 14)
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white drop-shadow">El Taller de Tina: ¿Podemos vivir con un pulmón?</h2>
            <p className="text-indigo-100 text-sm sm:text-base font-bold mt-1">
              Acercamiento al método científico: maqueta, oxígeno e hipótesis.
            </p>
          </div>

          <NarratorSpeaker
            text="Misión 3: El taller de ciencias de Tina. ¿Podemos vivir con un pulmón? Tina nos dice: Del aire que nos rodea, las personas necesitamos el oxígeno. Vamos a comprobarlo con una maqueta de pajitas y bolsas."
            label="Escuchar taller"
            size="md"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-2 rounded-2xl bg-indigo-950/60 border-2 border-indigo-400/30 backdrop-blur-md">
        {[
          { num: 1, label: '1. Maqueta en Acción' },
          { num: 2, label: '2. Hipótesis Científica' },
          { num: 3, label: '3. Verdadero o Falso' },
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
            className={`flex-1 py-2.5 px-3 rounded-xl font-black text-xs sm:text-sm min-h-[44px] transition-all cursor-pointer ${
              step === s.num
                ? 'game-pill-active ring-2 ring-emerald-300'
                : 'text-indigo-200 hover:text-white hover:bg-white/10'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* STEP 1: Maqueta interactiva */}
      {step === 1 && (
        <div className="game-dialog-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="game-ribbon-yellow">
              MAQUETA DEL APARATO RESPIRATORIO
            </div>
            <NarratorSpeaker
              text="Aquí tienes la maqueta que propone Tina. Pulsa el botón para soplar aire y observa cómo se hinchan los pulmones. También puedes probar a quitar un pulmón para experimentar."
              size="sm"
            />
          </div>

          {/* Illustrated science workshop banner (NO screenshot) */}
          <div className="bg-gradient-to-r from-sky-900/60 to-indigo-900/60 rounded-2xl p-4 border-2 border-sky-300/40 flex flex-col sm:flex-row items-center gap-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 p-3 bg-white/10 rounded-2xl border border-white/20">
              <span className="text-3xl">🥤</span>
              <span className="text-2xl">➕</span>
              <span className="text-3xl">🎈</span>
              <span className="text-2xl">➡️</span>
              <span className="text-3xl">🫁</span>
            </div>
            <div className="text-xs sm:text-sm text-indigo-100 font-bold">
              <strong className="text-amber-300 block text-base mb-1 drop-shadow">¡El experimento de la maqueta de Tina!</strong>
              Con 2 pajitas (tráquea y bronquios) y 2 bolsas o globos (pulmones). Tina nos demuestra que las personas necesitamos el oxígeno del aire para vivir.
            </div>
          </div>

          {/* Interactive Simulation Area */}
          <div className="bg-indigo-950/60 rounded-3xl p-6 border-2 border-indigo-400/40 flex flex-col items-center justify-center relative overflow-hidden min-h-[300px] shadow-inner backdrop-blur-sm">
            {/* Straws & Lungs Graphic */}
            <div className="flex flex-col items-center">
              {/* Mouthpiece */}
              <div className="w-14 h-10 rounded-2xl bg-gradient-to-b from-rose-400 to-rose-600 border-2 border-rose-300 flex items-center justify-center text-xs font-black text-white mb-1 shadow-md">
                👄 Boca
              </div>

              {/* Main trachea straw */}
              <div className="w-6 h-16 bg-gradient-to-b from-amber-300 to-amber-500 rounded-t-sm border-2 border-amber-600 relative flex items-center justify-center shadow-md">
                <span className="text-[10px] font-black text-amber-950 rotate-90 tracking-wider">Tráquea</span>
                {isBlowing && (
                  <div className="absolute inset-0 bg-sky-300/80 animate-ping rounded-sm" />
                )}
              </div>

              {/* Bronchi fork */}
              <div className="flex items-start gap-8 mt-1">
                {/* Left Lung */}
                <div className="flex flex-col items-center">
                  <div className="w-5 h-8 bg-amber-400 -rotate-25 border-2 border-amber-600 origin-top rounded-sm" />
                  <div
                    className={`rounded-3xl border-4 transition-all duration-500 flex flex-col items-center justify-center shadow-lg ${
                      lungsInflated
                        ? 'w-24 h-32 bg-gradient-to-b from-rose-400 to-rose-600 border-rose-300 scale-110'
                        : 'w-16 h-20 bg-rose-950/60 border-rose-400/60 scale-90'
                    }`}
                  >
                    <span className="text-xs font-black text-white drop-shadow">Pulmón 1</span>
                    <span className="text-[10px] font-bold text-rose-200">
                      {lungsInflated ? '¡Lleno de O₂!' : 'En reposo'}
                    </span>
                  </div>
                </div>

                {/* Right Lung (can be removed/blocked) */}
                <div className="flex flex-col items-center">
                  <div className="w-5 h-8 bg-amber-400 rotate-25 border-2 border-amber-600 origin-top rounded-sm" />
                  {oneLungRemoved ? (
                    <div className="w-16 h-20 rounded-2xl border-2 border-dashed border-indigo-400 bg-indigo-900/40 flex items-center justify-center text-indigo-300 text-xs font-bold text-center p-1">
                      Pulmón ausente
                    </div>
                  ) : (
                    <div
                      className={`rounded-3xl border-4 transition-all duration-500 flex flex-col items-center justify-center shadow-lg ${
                        lungsInflated
                          ? 'w-24 h-32 bg-gradient-to-b from-rose-400 to-rose-600 border-rose-300 scale-110'
                          : 'w-16 h-20 bg-rose-950/60 border-rose-400/60 scale-90'
                      }`}
                    >
                      <span className="text-xs font-black text-white drop-shadow">Pulmón 2</span>
                      <span className="text-[10px] font-bold text-rose-200">
                        {lungsInflated ? '¡Lleno de O₂!' : 'En reposo'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleBlow}
                className="game-button-ok py-3 px-6 text-sm font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer"
              >
                <Wind className="w-5 h-5" />
                <span>¡Soplar aire en la maqueta!</span>
              </button>

              <button
                type="button"
                onClick={toggleOneLung}
                className={`py-3 px-5 rounded-2xl font-black text-xs sm:text-sm min-h-[48px] border-2 transition-all cursor-pointer ${
                  oneLungRemoved
                    ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-md'
                    : 'game-pill-row hover:brightness-105'
                }`}
              >
                {oneLungRemoved ? '🔁 Restaurar ambos pulmones' : '✂️ Probar quitando un pulmón'}
              </button>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setStep(2);
              }}
              className="game-button-ok py-3 px-8 text-sm font-black uppercase tracking-wider flex items-center gap-2 bg-gradient-to-b from-amber-300 to-amber-500 border-amber-600 shadow-[0_6px_0_0_#b45309] text-amber-950"
            >
              <span>Plantear Hipótesis</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Hipótesis (Página 14) */}
      {step === 2 && (
        <div className="game-dialog-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="game-ribbon-yellow">
              HIPÓTESIS CIENTÍFICA (PÁG. 14)
            </div>
            <NarratorSpeaker
              text="Plantea tus hipótesis. ¿Cómo funcionan los pulmones? Opción A: Al introducir aire por la nariz o por la boca, llega a los pulmones y se hinchan. Opción B: Los pulmones no necesitan aire para hincharse."
              size="sm"
            />
          </div>

          <p className="text-sm font-bold text-indigo-100 bg-indigo-950/40 p-3 rounded-2xl border border-indigo-400/30">
            ¿Cómo funcionan los pulmones cuando tomamos aire? Selecciona la afirmación correcta:
          </p>

          <div className="space-y-3">
            {[
              {
                id: 'correct',
                text: 'Al introducir aire por la nariz o por la boca, llega a los pulmones y se hinchan.',
                isRight: true
              },
              {
                id: 'wrong',
                text: 'Los pulmones no necesitan aire para hincharse.',
                isRight: false
              }
            ].map((hyp) => (
              <button
                key={hyp.id}
                type="button"
                onClick={() => {
                  playClickSound();
                  setHypothesis(hyp.id);
                  if (hyp.isRight) {
                    playSuccessSound();
                    setFeedback('¡Exacto! El aire entra por la nariz o la boca, baja por la tráquea y llena los pulmones de oxígeno.');
                  } else {
                    playTryAgainSound();
                    setFeedback('Piensa en la maqueta: si no soplamos aire, las bolsas se quedan desinfladas.');
                  }
                }}
                className={`w-full p-4 rounded-2xl text-left font-black text-sm sm:text-base min-h-[56px] transition-all flex items-center gap-3 cursor-pointer ${
                  hypothesis === hyp.id
                    ? hyp.isRight
                      ? 'game-pill-active ring-2 ring-emerald-300'
                      : 'bg-rose-500 text-white border-2 border-rose-300 shadow-md'
                    : 'game-pill-row hover:brightness-105'
                }`}
              >
                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-black flex-shrink-0 text-base">
                  {hypothesis === hyp.id ? '✓' : '○'}
                </span>
                <span>{hyp.text}</span>
              </button>
            ))}
          </div>

          {feedback && (
            <div className={`p-4 rounded-2xl font-black text-sm border-2 ${hypothesis === 'correct' ? 'bg-emerald-500/90 text-white border-emerald-300 shadow-md' : 'bg-amber-400 text-amber-950 border-amber-500 shadow-md'}`}>
              {feedback}
            </div>
          )}

          <div className="flex justify-end pt-2">
            {hypothesis === 'correct' && (
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setStep(3);
                  setFeedback(null);
                }}
                className="game-button-ok py-3 px-8 text-sm font-black uppercase tracking-wider flex items-center gap-2 bg-gradient-to-b from-amber-300 to-amber-500 border-amber-600 shadow-[0_6px_0_0_#b45309] text-amber-950"
              >
                <span>Siguiente: Verdadero o Falso</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* STEP 3: Verdadero o Falso & ¿Podemos vivir con un pulmón? */}
      {step === 3 && (
        <div className="game-dialog-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="game-ribbon-yellow">
              ¿QUÉ HA OCURRIDO? (PÁG. 14)
            </div>
            <NarratorSpeaker
              text="¿Qué ha ocurrido en el experimento? Lee y marca verdadero o falso. 1. Al introducir aire por la nariz y la boca, los pulmones se hinchan. 2. Si quitamos un pulmón y soplamos, no entra aire al otro pulmón. 3. Si quitamos un pulmón y soplamos, sí entra aire al otro pulmón."
              size="sm"
            />
          </div>

          <div className="space-y-4">
            {[
              { id: 'q1', text: '• Al introducir aire por la nariz y la boca, los pulmones se hinchan.' },
              { id: 'q2', text: '• Si quitamos un pulmón y soplamos, no entra aire al otro pulmón.' },
              { id: 'q3', text: '• Si quitamos un pulmón y soplamos, entra aire al otro pulmón.' },
            ].map((q) => (
              <div key={q.id} className="p-4 bg-white/10 rounded-2xl border-2 border-indigo-300/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 backdrop-blur-sm">
                <span className="font-bold text-white text-sm sm:text-base drop-shadow">{q.text}</span>
                <div className="flex items-center gap-2">
                  {(['V', 'F'] as const).map((choice) => (
                    <button
                      key={choice}
                      type="button"
                      onClick={() => {
                        playClickSound();
                        setTrueFalse(prev => ({ ...prev, [q.id]: choice }));
                        setFeedback(null);
                      }}
                      className={`w-12 h-12 rounded-xl font-black text-base transition-all cursor-pointer ${
                        trueFalse[q.id] === choice
                          ? choice === 'V'
                            ? 'bg-emerald-500 text-white shadow-[0_4px_0_0_#065f46] ring-2 ring-emerald-300'
                            : 'bg-rose-500 text-white shadow-[0_4px_0_0_#9f1239] ring-2 ring-rose-300'
                          : 'game-pill-row hover:brightness-105'
                      }`}
                    >
                      {choice}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Pregunta final: ¿Podríamos vivir con un solo pulmón? */}
          <div className="p-4 bg-white/10 rounded-2xl border-2 border-amber-300/50 space-y-3 backdrop-blur-sm">
            <span className="font-black text-amber-300 text-sm sm:text-base block drop-shadow">
              💡 Pregunta científica del libro: ¿Podríamos vivir con un solo pulmón?
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setOneLungAnswer('si');
                }}
                className={`py-3 px-4 rounded-xl font-black text-sm min-h-[48px] transition-all cursor-pointer ${
                  oneLungAnswer === 'si'
                    ? 'game-pill-active ring-2 ring-emerald-300'
                    : 'game-pill-row hover:brightness-105'
                }`}
              >
                ✅ Sí, las personas pueden vivir con uno
              </button>
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setOneLungAnswer('no');
                }}
                className={`py-3 px-4 rounded-xl font-black text-sm min-h-[48px] transition-all cursor-pointer ${
                  oneLungAnswer === 'no'
                    ? 'bg-rose-500 text-white border-2 border-rose-300 shadow-md'
                    : 'game-pill-row hover:brightness-105'
                }`}
              >
                ❌ No, es imposible
              </button>
            </div>
          </div>

          {feedback && (
            <div className={`p-4 rounded-2xl font-black text-sm border-2 ${tfChecked && oneLungChecked ? 'bg-emerald-500/90 text-white border-emerald-300 shadow-md' : 'bg-amber-400 text-amber-950 border-amber-500 shadow-md'}`}>
              {feedback}
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => {
                checkTrueFalse();
                checkFinalQuestion();
              }}
              className="game-button-ok py-3 px-8 text-sm font-black uppercase tracking-wider"
            >
              Comprobar experimento
            </button>

            {tfChecked && oneLungChecked && (
              <button
                type="button"
                onClick={() => {
                  playBadgeSound();
                  setStep(4);
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

      {/* STEP 4: Medalla */}
      {step === 4 && (
        <div className="game-dialog-card p-8 sm:p-10 text-center space-y-6">
          <div className="game-ribbon-yellow mx-auto">
            ¡MISIÓN 3 SUPERADA!
          </div>

          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-b from-amber-300 to-amber-500 border-4 border-amber-200 shadow-[0_8px_0_0_#b45309] flex items-center justify-center text-5xl animate-bounce">
            🔬
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white drop-shadow">
            ¡Has ganado la Medalla de Científica de Laboratorio!
          </h3>
          <p className="text-sm font-bold text-indigo-100 max-w-md mx-auto">
            ¡Has aplicado el método científico comprobando cómo respiran los pulmones y el oxígeno del aire!
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenBook}
              className="game-pill-row py-3 px-6 text-sm font-black cursor-pointer hover:brightness-105"
            >
              📖 Ver Ficha 3 en el Libro
            </button>
            <button
              type="button"
              onClick={() => {
                playClickSound();
                const nextBtn = document.querySelector('[title="Misión 4: ¿Solo la mano mueve la raqueta?"]') as HTMLButtonElement;
                if (nextBtn) nextBtn.click();
              }}
              className="game-button-ok py-3.5 px-8 text-sm font-black uppercase tracking-wider flex items-center gap-2"
            >
              <span>Ir a la Misión 4: Función de Relación</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

