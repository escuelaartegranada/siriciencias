import React, { useState } from 'react';
import { Sparkles, Check, HelpCircle, ArrowRight, RotateCcw, Award, AlertTriangle } from 'lucide-react';
import { NarratorSpeaker } from '../NarratorSpeaker';
import { playClickSound, playSuccessSound, playTryAgainSound, playBadgeSound } from '../../utils/audio';
import {
  StomachIllustration,
  LungsIllustration,
  HeartIllustration,
  KidneysIllustration,
  IntestineIllustration,
  BloodVesselsIllustration,
  BladderIllustration,
  NoseIllustration
} from '../Illustrations';

interface Props {
  onComplete: () => void;
  onOpenBook: () => void;
}

export const Mission2Nutrition: React.FC<Props> = ({ onComplete, onOpenBook }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Exercise 1: Pair 4 systems with their job
  const [systemJobs, setSystemJobs] = useState<{ [system: string]: string }>({});
  const [step1Checked, setStep1Checked] = useState(false);

  // Exercise 2: Organ checkboxes per system (Page 12)
  const [selectedOrgans, setSelectedOrgans] = useState<{ [system: string]: string[] }>({
    digestivo: [],
    circulatorio: [],
    excretor: []
  });
  const [step2Checked, setStep2Checked] = useState(false);

  // Exercise 3: Tacha el error (Detect the fake statements from page 12)
  const [errorsFound, setErrorsFound] = useState<{ [qId: string]: string }>({});
  const [step3Checked, setStep3Checked] = useState(false);

  const [feedback, setFeedback] = useState<string | null>(null);

  // Step 1: Matching
  const systems = [
    { id: 'digestivo', name: 'Aparato Digestivo', illustration: <StomachIllustration className="w-12 h-12" />, correctJob: 'nutrientes' },
    { id: 'respiratorio', name: 'Aparato Respiratorio', illustration: <LungsIllustration className="w-12 h-12" />, correctJob: 'oxigeno' },
    { id: 'circulatorio', name: 'Aparato Circulatorio', illustration: <HeartIllustration className="w-12 h-12" />, correctJob: 'sangre' },
    { id: 'excretor', name: 'Aparato Excretor', illustration: <KidneysIllustration className="w-12 h-12" />, correctJob: 'desechos' },
  ];

  const jobs = [
    { id: 'nutrientes', label: 'Transforma alimentos en nutrientes (boca, estómago, intestino)' },
    { id: 'oxigeno', label: 'Toma oxígeno del aire y expulsa dióxido de carbono (pulmones)' },
    { id: 'sangre', label: 'Transporta nutrientes y oxígeno por la sangre (corazón, venas, arterias)' },
    { id: 'desechos', label: 'Expulsa las sustancias de desecho por la orina (riñones, vejiga)' },
  ];

  const handleSelectJob = (sysId: string, jobId: string) => {
    playClickSound();
    setSystemJobs(prev => ({ ...prev, [sysId]: jobId }));
    setFeedback(null);
  };

  const checkStep1 = () => {
    const isAllSelected = systems.every(s => systemJobs[s.id] !== undefined);
    if (!isAllSelected) {
      setFeedback('Por favor, selecciona una función para cada uno de los 4 aparatos.');
      playTryAgainSound();
      return;
    }

    const allCorrect = systems.every(s => systemJobs[s.id] === s.correctJob);
    if (allCorrect) {
      playSuccessSound();
      setFeedback('¡Perfecto! Has identificado los 4 aparatos que hacen posible la nutrición en nuestro cuerpo.');
      setStep1Checked(true);
    } else {
      playTryAgainSound();
      setFeedback('Revisa con calma: el digestivo transforma comida, el respiratorio toma oxígeno, el circulatorio lo transporta y el excretor expulsa los desechos.');
    }
  };

  // Step 2: Organs selection from Page 12
  const toggleOrgan = (system: string, organId: string) => {
    playClickSound();
    setSelectedOrgans(prev => {
      const currentList = prev[system] || [];
      const updated = currentList.includes(organId)
        ? currentList.filter(id => id !== organId)
        : [...currentList, organId];
      return { ...prev, [system]: updated };
    });
    setFeedback(null);
  };

  const checkStep2 = () => {
    // Digestivo correct: intestino, estomago (nariz is NOT)
    const digCorrect = selectedOrgans.digestivo.includes('intestino') &&
                       selectedOrgans.digestivo.includes('estomago') &&
                       !selectedOrgans.digestivo.includes('nariz');

    // Circulatorio correct: venas, corazon (pulmones is NOT)
    const cirCorrect = selectedOrgans.circulatorio.includes('venas') &&
                       selectedOrgans.circulatorio.includes('corazon') &&
                       !selectedOrgans.circulatorio.includes('pulmones');

    // Excretor correct: vejiga, rinones (traquea is NOT)
    const excCorrect = selectedOrgans.excretor.includes('vejiga') &&
                       selectedOrgans.excretor.includes('rinones') &&
                       !selectedOrgans.excretor.includes('traquea');

    if (digCorrect && cirCorrect && excCorrect) {
      playSuccessSound();
      setFeedback('¡Extraordinario! Además, los tres órganos que NO has marcado (nariz, tráquea y pulmones) pertenecen todos al aparato respiratorio.');
      setStep2Checked(true);
    } else {
      playTryAgainSound();
      setFeedback('¡Cuidado con los infiltrados! La nariz, los pulmones y la tráquea son del aparato respiratorio, no de los demás.');
    }
  };

  // Step 3: Tacha el error (Page 12)
  const errorQuestions = [
    {
      id: 'e1',
      sentence: '1. "El corazón pertenece al aparato respiratorio."',
      question: '¿A qué aparato pertenece realmente el corazón?',
      options: ['Al circulatorio', 'Al digestivo', 'Al locomotor'],
      correct: 'Al circulatorio',
      explanation: 'El corazón es el motor del aparato circulatorio y bombea la sangre.'
    },
    {
      id: 'e2',
      sentence: '2. "El aparato excretor convierte los alimentos en nutrientes."',
      question: '¿Qué aparato se encarga de convertir los alimentos en nutrientes?',
      options: ['El digestivo', 'El respiratorio', 'El excretor'],
      correct: 'El digestivo',
      explanation: 'El aparato digestivo (con el estómago e intestinos) transforma la comida.'
    },
    {
      id: 'e3',
      sentence: '3. "El aparato digestivo lleva el oxígeno por todo el cuerpo."',
      question: '¿Qué aparato transporta el oxígeno por medio de la sangre?',
      options: ['El circulatorio', 'El digestivo', 'El excretor'],
      correct: 'El circulatorio',
      explanation: 'El circulatorio, mediante arterias y venas, reparte el oxígeno y nutrientes.'
    },
    {
      id: 'e4',
      sentence: '4. "Las arterias, las venas y los pulmones forman el aparato circulatorio."',
      question: '¿Cuál es el órgano que falta en lugar de los pulmones?',
      options: ['El corazón', 'La vejiga', 'El cerebro'],
      correct: 'El corazón',
      explanation: 'El aparato circulatorio está formado por el corazón, las venas y las arterias.'
    }
  ];

  const handleSelectErrorFix = (qId: string, choice: string) => {
    playClickSound();
    setErrorsFound(prev => ({ ...prev, [qId]: choice }));
    setFeedback(null);
  };

  const checkStep3 = () => {
    const allDone = errorQuestions.every(q => errorsFound[q.id] !== undefined);
    if (!allDone) {
      setFeedback('Corrige las 4 afirmaciones falsas del libro.');
      playTryAgainSound();
      return;
    }

    const allCorrect = errorQuestions.every(q => errorsFound[q.id] === q.correct);
    if (allCorrect) {
      playSuccessSound();
      setFeedback('¡Sensacional! Eres una auténtica detective científica. Has corregido todos los errores del ejercicio.');
      setStep3Checked(true);
    } else {
      playTryAgainSound();
      setFeedback('Repasa una a una las correcciones. Recuerda el papel de cada aparato.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pt-2">
      {/* Top Ribbon & Game Dialog Banner */}
      <div className="relative pt-3">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
          <div className="game-ribbon-yellow px-6 py-1.5 text-xs sm:text-sm font-black uppercase tracking-wider shadow-md flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-800" />
            <span>Misión 2 · Ficha 2 del Libro (Págs. 11 y 12)</span>
          </div>
        </div>

        <div className="game-dialog-card p-5 sm:p-7 pt-7 text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                ¿Cómo consigo la energía para funcionar?
              </h2>
              <p className="text-purple-100 text-xs sm:text-sm font-semibold mt-1">
                La función de nutrición: digestivo, respiratorio, circulatorio y excretor.
              </p>
            </div>

            <NarratorSpeaker
              text="Misión 2: ¿Cómo consigo la energía para funcionar? Igual que un coche necesita un motor y combustible, nosotros necesitamos energía. En la nutrición colaboran 4 aparatos: digestivo, respiratorio, circulatorio y excretor."
              label="Escuchar explicación"
              size="md"
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 bg-[#121933]/80 p-2 rounded-2xl border border-indigo-700/60 shadow-md">
        {[
          { num: 1, label: '1. Los 4 Aparatos' },
          { num: 2, label: '2. Sus Órganos' },
          { num: 3, label: '3. Tacha el Error' },
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

      {/* STEP 1: Emparejar aparato con función */}
      {step === 1 && (
        <div className="game-dialog-card p-5 sm:p-7 space-y-6 text-slate-800">
          <div className="flex items-center justify-between text-white">
            <div>
              <h3 className="text-xl font-black drop-shadow-xs">¿Qué hace cada aparato en la nutrición?</h3>
              <p className="text-xs sm:text-sm text-purple-200 font-semibold">Toca la descripción correcta para cada aparato.</p>
            </div>
            <NarratorSpeaker
              text="¿Qué hace cada aparato en la nutrición? Elige qué función realiza el digestivo, el respiratorio, el circulatorio y el excretor."
              size="sm"
            />
          </div>

          {/* Illustrated banner (NO screenshot) */}
          <div className="bg-gradient-to-r from-purple-900/60 to-indigo-900/60 rounded-2xl p-4 border-2 border-amber-300/40 flex flex-col sm:flex-row items-center gap-4 text-purple-100 backdrop-blur-sm">
            <div className="flex items-center gap-2 p-2 bg-white/10 rounded-2xl border border-white/20">
              <StomachIllustration className="w-12 h-12 drop-shadow" />
              <LungsIllustration className="w-12 h-12 drop-shadow" inflated={true} />
              <HeartIllustration className="w-12 h-12 drop-shadow" />
              <KidneysIllustration className="w-12 h-12 drop-shadow" />
            </div>
            <div className="text-xs sm:text-sm">
              <strong className="text-amber-300 block text-base mb-1 drop-shadow-xs">¡4 Aparatos trabajando en equipo!</strong>
              El digestivo (manzana y energía), el respiratorio (oxígeno del aire), el circulatorio (corazón y sangre) y el excretor (limpia y expulsa).
            </div>
          </div>

          <div className="space-y-4">
            {systems.map((sys) => {
              const currentChoice = systemJobs[sys.id];
              return (
                <div key={sys.id} className="p-4 bg-white/95 rounded-3xl border-2 border-indigo-200 shadow-[0_4px_0_0_#9cb0e2]">
                  <div className="flex items-center gap-3 mb-2.5 font-black text-slate-800 text-base">
                    <div className="p-1 bg-slate-50 rounded-2xl shadow-inner border border-slate-200">
                      {sys.illustration}
                    </div>
                    <span>{sys.name}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {jobs.map((j) => (
                      <button
                        key={j.id}
                        type="button"
                        onClick={() => handleSelectJob(sys.id, j.id)}
                        className={`p-3 text-left text-xs sm:text-sm font-black min-h-[48px] flex items-start gap-2 ${
                          currentChoice === j.id
                            ? 'game-pill-active scale-101'
                            : 'game-pill-row text-slate-700'
                        }`}
                      >
                        <span className="mt-0.5">•</span>
                        <span>{j.label}</span>
                      </button>
                    ))}
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
              Comprobar aparatos
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
                <span>Siguiente: Los Órganos</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* STEP 2: Marcar los órganos de cada aparato (Página 12) */}
      {step === 2 && (
        <div className="game-dialog-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="game-ribbon-yellow">
              ÓRGANOS DE LA NUTRICIÓN (PÁG. 12)
            </div>
            <NarratorSpeaker
              text="Marca los órganos que pertenecen a cada aparato. En el digestivo: ¿intestino, nariz o estómago? En el circulatorio: ¿pulmones, venas o corazón? En el excretor: ¿vejiga, riñones o tráquea?"
              size="sm"
            />
          </div>

          <p className="text-sm font-bold text-indigo-100 bg-indigo-950/40 p-3 rounded-2xl border border-indigo-400/30">
            ¡Atención! En cada fila hay un órgano intruso que no pertenece a ese aparato.
          </p>

          <div className="space-y-5">
            {/* Fila 1: Aparato Digestivo */}
            <div className="p-4 bg-white/10 rounded-2xl border-2 border-indigo-300/30 backdrop-blur-sm">
              <span className="font-black text-amber-300 text-base block mb-3 drop-shadow">
                1. Aparato Digestivo (Marca los que sí pertenecen):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'intestino', name: 'Intestino', illustration: <IntestineIllustration className="w-12 h-12 mb-1" /> },
                  { id: 'nariz', name: 'Nariz (Intruso)', illustration: <NoseIllustration className="w-12 h-12 mb-1" /> },
                  { id: 'estomago', name: 'Estómago', illustration: <StomachIllustration className="w-12 h-12 mb-1" /> }
                ].map((org) => {
                  const isChecked = selectedOrgans.digestivo.includes(org.id);
                  return (
                    <button
                      key={org.id}
                      type="button"
                      onClick={() => toggleOrgan('digestivo', org.id)}
                      className={`p-3 rounded-2xl flex flex-col items-center justify-center font-black text-xs sm:text-sm min-h-[56px] transition-all cursor-pointer ${
                        isChecked
                          ? 'game-pill-active ring-2 ring-emerald-300'
                          : 'game-pill-row hover:brightness-105'
                      }`}
                    >
                      {org.illustration}
                      <span>{org.name}</span>
                      {isChecked && <span className="text-[10px] mt-1 font-black bg-emerald-800 text-white px-2 py-0.5 rounded-full">✓ Seleccionado</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Fila 2: Aparato Circulatorio */}
            <div className="p-4 bg-white/10 rounded-2xl border-2 border-indigo-300/30 backdrop-blur-sm">
              <span className="font-black text-rose-300 text-base block mb-3 drop-shadow">
                2. Aparato Circulatorio (Marca los que sí pertenecen):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'pulmones', name: 'Pulmones (Intruso)', illustration: <LungsIllustration className="w-12 h-12 mb-1" /> },
                  { id: 'venas', name: 'Venas y Arterias', illustration: <BloodVesselsIllustration className="w-12 h-12 mb-1" /> },
                  { id: 'corazon', name: 'Corazón', illustration: <HeartIllustration className="w-12 h-12 mb-1" /> }
                ].map((org) => {
                  const isChecked = selectedOrgans.circulatorio.includes(org.id);
                  return (
                    <button
                      key={org.id}
                      type="button"
                      onClick={() => toggleOrgan('circulatorio', org.id)}
                      className={`p-3 rounded-2xl flex flex-col items-center justify-center font-black text-xs sm:text-sm min-h-[56px] transition-all cursor-pointer ${
                        isChecked
                          ? 'game-pill-active ring-2 ring-rose-300'
                          : 'game-pill-row hover:brightness-105'
                      }`}
                    >
                      {org.illustration}
                      <span>{org.name}</span>
                      {isChecked && <span className="text-[10px] mt-1 font-black bg-emerald-800 text-white px-2 py-0.5 rounded-full">✓ Seleccionado</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Fila 3: Aparato Excretor */}
            <div className="p-4 bg-white/10 rounded-2xl border-2 border-indigo-300/30 backdrop-blur-sm">
              <span className="font-black text-sky-300 text-base block mb-3 drop-shadow">
                3. Aparato Excretor (Marca los que sí pertenecen):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'vejiga', name: 'Vejiga', illustration: <BladderIllustration className="w-12 h-12 mb-1" /> },
                  { id: 'rinones', name: 'Riñones', illustration: <KidneysIllustration className="w-12 h-12 mb-1" /> },
                  { id: 'traquea', name: 'Tráquea (Intruso)', illustration: <NoseIllustration className="w-12 h-12 mb-1" /> }
                ].map((org) => {
                  const isChecked = selectedOrgans.excretor.includes(org.id);
                  return (
                    <button
                      key={org.id}
                      type="button"
                      onClick={() => toggleOrgan('excretor', org.id)}
                      className={`p-3 rounded-2xl flex flex-col items-center justify-center font-black text-xs sm:text-sm min-h-[56px] transition-all cursor-pointer ${
                        isChecked
                          ? 'game-pill-active ring-2 ring-sky-300'
                          : 'game-pill-row hover:brightness-105'
                      }`}
                    >
                      {org.illustration}
                      <span>{org.name}</span>
                      {isChecked && <span className="text-[10px] mt-1 font-black bg-emerald-800 text-white px-2 py-0.5 rounded-full">✓ Seleccionado</span>}
                    </button>
                  );
                })}
              </div>
            </div>
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
                <span>Siguiente: Tacha el Error</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* STEP 3: Tacha el error (Página 12) */}
      {step === 3 && (
        <div className="game-dialog-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="game-ribbon-yellow">
              TACHA EL ERROR (PÁG. 12)
            </div>
            <NarratorSpeaker
              text="Demuestra lo que sabes. En el libro hay cuatro frases con errores. Ayúdanos a encontrar la respuesta adecuada para cada una."
              size="sm"
            />
          </div>

          <p className="text-sm font-bold text-indigo-100 bg-indigo-950/40 p-3 rounded-2xl border border-indigo-400/30">
            Todas estas frases tienen una mentirijilla. ¡Elige la corrección adecuada!
          </p>

          <div className="space-y-4">
            {errorQuestions.map((eq) => {
              const currentChoice = errorsFound[eq.id];
              return (
                <div key={eq.id} className="p-4 bg-white/10 rounded-2xl border-2 border-indigo-300/30 space-y-3 backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-full bg-rose-500 text-white font-black flex items-center justify-center flex-shrink-0 shadow-md">
                      ✕
                    </span>
                    <div>
                      <p className="font-bold text-rose-200 text-sm sm:text-base line-through decoration-rose-400 decoration-2">
                        {eq.sentence}
                      </p>
                      <p className="text-xs font-black text-amber-300 mt-1 uppercase tracking-wide">{eq.question}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                    {eq.options.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectErrorFix(eq.id, opt)}
                        className={`p-3 rounded-xl font-black text-xs sm:text-sm min-h-[48px] transition-all cursor-pointer ${
                          currentChoice === opt
                            ? 'game-pill-active ring-2 ring-emerald-300'
                            : 'game-pill-row hover:brightness-105'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
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
              Comprobar correcciones
            </button>

            {step3Checked && (
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
            ¡MISIÓN 2 SUPERADA!
          </div>

          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-b from-amber-300 to-amber-500 border-4 border-amber-200 shadow-[0_8px_0_0_#b45309] flex items-center justify-center text-5xl animate-bounce">
            ⚡
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white drop-shadow">
            ¡Has ganado la Medalla de la Supernutrición!
          </h3>
          <p className="text-sm font-bold text-indigo-100 max-w-md mx-auto">
            ¡Ahora dominas los 4 aparatos de la nutrición: digestivo, respiratorio, circulatorio y excretor!
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenBook}
              className="game-pill-row py-3 px-6 text-sm font-black cursor-pointer hover:brightness-105"
            >
              📖 Ver Ficha 2 en el Libro
            </button>
            <button
              type="button"
              onClick={() => {
                playClickSound();
                const nextBtn = document.querySelector('[title="Misión 3: El taller de Tina"]') as HTMLButtonElement;
                if (nextBtn) nextBtn.click();
              }}
              className="game-button-ok py-3.5 px-8 text-sm font-black uppercase tracking-wider flex items-center gap-2"
            >
              <span>Ir a la Misión 3: El Taller de Tina</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

