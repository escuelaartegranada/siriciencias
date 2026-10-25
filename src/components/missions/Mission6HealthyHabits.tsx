import React, { useState } from 'react';
import { Sparkles, Check, HelpCircle, ArrowRight, RotateCcw, Award, Smile, Frown, Heart, Sun, Apple, Moon } from 'lucide-react';
import { NarratorSpeaker } from '../NarratorSpeaker';
import { playClickSound, playSuccessSound, playTryAgainSound, playBadgeSound } from '../../utils/audio';
import {
  HealthyFoodIllustration,
  SportBallIllustration,
  SleepBedIllustration,
  WashHandsIllustration,
  OutdoorNatureIllustration
} from '../Illustrations';

interface Props {
  onComplete: () => void;
  onOpenBook: () => void;
}

export const Mission6HealthyHabits: React.FC<Props> = ({ onComplete, onOpenBook }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Exercise 1: Faces (Happy vs Sad) for page 19
  const [faces, setFaces] = useState<{ [photoId: string]: 'feliz' | 'triste' }>({});
  const [step1Checked, setStep1Checked] = useState(false);

  // Exercise 2: Poster stamps (Page 20)
  const [posterWords, setPosterWords] = useState<string[]>([]);

  // Exercise 3: Good habits checkboxes (Page 20)
  const [goodHabits, setGoodHabits] = useState<string[]>([]);
  const [step3Checked, setStep3Checked] = useState(false);

  // Exercise 4: Nerea & Adrián case (Page 28)
  const [caseAnswer, setCaseAnswer] = useState<string | null>(null);
  const [step4Checked, setStep4Checked] = useState(false);

  const [feedback, setFeedback] = useState<string | null>(null);

  // --- Step 1: Faces ---
  const situations = [
    {
      id: 'sofa',
      title: 'Tarde entera en el sofá comiendo patatas frente a la pantalla',
      correct: 'triste',
      emoji: '📺 🍟',
      reason: 'El sedentarismo y la comida poco saludable no ayudan al cuerpo.'
    },
    {
      id: 'parque',
      title: 'Jugando con amigos en el parque verde al aire libre',
      correct: 'feliz',
      emoji: '🌳 🥏',
      reason: 'El aire puro, la amistad y el movimiento son maravillosos para la salud.'
    },
    {
      id: 'baloncesto',
      title: 'Partido de baloncesto en equipo en el polideportivo',
      correct: 'feliz',
      emoji: '🏀 👟',
      reason: 'El ejercicio físico fortalece el corazón, huesos y músculos.'
    },
    {
      id: 'exclusion',
      title: 'Cuchichear y dejar a un compañero solo y triste en el aula',
      correct: 'triste',
      emoji: '😢 🤫',
      reason: 'Hábito no saludable. En el patio y en clase debemos invitar a todos a jugar.'
    }
  ];

  const handleFace = (id: string, choice: 'feliz' | 'triste') => {
    playClickSound();
    setFaces(prev => ({ ...prev, [id]: choice }));
    setFeedback(null);
  };

  const checkStep1 = () => {
    const allAnswered = situations.every(s => faces[s.id] !== undefined);
    if (!allAnswered) {
      setFeedback('Elige una carita (feliz o triste) para cada una de las 4 fotos del libro.');
      playTryAgainSound();
      return;
    }

    const allCorrect = situations.every(s => faces[s.id] === s.correct);
    if (allCorrect) {
      playSuccessSound();
      setFeedback('¡Muy bien observado! Jugar en la naturaleza y hacer deporte nos hacen felices; el aislamiento y la mala comida dañan la salud.');
      setStep1Checked(true);
    } else {
      playTryAgainSound();
      setFeedback('Revisa tus caritas: los hábitos saludables son el deporte, el aire libre y la inclusión de todos.');
    }
  };

  // --- Step 2: Poster stamps ---
  const stamps = [
    { id: 'dieta', word: 'Dieta', desc: 'Comer variado: frutas, verduras, legumbres y agua', illustration: <HealthyFoodIllustration className="w-12 h-12" />, icon: '🥗' },
    { id: 'deporte', word: 'Deporte', desc: 'Mover el cuerpo jugando, saltando y corriendo', illustration: <SportBallIllustration className="w-12 h-12" />, icon: '⚽' },
    { id: 'sueno', word: 'Sueño', desc: 'Descansar 9-10 horas cada noche sin pantallas', illustration: <SleepBedIllustration className="w-12 h-12" />, icon: '🌙' },
    { id: 'higiene', word: 'Higiene', desc: 'Lavarse las manos, ducharse y cepillarse los dientes', illustration: <WashHandsIllustration className="w-12 h-12" />, icon: '🧼' },
    { id: 'naturaleza', word: 'Naturaleza', desc: 'Tiempo libre respirando aire limpio en el campo o parque', illustration: <OutdoorNatureIllustration className="w-12 h-12" />, icon: '🌲' },
  ];

  const toggleStamp = (id: string) => {
    playClickSound();
    setPosterWords(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // --- Step 3: Habits checkboxes (Page 20) ---
  const habitItems = [
    { id: 'pantallas', text: 'Mirar mucho tiempo pantallas', isGood: false },
    { id: 'fruta', text: 'Comer a diario frutas y verduras', isGood: true },
    { id: 'airelibre', text: 'Jugar al aire libre con amigos', isGood: true },
    { id: 'noducha', text: 'No ducharse', isGood: false },
  ];

  const toggleHabit = (id: string) => {
    playClickSound();
    setGoodHabits(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
    setFeedback(null);
  };

  const checkStep3 = () => {
    const isFruta = goodHabits.includes('fruta');
    const isAire = goodHabits.includes('airelibre');
    const isPantalla = goodHabits.includes('pantallas');
    const isNoDucha = goodHabits.includes('noducha');

    if (isFruta && isAire && !isPantalla && !isNoDucha) {
      playSuccessSound();
      setFeedback('¡Exacto! Comer frutas y verduras y jugar al aire libre son los hábitos que debemos practicar a diario.');
      setStep3Checked(true);
    } else {
      playTryAgainSound();
      setFeedback('Marca únicamente los hábitos que SÍ son buenos para tu salud.');
    }
  };

  // --- Step 4: Nerea & Adrián ---
  const checkStep4 = () => {
    if (caseAnswer === 'nerea') {
      playSuccessSound();
      setFeedback('¡Exactamente! Nerea ha merendado fruta y ha hecho ejercicio en natación. Por eso su mente está fresca y descansada.');
      setStep4Checked(true);
    } else {
      playTryAgainSound();
      setFeedback('Fíjate en lo que hizo cada uno: Adrián comió comida ultraprocesada y pasó la tarde frente a la pantalla sin moverse.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Banner */}
      <div className="game-dialog-card p-6 sm:p-7 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="game-ribbon-yellow mb-3">
              MISIÓN 6 · FICHA 6 (PÁGS. 19, 20 Y 28)
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white drop-shadow">¿El entorno influye en mi salud?</h2>
            <p className="text-indigo-100 text-sm sm:text-base font-bold mt-1">
              Los 5 hábitos saludables: higiene, descanso, deporte, naturaleza y dieta sana.
            </p>
          </div>

          <NarratorSpeaker
            text="Misión 6: ¿El entorno influye en mi salud? Hay hábitos que ayudan a que el cuerpo y la mente se desarrollen saludables. Los 5 pilares son: la higiene, el descanso, el ejercicio físico, el tiempo en la naturaleza y la alimentación sana."
            label="Escuchar explicación"
            size="md"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-2 rounded-2xl bg-indigo-950/60 border-2 border-indigo-400/30 backdrop-blur-md">
        {[
          { num: 1, label: '1. ¿Beneficioso?' },
          { num: 2, label: '2. Cartel de Salud' },
          { num: 3, label: '3. Buenos Hábitos' },
          { num: 4, label: '4. Nerea y Adrián' },
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

      {/* STEP 1: Beneficiosos para la salud (Página 19) */}
      {step === 1 && (
        <div className="game-dialog-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="game-ribbon-yellow">
              HÁBITOS BENEFICIOSOS (PÁG. 19)
            </div>
            <NarratorSpeaker
              text="¿Qué hábitos son beneficiosos para la salud? Marca carita sonriente para los hábitos sanos y carita triste para los poco saludables."
              size="sm"
            />
          </div>

          <p className="text-sm font-bold text-indigo-100 bg-indigo-950/40 p-3 rounded-2xl border border-indigo-400/30">
            Marca carita feliz (😊) o carita triste (😟) según la situación del libro:
          </p>

          {/* Illustrated habits banner (NO screenshot) */}
          <div className="bg-gradient-to-r from-teal-900/60 to-emerald-900/60 rounded-2xl p-4 border-2 border-emerald-300/40 flex flex-col sm:flex-row items-center gap-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 p-2 bg-white/10 rounded-2xl border border-white/20 text-3xl">
              <span>🍎</span>
              <span>⚽</span>
              <span>🧼</span>
              <span>🌙</span>
              <span>🌳</span>
            </div>
            <div className="text-xs sm:text-sm text-indigo-100 font-bold">
              <strong className="text-amber-300 block text-base mb-1 drop-shadow">¡Los 5 hábitos para crecer con salud!</strong>
              Comer sano, hacer deporte al aire libre, mantener la higiene, dormir 9-10 horas y disfrutar de la naturaleza y los amigos.
            </div>
          </div>

          <div className="space-y-4">
            {situations.map((sit) => {
              const choice = faces[sit.id];
              return (
                <div key={sit.id} className="p-4 bg-white/10 rounded-2xl border-2 border-indigo-300/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2 bg-indigo-950/40 rounded-2xl border border-indigo-300/30 shadow-sm">{sit.emoji}</span>
                    <span className="font-bold text-white text-sm sm:text-base drop-shadow">{sit.title}</span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => handleFace(sit.id, 'feliz')}
                      className={`flex-1 sm:flex-initial py-2.5 px-4 rounded-xl font-black text-xs sm:text-sm min-h-[44px] transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        choice === 'feliz'
                          ? 'game-pill-active ring-2 ring-emerald-300'
                          : 'game-pill-row hover:brightness-105'
                      }`}
                    >
                      <Smile className="w-5 h-5 text-emerald-800" />
                      <span>Saludable</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleFace(sit.id, 'triste')}
                      className={`flex-1 sm:flex-initial py-2.5 px-4 rounded-xl font-black text-xs sm:text-sm min-h-[44px] transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        choice === 'triste'
                          ? 'bg-rose-500 text-white border-2 border-rose-300 shadow-md'
                          : 'game-pill-row hover:brightness-105'
                      }`}
                    >
                      <Frown className="w-5 h-5 text-rose-300" />
                      <span>No saludable</span>
                    </button>
                  </div>
                </div>
              );
            })}
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
              Comprobar caritas
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
                <span>Siguiente: El Cartel</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* STEP 2: Inventa un cartel sobre la salud (Página 20) */}
      {step === 2 && (
        <div className="game-dialog-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="game-ribbon-yellow">
              CARTEL DE SALUD (PÁG. 20)
            </div>
            <NarratorSpeaker
              text="Inventa un cartel sobre el cuidado de la salud. Toca las cinco palabras: dieta, deporte, sueño, higiene y naturaleza."
              size="sm"
            />
          </div>

          <p className="text-sm font-bold text-indigo-100 bg-indigo-950/40 p-3 rounded-2xl border border-indigo-400/30">
            Toca los 5 sellos mágicos con las palabras clave para completar el cartel escolar:
          </p>

          {/* Illustrated 5-habits banner (NO screenshot) */}
          <div className="bg-gradient-to-r from-teal-900/60 to-emerald-900/60 rounded-2xl p-4 border-2 border-emerald-300/40 flex flex-col sm:flex-row items-center gap-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 p-2.5 bg-white/10 rounded-2xl border border-white/20 text-3xl">
              <span>🍎</span>
              <span>⚽</span>
              <span>🧼</span>
              <span>🌙</span>
              <span>🌳</span>
            </div>
            <div className="text-xs sm:text-sm text-indigo-100 font-bold">
              <strong className="text-amber-300 block text-base mb-1 drop-shadow">¡El cartel de la salud con los 5 hábitos de oro!</strong>
              Las 5 claves esenciales para crecer sanos, fuertes y con energía: Dieta sana, Deporte diario, Sueño reparador, Higiene y paseos por la Naturaleza.
            </div>
          </div>

          {/* The Poster Board */}
          <div className="bg-indigo-950/60 p-6 rounded-3xl border-4 border-dashed border-amber-300/60 min-h-[220px] flex flex-col items-center justify-center text-center backdrop-blur-sm">
            <span className="text-xs font-black uppercase tracking-widest text-amber-300 mb-1 drop-shadow">
              Cartel Escolar · 2º Primaria
            </span>
            <h4 className="text-xl sm:text-2xl font-black text-white mb-4 drop-shadow">
              ¡CUIDAMOS NUESTRO CUERPO Y NUESTRA MENTE!
            </h4>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {stamps.map((st) => {
                const isPlaced = posterWords.includes(st.id);
                return (
                  <div
                    key={st.id}
                    className={`py-2 px-4 rounded-2xl border-2 flex items-center gap-2 font-black transition-all ${
                      isPlaced
                        ? 'game-pill-active ring-2 ring-emerald-300 scale-105'
                        : 'bg-indigo-900/40 border-indigo-500/30 text-indigo-300 opacity-60'
                    }`}
                  >
                    <span className="text-2xl">{st.icon}</span>
                    <span className="text-sm">{st.word}</span>
                    {isPlaced && <span className="text-emerald-800 font-black">✓</span>}
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-indigo-200 mt-4 font-bold">
              {posterWords.length === 5
                ? '¡Fantástico cartel! Contiene las 5 palabras esenciales del libro.'
                : `Coloca los sellos que faltan (${posterWords.length}/5)`}
            </p>
          </div>

          {/* Stamp selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {stamps.map((st) => {
              const isPlaced = posterWords.includes(st.id);
              return (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => toggleStamp(st.id)}
                  className={`p-3 rounded-2xl border-2 text-left flex items-start gap-3 transition-all min-h-[72px] cursor-pointer ${
                    isPlaced
                      ? 'game-pill-active ring-2 ring-emerald-300'
                      : 'game-pill-row hover:brightness-105'
                  }`}
                >
                  <div className="p-1 bg-white/70 rounded-xl border border-indigo-200 flex-shrink-0">
                    {st.illustration}
                  </div>
                  <div>
                    <h5 className="font-black text-sm text-slate-900">{st.word}</h5>
                    <p className="text-xs text-slate-700 font-semibold">{st.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-end pt-2">
            {posterWords.length === 5 && (
              <button
                type="button"
                onClick={() => {
                  playSuccessSound();
                  setStep(3);
                }}
                className="game-button-ok py-3 px-8 text-sm font-black uppercase tracking-wider flex items-center gap-2 bg-gradient-to-b from-amber-300 to-amber-500 border-amber-600 shadow-[0_6px_0_0_#b45309] text-amber-950"
              >
                <span>Siguiente: Buenos Hábitos</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* STEP 3: Buenos hábitos (Página 20) */}
      {step === 3 && (
        <div className="game-dialog-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="game-ribbon-yellow">
              BUENOS HÁBITOS (PÁG. 20)
            </div>
            <NarratorSpeaker
              text="¿Qué hábitos son buenos para tu salud? Marca: mirar mucho tiempo pantallas, comer a diario frutas y verduras, jugar al aire libre con amigos o no ducharse."
              size="sm"
            />
          </div>

          <p className="text-sm font-bold text-indigo-100 bg-indigo-950/40 p-3 rounded-2xl border border-indigo-400/30">
            Marca únicamente las casillas de los hábitos recomendables a diario:
          </p>

          <div className="space-y-3">
            {habitItems.map((h) => {
              const isChecked = goodHabits.includes(h.id);
              return (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => toggleHabit(h.id)}
                  className={`w-full p-4 rounded-2xl border-2 text-left flex items-center gap-3 transition-all min-h-[56px] cursor-pointer ${
                    isChecked
                      ? 'game-pill-active ring-2 ring-emerald-300'
                      : 'game-pill-row hover:brightness-105'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center font-black ${
                    isChecked ? 'bg-emerald-800 border-emerald-900 text-white' : 'border-indigo-300 bg-white'
                  }`}>
                    {isChecked ? '✓' : ''}
                  </div>
                  <span className="font-black text-sm sm:text-base text-slate-900">{h.text}</span>
                </button>
              );
            })}
          </div>

          {feedback && (
            <div className={`p-4 rounded-2xl font-black text-sm border-2 ${step3Checked ? 'bg-emerald-500/90 text-white border-emerald-300 shadow-md' : 'bg-amber-400 text-amber-950 border-amber-500 shadow-md'}`}>
              {feedback}
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={checkStep3}
              className="game-button-ok py-3 px-8 text-sm font-black uppercase tracking-wider"
            >
              Comprobar hábitos
            </button>

            {step3Checked && (
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setStep(4);
                  setFeedback(null);
                }}
                className="game-button-ok py-3 px-8 text-sm font-black uppercase tracking-wider flex items-center gap-2 bg-gradient-to-b from-amber-300 to-amber-500 border-amber-600 shadow-[0_6px_0_0_#b45309] text-amber-950"
              >
                <span>Siguiente: Nerea y Adrián</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* STEP 4: Caso Nerea y Adrián (Página 28) */}
      {step === 4 && (
        <div className="game-dialog-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="game-ribbon-yellow">
              AMPLÍA TU HORIZONTE (PÁG. 28)
            </div>
            <NarratorSpeaker
              text="Nerea y Adrián van al mismo colegio. Adrián ha estado toda la tarde jugando a la consola y comiendo palomitas. Le duele la cabeza, el estómago y está cansado. Nerea, por el contrario, ha ido a natación, ha merendado fruta y termina sus tareas tranquila. ¿Quién crees que ha tenido hábitos saludables?"
              size="sm"
            />
          </div>

          {/* Illustrated comparison banner for Nerea & Adrián (NO screenshot) */}
          <div className="bg-gradient-to-r from-purple-900/60 to-indigo-900/60 rounded-2xl p-4 border-2 border-indigo-300/30 flex flex-col sm:flex-row items-center gap-4 backdrop-blur-sm">
            <div className="flex items-center gap-3 p-2 bg-white/10 rounded-2xl border border-white/20">
              <div className="flex flex-col items-center">
                <span className="text-3xl">🏊‍♀️</span>
                <span className="text-[10px] font-black text-emerald-300">Nerea</span>
              </div>
              <span className="text-lg font-black text-amber-300">VS</span>
              <div className="flex flex-col items-center">
                <span className="text-3xl">🎮</span>
                <span className="text-[10px] font-black text-rose-300">Adrián</span>
              </div>
            </div>
            <div className="text-xs sm:text-sm text-indigo-100 font-bold">
              <strong className="text-amber-300 block text-base mb-1 drop-shadow">¡El caso práctico de Nerea y Adrián!</strong>
              Nerea y Adrián van al mismo colegio pero eligen hábitos muy diferentes por la tarde. Fíjate en cómo influye la merienda y el ejercicio en cómo se sienten al hacer los deberes.
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white/10 rounded-2xl border-2 border-indigo-300/30 backdrop-blur-sm">
              <span className="font-black text-rose-300 text-base block mb-1 drop-shadow">🎮 Caso de Adrián</span>
              <p className="text-xs text-indigo-100 leading-relaxed mb-3 font-semibold">
                Tarde entera con la videoconsola, comiendo palomitas sin parar. Cuando va a hacer deberes, le duele la cabeza y el estómago y está muy irritable.
              </p>
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setCaseAnswer('adrian');
                  setFeedback(null);
                }}
                className={`w-full py-3 px-3 rounded-xl font-black text-xs min-h-[44px] transition-all cursor-pointer ${
                  caseAnswer === 'adrian'
                    ? 'bg-rose-500 text-white border-2 border-rose-300 shadow-md'
                    : 'game-pill-row hover:brightness-105'
                }`}
              >
                Adrián tuvo hábitos saludables
              </button>
            </div>

            <div className="p-4 bg-white/10 rounded-2xl border-2 border-indigo-300/30 backdrop-blur-sm">
              <span className="font-black text-emerald-300 text-base block mb-1 drop-shadow">🏊‍♀️ Caso de Nerea</span>
              <p className="text-xs text-indigo-100 leading-relaxed mb-3 font-semibold">
                Fue a su clase de natación, merendó una rica fruta fresca con agua y se puso a hacer sus tareas tranquila y sonriente sin dolor.
              </p>
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setCaseAnswer('nerea');
                  setFeedback(null);
                }}
                className={`w-full py-3 px-3 rounded-xl font-black text-xs min-h-[44px] transition-all cursor-pointer ${
                  caseAnswer === 'nerea'
                    ? 'game-pill-active ring-2 ring-emerald-300'
                    : 'game-pill-row hover:brightness-105'
                }`}
              >
                Nerea tuvo hábitos saludables
              </button>
            </div>
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
              Comprobar respuesta
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
            ¡MISIÓN 6 SUPERADA!
          </div>

          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-b from-amber-300 to-amber-500 border-4 border-amber-200 shadow-[0_8px_0_0_#b45309] flex items-center justify-center text-5xl animate-bounce">
            🥗
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white drop-shadow">
            ¡Has ganado la Medalla de la Vida Sana!
          </h3>
          <p className="text-sm font-bold text-indigo-100 max-w-md mx-auto">
            ¡Conoces los 5 pilares para estar en plena forma: dieta, deporte, sueño, higiene y naturaleza!
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenBook}
              className="game-pill-row py-3 px-6 text-sm font-black cursor-pointer hover:brightness-105"
            >
              📖 Ver Ficha 6 en el Libro
            </button>
            <button
              type="button"
              onClick={() => {
                playClickSound();
                const nextBtn = document.querySelector('[title="Misión 7: Kathrine Switzer y su dorsal 261"]') as HTMLButtonElement;
                if (nextBtn) nextBtn.click();
              }}
              className="game-button-ok py-3.5 px-8 text-sm font-black uppercase tracking-wider flex items-center gap-2"
            >
              <span>Ir a la Misión 7: Kathrine Switzer</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

