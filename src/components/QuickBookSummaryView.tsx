import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowLeft, 
  Star, 
  CheckCircle, 
  Check, 
  BookOpen, 
  Heart, 
  Zap, 
  Eye, 
  Baby, 
  Apple, 
  Trophy, 
  Award,
  Volume2
} from 'lucide-react';
import { NarratorSpeaker } from './NarratorSpeaker';
import { playClickSound, playSuccessSound, playCompleteSound } from '../utils/audio';
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

export const QuickBookSummaryView: React.FC<Props> = ({
  onBackToMap,
  onAddReward,
  studentName,
}) => {
  // Track which concepts the child has checked off as mastered (+1 ⭐ for each!)
  const [masteredConcepts, setMasteredConcepts] = useState<number[]>([]);

  const handleToggleMastered = (conceptId: number, conceptTitle: string) => {
    playClickSound();
    if (masteredConcepts.includes(conceptId)) {
      setMasteredConcepts(prev => prev.filter(id => id !== conceptId));
    } else {
      playSuccessSound();
      const next = [...masteredConcepts, conceptId];
      setMasteredConcepts(next);
      if (onAddReward) {
        onAddReward(1, 10, `¡Concepto dominado: ${conceptTitle}! +1 ⭐`);
      }
      if (next.length === 8) {
        playCompleteSound();
        if (onAddReward) {
          onAddReward(5, 50, '🎉 ¡TODO EL LIBRO DOMINADO! +5 ⭐');
        }
      }
    }
  };

  const concepts = [
    {
      id: 1,
      tag: 'Págs. 9 y 10',
      title: '1. Los Seres Vivos y las 3 Funciones Vitales',
      badge: '🌱 Vida',
      color: 'from-emerald-500 to-teal-600',
      borderColor: 'border-emerald-400',
      narration: 'Concepto 1: Los seres vivos nacemos, crecemos, nos alimentamos, sentimos y nos reproducimos. Realizamos tres funciones vitales: nutrición para tener energía, relación para sentir el mundo y movernos, y reproducción para tener hijos semejantes a nosotros. Los espantapájaros o robots son seres inertes porque no tienen vida.',
      drawings: (
        <div className="flex items-center justify-around gap-2 p-2 bg-emerald-50 rounded-2xl border border-emerald-200">
          <RabbitIllustration className="w-16 h-16 drop-shadow" />
          <span className="text-2xl animate-bounce">🌱</span>
          <PlantIllustration className="w-16 h-16 drop-shadow" />
          <ScarecrowIllustration className="w-16 h-16 drop-shadow opacity-75" />
        </div>
      ),
      summaryPoints: [
        '⚡ Nutrición: Tomamos comida, agua y oxígeno para tener energía y crecer.',
        '👁️ Relación: Recibimos datos con los 5 sentidos, el cerebro piensa y nos movemos.',
        '👶 Reproducción: Capacidad de tener bebés parecidos a los padres.'
      ],
      keyExamTip: '¡En el examen recuerda: Seres vivos (animales, plantas, personas) frente a Seres inertes (piedras, juguetes, espantapájaros)!'
    },
    {
      id: 2,
      tag: 'Págs. 11, 12 y 25',
      title: '2. La Nutrición y los 4 Aparatos del Cuerpo',
      badge: '⚡ Energía',
      color: 'from-amber-500 to-orange-600',
      borderColor: 'border-amber-400',
      narration: 'Concepto 2: Para conseguir energía trabajan cuatro aparatos juntos. El digestivo con la boca y el estómago extrae nutrientes de la comida. El respiratorio con los pulmones capta el oxígeno del aire. El circulatorio con el corazón bombea la sangre para repartir todo. Y el excretor con los riñones filtra la sangre y expulsa los desechos en el pipí.',
      drawings: (
        <div className="grid grid-cols-4 gap-2 p-2 bg-amber-50 rounded-2xl border border-amber-200">
          <div className="text-center">
            <StomachIllustration className="w-12 h-12 mx-auto drop-shadow" />
            <span className="text-[10px] font-black text-amber-950 block mt-1">Digestivo</span>
          </div>
          <div className="text-center">
            <LungsIllustration className="w-12 h-12 mx-auto drop-shadow" inflated={true} />
            <span className="text-[10px] font-black text-sky-950 block mt-1">Respiratorio</span>
          </div>
          <div className="text-center">
            <HeartIllustration className="w-12 h-12 mx-auto drop-shadow" />
            <span className="text-[10px] font-black text-rose-950 block mt-1">Circulatorio</span>
          </div>
          <div className="text-center">
            <KidneysIllustration className="w-12 h-12 mx-auto drop-shadow" />
            <span className="text-[10px] font-black text-yellow-950 block mt-1">Excretor</span>
          </div>
        </div>
      ),
      summaryPoints: [
        '🍎 Aparato Digestivo: Boca, esófago, estómago e intestinos -> Convierte comida en nutrientes.',
        '🫁 Aparato Respiratorio: Nariz, tráquea y pulmones -> Toma el gas oxígeno del aire.',
        '❤️ Aparato Circulatorio: Corazón y vasos sanguíneos -> Reparte el oxígeno por la sangre.',
        '💧 Aparato Excretor: Riñones y vejiga urinaria -> Filtra la sangre y expulsa la orina.'
      ],
      keyExamTip: '¡Pregunta típica de examen: El corazón pertenece al aparato circulatorio, NO al respiratorio!'
    },
    {
      id: 3,
      tag: 'Págs. 13 y 14',
      title: '3. El Experimento de los Pulmones y la Respiración',
      badge: '🔬 Taller',
      color: 'from-sky-500 to-blue-600',
      borderColor: 'border-sky-400',
      narration: 'Concepto 3: En el taller de ciencias de Tina comprobamos cómo respiramos. La tráquea se bifurca en dos tubos llamados bronquios que van a cada pulmón. Al soplar, las bolsas se hinchan como los pulmones. Si una persona pierde un pulmón, puede seguir viviendo porque el otro pulmón sigue recibiendo aire independientemente.',
      drawings: (
        <div className="flex items-center justify-around gap-4 p-3 bg-sky-50 rounded-2xl border border-sky-200">
          <LungsIllustration className="w-20 h-20 drop-shadow" inflated={true} />
          <div className="text-xs space-y-1 font-bold text-sky-950">
            <div>🌬️ <strong>Inspiración:</strong> Entra aire rico en oxígeno.</div>
            <div>💨 <strong>Espiración:</strong> Expulsamos dióxido de carbono.</div>
            <div>✅ <strong>¿Vivir con un pulmón?</strong> ¡Sí, es posible!</div>
          </div>
        </div>
      ),
      summaryPoints: [
        '🌬️ El gas vital que buscamos en el aire se llama OXÍGENO.',
        '🫁 Los dos pulmones se encuentran protegidos dentro del pecho por las costillas.',
        '🔬 Cada pulmón tiene su propia rama de entrada de aire independiente.'
      ],
      keyExamTip: '¡Conclusión del taller: Las personas podemos vivir con un solo pulmón porque sus vías son independientes!'
    },
    {
      id: 4,
      tag: 'Págs. 15, 16 y 26',
      title: '4. La Relación: Sentidos, Cerebro y Aparato Locomotor',
      badge: '🎾 Movimiento',
      color: 'from-indigo-500 to-purple-600',
      borderColor: 'border-indigo-400',
      narration: 'Concepto 4: La relación tiene 3 pasos. Primero los sentidos captan el mundo. Segundo, el cerebro piensa y da una orden. Tercero, el aparato locomotor se mueve. El esqueleto está formado por huesos duros y rígidos que sostienen el cuerpo y protegen órganos delicados como el cerebro o el corazón. Y los músculos son elásticos y tiran de los huesos para que podamos correr y bailar.',
      drawings: (
        <div className="grid grid-cols-3 gap-2 p-2 bg-indigo-50 rounded-2xl border border-indigo-200">
          <div className="text-center bg-white p-2 rounded-xl border border-indigo-100">
            <EyeIllustration className="w-10 h-10 mx-auto" />
            <span className="text-[11px] font-black text-indigo-900 block mt-1">1º Sentidos</span>
          </div>
          <div className="text-center bg-white p-2 rounded-xl border border-purple-100">
            <BrainIllustration className="w-10 h-10 mx-auto" />
            <span className="text-[11px] font-black text-purple-900 block mt-1">2º Cerebro</span>
          </div>
          <div className="text-center bg-white p-2 rounded-xl border border-emerald-100">
            <MusclesIllustration className="w-10 h-10 mx-auto" />
            <span className="text-[11px] font-black text-emerald-900 block mt-1">3º Locomotor</span>
          </div>
        </div>
      ),
      summaryPoints: [
        '🦴 Huesos: Duros y rígidos. Sostienen el cuerpo y forman el esqueleto. El cráneo protege el cerebro y las costillas protegen corazón y pulmones.',
        '💪 Músculos: Blandos y elásticos. Se contraen y se relajan para mover los huesos.',
        '🗣️ Esternocleidomastoideo: El músculo con el nombre más largo, está en el cuello y gira la cabeza.'
      ],
      keyExamTip: '¡Divertidadto de examen: Si no tuviéramos huesos, nos moveríamos reptando como un pulpo o babosa!'
    },
    {
      id: 5,
      tag: 'Págs. 17, 18 y 26',
      title: '5. La Reproducción Humana y el Embarazo',
      badge: '❤️ Familia',
      color: 'from-rose-500 to-pink-600',
      borderColor: 'border-rose-400',
      narration: 'Concepto 5: La reproducción permite tener descendientes. Los chicos y las chicas tenemos órganos reproductores diferentes: los chicos tienen pene y testículos, y las chicas tienen ovarios, útero y vagina. Durante el embarazo, el bebé crece en el útero de la mamá durante nueve meses y late su corazón junto al de la madre. Además, aprendemos que nuestro cuerpo es valioso y debemos respetar la intimidad.',
      drawings: (
        <div className="flex items-center justify-around gap-2 p-3 bg-rose-50 rounded-2xl border border-rose-200">
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-sky-300">
            <span className="text-2xl">👦</span>
            <span className="text-xs font-black text-sky-900">Pene y Testículos</span>
          </div>
          <div className="text-3xl animate-pulse">❤️</div>
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-rose-300">
            <span className="text-2xl">👧</span>
            <span className="text-xs font-black text-rose-900">Útero y Ovarios</span>
          </div>
        </div>
      ),
      summaryPoints: [
        '👦 Órganos masculinos (chicos): Pene y testículos.',
        '👧 Órganos femeninos (chicas): Útero (donde se aloja el bebé), ovarios y vagina.',
        '🤰 Embarazo: Dura 9 meses en el vientre materno (¡dos corazones latiendo a la vez!).',
        '🛡️ Intimidad: Las partes privadas de nuestro cuerpo deben respetarse y cuidarse con confianza.'
      ],
      keyExamTip: '¡Acertijo del libro: Una mujer embarazada tiene dos corazones latiendo en su cuerpo: el suyo y el del bebé!'
    },
    {
      id: 6,
      tag: 'Págs. 19, 20 y 26',
      title: '6. Los 5 Hábitos Saludables de Oro',
      badge: '🍎 Salud',
      color: 'from-teal-500 to-emerald-600',
      borderColor: 'border-teal-400',
      narration: 'Concepto 6: Para crecer sanos y fuertes debemos practicar cinco hábitos saludables todos los días: una dieta variada con frutas, verduras y agua; hacer deporte y juego activo; mantener una buena higiene lavándonos manos y dientes; dormir de nueve a diez horas por la noche; y pasar tiempo en la naturaleza con nuestros amigos.',
      drawings: (
        <div className="grid grid-cols-5 gap-1.5 p-2 bg-emerald-50 rounded-2xl border border-emerald-200 text-center">
          <div className="bg-white p-2 rounded-xl">
            <span className="text-2xl">🍎</span>
            <span className="text-[10px] font-black text-slate-800 block">Dieta</span>
          </div>
          <div className="bg-white p-2 rounded-xl">
            <span className="text-2xl">⚽</span>
            <span className="text-[10px] font-black text-slate-800 block">Deporte</span>
          </div>
          <div className="bg-white p-2 rounded-xl">
            <span className="text-2xl">🧼</span>
            <span className="text-[10px] font-black text-slate-800 block">Higiene</span>
          </div>
          <div className="bg-white p-2 rounded-xl">
            <span className="text-2xl">🌙</span>
            <span className="text-[10px] font-black text-slate-800 block">Sueño</span>
          </div>
          <div className="bg-white p-2 rounded-xl">
            <span className="text-2xl">🌳</span>
            <span className="text-[10px] font-black text-slate-800 block">Amigos</span>
          </div>
        </div>
      ),
      summaryPoints: [
        '🍎 1. Alimentación sana: Comer fruta, verdura, pescado, legumbres y beber agua.',
        '⚽ 2. Ejercicio físico: Jugar en el recreo, correr y evitar estar sentado con pantallas.',
        '🧼 3. Higiene personal: Ducha diaria, cepillado de dientes tras comer y lavado de manos.',
        '🌙 4. Buen descanso: Dormir entre 9 y 10 horas cada noche.',
        '🌳 5. Tiempo libre: Respirar aire puro al aire libre y disfrutar de la amistad.'
      ],
      keyExamTip: '¡Dormir poco o comer comida ultraprocesada en el sofá frente a la tele perjudica el crecimiento!'
    },
    {
      id: 7,
      tag: 'Págs. 21 y 22',
      title: '7. Kathrine Switzer y la Igualdad en el Deporte',
      badge: '🏃‍♀️ Igualdad',
      color: 'from-purple-500 to-indigo-700',
      borderColor: 'border-purple-400',
      narration: 'Concepto 7: Kathrine Switzer demostró al mundo en la maratón de Boston de 1967 que las mujeres y las niñas pueden participar y correr cualquier distancia en igualdad de condiciones con los hombres. Llevó el dorsal 261, y hoy es el símbolo mundial del deporte para todas y todos.',
      drawings: (
        <div className="flex items-center justify-around gap-3 p-3 bg-purple-50 rounded-2xl border border-purple-200">
          <span className="text-4xl">🏃‍♀️</span>
          <div className="bg-gradient-to-b from-rose-500 to-pink-600 text-white px-4 py-2 rounded-2xl border-2 border-white shadow-md text-center">
            <span className="text-[10px] font-black uppercase tracking-widest block text-amber-200">DORSAL HISTÓRICO</span>
            <span className="text-2xl font-black font-mono">261</span>
          </div>
          <span className="text-3xl">🏅</span>
        </div>
      ),
      summaryPoints: [
        '🏃‍♀️ En 1967 no dejaban a las mujeres correr maratones por prejuicios falsos.',
        '🎽 Kathrine corrió con el dorsal 261 y cruzó la meta con valentía.',
        '🤝 Niñas y niños tenemos la misma capacidad de disfrutar del deporte y los juegos.'
      ],
      keyExamTip: '¡El dorsal 261 simboliza la igualdad, el respeto y la inclusión en el deporte!'
    },
    {
      id: 8,
      tag: 'Págs. 23 a 28',
      title: '8. Patios Inclusivos y el Caso de Nerea y Adrián',
      badge: '🏆 Reto Final',
      color: 'from-amber-400 to-yellow-600',
      borderColor: 'border-amber-400',
      narration: 'Concepto 8: El reto final del tema nos enseña a diseñar un patio escolar donde todos y todas podamos jugar felices: con pista de deportes con turnos justos, rincón tranquilo para juegos de mesa y lectura, zona verde con sombra y arenero. Y en el caso de Nerea y Adrián vemos que las ciencias están en nuestro día a día.',
      drawings: (
        <div className="grid grid-cols-4 gap-2 p-2 bg-yellow-50 rounded-2xl border border-yellow-200 text-center">
          <div className="bg-white p-2 rounded-xl">
            <span className="text-2xl">🏀</span>
            <span className="text-[10px] font-black text-slate-800 block">Deporte</span>
          </div>
          <div className="bg-white p-2 rounded-xl">
            <span className="text-2xl">🎲</span>
            <span className="text-[10px] font-black text-slate-800 block">Juegos Mesa</span>
          </div>
          <div className="bg-white p-2 rounded-xl">
            <span className="text-2xl">🌳</span>
            <span className="text-[10px] font-black text-slate-800 block">Naturaleza</span>
          </div>
          <div className="bg-white p-2 rounded-xl">
            <span className="text-2xl">🛝</span>
            <span className="text-[10px] font-black text-slate-800 block">Arenero</span>
          </div>
        </div>
      ),
      summaryPoints: [
        '🏫 Patio inclusivo: Zonas variadas para que nadie se quede solo en el recreo.',
        '🛴 Nerea frena el patinete usando la relación (ojos captan, cerebro decide y manos frenan).',
        '🍌 Adrián merienda fruta usando la nutrición (el digestivo absorbe y el circulatorio reparte).'
      ],
      keyExamTip: '¡Un patio de todos y para todos garantiza turnos respetuosos y actividades para cualquier gusto!'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in pb-16">
      {/* Top Header */}
      <div className="relative pt-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
          <div className="game-ribbon-yellow px-6 py-2 text-xs sm:text-sm font-black uppercase tracking-wider shadow-md flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-800" />
            <span>GRAN RESUMEN VISUAL DEL LIBRO COMPLETO (TEMA 1)</span>
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
                  Todo el libro en 8 fichas visuales
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black leading-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                ¡El Gran Resumen de Ciencias, {studentName}!
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-purple-100 mt-1 max-w-2xl">
                Todos los conceptos del libro SM explicados con dibujos grandes, puntos clave y botón de voz. ¡Toca cada estrella para marcar lo que ya te sabes!
              </p>

              {/* Progress counter */}
              <div className="mt-4 flex items-center gap-3 bg-purple-950/60 p-2.5 rounded-2xl border border-purple-400/30 w-fit">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <span className="text-xs font-black text-amber-300">
                  Conceptos dominados: {masteredConcepts.length} de {concepts.length}
                </span>
                {masteredConcepts.length === 8 && (
                  <span className="text-[11px] font-black text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-400">
                    ¡100% LISTA PARA EL EXAMEN! 🏆
                  </span>
                )}
              </div>
            </div>

            <div className="self-end sm:self-center flex-shrink-0">
              <NarratorSpeaker
                text={`¡Hola ${studentName}! Este es el Gran Resumen Visual de todo el libro de Ciencias Naturales. Puedes pulsar en el botón de escuchar de cada tarjeta para que te lea los puntos clave, y pulsar la estrella dorada para marcar los conceptos que ya dominas.`}
                label="Escuchar guía"
                size="md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid of 8 Visual Concept Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {concepts.map((concept) => {
          const isMastered = masteredConcepts.includes(concept.id);

          return (
            <div
              key={concept.id}
              className={`bg-white rounded-3xl p-5 sm:p-6 border-4 shadow-xl transition-all duration-200 flex flex-col justify-between space-y-4 ${
                isMastered ? 'border-emerald-500 ring-4 ring-emerald-300/40' : concept.borderColor
              }`}
            >
              {/* Card Header */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-black text-slate-800 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-300">
                      {concept.tag}
                    </span>
                    <span className="text-xs font-black px-2.5 py-1 rounded-full bg-gradient-to-r text-white shadow-2xs">
                      {concept.badge}
                    </span>
                  </div>

                  <NarratorSpeaker text={concept.narration} size="sm" />
                </div>

                <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                  {concept.title}
                </h3>
              </div>

              {/* Big Visual Drawings */}
              <div>{concept.drawings}</div>

              {/* Summary Bullet Points */}
              <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs font-semibold text-slate-800 leading-relaxed">
                {concept.summaryPoints.map((pt, idx) => (
                  <p key={idx} className="flex items-start gap-1.5">
                    <span>{pt}</span>
                  </p>
                ))}
              </div>

              {/* Exam Tip Box */}
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-300 text-[11px] font-black text-amber-950 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>{concept.keyExamTip}</span>
              </div>

              {/* "Toca si te lo sabes" Toggle Button */}
              <button
                type="button"
                onClick={() => handleToggleMastered(concept.id, concept.title)}
                className={`w-full py-3 px-4 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                  isMastered
                    ? 'bg-gradient-to-b from-emerald-500 to-teal-600 text-white border-2 border-emerald-400 shadow-[0_3px_0_0_#065f46]'
                    : 'bg-gradient-to-b from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 text-amber-950 border-2 border-amber-600 shadow-[0_3px_0_0_#b45309]'
                }`}
              >
                <Star className={`w-4 h-4 ${isMastered ? 'fill-white text-white' : 'fill-amber-950 text-amber-950'}`} />
                <span>{isMastered ? '¡Concepto Dominado! ✓ (+1 ⭐)' : '¡Ya me lo sé! Marcar como dominado'}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Bottom celebration bar */}
      <div className="game-dialog-card p-6 text-center space-y-3">
        <h3 className="text-xl sm:text-2xl font-black text-white">
          ¿Has repasado todos los conceptos?
        </h3>
        <p className="text-xs sm:text-sm text-purple-100 font-semibold max-w-lg mx-auto">
          ¡Genial! Ahora puedes poner a prueba tus conocimientos en el Súper Repaso interactivo o en el Gran Reto Final.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onBackToMap();
            }}
            className="game-button-ok py-3 px-8 text-sm font-black uppercase tracking-wider cursor-pointer"
          >
            <span>Volver al Mapa de Misiones</span>
          </button>
        </div>
      </div>
    </div>
  );
};
