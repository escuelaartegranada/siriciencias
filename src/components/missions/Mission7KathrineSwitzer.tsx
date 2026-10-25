import React, { useState } from 'react';
import { Sparkles, Check, HelpCircle, ArrowRight, RotateCcw, Award, Heart, Trophy, Medal } from 'lucide-react';
import { NarratorSpeaker } from '../NarratorSpeaker';
import { playClickSound, playSuccessSound, playTryAgainSound, playBadgeSound } from '../../utils/audio';

interface Props {
  onComplete: () => void;
  onOpenBook: () => void;
  onSaveDorsal?: (dorsal: { number: string; text: string; color: string }) => void;
}

export const Mission7KathrineSwitzer: React.FC<Props> = ({ onComplete, onOpenBook, onSaveDorsal }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Story step
  const [currentSlide, setCurrentSlide] = useState(0);

  // Emotions activity (Page 22)
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

  // Dorsal creator (Page 22)
  const [dorsalNumber, setDorsalNumber] = useState('261');
  const [dorsalText, setDorsalText] = useState('¡Deporte para todas y todos!');
  const [dorsalColor, setDorsalColor] = useState('bg-rose-500');

  const storySlides = [
    {
      step: 1,
      title: '1. El comienzo de su sueño',
      text: 'A Kathrine le apasionaba correr. Se apuntó al equipo de atletismo masculino porque en aquella época ni siquiera existía un equipo femenino.',
      icon: '🏃‍♀️'
    },
    {
      step: 2,
      title: '2. Una norma injusta',
      text: 'Quería correr una maratón de 42 kilómetros, pero no estaba permitido a las mujeres. ¡Creían erróneamente que las chicas no tenían la fuerza física suficiente!',
      icon: '🚫'
    },
    {
      step: 3,
      title: '3. El apoyo de su entrenador',
      text: 'Su entrenador comprobó su gran esfuerzo en los entrenamientos y le dijo: "Si estás preparada, ¡yo te apoyo para correr!"',
      icon: '🤝'
    },
    {
      step: 4,
      title: '4. El dorsal 261',
      text: 'Se inscribió como "K. V. Switzer" y le dieron el mítico dorsal 261. Durante la carrera, un juez intentó empujarla y quitarle el dorsal para que parase, pero sus compañeros la defendieron.',
      icon: '🎽'
    },
    {
      step: 5,
      title: '5. ¡Cruzó la meta!',
      text: 'Kathrine terminó la maratón de Boston con valentía. Demostró al mundo entero que mujeres y hombres pueden disfrutar y competir en los mismos deportes.',
      icon: '🏁'
    }
  ];

  const handleFinishDorsal = () => {
    playSuccessSound();
    if (onSaveDorsal) {
      onSaveDorsal({
        number: dorsalNumber,
        text: dorsalText,
        color: dorsalColor,
      });
    }
    setStep(3);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Banner */}
      <div className="game-dialog-card p-6 sm:p-7 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="game-ribbon-yellow mb-3">
              MISIÓN 7 · FICHA 7 (PÁGS. 21 Y 22)
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white drop-shadow">Kathrine Switzer: Un dorsal por la igualdad</h2>
            <p className="text-indigo-100 text-sm sm:text-base font-bold mt-1">
              ¿Puede una maratón cambiar el mundo? Historia de superación y respeto deportivo.
            </p>
          </div>

          <NarratorSpeaker
            text="Misión 7: Descubre a Kathrine Switzer. En 1967, las mujeres no tenían permitido correr maratones. Kathrine se inscribió con el dorsal 261 y cruzó la meta, demostrando que niñas y niños tenemos la misma capacidad y derecho a hacer deporte."
            label="Escuchar historia"
            size="md"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-2 rounded-2xl bg-indigo-950/60 border-2 border-indigo-400/30 backdrop-blur-md">
        {[
          { num: 1, label: '1. La Historia' },
          { num: 2, label: '2. Diseña tu Dorsal' },
          { num: 3, label: '3. Reflexión' },
          { num: 4, label: '4. ¡Medalla!' }
        ].map((s) => (
          <button
            key={s.num}
            type="button"
            onClick={() => {
              playClickSound();
              setStep(s.num as 1 | 2 | 3 | 4);
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

      {/* STEP 1: Story Slides */}
      {step === 1 && (
        <div className="game-dialog-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="game-ribbon-yellow">
              HISTORIA DE KATHRINE (PÁG. 21)
            </div>
            <NarratorSpeaker
              text={storySlides[currentSlide].text}
              label="Escuchar paso"
              size="sm"
            />
          </div>

          {/* Athletic equality illustrated banner (NO screenshot) */}
          <div className="bg-gradient-to-r from-purple-900/60 to-indigo-900/60 rounded-2xl p-4 border-2 border-indigo-300/30 flex flex-col sm:flex-row items-center gap-4 backdrop-blur-sm">
            <div className="flex items-center gap-3 p-2 bg-white/10 rounded-2xl border border-white/20">
              <span className="text-4xl">🏃‍♀️</span>
              <div className="bg-white/20 border-2 border-amber-300 px-3 py-1 rounded-xl text-center">
                <span className="block text-[10px] font-black text-amber-300">DORSAL</span>
                <span className="text-xl font-black text-white">261</span>
              </div>
              <span className="text-3xl">🏅</span>
            </div>
            <div className="text-xs sm:text-sm text-indigo-100 font-bold">
              <strong className="text-amber-300 block text-base mb-1 drop-shadow">¡La historia de superación de Kathrine Switzer!</strong>
              En el maratón de Boston de 1967, Kathrine desafió normas injustas para correr 42 kilómetros con su dorsal 261. Demostró la igualdad y valentía de las mujeres en el deporte.
            </div>
          </div>

          {/* Current slide card */}
          <div className="bg-indigo-950/60 rounded-3xl p-6 sm:p-8 border-2 border-indigo-400/40 text-center flex flex-col items-center justify-center min-h-[260px] backdrop-blur-sm">
            <span className="text-6xl mb-3">{storySlides[currentSlide].icon}</span>
            <span className="text-xs font-black uppercase tracking-widest text-amber-300 mb-1 drop-shadow">
              Paso {storySlides[currentSlide].step} de 5
            </span>
            <h4 className="text-xl sm:text-2xl font-black text-white mb-2 drop-shadow">
              {storySlides[currentSlide].title}
            </h4>
            <p className="text-sm sm:text-base text-indigo-100 max-w-lg mx-auto font-bold leading-relaxed">
              {storySlides[currentSlide].text}
            </p>
          </div>

          {/* Slide Navigation */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              disabled={currentSlide === 0}
              onClick={() => {
                playClickSound();
                setCurrentSlide(c => Math.max(0, c - 1));
              }}
              className="game-pill-row py-2.5 px-5 rounded-xl font-black text-xs min-h-[44px] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              &larr; Anterior
            </button>

            <div className="flex items-center gap-1.5">
              {storySlides.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-3 rounded-full transition-all ${
                    idx === currentSlide ? 'bg-amber-400 w-7 shadow-sm' : 'bg-indigo-400/40 w-3'
                  }`}
                />
              ))}
            </div>

            {currentSlide < storySlides.length - 1 ? (
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setCurrentSlide(c => c + 1);
                }}
                className="game-button-ok py-2.5 px-6 text-xs font-black uppercase tracking-wider cursor-pointer"
              >
                Siguiente paso &rarr;
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setStep(2);
                }}
                className="game-button-ok py-2.5 px-6 text-xs font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer bg-gradient-to-b from-amber-300 to-amber-500 border-amber-600 shadow-[0_6px_0_0_#b45309] text-amber-950"
              >
                <span>¡Diseñar mi dorsal!</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* STEP 2: Diseña tu dorsal por la igualdad (Página 22) */}
      {step === 2 && (
        <div className="game-dialog-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="game-ribbon-yellow">
              DISEÑA TU DORSAL (PÁG. 22)
            </div>
            <NarratorSpeaker
              text="Diseña tu dorsal por la igualdad. Elige tu número, tu color favorito y una frase que defina la igualdad en el deporte."
              size="sm"
            />
          </div>

          <p className="text-sm font-bold text-indigo-100 bg-indigo-950/40 p-3 rounded-2xl border border-indigo-400/30">
            Crea el dorsal para llevarlo simbólicamente en el recreo o en las clases de educación física:
          </p>

          {/* Illustrated banner (NO screenshot) */}
          <div className="bg-gradient-to-r from-purple-900/60 to-pink-900/60 rounded-2xl p-4 border-2 border-amber-300/40 flex flex-col sm:flex-row items-center gap-4 backdrop-blur-sm">
            <div className="flex items-center gap-3 p-3 bg-white/10 rounded-2xl border border-white/20 text-3xl">
              <span>🏃‍♀️</span>
              <span>🎽</span>
              <span>🏅</span>
            </div>
            <div className="text-xs sm:text-sm text-indigo-100 font-bold">
              <strong className="text-amber-300 block text-base mb-1 drop-shadow">¡Dorsal por la igualdad en el recreo!</strong>
              Diseña tu propio dorsal para celebrar que las niñas y los niños pueden correr, jugar y practicar cualquier deporte en igualdad.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* The Dorsal preview */}
            <div className="flex justify-center">
              <div className={`w-64 h-80 ${dorsalColor} text-white rounded-3xl shadow-2xl p-6 flex flex-col justify-between items-center text-center border-4 border-white ring-4 ring-amber-300 relative`}>
                <div className="w-full flex justify-between items-center border-b border-white/40 pb-2 text-[10px] uppercase font-black tracking-widest">
                  <span>MARATÓN ESCOLAR</span>
                  <span>IGUALDAD</span>
                </div>

                <div className="my-auto">
                  <span className="text-6xl font-black tracking-tighter drop-shadow-md block font-mono">
                    {dorsalNumber || '261'}
                  </span>
                  <span className="text-xs font-black uppercase tracking-wider text-white/95 block mt-1">
                    ATLETA DE CIENCIAS
                  </span>
                </div>

                <div className="w-full bg-white/25 backdrop-blur-sm rounded-xl p-2.5 text-xs font-black">
                  "{dorsalText}"
                </div>
              </div>
            </div>

            {/* Customizer controls */}
            <div className="space-y-4 bg-white/10 p-5 rounded-2xl border-2 border-indigo-300/30 backdrop-blur-sm">
              <div>
                <label className="block text-xs font-black text-amber-300 uppercase mb-1 drop-shadow">
                  Número del Dorsal:
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  {['261', '7', '10', '99'].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setDorsalNumber(num)}
                      className={`px-3 py-2 rounded-xl font-mono font-black text-sm min-h-[44px] cursor-pointer ${
                        dorsalNumber === num ? 'game-pill-active ring-2 ring-emerald-300' : 'game-pill-row hover:brightness-105'
                      }`}
                    >
                      {num} {num === '261' ? '(Kathrine)' : ''}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-amber-300 uppercase mb-1 drop-shadow">
                  Lema por la Igualdad:
                </label>
                <div className="space-y-2">
                  {[
                    '¡Deporte para todas y todos!',
                    '¡Niñas y niños con la misma fuerza!',
                    '¡En el patio jugamos juntos!',
                    '¡Corriendo hacia la igualdad!'
                  ].map((phrase) => (
                    <button
                      key={phrase}
                      type="button"
                      onClick={() => setDorsalText(phrase)}
                      className={`w-full py-2.5 px-3 rounded-xl font-black text-xs text-left min-h-[40px] cursor-pointer ${
                        dorsalText === phrase ? 'game-pill-active ring-2 ring-emerald-300' : 'game-pill-row hover:brightness-105'
                      }`}
                    >
                      {phrase}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-amber-300 uppercase mb-1 drop-shadow">
                  Color del Dorsal:
                </label>
                <div className="flex items-center gap-3">
                  {[
                    { bg: 'bg-rose-500', label: 'Rojo Kathrine' },
                    { bg: 'bg-indigo-600', label: 'Azul' },
                    { bg: 'bg-emerald-500', label: 'Verde' },
                    { bg: 'bg-amber-500', label: 'Dorado' }
                  ].map((c) => (
                    <button
                      key={c.bg}
                      type="button"
                      onClick={() => setDorsalColor(c.bg)}
                      className={`w-10 h-10 rounded-2xl ${c.bg} border-3 transition-transform cursor-pointer ${
                        dorsalColor === c.bg ? 'border-white scale-115 shadow-lg ring-2 ring-amber-300' : 'border-white/60 hover:scale-105'
                      }`}
                      title={c.label}
                    />
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleFinishDorsal}
                className="game-button-ok w-full py-3.5 text-sm font-black uppercase tracking-wider cursor-pointer"
              >
                ¡Guardar mi Dorsal de Campeona!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Reflexión y empatía (Página 22) */}
      {step === 3 && (
        <div className="game-dialog-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="game-ribbon-yellow">
              EDUCACIÓN EMOCIONAL (PÁG. 22)
            </div>
            <NarratorSpeaker
              text="Algunas personas intentaron empujar y detener a Kathrine para que no corriera. ¿Cómo crees que se sintió? ¿Asustada, enfadada pero con valentía para seguir adelante?"
              size="sm"
            />
          </div>

          <p className="text-sm font-bold text-indigo-100 bg-indigo-950/40 p-3 rounded-2xl border border-indigo-400/30">
            Cuando algunas personas intentaron parar a Kathrine injustamente: ¿Cómo crees que se sintió?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'enfado', title: 'Sintió injusticia y enfado', desc: 'Porque no había motivo para discriminarla solo por ser mujer.', emoji: '😠' },
              { id: 'valentia', title: 'Sintió fuerza y valentía', desc: 'Decidió seguir corriendo hasta cruzar la meta por todas las niñas.', emoji: '💪' },
              { id: 'agradecimiento', title: 'Agradeció el apoyo', desc: 'Sus compañeros de carrera y entrenador la protegieron en equipo.', emoji: '❤️' },
            ].map((emo) => (
              <button
                key={emo.id}
                type="button"
                onClick={() => {
                  playClickSound();
                  setSelectedEmotion(emo.id);
                  playSuccessSound();
                }}
                className={`p-4 rounded-2xl border-2 text-center flex flex-col items-center justify-center min-h-[140px] transition-all cursor-pointer ${
                  selectedEmotion === emo.id
                    ? 'game-pill-active ring-2 ring-emerald-300'
                    : 'game-pill-row hover:brightness-105'
                }`}
              >
                <span className="text-4xl mb-2">{emo.emoji}</span>
                <span className="font-black text-slate-900 text-sm mb-1">{emo.title}</span>
                <span className="text-xs text-slate-700 font-bold">{emo.desc}</span>
              </button>
            ))}
          </div>

          <div className="p-4 bg-white/10 rounded-2xl border-2 border-indigo-300/30 text-xs sm:text-sm text-indigo-100 font-bold backdrop-blur-sm">
            <strong className="text-amber-300 block mb-1">Mensaje de Ciencias y Valores:</strong> En el colegio y en la vida, todos los niños y niñas tenemos los mismos derechos para correr, jugar al fútbol, baloncesto, comba o a lo que nos guste. ¡La igualdad nos hace a todos más fuertes!
          </div>

          <div className="flex justify-end pt-2">
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
          </div>
        </div>
      )}

      {/* STEP 4: Medalla */}
      {step === 4 && (
        <div className="game-dialog-card p-8 sm:p-10 text-center space-y-6">
          <div className="game-ribbon-yellow mx-auto">
            ¡MISIÓN 7 SUPERADA!
          </div>

          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-b from-amber-300 to-amber-500 border-4 border-amber-200 shadow-[0_8px_0_0_#b45309] flex items-center justify-center text-5xl animate-bounce">
            🏃‍♀️
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white drop-shadow">
            ¡Has ganado la Medalla de la Igualdad en el Deporte!
          </h3>
          <p className="text-sm font-bold text-indigo-100 max-w-md mx-auto">
            ¡Conoces la historia de Kathrine Switzer y el valor del respeto y la igualdad para todos los deportistas!
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenBook}
              className="game-pill-row py-3 px-6 text-sm font-black cursor-pointer hover:brightness-105"
            >
              📖 Ver Ficha 7 en el Libro
            </button>
            <button
              type="button"
              onClick={() => {
                playClickSound();
                const nextBtn = document.querySelector('[title="Misión 8: Gran Reto: Patios de Todos y para Todos"]') as HTMLButtonElement;
                if (nextBtn) nextBtn.click();
              }}
              className="game-button-ok py-3.5 px-8 text-sm font-black uppercase tracking-wider flex items-center gap-2"
            >
              <span>Ir al Gran Reto Final: Patios para Todos</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

