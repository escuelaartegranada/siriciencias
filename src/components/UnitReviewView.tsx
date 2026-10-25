import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowLeft, 
  BookOpen, 
  Star, 
  Check, 
  RotateCcw, 
  Trophy, 
  Heart, 
  Activity, 
  Apple, 
  Brain, 
  Eye, 
  Smile, 
  Compass, 
  Zap,
  HelpCircle,
  ShieldCheck,
  Award
} from 'lucide-react';
import { NarratorSpeaker } from './NarratorSpeaker';
import { playClickSound, playSuccessSound, playTryAgainSound, playCompleteSound } from '../utils/audio';
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
  BladderIllustration,
  EyeIllustration,
  EarIllustration,
  HandIllustration,
  NoseIllustration
} from './Illustrations';

interface Props {
  onBackToMap: () => void;
  onAddReward?: (stars: number, pts: number, message: string) => void;
  studentName: string;
}

export const UnitReviewView: React.FC<Props> = ({
  onBackToMap,
  onAddReward,
  studentName,
}) => {
  // Main tabs: 1: Esquemas Visuales, 2: Clasificar Órganos, 3: Caso Nerea y Adrián, 4: Trivia Relámpago, 5: Cuaderno Ilustrado
  const [activeTab, setActiveTab] = useState<'esquemas' | 'clasificar' | 'caso' | 'trivia' | 'libro'>('esquemas');

  // Subtab in Esquemas Visuales
  const [esquemaSubTab, setEsquemaSubTab] = useState<'nutricion' | 'vitales' | 'relacion' | 'habitos'>('nutricion');

  // State for Clasificar Órganos (Pág. 27)
  const initialOrgans = [
    { id: 'corazon', name: 'Corazón', emoji: '❤️', correctSystem: 'circulatorio', hint: 'Bombea la sangre' },
    { id: 'estomago', name: 'Estómago', emoji: '🥣', correctSystem: 'digestivo', hint: 'Digiere los alimentos' },
    { id: 'pulmones', name: 'Pulmones', emoji: '🫁', correctSystem: 'respiratorio', hint: 'Toman el oxígeno del aire' },
    { id: 'rinones', name: 'Riñones', emoji: '💧', correctSystem: 'excretor', hint: 'Filtran la sangre y hacen pipí' },
    { id: 'cerebro', name: 'Cerebro', emoji: '🧠', correctSystem: 'relacion', hint: 'Recibe datos y da órdenes' },
    { id: 'musculos', name: 'Músculos y Huesos', emoji: '💪', correctSystem: 'relacion', hint: 'Aparato locomotor para moverse' },
    { id: 'boca', name: 'Boca y Dientes', emoji: '👄', correctSystem: 'digestivo', hint: 'Mastica la comida' },
    { id: 'vejiga', name: 'Vejiga', emoji: '🚾', correctSystem: 'excretor', hint: 'Almacena la orina' },
  ];

  const [selectedOrgan, setSelectedOrgan] = useState<string | null>(null);
  const [classifiedOrgans, setClassifiedOrgans] = useState<{ [organId: string]: string }>({});
  const [classifyFeedback, setClassifyFeedback] = useState<string | null>(null);

  // State for Caso Nerea y Adrián (Pág. 28)
  const [casoAnswers, setCasoAnswers] = useState<{ [key: string]: string }>({});
  const [casoCompleted, setCasoCompleted] = useState(false);

  // State for Trivia Relámpago
  const [triviaAnswers, setTriviaAnswers] = useState<{ [qId: string]: string }>({});
  const [triviaSubmitted, setTriviaSubmitted] = useState(false);

  // State for Illustrated Notebook Tab (Pages 25, 26, 27, 28)
  const [selectedPageNum, setSelectedPageNum] = useState<number>(25);

  // Systems for the classification game
  const systems = [
    { id: 'digestivo', name: 'Aparato Digestivo', color: 'from-amber-500 to-orange-600', border: 'border-amber-400', icon: '🍎' },
    { id: 'respiratorio', name: 'Aparato Respiratorio', color: 'from-sky-500 to-blue-600', border: 'border-sky-400', icon: '🫁' },
    { id: 'circulatorio', name: 'Aparato Circulatorio', color: 'from-rose-500 to-red-600', border: 'border-rose-400', icon: '❤️' },
    { id: 'excretor', name: 'Aparato Excretor', color: 'from-yellow-500 to-amber-600', border: 'border-yellow-400', icon: '💧' },
    { id: 'relacion', name: 'Función de Relación', color: 'from-purple-500 to-indigo-600', border: 'border-purple-400', icon: '🧠' },
  ];

  // Organ classification handler
  const handleSelectSystem = (systemId: string) => {
    if (!selectedOrgan) return;
    const organObj = initialOrgans.find(o => o.id === selectedOrgan);
    if (!organObj) return;

    if (organObj.correctSystem === systemId) {
      playSuccessSound();
      const updated = { ...classifiedOrgans, [organObj.id]: systemId };
      setClassifiedOrgans(updated);
      setSelectedOrgan(null);
      setClassifyFeedback(`¡Correcto! ${organObj.name} pertenece a ${systems.find(s => s.id === systemId)?.name}.`);
      
      if (onAddReward) {
        onAddReward(1, 10, `¡${organObj.name} bien clasificado!`);
      }

      if (Object.keys(updated).length === initialOrgans.length) {
        playCompleteSound();
        setClassifyFeedback('🎉 ¡INCREÍBLE! ¡Has clasificado todos los órganos del Tema 1 a la perfección!');
        if (onAddReward) {
          onAddReward(3, 30, '¡Juego de Órganos Superado!');
        }
      }
    } else {
      playTryAgainSound();
      setClassifyFeedback(`Casi... ${organObj.name} no pertenece ahí. ¡Pista: ${organObj.hint}!`);
    }
  };

  const handleResetClassification = () => {
    playClickSound();
    setClassifiedOrgans({});
    setSelectedOrgan(null);
    setClassifyFeedback(null);
  };

  // Case study questions (Page 28)
  const casoQuestions = [
    {
      id: 'c1',
      scenario: '1. Nerea va en patinete. De repente ve una piedra en el suelo, su cerebro decide frenar y sus manos aprietan los frenos.',
      question: '¿Qué función del cuerpo ha intervenido aquí?',
      options: [
        'Función de Relación (ojos captan, cerebro piensa y músculos actúan)',
        'Función de Nutrición (aparato digestivo)',
        'Función de Reproducción'
      ],
      correct: 'Función de Relación (ojos captan, cerebro piensa y músculos actúan)',
      tip: 'Los sentidos y el aparato locomotor trabajan juntos en la función de relación.'
    },
    {
      id: 'c2',
      scenario: '2. Adrián merienda un plátano y bebe agua fresca sentado en el banco del parque.',
      question: '¿Qué aparatos de la nutrición están trabajando con esa merienda?',
      options: [
        'El Digestivo (absorbe nutrientes) y el Circulatorio (los reparte)',
        'Solo el respiratorio',
        'Ninguno porque está sentado'
      ],
      correct: 'El Digestivo (absorbe nutrientes) y el Circulatorio (los reparte)',
      tip: 'El aparato digestivo extrae la energía y el circulatorio la lleva a todo el cuerpo.'
    },
    {
      id: 'c3',
      scenario: '3. Nerea y Adrián llevan casco para proteger la cabeza y descansan a la sombra con sus amigos.',
      question: '¿Qué hábitos saludables están cumpliendo?',
      options: [
        'Deporte seguro, tiempo libre en la naturaleza, buena hidratación y amistad',
        'Comer chuches y no descansar',
        'Quedarse encerrados jugando con pantallas'
      ],
      correct: 'Deporte seguro, tiempo libre en la naturaleza, buena hidratación y amistad',
      tip: '¡Cuidar el cuerpo, protegerse y divertirse con amigos son hábitos de oro!'
    }
  ];

  const handleCasoAnswer = (qId: string, opt: string) => {
    playClickSound();
    const nextAnswers = { ...casoAnswers, [qId]: opt };
    setCasoAnswers(nextAnswers);

    const allDone = casoQuestions.every(q => nextAnswers[q.id] === q.correct);
    if (allDone && !casoCompleted) {
      setCasoCompleted(true);
      playCompleteSound();
      if (onAddReward) {
        onAddReward(3, 30, '¡Caso Nerea y Adrián resuelto! +3 ⭐');
      }
    }
  };

  // Trivia questions
  const triviaList = [
    {
      id: 't1',
      question: '¿Cuáles son las 3 funciones vitales de todos los seres vivos?',
      options: [
        'Nutrición, Relación y Reproducción',
        'Desayunar, comer y cenar',
        'Jugar, dormir y cantar'
      ],
      correct: 'Nutrición, Relación y Reproducción',
      explanation: 'Las tres funciones que nos distinguen de los objetos no vivos como espantapájaros.'
    },
    {
      id: 't2',
      question: '¿Qué aparato se encarga de tomar el oxígeno del aire?',
      options: [
        'Aparato Respiratorio (pulmones y tráquea)',
        'Aparato Excretor (riñones)',
        'Aparato Digestivo (estómago)'
      ],
      correct: 'Aparato Respiratorio (pulmones y tráquea)',
      explanation: 'Los pulmones capturan el oxígeno del aire y expulsan dióxido de carbono.'
    },
    {
      id: 't3',
      question: '¿Qué órgano bombea la sangre para que viaje por todo el cuerpo?',
      options: [
        'El corazón',
        'El estómago',
        'El fémur'
      ],
      correct: 'El corazón',
      explanation: 'El corazón es el motor del aparato circulatorio y late sin parar.'
    },
    {
      id: 't4',
      question: '¿Por qué tenemos huesos en el cuerpo?',
      options: [
        'Sostienen el cuerpo y protegen órganos delicados como el cerebro',
        'Solo para hacernos pesar más',
        'Para digerir las frutas'
      ],
      correct: 'Sostienen el cuerpo y protegen órganos delicados como el cerebro',
      explanation: 'El esqueleto es la estructura que nos permite estar de pie y protege órganos vitales.'
    },
    {
      id: 't5',
      question: '¿Cuántas horas necesita dormir un niño o niña de 2º de Primaria para estar sano?',
      options: [
        'Entre 9 y 10 horas cada noche',
        'Solo 2 horas',
        'No hace falta dormir si vemos la tele'
      ],
      correct: 'Entre 9 y 10 horas cada noche',
      explanation: 'El descanso nocturno regenera el cerebro y nos ayuda a crecer con fuerza.'
    }
  ];

  const handleTriviaOption = (qId: string, opt: string) => {
    playClickSound();
    setTriviaAnswers(prev => ({ ...prev, [qId]: opt }));
  };

  const handleCheckTrivia = () => {
    const allAnswered = triviaList.every(q => triviaAnswers[q.id]);
    if (!allAnswered) {
      playTryAgainSound();
      return;
    }
    const correctCount = triviaList.filter(q => triviaAnswers[q.id] === q.correct).length;
    setTriviaSubmitted(true);
    if (correctCount === triviaList.length) {
      playCompleteSound();
      if (onAddReward) {
        onAddReward(5, 50, '¡Trivia de Repaso Perfecta! +5 ⭐');
      }
    } else {
      playSuccessSound();
    }
  };

  // Illustrated Notebook Pages Data (NO tiny photos, 100% vector illustrations and clear typography)
  const notebookPages = [
    {
      num: 25,
      title: 'Página 25: La Función de Nutrición',
      subtitle: 'Los 4 aparatos que nos dan energía',
      narration: 'Página 25: En resumen, la nutrición nos da energía con cuatro aparatos: digestivo con boca y estómago, respiratorio con tráquea y pulmones, circulatorio con corazón y sangre, y excretor con riñones y vejiga.',
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-amber-50 p-4 rounded-2xl border-2 border-amber-300 text-slate-900 flex items-start gap-3">
            <StomachIllustration className="w-16 h-16 flex-shrink-0 drop-shadow" />
            <div>
              <h4 className="font-black text-amber-900 text-sm">Aparato Digestivo</h4>
              <p className="text-xs text-slate-700 font-semibold mt-0.5">
                <strong>Órganos:</strong> Boca, esófago, estómago e intestinos.
              </p>
              <p className="text-xs text-amber-800 font-bold mt-1">
                Transforma los alimentos en nutrientes con energía.
              </p>
            </div>
          </div>

          <div className="bg-sky-50 p-4 rounded-2xl border-2 border-sky-300 text-slate-900 flex items-start gap-3">
            <LungsIllustration className="w-16 h-16 flex-shrink-0 drop-shadow" inflated={true} />
            <div>
              <h4 className="font-black text-sky-900 text-sm">Aparato Respiratorio</h4>
              <p className="text-xs text-slate-700 font-semibold mt-0.5">
                <strong>Órganos:</strong> Nariz, tráquea y pulmones.
              </p>
              <p className="text-xs text-sky-800 font-bold mt-1">
                Toma el oxígeno del aire y expulsa dióxido de carbono.
              </p>
            </div>
          </div>

          <div className="bg-rose-50 p-4 rounded-2xl border-2 border-rose-300 text-slate-900 flex items-start gap-3">
            <HeartIllustration className="w-16 h-16 flex-shrink-0 drop-shadow" />
            <div>
              <h4 className="font-black text-rose-900 text-sm">Aparato Circulatorio</h4>
              <p className="text-xs text-slate-700 font-semibold mt-0.5">
                <strong>Órganos:</strong> Corazón y vasos sanguíneos (venas/arterias).
              </p>
              <p className="text-xs text-rose-800 font-bold mt-1">
                Reparte los nutrientes y el oxígeno por la sangre.
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-2xl border-2 border-yellow-300 text-slate-900 flex items-start gap-3">
            <KidneysIllustration className="w-16 h-16 flex-shrink-0 drop-shadow" />
            <div>
              <h4 className="font-black text-yellow-900 text-sm">Aparato Excretor</h4>
              <p className="text-xs text-slate-700 font-semibold mt-0.5">
                <strong>Órganos:</strong> Riñones y vejiga urinaria.
              </p>
              <p className="text-xs text-yellow-800 font-bold mt-1">
                Limpia la sangre y expulsa las sustancias de desecho en la orina.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      num: 26,
      title: 'Página 26: Relación, Reproducción y Hábitos',
      subtitle: 'Cómo nos movemos, crecemos y cuidamos la salud',
      narration: 'Página 26: La función de relación va de los sentidos al cerebro y luego al aparato locomotor con huesos y músculos. La reproducción asegura la vida con el embarazo. Y los cinco hábitos nos mantienen sanos y fuertes.',
      content: (
        <div className="space-y-4">
          <div className="bg-purple-50 p-4 rounded-2xl border-2 border-purple-300 text-slate-900">
            <h4 className="font-black text-purple-900 text-sm mb-2 flex items-center gap-2">
              <BrainIllustration className="w-8 h-8 inline" />
              <span>Función de Relación: Sentidos ➡️ Cerebro ➡️ Locomotor</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-3 rounded-xl border border-purple-200">
                <strong className="text-purple-800 block mb-0.5">🦴 Huesos (Esqueleto)</strong>
                Rígidos y duros. Sostienen el cuerpo y protegen órganos delicados como el cerebro y corazón.
              </div>
              <div className="bg-white p-3 rounded-xl border border-purple-200">
                <strong className="text-purple-800 block mb-0.5">💪 Músculos</strong>
                Elásticos y blandos. Tiran de los huesos para movernos (¡como el esternocleidomastoideo!).
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 p-4 rounded-2xl border-2 border-emerald-300 text-slate-900">
            <h4 className="font-black text-emerald-900 text-sm mb-2">🍎 Los 5 Hábitos Saludables</h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs font-bold text-slate-800">
              <div className="bg-white p-2 rounded-xl border border-emerald-200">🍎 Dieta Variada</div>
              <div className="bg-white p-2 rounded-xl border border-emerald-200">⚽ Deporte Diario</div>
              <div className="bg-white p-2 rounded-xl border border-emerald-200">🧼 Higiene Limpia</div>
              <div className="bg-white p-2 rounded-xl border border-emerald-200">🌙 Dormir 9-10h</div>
              <div className="bg-white p-2 rounded-xl border border-emerald-200">🌳 Naturaleza</div>
            </div>
          </div>
        </div>
      )
    },
    {
      num: 27,
      title: 'Página 27: Clasificación de Órganos y Funciones',
      subtitle: 'Actividad de repaso del libro',
      narration: 'Página 27: Repasamos los órganos. Cada aparato tiene sus propios órganos especializados que colaboran para mantener con vida nuestro cuerpo.',
      content: (
        <div className="bg-slate-50 p-5 rounded-2xl border-2 border-slate-300 text-slate-900 space-y-3">
          <h4 className="font-black text-slate-900 text-sm">Resumen de Clasificación Rápida:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            <div className="p-2.5 bg-amber-100 rounded-xl font-bold text-amber-950 flex items-center gap-2">
              <span>🍎 Digestivo:</span> Boca, Esófago, Estómago, Intestinos
            </div>
            <div className="p-2.5 bg-sky-100 rounded-xl font-bold text-sky-950 flex items-center gap-2">
              <span>🫁 Respiratorio:</span> Nariz, Tráquea, Pulmones
            </div>
            <div className="p-2.5 bg-rose-100 rounded-xl font-bold text-rose-950 flex items-center gap-2">
              <span>❤️ Circulatorio:</span> Corazón, Vasos Sanguíneos, Sangre
            </div>
            <div className="p-2.5 bg-yellow-100 rounded-xl font-bold text-yellow-950 flex items-center gap-2">
              <span>💧 Excretor:</span> Riñones, Vejiga, Sudor
            </div>
          </div>
        </div>
      )
    },
    {
      num: 28,
      title: 'Página 28: Caso Práctico en el Parque',
      subtitle: 'Nerea y Adrián ponen en práctica las Ciencias',
      narration: 'Página 28: Nerea y Adrián demuestran que las ciencias suceden en la vida real: montar en patinete usa la relación, merendar fruta usa la nutrición, y llevar casco y estar con amigos son hábitos saludables.',
      content: (
        <div className="bg-indigo-50 p-5 rounded-2xl border-2 border-indigo-300 text-slate-900 space-y-3">
          <div className="flex items-center gap-3 text-3xl p-2 bg-white rounded-xl border border-indigo-200">
            <span>🛴</span>
            <span>⛑️</span>
            <span>🍌</span>
            <span>🌳</span>
            <span>👫</span>
          </div>
          <div className="text-xs space-y-2 font-medium text-slate-700 leading-relaxed">
            <p><strong>• Al frenar el patinete:</strong> La vista ve la curva, el cerebro envía la orden y las manos frenan (Función de Relación).</p>
            <p><strong>• Al merendar y beber:</strong> El estómago digiere y el corazón reparte la energía (Función de Nutrición).</p>
            <p><strong>• Al cuidarse y divertirse:</strong> Llevan casco, descansan y juegan juntos (Hábitos Saludables y Amistad).</p>
          </div>
        </div>
      )
    }
  ];

  const currentPage = notebookPages.find(p => p.num === selectedPageNum) || notebookPages[0];

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in pb-12">
      {/* Top Header Card with Game Styling */}
      <div className="relative pt-4">
        {/* Top ribbon */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
          <div className="game-ribbon-yellow px-6 py-2 text-xs sm:text-sm font-black uppercase tracking-wider shadow-md flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-800" />
            <span>SÚPER REPASO ILUSTRADO · TEMA 1 "MI CUERPO FUNCIONA"</span>
          </div>
        </div>

        <div className="game-dialog-card p-6 sm:p-8 pt-8 text-white relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    onBackToMap();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-purple-900/80 hover:bg-purple-800 text-purple-200 hover:text-white border border-purple-400/40 text-xs font-black flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Volver al Mapa</span>
                </button>
                <span className="text-xs font-bold text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-400/30">
                  Ciencias Naturales 2º Primaria (SM)
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black leading-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                ¡Gran Repaso del Tema 1, {studentName}!
              </h1>
              <p className="text-sm sm:text-base font-semibold text-purple-100 mt-1 max-w-2xl">
                Todo el tema organizado con dibujos claros y divertidos: esquemas visuales, juego de clasificar órganos, el caso de Nerea y Adrián, y preguntas de examen.
              </p>
            </div>

            <div className="self-end sm:self-center flex-shrink-0">
              <NarratorSpeaker
                text={`¡Hola ${studentName}! Bienvenida al Súper Repaso del Tema 1. Aquí tienes todo explicado con dibujos grandes y claros: puedes repasar los aparatos del cuerpo, clasificar órganos, resolver el caso de Nerea y Adrián y ponerte a prueba con la Trivia para ganar estrellas.`}
                label="Escuchar repaso"
                size="md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Mode Navigation Tabs (3D Game Pills) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-2 rounded-2xl bg-indigo-950/70 border-2 border-indigo-400/30 backdrop-blur-md">
        {[
          { id: 'esquemas', label: '1. Esquemas Visuales', icon: '🌟' },
          { id: 'clasificar', label: '2. Clasifica Órganos', icon: '🧩' },
          { id: 'caso', label: '3. Caso Nerea y Adrián', icon: '🚴‍♀️' },
          { id: 'trivia', label: '4. Trivia Relámpago', icon: '⚡' },
          { id: 'libro', label: '5. Cuaderno Ilustrado', icon: '📖' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              playClickSound();
              setActiveTab(tab.id as any);
            }}
            className={`py-3 px-2 sm:px-3 rounded-xl font-black text-xs sm:text-sm min-h-[48px] flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-gradient-to-b from-amber-300 to-amber-500 text-amber-950 border-2 border-amber-600 shadow-[0_4px_0_0_#b45309] scale-[1.02]'
                : 'bg-white/10 text-indigo-200 hover:text-white hover:bg-white/20'
            }`}
          >
            <span>{tab.icon}</span>
            <span className="truncate">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: ESQUEMAS VISUALES INTERACTIVOS (WITH VECTOR DRAWINGS) */}
      {activeTab === 'esquemas' && (
        <div className="space-y-6">
          {/* Sub-navigation for themes */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'nutricion', label: '⚡ Los 4 Aparatos de la Nutrición', desc: 'Pág. 25' },
              { id: 'vitales', label: '🌱 Las 3 Funciones Vitales', desc: 'Pág. 10' },
              { id: 'relacion', label: '🎾 Relación y Aparato Locomotor', desc: 'Pág. 26' },
              { id: 'habitos', label: '🍎 Los 5 Hábitos Saludables', desc: 'Pág. 26' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  playClickSound();
                  setEsquemaSubTab(st.id as any);
                }}
                className={`py-2 px-4 rounded-xl font-black text-xs sm:text-sm min-h-[44px] transition-all cursor-pointer border ${
                  esquemaSubTab === st.id
                    ? 'bg-amber-400 text-amber-950 border-amber-300 shadow-[0_3px_0_0_#b45309]'
                    : 'bg-indigo-900/50 text-indigo-200 hover:text-white border-indigo-700/60'
                }`}
              >
                <span>{st.label}</span>
                <span className="text-[10px] opacity-70 ml-1 font-bold">({st.desc})</span>
              </button>
            ))}
          </div>

          {/* Subtheme: NUTRICIÓN (Página 25) with Vector Drawings */}
          {esquemaSubTab === 'nutricion' && (
            <div className="game-dialog-card p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="game-ribbon-yellow mb-2">
                    EN RESUMEN · LA FUNCIÓN DE NUTRICIÓN (PÁG. 25)
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    4 Aparatos que trabajan en equipo para darnos energía
                  </h3>
                </div>
                <NarratorSpeaker
                  text="La nutrición nos permite conseguir energía y materiales para crecer. Trabajan 4 aparatos: el digestivo transforma la comida en nutrientes, el respiratorio toma el oxígeno del aire, el circulatorio reparte todo por la sangre, y el excretor limpia y expulsa los desechos."
                  label="Escuchar Nutrición"
                  size="sm"
                />
              </div>

              {/* 4 Interactive System Cards with Drawings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Digestivo */}
                <div className="bg-white p-5 rounded-2xl border-3 border-amber-400 shadow-md space-y-3 text-slate-900">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <StomachIllustration className="w-14 h-14 drop-shadow" />
                      <div>
                        <h4 className="text-base sm:text-lg font-black text-amber-900">1. Aparato Digestivo</h4>
                        <span className="text-xs text-amber-700 font-extrabold">Transforma los alimentos</span>
                      </div>
                    </div>
                    <NarratorSpeaker
                      text="Aparato digestivo: Los órganos son la boca, el esófago, el estómago y los intestinos. Transforma los alimentos que comemos en nutrientes con energía."
                      size="sm"
                    />
                  </div>
                  <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs font-semibold text-slate-800 space-y-1">
                    <div><strong>Órganos clave:</strong> Boca, esófago, estómago, intestinos.</div>
                    <div><strong>Misión:</strong> Deshace la comida para extraer nutrientes y energía.</div>
                  </div>
                </div>

                {/* 2. Respiratorio */}
                <div className="bg-white p-5 rounded-2xl border-3 border-sky-400 shadow-md space-y-3 text-slate-900">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <LungsIllustration className="w-14 h-14 drop-shadow" inflated={true} />
                      <div>
                        <h4 className="text-base sm:text-lg font-black text-sky-900">2. Aparato Respiratorio</h4>
                        <span className="text-xs text-sky-700 font-extrabold">Capta el oxígeno</span>
                      </div>
                    </div>
                    <NarratorSpeaker
                      text="Aparato respiratorio: Los órganos son la nariz, la tráquea y los pulmones. Toma el oxígeno del aire que necesitamos para vivir y expulsa el dióxido de carbono."
                      size="sm"
                    />
                  </div>
                  <div className="bg-sky-50 p-3 rounded-xl border border-sky-200 text-xs font-semibold text-slate-800 space-y-1">
                    <div><strong>Órganos clave:</strong> Nariz, tráquea, pulmones.</div>
                    <div><strong>Misión:</strong> Respira el gas oxígeno del aire y expulsa dióxido de carbono.</div>
                  </div>
                </div>

                {/* 3. Circulatorio */}
                <div className="bg-white p-5 rounded-2xl border-3 border-rose-400 shadow-md space-y-3 text-slate-900">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <HeartIllustration className="w-14 h-14 drop-shadow" />
                      <div>
                        <h4 className="text-base sm:text-lg font-black text-rose-900">3. Aparato Circulatorio</h4>
                        <span className="text-xs text-rose-700 font-extrabold">Reparte la sangre</span>
                      </div>
                    </div>
                    <NarratorSpeaker
                      text="Aparato circulatorio: El corazón bombea la sangre a través de los vasos sanguíneos. Transporta el oxígeno y los nutrientes por todo el cuerpo sin descanso."
                      size="sm"
                    />
                  </div>
                  <div className="bg-rose-50 p-3 rounded-xl border border-rose-200 text-xs font-semibold text-slate-800 space-y-1">
                    <div><strong>Órganos clave:</strong> Corazón y vasos sanguíneos (venas y arterias).</div>
                    <div><strong>Misión:</strong> Lleva nutrientes y oxígeno a todas las células a través de la sangre.</div>
                  </div>
                </div>

                {/* 4. Excretor */}
                <div className="bg-white p-5 rounded-2xl border-3 border-yellow-400 shadow-md space-y-3 text-slate-900">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <KidneysIllustration className="w-14 h-14 drop-shadow" />
                      <div>
                        <h4 className="text-base sm:text-lg font-black text-yellow-900">4. Aparato Excretor</h4>
                        <span className="text-xs text-yellow-700 font-extrabold">Limpia los desechos</span>
                      </div>
                    </div>
                    <NarratorSpeaker
                      text="Aparato excretor: Los riñones filtran la sangre como coladores mágicos y la vejiga guarda la orina hasta que vamos al baño a hacer pipí."
                      size="sm"
                    />
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-xl border border-yellow-200 text-xs font-semibold text-slate-800 space-y-1">
                    <div><strong>Órganos clave:</strong> Riñones y vejiga (¡y también el sudor en la piel!).</div>
                    <div><strong>Misión:</strong> Limpia la sangre expulsando sustancias de desecho en la orina.</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Subtheme: 3 FUNCIONES VITALES */}
          {esquemaSubTab === 'vitales' && (
            <div className="game-dialog-card p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="game-ribbon-yellow mb-2">
                    EN RESUMEN · LAS 3 FUNCIONES VITALES
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Lo que nos hace seres vivos frente a los espantapájaros
                  </h3>
                </div>
                <NarratorSpeaker
                  text="Todos los seres vivos realizamos tres funciones vitales: Nutrición para obtener energía, Relación para sentir lo que ocurre y movernos, y Reproducción para tener descendientes parecidos a nosotros."
                  label="Escuchar Funciones"
                  size="sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border-2 border-amber-300 text-slate-900 space-y-2 shadow-md">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-2xl font-black border border-amber-300">
                    ⚡
                  </div>
                  <h4 className="text-base font-black text-slate-900">1. Nutrición</h4>
                  <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                    Tomamos alimentos, agua y oxígeno del aire para conseguir energía y materiales para crecer sanos.
                  </p>
                  <div className="text-[11px] font-bold text-amber-900 bg-amber-50 p-2 rounded-xl">
                    ¡Nos da fuerza para correr, jugar y estudiar!
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border-2 border-sky-300 text-slate-900 space-y-2 shadow-md">
                  <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center text-2xl font-black border border-sky-300">
                    👁️
                  </div>
                  <h4 className="text-base font-black text-slate-900">2. Relación</h4>
                  <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                    Recibimos información con los 5 sentidos (vista, oído, tacto, olfato, gusto), el cerebro piensa y respondemos con movimiento.
                  </p>
                  <div className="text-[11px] font-bold text-sky-900 bg-sky-50 p-2 rounded-xl">
                    ¡Nos permite comunicarnos y esquivar peligros!
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border-2 border-rose-300 text-slate-900 space-y-2 shadow-md">
                  <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center text-2xl font-black border border-rose-300">
                    👶
                  </div>
                  <h4 className="text-base font-black text-slate-900">3. Reproducción</h4>
                  <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                    Permite a los seres vivos tener hijos parecidos a ellos. En las personas, los bebés crecen 9 meses en el vientre de la madre.
                  </p>
                  <div className="text-[11px] font-bold text-rose-900 bg-rose-50 p-2 rounded-xl">
                    ¡Asegura la continuidad de la vida con amor!
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Subtheme: RELACIÓN Y LOCOMOTOR */}
          {esquemaSubTab === 'relacion' && (
            <div className="game-dialog-card p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="game-ribbon-yellow mb-2">
                    EN RESUMEN · RELACIÓN Y MOVIMIENTO (PÁG. 26)
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    El viaje de la información: de los sentidos a los músculos
                  </h3>
                </div>
                <NarratorSpeaker
                  text="La función de relación ocurre en tres pasos: Primero, los órganos de los sentidos captan la información. Segundo, el cerebro la interpreta y decide qué hacer. Tercero, el aparato locomotor con los huesos y los músculos realiza el movimiento."
                  label="Escuchar Relación"
                  size="sm"
                />
              </div>

              {/* 3 Step Sequence with Drawings */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border-2 border-indigo-300 text-slate-900 space-y-2 shadow-md">
                  <span className="text-xs font-black text-indigo-900 bg-indigo-100 px-2 py-0.5 rounded-full">Paso 1: Captar</span>
                  <div className="flex items-center gap-2 my-2">
                    <EyeIllustration className="w-12 h-12" />
                    <EarIllustration className="w-12 h-12" />
                  </div>
                  <h4 className="text-base font-black text-slate-900">Los Sentidos</h4>
                  <p className="text-xs text-slate-700 font-medium">
                    Ojos, oídos, piel, nariz y lengua captan lo que pasa alrededor.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border-2 border-purple-300 text-slate-900 space-y-2 shadow-md">
                  <span className="text-xs font-black text-purple-900 bg-purple-100 px-2 py-0.5 rounded-full">Paso 2: Decidir</span>
                  <div className="my-2">
                    <BrainIllustration className="w-14 h-14" />
                  </div>
                  <h4 className="text-base font-black text-slate-900">El Cerebro</h4>
                  <p className="text-xs text-slate-700 font-medium">
                    Recibe los datos por los nervios, piensa y da la orden de actuar.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border-2 border-emerald-300 text-slate-900 space-y-2 shadow-md">
                  <span className="text-xs font-black text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-full">Paso 3: Mover</span>
                  <div className="flex items-center gap-2 my-2">
                    <SkeletonIllustration className="w-12 h-12" />
                    <MusclesIllustration className="w-12 h-12" />
                  </div>
                  <h4 className="text-base font-black text-slate-900">Aparato Locomotor</h4>
                  <p className="text-xs text-slate-700 font-medium">
                    Huesos sostienen y protegen; músculos se contraen para movernos.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Subtheme: 5 HÁBITOS SALUDABLES */}
          {esquemaSubTab === 'habitos' && (
            <div className="game-dialog-card p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="game-ribbon-yellow mb-2">
                    EN RESUMEN · LOS 5 HÁBITOS DE ORO (PÁG. 26)
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Los 5 pilares para crecer con una salud de hierro
                  </h3>
                </div>
                <NarratorSpeaker
                  text="Para cuidar nuestro cuerpo necesitamos practicar cinco hábitos saludables todos los días: una dieta sana y variada con mucha agua, hacer deporte y ejercicio físico, mantener una buena higiene corporal, descansar durmiendo de nueve a diez horas, y disfrutar de la naturaleza y los amigos."
                  label="Escuchar Hábitos"
                  size="sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {[
                  { title: '1. Dieta Sana', icon: '🍎', desc: 'Comer frutas, verduras, legumbres y beber suficiente agua.' },
                  { title: '2. Deporte', icon: '⚽', desc: 'Jugar al aire libre, correr y activar los músculos a diario.' },
                  { title: '3. Higiene', icon: '🧼', desc: 'Lavarse las manos, ducharse y cepillarse los dientes después de comer.' },
                  { title: '4. Sueño', icon: '🌙', desc: 'Dormir entre 9 y 10 horas cada noche para recuperar energías.' },
                  { title: '5. Naturaleza', icon: '🌳', desc: 'Pasear por el parque, respirar aire puro y compartir con amigos.' },
                ].map((h) => (
                  <div key={h.title} className="bg-white p-4 rounded-2xl border-2 border-slate-300 text-center flex flex-col items-center justify-between space-y-2 shadow-md">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-800 flex items-center justify-center text-2xl font-black border border-indigo-200">
                      {h.icon}
                    </div>
                    <h4 className="text-sm font-black text-slate-900">{h.title}</h4>
                    <p className="text-[11px] font-bold text-slate-700 leading-snug">
                      {h.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CLASIFICA LOS ÓRGANOS (Página 27) */}
      {activeTab === 'clasificar' && (
        <div className="game-dialog-card p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="game-ribbon-yellow mb-2">
                ACTIVIDAD INTERACTIVA · PÁGINA 27
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                ¡El Gran Clasificador de Órganos!
              </h3>
              <p className="text-xs sm:text-sm text-indigo-100 font-semibold mt-1">
                Toca primero un órgano de la lista y después toca la caja del aparato al que pertenece.
              </p>
            </div>
            <NarratorSpeaker
              text="¡A jugar! Selecciona un órgano de la fila superior, como el corazón o los pulmones, y luego pulsa en el aparato correspondiente: digestivo, respiratorio, circulatorio, excretor o función de relación. ¡A ver cuántos aciertas!"
              label="Escuchar instrucciones"
              size="sm"
            />
          </div>

          {/* Organs to classify with bold readable buttons */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-amber-300 uppercase tracking-wider">
                Órganos pendientes ({initialOrgans.length - Object.keys(classifiedOrgans).length} restantes):
              </span>
              <button
                type="button"
                onClick={handleResetClassification}
                className="text-xs font-bold text-indigo-200 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar juego</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {initialOrgans.map((organ) => {
                const isClassified = !!classifiedOrgans[organ.id];
                const isSelected = selectedOrgan === organ.id;

                if (isClassified) {
                  return (
                    <div
                      key={organ.id}
                      className="px-3.5 py-2.5 rounded-xl bg-emerald-950/80 border border-emerald-400/40 text-emerald-300 text-xs font-black flex items-center gap-1.5 opacity-60"
                      title="¡Ya clasificado!"
                    >
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>{organ.emoji} {organ.name}</span>
                    </div>
                  );
                }

                return (
                  <button
                    key={organ.id}
                    type="button"
                    onClick={() => {
                      playClickSound();
                      setSelectedOrgan(organ.id);
                    }}
                    className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm min-h-[46px] flex items-center gap-2 transition-all cursor-pointer shadow-md ${
                      isSelected
                        ? 'bg-amber-400 text-amber-950 border-2 border-white shadow-[0_4px_0_0_#b45309] scale-105 animate-pulse'
                        : 'bg-white text-slate-900 hover:bg-slate-50 border-2 border-slate-300 hover:scale-102'
                    }`}
                  >
                    <span className="text-lg">{organ.emoji}</span>
                    <span className="font-extrabold">{organ.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Target Systems Bins */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-black text-amber-300 uppercase tracking-wider block">
              {selectedOrgan ? `¿A qué aparato pertenece "${initialOrgans.find(o => o.id === selectedOrgan)?.name}"? ¡Toca abajo!` : 'Elige un órgano arriba para colocarlo aquí:'}
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {systems.map((sys) => {
                const organsInside = initialOrgans.filter(o => classifiedOrgans[o.id] === sys.id);

                return (
                  <div
                    key={sys.id}
                    onClick={() => handleSelectSystem(sys.id)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      selectedOrgan
                        ? 'hover:scale-[1.02] ring-2 ring-amber-300/60 bg-white/15'
                        : 'bg-white/10'
                    } ${sys.border}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{sys.icon}</span>
                        <h4 className="font-black text-white text-xs sm:text-sm">{sys.name}</h4>
                      </div>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-white/20 text-white">
                        {organsInside.length}
                      </span>
                    </div>

                    {/* Classified chips inside */}
                    <div className="min-h-[48px] bg-black/30 rounded-xl p-2 flex flex-wrap gap-1.5 items-center">
                      {organsInside.length === 0 ? (
                        <span className="text-[11px] text-indigo-200/80 italic font-medium">Toca aquí para colocar</span>
                      ) : (
                        organsInside.map(o => (
                          <span
                            key={o.id}
                            className="bg-emerald-500 text-white text-[10px] sm:text-[11px] font-black px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs"
                          >
                            <span>{o.emoji}</span>
                            <span>{o.name}</span>
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Feedback message */}
          {classifyFeedback && (
            <div className="p-3.5 rounded-2xl bg-amber-400 text-amber-950 font-black text-xs sm:text-sm border-2 border-amber-500 shadow-md flex items-center justify-between gap-2 animate-in fade-in">
              <span>{classifyFeedback}</span>
              <Sparkles className="w-4 h-4 text-amber-900 flex-shrink-0" />
            </div>
          )}
        </div>
      )}

      {/* TAB 3: CASO NEREA Y ADRIÁN (NO SCREENSHOT - ILLUSTRATED COMIC) */}
      {activeTab === 'caso' && (
        <div className="game-dialog-card p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="game-ribbon-yellow mb-2">
                CASO PRÁCTICO REAL · PÁGINA 28
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Un sábado divertido en el parque con Nerea y Adrián
              </h3>
              <p className="text-xs sm:text-sm text-indigo-100 font-semibold mt-1">
                Lee las tres situaciones y responde qué funciones y hábitos están usando.
              </p>
            </div>
            <NarratorSpeaker
              text="Caso de Nerea y Adrián en el parque. Nerea y Adrián están disfrutando de una mañana al aire libre. Vamos a descubrir qué funciones del cuerpo y qué hábitos saludables están utilizando en cada momento."
              label="Escuchar caso"
              size="sm"
            />
          </div>

          {/* Illustrated Comic Banner (NO screenshot image) */}
          <div className="bg-gradient-to-r from-indigo-900/80 to-purple-900/80 rounded-2xl p-4 border-2 border-amber-300/40 flex flex-col sm:flex-row items-center gap-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-3xl p-3 bg-white/10 rounded-2xl border border-white/20">
              <span title="Patinete">🛴</span>
              <span title="Casco">⛑️</span>
              <span title="Merienda">🍎</span>
              <span title="Parque">🌳</span>
              <span title="Amigos">👫</span>
            </div>
            <div className="text-xs sm:text-sm text-indigo-100 font-bold space-y-1">
              <strong className="text-amber-300 block text-base drop-shadow">¡Las ciencias suceden en la vida real!</strong>
              <p>
                Nerea y Adrián van en patinete, llevan casco protector, meriendan fruta y descansan a la sombra con sus amigos. ¡Todo su cuerpo está funcionando!
              </p>
            </div>
          </div>

          {/* 3 Questions with explicit high-contrast options */}
          <div className="space-y-4">
            {casoQuestions.map((cq) => {
              const currentChoice = casoAnswers[cq.id];
              const isCorrect = currentChoice === cq.correct;

              return (
                <div key={cq.id} className="p-4 sm:p-5 bg-white/10 rounded-2xl border-2 border-indigo-300/30 space-y-3 backdrop-blur-sm">
                  <div className="text-xs sm:text-sm text-purple-200 font-bold bg-purple-950/70 p-2.5 rounded-xl border border-purple-400/30">
                    {cq.scenario}
                  </div>
                  <h4 className="font-black text-amber-300 text-sm sm:text-base drop-shadow">
                    {cq.question}
                  </h4>

                  <div className="grid grid-cols-1 gap-2">
                    {cq.options.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleCasoAnswer(cq.id, opt)}
                        className={`p-3.5 rounded-xl font-black text-xs sm:text-sm text-left min-h-[46px] transition-all flex items-start gap-2.5 cursor-pointer shadow-md ${
                          currentChoice === opt
                            ? opt === cq.correct
                              ? 'bg-emerald-500 text-white border-2 border-emerald-300 shadow-[0_3px_0_0_#065f46]'
                              : 'bg-amber-400 text-amber-950 border-2 border-amber-300'
                            : 'bg-white text-slate-900 hover:bg-slate-50 border-2 border-slate-300 shadow-[0_3px_0_0_#94a3b8]'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5 ${
                          currentChoice === opt ? 'border-current' : 'border-slate-400 text-slate-900'
                        }`}>
                          {currentChoice === opt ? '✓' : ''}
                        </span>
                        <span className={currentChoice === opt ? (opt === cq.correct ? 'text-white' : 'text-amber-950 font-bold') : 'text-slate-900 font-bold'}>
                          {opt}
                        </span>
                      </button>
                    ))}
                  </div>

                  {currentChoice && (
                    <div className={`p-2.5 rounded-xl text-xs font-bold ${
                      isCorrect ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-400/40' : 'bg-amber-950/80 text-amber-300 border border-amber-400/40'
                    }`}>
                      {isCorrect ? `¡Exacto! ${cq.tip}` : '¡Inténtalo otra vez! Piensa bien qué parte del cuerpo actúa.'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {casoCompleted && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-sm border-2 border-emerald-300 shadow-lg text-center flex items-center justify-center gap-2 animate-bounce">
              <Trophy className="w-6 h-6 text-amber-300" />
              <span>¡Caso de Nerea y Adrián superado con éxito! Has demostrado ser una científica de primera.</span>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: TRIVIA RELÁMPAGO (HIGH CONTRAST) */}
      {activeTab === 'trivia' && (
        <div className="game-dialog-card p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="game-ribbon-yellow mb-2">
                TRIVIA RELÁMPAGO · ¿LISTA PARA EL EXAMEN?
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                5 Preguntas Clave del Tema 1
              </h3>
            </div>
            <NarratorSpeaker
              text="Trivia relámpago: Responde a estas 5 preguntas para comprobar que te sabes todo el Tema 1 de ciencias. ¡Conseguirás hasta cinco estrellas si las respondes todas bien!"
              label="Escuchar Trivia"
              size="sm"
            />
          </div>

          <div className="space-y-4">
            {triviaList.map((t, index) => {
              const currentChoice = triviaAnswers[t.id];
              return (
                <div key={t.id} className="p-4 bg-white/10 rounded-2xl border-2 border-indigo-300/30 space-y-3 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-amber-400 text-amber-950 font-black text-xs flex items-center justify-center">
                      {index + 1}
                    </span>
                    <h4 className="font-black text-amber-300 text-sm sm:text-base drop-shadow">
                      {t.question}
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {t.options.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleTriviaOption(t.id, opt)}
                        className={`p-3.5 rounded-xl font-black text-xs sm:text-sm text-left min-h-[46px] transition-all flex items-start gap-2.5 cursor-pointer shadow-md ${
                          currentChoice === opt
                            ? triviaSubmitted && opt === t.correct
                              ? 'bg-emerald-500 text-white border-2 border-emerald-300 shadow-[0_3px_0_0_#065f46]'
                              : triviaSubmitted && opt !== t.correct
                              ? 'bg-rose-500 text-white border-2 border-rose-300'
                              : 'bg-gradient-to-b from-emerald-400 to-emerald-600 text-white border-2 border-emerald-700 shadow-[0_3px_0_0_#065f46]'
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

                  {triviaSubmitted && (
                    <div className="text-xs font-bold text-purple-200 bg-purple-950/70 p-2.5 rounded-xl border border-purple-400/30">
                      💡 <strong>Explicación:</strong> {t.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <span className="text-xs text-indigo-200 font-bold">
              Respondidas: {Object.keys(triviaAnswers).length} de {triviaList.length} preguntas
            </span>

            <button
              type="button"
              onClick={handleCheckTrivia}
              className="game-button-ok py-3 px-8 text-sm font-black uppercase tracking-wider cursor-pointer"
            >
              Comprobar Mis Respuestas
            </button>
          </div>
        </div>
      )}

      {/* TAB 5: CUADERNO ILUSTRADO DE TINA (REPLACES SCREENSHOTS WITH VECTOR CARDS) */}
      {activeTab === 'libro' && (
        <div className="game-dialog-card p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="game-ribbon-yellow mb-2">
                EL CUADERNO ILUSTRADO DE CIENCIAS
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Resumen con dibujos claros y explicados (Páginas 25 a 28)
              </h3>
            </div>
            <NarratorSpeaker
              text={currentPage.narration}
              label="Escuchar esta página"
              size="sm"
            />
          </div>

          {/* Page Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {notebookPages.map((page) => (
              <button
                key={page.num}
                type="button"
                onClick={() => {
                  playClickSound();
                  setSelectedPageNum(page.num);
                }}
                className={`py-2 px-4 rounded-xl font-black text-xs sm:text-sm min-h-[44px] transition-all cursor-pointer border ${
                  selectedPageNum === page.num
                    ? 'bg-gradient-to-b from-amber-300 to-amber-500 text-amber-950 border-amber-600 shadow-[0_3px_0_0_#b45309]'
                    : 'bg-indigo-900/60 text-indigo-200 hover:text-white border-indigo-700/60'
                }`}
              >
                <span>Pág. {page.num}</span>
              </button>
            ))}
          </div>

          {/* Page Title & Subtitle banner */}
          <div className="bg-purple-950/70 p-4 rounded-2xl border border-purple-400/30 flex items-center justify-between gap-3">
            <div>
              <h4 className="text-base font-black text-amber-300">{currentPage.title}</h4>
              <p className="text-xs font-semibold text-purple-200">{currentPage.subtitle}</p>
            </div>
            <NarratorSpeaker text={currentPage.narration} size="sm" />
          </div>

          {/* Render the clean illustrated content (NO tiny screenshots) */}
          <div className="bg-white/10 p-5 rounded-2xl border-2 border-indigo-300/30 backdrop-blur-sm">
            {currentPage.content}
          </div>
        </div>
      )}
    </div>
  );
};
