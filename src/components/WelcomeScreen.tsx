import React, { useState } from 'react';
import { Sparkles, Heart, Play, BookOpen, Volume2 } from 'lucide-react';
import { getAudioContext, startBgm, playSuccessSound, speakText } from '../utils/audio';
import { NarratorSpeaker } from './NarratorSpeaker';
import { HeartIllustration, LungsIllustration, BrainIllustration, StomachIllustration } from './Illustrations';

interface Props {
  onStart: (name: string, avatarId: string) => void;
  defaultName: string;
  defaultAvatar: string;
}

const AVATARS = [
  { id: 'girl_scientist', emoji: '👩‍🔬', label: 'Científica' },
  { id: 'girl_athlete', emoji: '🏃‍♀️', label: 'Deportista' },
  { id: 'girl_artist', emoji: '🎨', label: 'Exploradora' },
  { id: 'super_hero', emoji: '🦸‍♀️', label: 'Superhéroe' },
];

export const WelcomeScreen: React.FC<Props> = ({
  onStart,
  defaultName,
  defaultAvatar
}) => {
  const [name, setName] = useState(defaultName || 'Sofía');
  const [selectedAvatar, setSelectedAvatar] = useState(defaultAvatar || 'girl_scientist');

  const handleStart = () => {
    // Start Audio Context & BGM
    getAudioContext();
    startBgm();
    playSuccessSound();

    const welcomeMsg = `¡Bienvenida ${name}! Vamos a explorar el fascinante Tema 1 de Ciencias: Mi cuerpo funciona. ¡Aprenderemos jugando!`;
    speakText(welcomeMsg);

    onStart(name, selectedAvatar);
  };

  return (
    <div className="game-canvas-bg min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 text-slate-100">
      <div className="relative max-w-lg w-full pt-4">
        {/* Top ribbon: "¡CIENCIAS 2º PRIMARIA!" */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
          <div className="game-ribbon-yellow px-6 py-2 text-xs sm:text-sm font-black uppercase tracking-wider shadow-md flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-800" />
            <span>Ciencias de la Naturaleza · 2º Primaria</span>
          </div>
        </div>

        {/* Purple Game Dialog Card */}
        <div className="game-dialog-card p-6 sm:p-8 pt-8 text-center text-white relative animate-in fade-in zoom-in-95 duration-300">
          {/* Illustrated Welcome Banner with Clean Drawings (NO screenshot) */}
          <div className="relative mb-5 rounded-2xl overflow-hidden border-2 border-purple-300/40 shadow-inner p-4 bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-pink-900/80 flex flex-col items-center justify-center">
            <div className="flex items-center justify-center gap-3 py-1">
              <BrainIllustration className="w-12 h-12 drop-shadow-md animate-pulse" />
              <HeartIllustration className="w-12 h-12 drop-shadow-md" />
              <LungsIllustration className="w-12 h-12 drop-shadow-md" />
              <StomachIllustration className="w-12 h-12 drop-shadow-md" />
            </div>
            <span className="text-white text-xs sm:text-sm font-black drop-shadow-md mt-2">
              🔬 ¡Tina y Ro te esperan para investigar el cuerpo humano!
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            ¡Mi Cuerpo Funciona!
          </h1>
          <p className="text-xs sm:text-sm text-purple-200 font-semibold mt-1 max-w-sm mx-auto">
            Misiones interactivas, juegos educativos, música y locución para repasar todo el Tema 1.
          </p>

          {/* Audio helper button */}
          <div className="mt-3 flex justify-center">
            <NarratorSpeaker
              text="¡Hola! Te damos la bienvenida a Mi cuerpo funciona. Escribe tu nombre, elige tu personaje y pulsa el botón verde para comenzar a jugar."
              label="Escuchar bienvenida"
              size="sm"
            />
          </div>

          {/* Name input & Avatar selector */}
          <div className="mt-5 space-y-4 bg-purple-900/50 p-4 sm:p-5 rounded-3xl border border-purple-400/40 text-left backdrop-blur-xs">
            <div>
              <label htmlFor="student-name" className="block text-xs font-black text-amber-300 uppercase tracking-wide mb-1.5 drop-shadow-xs">
                ¿Cómo te llamas?
              </label>
              <input
                id="student-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre aquí..."
                className="w-full px-4 py-3 bg-white rounded-full border-2 border-indigo-300 font-black text-slate-800 text-base shadow-[0_3px_0_0_#9cb0e2] focus:outline-none focus:ring-4 focus:ring-amber-300"
              />
            </div>

            <div>
              <span className="block text-xs font-black text-amber-300 uppercase tracking-wide mb-2 drop-shadow-xs">
                Elige tu avatar de científica:
              </span>
              <div className="grid grid-cols-4 gap-2">
                {AVATARS.map((av) => (
                  <button
                    key={av.id}
                    type="button"
                    onClick={() => setSelectedAvatar(av.id)}
                    className={`p-2.5 rounded-2xl flex flex-col items-center justify-center transition-all min-h-[58px] ${
                      selectedAvatar === av.id
                        ? 'bg-gradient-to-b from-amber-300 to-amber-500 text-amber-950 border-2 border-amber-600 shadow-[0_3px_0_0_#b45309] scale-105'
                        : 'bg-white/90 hover:bg-white text-slate-800 border-2 border-indigo-200 shadow-[0_2px_0_0_#9cb0e2]'
                    }`}
                  >
                    <span className="text-2xl">{av.emoji}</span>
                    <span className="text-[10px] font-black mt-1 leading-tight">{av.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Big Start Button in 3D Green "OK" style */}
          <div className="mt-6 flex flex-col items-center">
            <button
              type="button"
              onClick={handleStart}
              className="game-button-ok w-full py-4 px-8 text-lg sm:text-xl font-black uppercase tracking-wider flex items-center justify-center gap-3 cursor-pointer"
            >
              <Play className="w-6 h-6 fill-current" />
              <span>¡Comenzar la Aventura!</span>
            </button>
            <span className="text-xs text-purple-200 font-semibold mt-2.5 flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-purple-300" />
              <span>Con música suave y narración con voz en español</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
