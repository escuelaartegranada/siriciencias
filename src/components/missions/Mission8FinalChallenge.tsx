import React, { useState } from 'react';
import { Sparkles, Check, HelpCircle, ArrowRight, RotateCcw, Award, Trophy, Compass, CheckSquare, Printer, Heart } from 'lucide-react';
import { NarratorSpeaker } from '../NarratorSpeaker';
import { playClickSound, playSuccessSound, playTryAgainSound, playBadgeSound, playCompleteSound } from '../../utils/audio';

interface Props {
  onComplete: () => void;
  onOpenBook: () => void;
  onOpenMedals: () => void;
  onOpenReview?: () => void;
  studentName: string;
}

export const Mission8FinalChallenge: React.FC<Props> = ({
  onComplete,
  onOpenBook,
  onOpenMedals,
  onOpenReview,
  studentName
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Challenge 1: Inclusive playground survey (Page 23)
  const [surveyAnswers, setSurveyAnswers] = useState<{ [q: string]: string }>({});

  // Challenge 2: Interactive playground zone design (Page 24)
  const [activeZones, setActiveZones] = useState<string[]>(['cancha', 'tranquila', 'verde', 'arenero']);

  // Challenge 3: Grand Summary Quiz (Pages 25-27)
  const [quizAnswers, setQuizAnswers] = useState<{ [q: string]: string }>({});
  const [quizChecked, setQuizChecked] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const toggleZone = (zoneId: string) => {
    playClickSound();
    setActiveZones(prev =>
      prev.includes(zoneId) ? prev.filter(z => z !== zoneId) : [...prev, zoneId]
    );
  };

  const handleSurvey = (id: string, ans: string) => {
    playClickSound();
    setSurveyAnswers(prev => ({ ...prev, [id]: ans }));
  };

  // Grand Quiz Questions
  const questions = [
    {
      id: 'q1',
      title: '1. ¿Cuáles son las 3 funciones vitales de los seres vivos?',
      options: [
        'Nutrición, relación y reproducción',
        'Comer, dormir y ver la tele',
        'Correr, saltar y nadar'
      ],
      correct: 'Nutrición, relación y reproducción',
      explanation: 'Las 3 funciones que definen a todos los seres vivos son nutrirse, relacionarse y reproducirse.'
    },
    {
      id: 'q2',
      title: '2. ¿Qué aparato transporta los nutrientes y el oxígeno por la sangre?',
      options: [
        'Aparato circulatorio (corazón y vasos sanguíneos)',
        'Aparato digestivo',
        'Aparato excretor'
      ],
      correct: 'Aparato circulatorio (corazón y vasos sanguíneos)',
      explanation: 'El corazón y las venas reparten los nutrientes y el oxígeno por todo el cuerpo.'
    },
    {
      id: 'q3',
      title: '3. En el taller de ciencias, ¿qué gas del aire necesitamos al respirar?',
      options: [
        'El oxígeno',
        'El humo de los coches',
        'El dióxido de carbono'
      ],
      correct: 'El oxígeno',
      explanation: 'Nuestros pulmones captan el oxígeno del aire que nos rodea.'
    },
    {
      id: 'q4',
      title: '4. ¿Para qué sirven principalmente los huesos del esqueleto?',
      options: [
        'Sostener el cuerpo y proteger órganos delicados',
        'Solo para hacernos más altos',
        'Para digerir los alimentos'
      ],
      correct: 'Sostener el cuerpo y proteger órganos delicados',
      explanation: 'Los huesos dan soporte y protegen órganos como el cerebro (cráneo) y corazón (costillas).'
    },
    {
      id: 'q5',
      title: '5. ¿Quién puede tener dos corazones latiendo en su cuerpo?',
      options: [
        'Una mujer embarazada (el suyo y el del bebé)',
        'Un robot de juguete',
        'Una persona cuando corre rápido'
      ],
      correct: 'Una mujer embarazada (el suyo y el del bebé)',
      explanation: 'Durante el embarazo, dentro del vientre materno late el corazón de la mamá y el del bebé.'
    },
    {
      id: 'q6',
      title: '6. ¿Cuáles son los 5 pilares para mantener una salud de hierro?',
      options: [
        'Higiene, descanso, deporte, naturaleza y dieta sana',
        'Jugar con videojuegos todo el día y comer chuches',
        'No salir nunca a la calle'
      ],
      correct: 'Higiene, descanso, deporte, naturaleza y dieta sana',
      explanation: '¡Los 5 hábitos fundamentales que hemos aprendido en el Tema 1!'
    }
  ];

  const handleSelectQuiz = (qId: string, opt: string) => {
    playClickSound();
    setQuizAnswers(prev => ({ ...prev, [qId]: opt }));
    setFeedback(null);
  };

  const checkQuiz = () => {
    const allAnswered = questions.every(q => quizAnswers[q.id] !== undefined);
    if (!allAnswered) {
      setFeedback('Responde a todas las preguntas antes de terminar el gran reto.');
      playTryAgainSound();
      return;
    }

    const allCorrect = questions.every(q => quizAnswers[q.id] === q.correct);
    if (allCorrect) {
      playCompleteSound();
      setFeedback('¡ENHORABUENA! ¡Puntuación perfecta en el Gran Quiz de Ciencias!');
      setQuizChecked(true);
      onComplete();
    } else {
      playTryAgainSound();
      setFeedback('¡Casi perfecto! Revisa las preguntas con calma; puedes cambiar tu respuesta sin ningún problema.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Banner */}
      <div className="game-dialog-card p-6 sm:p-7 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="game-ribbon-yellow mb-3">
              RETO FINAL · PATIOS PARA TODOS (PÁGS. 23 A 28)
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white drop-shadow">¡Gran Reto Final del Tema 1!</h2>
            <p className="text-indigo-100 text-sm sm:text-base font-bold mt-1">
              Diseña un patio saludable e inclusivo y supera el Gran Quiz de Ciencias.
            </p>
          </div>

          <NarratorSpeaker
            text="¡Bienvenida al Gran Reto Final! Vamos a organizar un patio escolar saludable y divertido donde todos los niños y niñas puedan disfrutar, y demostraremos todo lo aprendido en el Tema 1 para conseguir el Gran Diploma."
            label="Escuchar reto"
            size="md"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-2 rounded-2xl bg-indigo-950/60 border-2 border-indigo-400/30 backdrop-blur-md">
        {[
          { num: 1, label: '1. Cuestionario de Patio' },
          { num: 2, label: '2. Plano del Patio' },
          { num: 3, label: '3. Gran Quiz' },
          { num: 4, label: '4. ¡Gran Medalla!' }
        ].map((s) => (
          <button
            key={s.num}
            type="button"
            onClick={() => {
              playClickSound();
              setStep(s.num as 1 | 2 | 3 | 4);
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

      {/* STEP 1: Cuestionario de patio (Página 23) */}
      {step === 1 && (
        <div className="game-dialog-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="game-ribbon-yellow">
              CUESTIONARIO DE PATIO (PÁG. 23)
            </div>
            <NarratorSpeaker
              text="Paso 1 del reto: Piensa en un día en el patio. ¿Juegas con niños y niñas? ¿Te gusta cómo están organizados los juegos? ¿Puedes usar todos los espacios como la pista o el arenero? ¿Puedes elegir a qué jugar?"
              size="sm"
            />
          </div>

          <p className="text-sm font-bold text-indigo-100 bg-indigo-950/40 p-3 rounded-2xl border border-indigo-400/30">
            Piensa en un día normal en el patio del colegio y marca tu opinión:
          </p>

          <div className="space-y-3">
            {[
              { id: 's1', text: '1. Juego con niños y niñas de forma amistosa e inclusiva.' },
              { id: 's2', text: '2. Me gusta cómo están organizados los espacios y juegos en el recreo.' },
              { id: 's3', text: '3. Todo el alumnado puede utilizar las pistas y zonas sin que nadie se adueñe de ellas.' },
              { id: 's4', text: '4. Puedo elegir qué juego o qué actividad hacer libremente cada día.' }
            ].map((q) => (
              <div key={q.id} className="p-4 bg-white/10 rounded-2xl border-2 border-indigo-300/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 backdrop-blur-sm">
                <span className="font-bold text-white text-sm sm:text-base drop-shadow">{q.text}</span>
                <div className="flex items-center gap-2">
                  {['¡Sí, siempre!', 'A veces'].map((ans) => (
                    <button
                      key={ans}
                      type="button"
                      onClick={() => handleSurvey(q.id, ans)}
                      className={`px-4 py-2.5 rounded-xl font-black text-xs min-h-[44px] transition-all cursor-pointer shadow-md ${
                        surveyAnswers[q.id] === ans
                          ? 'bg-gradient-to-b from-emerald-400 to-emerald-600 text-white border-2 border-emerald-700 shadow-[0_3px_0_0_#065f46] scale-102'
                          : 'bg-white text-slate-900 hover:bg-slate-50 border-2 border-slate-300 shadow-[0_3px_0_0_#94a3b8]'
                      }`}
                    >
                      {ans}
                    </button>
                  ))}
                </div>
              </div>
            ))}
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
              <span>Paso 2: Diseñar el Plano</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Plano del patio inclusivo (Página 24) */}
      {step === 2 && (
        <div className="game-dialog-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="game-ribbon-yellow">
              PLANO DEL PATIO INCLUSIVO (PÁG. 24)
            </div>
            <NarratorSpeaker
              text="Diseñamos el plano del patio para todos. Debe incluir zonas para correr y jugar a la pelota, zonas tranquilas para juegos de mesa, zonas con árboles y naturaleza, y columpios o areneros."
              size="sm"
            />
          </div>

          <p className="text-sm font-bold text-indigo-100 bg-indigo-950/40 p-3 rounded-2xl border border-indigo-400/30">
            Activa las zonas para que haya actividades para todos los gustos: deporte, relax, lectura y naturaleza:
          </p>

          {/* Illustrated playground zones banner (NO screenshot) */}
          <div className="bg-gradient-to-r from-indigo-900/70 to-purple-900/70 rounded-2xl p-4 border-2 border-indigo-300/40 flex flex-col sm:flex-row items-center gap-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-3xl p-3 bg-white/10 rounded-2xl border border-white/20">
              <span>🏀</span>
              <span>🧩</span>
              <span>🌳</span>
              <span>🛝</span>
            </div>
            <div className="text-xs sm:text-sm text-indigo-100 font-bold">
              <strong className="text-amber-300 block text-base mb-1 drop-shadow">¡Diseño del patio escolar inclusivo!</strong>
              Un patio para todos distribuye el espacio para que convivan deportes activos, juegos de mesa tranquilos, zonas verdes de descanso y areneros donde nadie se quede solo.
            </div>
          </div>

          {/* Interactive Playground Map Graphic */}
          <div className="bg-indigo-950/60 rounded-3xl p-5 sm:p-7 border-2 border-indigo-400/40 grid grid-cols-1 sm:grid-cols-2 gap-4 backdrop-blur-sm">
            {/* Zone 1: Deportes */}
            <div className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
              activeZones.includes('cancha')
                ? 'game-pill-active ring-2 ring-blue-300'
                : 'bg-white/10 border-indigo-300/20 opacity-60'
            }`} onClick={() => toggleZone('cancha')}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-black text-slate-900 text-sm flex items-center gap-1.5">
                  <span className="text-2xl">🏀 ⚽</span> Pista Multideporte
                </span>
                <span className="text-xs font-black text-blue-900 bg-blue-100 px-2 py-0.5 rounded-full">Turnos justos</span>
              </div>
              <p className="text-xs text-slate-800 font-semibold">
                Fútbol, baloncesto y patines, con turnos justos para que niños y niñas jueguen juntos.
              </p>
            </div>

            {/* Zone 2: Tranquila */}
            <div className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
              activeZones.includes('tranquila')
                ? 'game-pill-active ring-2 ring-purple-300'
                : 'bg-white/10 border-indigo-300/20 opacity-60'
            }`} onClick={() => toggleZone('tranquila')}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-black text-slate-900 text-sm flex items-center gap-1.5">
                  <span className="text-2xl">🎲 🧩</span> Rincón Tranquilo
                </span>
                <span className="text-xs font-black text-purple-900 bg-purple-100 px-2 py-0.5 rounded-full">Juegos de mesa</span>
              </div>
              <p className="text-xs text-slate-800 font-semibold">
                Mesas con parchís, ajedrez, puzzles y lectura para quien prefiere descansar.
              </p>
            </div>

            {/* Zone 3: Naturaleza */}
            <div className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
              activeZones.includes('verde')
                ? 'game-pill-active ring-2 ring-emerald-300'
                : 'bg-white/10 border-indigo-300/20 opacity-60'
            }`} onClick={() => toggleZone('verde')}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-black text-slate-900 text-sm flex items-center gap-1.5">
                  <span className="text-2xl">🌳 🌻</span> Zona Verde y Huerto
                </span>
                <span className="text-xs font-black text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-full">Sombra y aire puro</span>
              </div>
              <p className="text-xs text-slate-800 font-semibold">
                Árboles para refugiarse del sol, plantas aromáticas y bancos para charlar con amigos.
              </p>
            </div>

            {/* Zone 4: Arenero y movimiento */}
            <div className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
              activeZones.includes('arenero')
                ? 'game-pill-active ring-2 ring-amber-300'
                : 'bg-white/10 border-indigo-300/20 opacity-60'
            }`} onClick={() => toggleZone('arenero')}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-black text-slate-900 text-sm flex items-center gap-1.5">
                  <span className="text-2xl">🛝 🪢</span> Arenero y Comba
                </span>
                <span className="text-xs font-black text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full">Juegos populares</span>
              </div>
              <p className="text-xs text-slate-800 font-semibold">
                Juegos tradicionales como comba, rayuela, bolos y arenero donde cabe todo el mundo.
              </p>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setStep(3);
              }}
              className="game-button-ok py-3 px-8 text-sm font-black uppercase tracking-wider flex items-center gap-2 bg-gradient-to-b from-amber-300 to-amber-500 border-amber-600 shadow-[0_6px_0_0_#b45309] text-amber-950"
            >
              <span>Ir al Gran Quiz de Repaso</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Gran Quiz del Tema 1 (Páginas 25 a 27) */}
      {step === 3 && (
        <div className="game-dialog-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="game-ribbon-yellow">
              GRAN QUIZ DE CIENCIAS (PÁGS. 25-27)
            </div>
            <NarratorSpeaker
              text="Gran Quiz de Ciencias. Demuestra todo lo que sabes sobre funciones vitales, nutrición, el experimento de los pulmones, la función de relación, la reproducción y los hábitos saludables."
              size="sm"
            />
          </div>

          <p className="text-sm font-bold text-indigo-100 bg-indigo-950/40 p-3 rounded-2xl border border-indigo-400/30">
            6 preguntas maestras que demuestran todo lo aprendido en el Tema 1:
          </p>

          <div className="space-y-4">
            {questions.map((q) => {
              const currentChoice = quizAnswers[q.id];
              return (
                <div key={q.id} className="p-4 bg-white/10 rounded-2xl border-2 border-indigo-300/30 space-y-3 backdrop-blur-sm">
                  <h4 className="font-black text-amber-300 text-sm sm:text-base drop-shadow">{q.title}</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {q.options.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectQuiz(q.id, opt)}
                        className={`p-3.5 rounded-xl font-black text-xs sm:text-sm text-left min-h-[46px] transition-all flex items-start gap-2.5 cursor-pointer shadow-md ${
                          currentChoice === opt
                            ? 'bg-gradient-to-b from-emerald-400 to-emerald-600 text-white border-2 border-emerald-700 shadow-[0_3px_0_0_#065f46]'
                            : 'bg-white text-slate-900 hover:bg-slate-50 border-2 border-slate-300 shadow-[0_3px_0_0_#94a3b8]'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5 ${
                          currentChoice === opt ? 'border-white text-white' : 'border-slate-400 text-slate-900'
                        }`}>
                          {currentChoice === opt ? '✓' : ''}
                        </span>
                        <span className={currentChoice === opt ? 'text-white' : 'text-slate-900 font-bold'}>{opt}</span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {feedback && (
            <div className={`p-4 rounded-2xl font-black text-sm border-2 ${quizChecked ? 'bg-emerald-500/90 text-white border-emerald-300 shadow-md' : 'bg-amber-400 text-amber-950 border-amber-500 shadow-md'}`}>
              {feedback}
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={checkQuiz}
              className="game-button-ok py-3 px-8 text-sm font-black uppercase tracking-wider"
            >
              Comprobar Gran Quiz
            </button>

            {quizChecked && (
              <button
                type="button"
                onClick={() => {
                  playBadgeSound();
                  setStep(4);
                }}
                className="game-button-ok py-3 px-8 text-sm font-black uppercase tracking-wider flex items-center gap-2 animate-bounce"
              >
                <span>¡Ver Gran Medalla y Diploma!</span>
                <Trophy className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* STEP 4: Gran Trofeo y Diploma */}
      {step === 4 && (
        <div className="game-dialog-card p-8 sm:p-10 text-center space-y-6">
          <div className="game-ribbon-yellow mx-auto">
            ¡GRAN RETO FINAL SUPERADO!
          </div>

          <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-b from-amber-300 to-amber-500 border-4 border-amber-200 shadow-[0_10px_0_0_#b45309] flex items-center justify-center text-6xl animate-bounce">
            🏆
          </div>

          <span className="text-xs font-black uppercase tracking-widest text-amber-300 bg-amber-950/60 px-5 py-2 rounded-full border border-amber-400 inline-block">
            ¡ENHORABUENA, {studentName.toUpperCase()}!
          </span>

          <h3 className="text-2xl sm:text-4xl font-black text-white drop-shadow">
            ¡Has ganado la Gran Medalla de Patios para Todos!
          </h3>

          <p className="text-sm sm:text-base text-indigo-100 font-bold max-w-lg mx-auto leading-relaxed">
            Has completado todas las misiones del <strong>Tema 1 de Ciencias Naturales</strong>: las funciones vitales, los aparatos de la nutrición, el experimento de los pulmones, la relación y el movimiento, la reproducción humana y la igualdad deportiva con Kathrine Switzer.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenMedals}
              className="game-button-ok py-3.5 px-8 text-sm font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer"
            >
              <Award className="w-5 h-5" />
              <span>Ver mi Diploma Oficial</span>
            </button>

            {onOpenReview && (
              <button
                type="button"
                onClick={onOpenReview}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-b from-amber-300 to-amber-500 text-amber-950 font-black text-sm uppercase tracking-wider flex items-center gap-2 border-2 border-amber-600 shadow-[0_4px_0_0_#b45309] cursor-pointer hover:scale-102 transition-transform"
              >
                <Sparkles className="w-4 h-4 text-amber-900" />
                <span>⭐ Súper Repaso del Tema 1</span>
              </button>
            )}

            <button
              type="button"
              onClick={onOpenBook}
              className="px-6 py-3.5 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 border-2 border-slate-300 shadow-[0_4px_0_0_#94a3b8] text-sm font-black cursor-pointer"
            >
              📖 Cuaderno Digital de Ciencias
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

