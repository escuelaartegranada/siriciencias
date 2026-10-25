import React, { useState } from 'react';
import { Sparkles, Check, HelpCircle, ArrowRight, RotateCcw, Award, Heart, Shield, Baby } from 'lucide-react';
import { NarratorSpeaker } from '../NarratorSpeaker';
import { playClickSound, playSuccessSound, playTryAgainSound, playBadgeSound } from '../../utils/audio';
import {
  PregnancyStage1Illustration,
  PregnancyStage2Illustration,
  PregnancyStage3Illustration,
  RobotIllustration,
  HenChicksIllustration,
  HeartIllustration
} from '../Illustrations';

interface Props {
  onComplete: () => void;
  onOpenBook: () => void;
}

export const Mission5Reproduction: React.FC<Props> = ({ onComplete, onOpenBook }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Exercise 1: Two hearts riddle & Human reproduction image (Page 17)
  const [reproductionImage, setReproductionImage] = useState<string | null>(null);
  const [step1Checked, setStep1Checked] = useState(false);

  // Exercise 2: Organs of boys and girls (Page 18)
  const [organsMatched, setOrgansMatched] = useState<{ [organ: string]: 'chico' | 'chica' }>({});
  const [step2Checked, setStep2Checked] = useState(false);

  // Exercise 3: Pregnancy phases (Lucía, Page 18)
  const [pregnancyOrder, setPregnancyOrder] = useState<string[]>([]);
  const [step3Checked, setStep3Checked] = useState(false);

  // Exercise 4: Words related to reproduction (Page 18)
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [step4Checked, setStep4Checked] = useState(false);

  const [feedback, setFeedback] = useState<string | null>(null);

  // --- Step 1 ---
  const handleSelectImage = (id: string) => {
    playClickSound();
    setReproductionImage(id);
    if (id === 'bebe') {
      playSuccessSound();
      setFeedback('¡Correcto! Los seres humanos crecemos dentro del vientre de mamá (por eso durante el embarazo late el corazón de la madre y el del bebé).');
      setStep1Checked(true);
    } else {
      playTryAgainSound();
      setFeedback('Los robots son máquinas fabricadas y las aves nacen de huevos. Los seres humanos nacemos del vientre materno.');
    }
  };

  // --- Step 2: Organs ---
  const reproductionOrgans = [
    { id: 'testiculos', name: 'Testículos', icon: '💧', desc: 'Órgano que produce las células masculinas', correct: 'chico' },
    { id: 'utero', name: 'Útero', icon: '🤰', desc: 'La cunita donde crece el bebé durante 9 meses', correct: 'chica' },
    { id: 'pene', name: 'Pene', icon: '🚹', desc: 'Órgano reproductor externo de los chicos', correct: 'chico' },
    { id: 'ovarios', name: 'Ovarios', icon: '🌸', desc: 'Órganos internos de las chicas que contienen los óvulos', correct: 'chica' },
    { id: 'vagina', name: 'Vagina', icon: '🚺', desc: 'Canal femenino que comunica el útero hacia el exterior', correct: 'chica' },
  ];

  const handleMatchOrgan = (organId: string, group: 'chico' | 'chica') => {
    playClickSound();
    setOrgansMatched(prev => ({ ...prev, [organId]: group }));
    setFeedback(null);
  };

  const checkStep2 = () => {
    const allAssigned = reproductionOrgans.every(o => organsMatched[o.id] !== undefined);
    if (!allAssigned) {
      setFeedback('Asigna cada órgano al cuerpo de los chicos o de las chicas.');
      playTryAgainSound();
      return;
    }

    const allCorrect = reproductionOrgans.every(o => organsMatched[o.id] === o.correct);
    if (allCorrect) {
      playSuccessSound();
      setFeedback('¡Muy bien! Los órganos reproductores son diferentes entre mujeres y hombres.');
      setStep2Checked(true);
    } else {
      playTryAgainSound();
      setFeedback('Recuerda: los chicos tienen testículos y pene; las chicas tienen ovarios, útero y vagina.');
    }
  };

  // --- Step 3: Pregnancy Phases ---
  const pregnancyCards = [
    { id: 'inicio', label: '1. Inicio del embarazo', desc: 'Vientre pequeñito, el bebé mide apenas unos milímetros.', illustration: <PregnancyStage1Illustration className="w-14 h-14" /> },
    { id: 'medio', label: '2. Mitad del embarazo', desc: 'El vientre crece, el bebé ya tiene deditos y late con fuerza.', illustration: <PregnancyStage2Illustration className="w-14 h-14" /> },
    { id: 'final', label: '3. Final del embarazo', desc: 'Vientre grande y redondito, el bebé está listo para nacer.', illustration: <PregnancyStage3Illustration className="w-14 h-14" /> },
  ];

  const togglePregnancyCard = (id: string) => {
    playClickSound();
    if (pregnancyOrder.includes(id)) {
      setPregnancyOrder(pregnancyOrder.filter(x => x !== id));
    } else {
      if (pregnancyOrder.length < 3) {
        setPregnancyOrder([...pregnancyOrder, id]);
      }
    }
    setFeedback(null);
  };

  const checkStep3 = () => {
    if (pregnancyOrder.length < 3) {
      setFeedback('Toca las 3 fases en el orden en que crece la tripita de Lucía.');
      playTryAgainSound();
      return;
    }

    const isCorrect = pregnancyOrder[0] === 'inicio' && pregnancyOrder[1] === 'medio' && pregnancyOrder[2] === 'final';
    if (isCorrect) {
      playSuccessSound();
      setFeedback('¡Perfecto! El bebé tarda 9 meses en desarrollarse antes de nacer.');
      setStep3Checked(true);
    } else {
      playTryAgainSound();
      setFeedback('El vientre empieza pequeño y va creciendo mes a mes hasta el nacimiento.');
    }
  };

  // --- Step 4: Palabras relacionadas con reproducción (Página 18) ---
  const wordsList = [
    { id: 'descendiente', word: 'Descendiente', isRepro: true },
    { id: 'pulmon', word: 'Pulmón', isRepro: false },
    { id: 'testiculos', word: 'Testículos', isRepro: true },
    { id: 'intestino', word: 'Intestino', isRepro: false },
    { id: 'utero', word: 'Útero', isRepro: true },
    { id: 'hueso', word: 'Hueso', isRepro: false },
    { id: 'padres', word: 'Padres', isRepro: true },
  ];

  const toggleWord = (id: string) => {
    playClickSound();
    setSelectedWords(prev =>
      prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]
    );
    setFeedback(null);
  };

  const checkStep4 = () => {
    const correctSelected = selectedWords.filter(id => wordsList.find(w => w.id === id)?.isRepro);
    const incorrectSelected = selectedWords.filter(id => !wordsList.find(w => w.id === id)?.isRepro);

    if (correctSelected.length === 4 && incorrectSelected.length === 0) {
      playSuccessSound();
      setFeedback('¡Sensacional! Descendiente, testículos, útero y padres son las palabras de la función de reproducción.');
      setStep4Checked(true);
    } else {
      playTryAgainSound();
      setFeedback('Selecciona únicamente las palabras relacionadas con la reproducción (pulmón, intestino y hueso son de otros temas).');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Banner */}
      <div className="game-dialog-card p-6 sm:p-7 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="game-ribbon-yellow mb-3">
              MISIÓN 5 · FICHA 5 (PÁGS. 17 Y 18)
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white drop-shadow">¿Una persona puede tener más de un corazón?</h2>
            <p className="text-indigo-100 text-sm sm:text-base font-bold mt-1">
              La función de reproducción, los órganos reproductores y el cuidado de la intimidad.
            </p>
          </div>

          <NarratorSpeaker
            text="Misión 5: ¿Una persona puede tener más de un corazón? Los pulpos tienen tres corazones, pero una mujer embarazada tiene dos: el suyo y el del bebé que crece en su vientre. La función de reproducción permite tener descendientes parecidos a nosotros."
            label="Escuchar explicación"
            size="md"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-2 rounded-2xl bg-indigo-950/60 border-2 border-indigo-400/30 backdrop-blur-md">
        {[
          { num: 1, label: '1. Los 2 Corazones' },
          { num: 2, label: '2. Órganos' },
          { num: 3, label: '3. El Embarazo' },
          { num: 4, label: '4. Palabras Clave' },
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

      {/* STEP 1: Dos corazones y reproducción humana */}
      {step === 1 && (
        <div className="game-dialog-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="game-ribbon-yellow">
              REPRODUCCIÓN HUMANA (PÁG. 17)
            </div>
            <NarratorSpeaker
              text="¿Qué imagen representa la reproducción humana? ¿Los robots en una fábrica, un pollito naciendo de un huevo o un bebé humano?"
              size="sm"
            />
          </div>

          <p className="text-sm font-bold text-indigo-100 bg-indigo-950/40 p-3 rounded-2xl border border-indigo-400/30">
            Toca la imagen que representa cómo nacemos y nos reproducimos los seres humanos:
          </p>

          <div className="bg-gradient-to-r from-pink-900/60 to-purple-900/60 rounded-2xl p-4 border-2 border-pink-300/40 flex flex-col sm:flex-row items-center gap-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 p-3 bg-white/10 rounded-2xl border border-white/20">
              <HeartIllustration className="w-14 h-14" />
              <span className="text-2xl animate-pulse">➕</span>
              <HeartIllustration className="w-9 h-9" />
            </div>
            <div className="text-xs sm:text-sm text-indigo-100 font-bold">
              <strong className="text-amber-300 block text-base mb-1 drop-shadow">¿Dos corazones latiendo a la vez?</strong>
              ¡Sí! En la ecografía de la médica se escuchan dos corazones: el de la mamá y el del bebé que crece seguro dentro de su vientre.
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: 'robots', title: 'Fábrica de robots', illustration: <RobotIllustration className="w-16 h-16" />, desc: 'Fabricados por máquinas en un taller' },
              { id: 'pollito', title: 'Pollito en el nido', illustration: <HenChicksIllustration className="w-16 h-16" />, desc: 'Nace de un huevo con cáscara (ovíparo)' },
              { id: 'bebe', title: 'Bebé humano', illustration: <PregnancyStage3Illustration className="w-16 h-16" />, desc: 'Crece dentro del vientre de la madre' }
            ].map((card) => (
              <button
                key={card.id}
                type="button"
                onClick={() => handleSelectImage(card.id)}
                className={`p-5 rounded-2xl border-2 text-center flex flex-col items-center justify-center min-h-[170px] transition-all cursor-pointer ${
                  reproductionImage === card.id
                    ? card.id === 'bebe'
                      ? 'game-pill-active ring-2 ring-emerald-300'
                      : 'bg-rose-500 text-white border-2 border-rose-300 shadow-md'
                    : 'game-pill-row hover:brightness-105'
                }`}
              >
                <div className="mb-2 p-2 bg-indigo-950/40 rounded-2xl border border-indigo-300/30">
                  {card.illustration}
                </div>
                <span className="font-black text-slate-900 text-base mb-1">{card.title}</span>
                <span className="text-xs text-slate-700 font-bold">{card.desc}</span>
              </button>
            ))}
          </div>

          {feedback && (
            <div className={`p-4 rounded-2xl font-black text-sm border-2 ${step1Checked ? 'bg-emerald-500/90 text-white border-emerald-300 shadow-md' : 'bg-amber-400 text-amber-950 border-amber-500 shadow-md'}`}>
              {feedback}
            </div>
          )}

          <div className="flex justify-end pt-2">
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
                <span>Siguiente: Órganos Reproductores</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* STEP 2: Órganos reproductores (Ilustrado y con máximo contraste) */}
      {step === 2 && (
        <div className="game-dialog-card p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="game-ribbon-yellow mb-2">
                ÓRGANOS REPRODUCTORES (PÁG. 18)
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                ¿Qué órganos pertenecen a chicos y cuáles a chicas?
              </h3>
            </div>
            <NarratorSpeaker
              text="Los chicos y las chicas tenemos órganos reproductores diferentes. Asigna cada órgano al cuerpo de los chicos o de las chicas tocando el botón correspondiente."
              size="sm"
            />
          </div>

          {/* Dual Character Illustrated Header Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-sky-500/20 p-4 rounded-3xl border-2 border-sky-400/60 flex items-center gap-3 backdrop-blur-sm">
              <div className="w-14 h-14 rounded-2xl bg-sky-100 flex items-center justify-center text-3xl border-2 border-sky-300 shadow-sm flex-shrink-0">
                👦
              </div>
              <div>
                <h4 className="font-black text-sky-300 text-sm sm:text-base">Aparato Masculino (Chicos)</h4>
                <p className="text-xs text-sky-100 font-bold">Órganos: Pene y Testículos</p>
              </div>
            </div>

            <div className="bg-rose-500/20 p-4 rounded-3xl border-2 border-rose-400/60 flex items-center gap-3 backdrop-blur-sm">
              <div className="w-14 h-14 rounded-2xl bg-rose-100 flex items-center justify-center text-3xl border-2 border-rose-300 shadow-sm flex-shrink-0">
                👧
              </div>
              <div>
                <h4 className="font-black text-rose-300 text-sm sm:text-base">Aparato Femenino (Chicas)</h4>
                <p className="text-xs text-rose-100 font-bold">Órganos: Útero, Ovarios y Vagina</p>
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm font-bold text-indigo-100 bg-indigo-950/60 p-3 rounded-2xl border border-indigo-400/30">
            Toca el botón azul de 👦 <strong>Chicos</strong> o el botón rosa de 👧 <strong>Chicas</strong> para cada órgano:
          </p>

          {/* Organs list with colorful icons and high-contrast buttons */}
          <div className="space-y-3">
            {reproductionOrgans.map((org) => {
              const choice = organsMatched[org.id];
              return (
                <div 
                  key={org.id} 
                  className="p-4 bg-white/15 rounded-2xl border-2 border-indigo-300/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-11 h-11 rounded-2xl bg-white/20 border border-white/30 text-2xl flex items-center justify-center shadow-xs">
                      {org.icon}
                    </span>
                    <div>
                      <h4 className="font-black text-white text-sm sm:text-base drop-shadow-xs">
                        {org.name}
                      </h4>
                      <p className="text-[11px] text-purple-200 font-semibold">
                        {org.desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => handleMatchOrgan(org.id, 'chico')}
                      className={`flex-1 sm:flex-initial py-2.5 px-5 rounded-2xl font-black text-xs sm:text-sm min-h-[46px] transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5 ${
                        choice === 'chico'
                          ? 'bg-gradient-to-b from-sky-400 to-sky-600 text-white border-2 border-sky-700 shadow-[0_3px_0_0_#0369a1] scale-105 ring-2 ring-sky-300'
                          : 'bg-white text-slate-900 hover:bg-sky-50 hover:text-black border-2 border-slate-300 shadow-[0_3px_0_0_#94a3b8]'
                      }`}
                    >
                      <span>👦</span>
                      <span className={choice === 'chico' ? 'text-white font-black' : 'text-slate-900 font-black'}>Chicos</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleMatchOrgan(org.id, 'chica')}
                      className={`flex-1 sm:flex-initial py-2.5 px-5 rounded-2xl font-black text-xs sm:text-sm min-h-[46px] transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5 ${
                        choice === 'chica'
                          ? 'bg-gradient-to-b from-rose-400 to-rose-600 text-white border-2 border-rose-700 shadow-[0_3px_0_0_#9f1239] scale-105 ring-2 ring-rose-300'
                          : 'bg-white text-slate-900 hover:bg-rose-50 hover:text-black border-2 border-slate-300 shadow-[0_3px_0_0_#94a3b8]'
                      }`}
                    >
                      <span>👧</span>
                      <span className={choice === 'chica' ? 'text-white font-black' : 'text-slate-900 font-black'}>Chicas</span>
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
              Comprobar órganos
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
                <span>Siguiente: El Embarazo</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* STEP 3: Fases del embarazo */}
      {step === 3 && (
        <div className="game-dialog-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="game-ribbon-yellow">
              FASES DEL EMBARAZO (PÁG. 18)
            </div>
            <NarratorSpeaker
              text="Lucía está embarazada. Ordena las fases del embarazo desde el inicio hasta el momento de nacer."
              size="sm"
            />
          </div>

          <p className="text-sm font-bold text-indigo-100 bg-indigo-950/40 p-3 rounded-2xl border border-indigo-400/30">
            Lucía está embarazada: Toca del 1 al 3 cómo va creciendo el vientre materno:
          </p>

          {/* Illustrated pregnancy banner (NO screenshot) */}
          <div className="bg-gradient-to-r from-purple-900/60 to-pink-900/60 rounded-2xl p-4 border-2 border-pink-300/40 flex flex-col sm:flex-row items-center gap-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-4xl p-2 bg-white/10 rounded-2xl border border-white/20">
              <span>🤰</span>
              <span>➡️</span>
              <span>👶</span>
            </div>
            <div className="text-xs sm:text-sm text-indigo-100 font-bold">
              <strong className="text-amber-300 block text-base mb-1 drop-shadow">¡El crecimiento del bebé durante el embarazo!</strong>
              El cuerpo de mamá se transforma con amor durante 9 meses mientras el bebé se alimenta a través del cordón umbilical hasta que está listo para nacer.
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {pregnancyCards.map((p) => {
              const orderIdx = pregnancyOrder.indexOf(p.id);
              const isSelected = orderIdx !== -1;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => togglePregnancyCard(p.id)}
                  className={`p-4 rounded-2xl border-2 text-left flex flex-col justify-between min-h-[160px] transition-all cursor-pointer ${
                    isSelected
                      ? 'game-pill-active ring-2 ring-emerald-300'
                      : 'game-pill-row hover:brightness-105'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <div className="p-1.5 bg-indigo-950/40 rounded-xl border border-indigo-300/30">
                      {p.illustration}
                    </div>
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shadow-md ${
                      isSelected ? 'bg-emerald-800 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {isSelected ? orderIdx + 1 : '—'}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-sm mb-1">{p.label}</h4>
                    <p className="text-xs text-slate-700 font-semibold">{p.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Intimidad y confianza (Page 18) */}
          <div className="bg-amber-400/20 p-4 rounded-2xl border-2 border-amber-300/40 flex items-start gap-3 backdrop-blur-sm">
            <Shield className="w-6 h-6 text-amber-300 flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-indigo-100 font-bold">
              <strong className="text-amber-300 block mb-1">Aprender a pensar: La Intimidad y el Respeto</strong>
              El libro nos enseña que actividades como ducharse o asearse son íntimas y privadas, y las hacemos solos o acompañados de adultos de máxima confianza (mamá, papá o tutores).
            </div>
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
              Comprobar fases
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
                <span>Siguiente: Palabras Clave</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* STEP 4: Demuestra lo que sabes: Colorea las palabras */}
      {step === 4 && (
        <div className="game-dialog-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="game-ribbon-yellow">
              PALABRAS CLAVE (PÁG. 18)
            </div>
            <NarratorSpeaker
              text="Demuestra lo que sabes. Colorea o selecciona únicamente las palabras relacionadas con la reproducción humana: descendiente, testículos, útero, padres."
              size="sm"
            />
          </div>

          <p className="text-sm font-bold text-indigo-100 bg-indigo-950/40 p-3 rounded-2xl border border-indigo-400/30">
            Toca solo las palabras relacionadas con la función de reproducción:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {wordsList.map((w) => {
              const isSelected = selectedWords.includes(w.id);
              return (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => toggleWord(w.id)}
                  className={`p-4 rounded-2xl font-black text-sm sm:text-base min-h-[58px] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                    isSelected
                      ? 'bg-gradient-to-b from-emerald-400 to-emerald-600 text-white border-2 border-emerald-700 shadow-[0_4px_0_0_#065f46] scale-102'
                      : 'bg-white text-slate-900 hover:text-black hover:bg-slate-50 border-2 border-slate-300 shadow-[0_4px_0_0_#94a3b8]'
                  }`}
                >
                  {isSelected && <span className="text-white">✓</span>}
                  <span className={isSelected ? 'text-white' : 'text-slate-900 font-black'}>{w.word}</span>
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
              Comprobar palabras
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
            ¡MISIÓN 5 SUPERADA!
          </div>

          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-b from-amber-300 to-amber-500 border-4 border-amber-200 shadow-[0_8px_0_0_#b45309] flex items-center justify-center text-5xl animate-bounce">
            ❤️
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white drop-shadow">
            ¡Has ganado la Medalla de El Milagro de la Vida!
          </h3>
          <p className="text-sm font-bold text-indigo-100 max-w-md mx-auto">
            ¡Comprendes cómo los seres vivos tienen descendencia, el crecimiento en el embarazo y el respeto a la intimidad!
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenBook}
              className="game-pill-row py-3 px-6 text-sm font-black cursor-pointer hover:brightness-105"
            >
              📖 Ver Ficha 5 en el Libro
            </button>
            <button
              type="button"
              onClick={() => {
                playClickSound();
                const nextBtn = document.querySelector('[title="Misión 6: El entorno influye en mi salud"]') as HTMLButtonElement;
                if (nextBtn) nextBtn.click();
              }}
              className="game-button-ok py-3.5 px-8 text-sm font-black uppercase tracking-wider flex items-center gap-2"
            >
              <span>Ir a la Misión 6: Hábitos Saludables</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

