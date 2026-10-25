import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Mic, Bell, X, Check, Sparkles, Smile, Bot } from 'lucide-react';
import { SoundSettings } from '../types';
import { updateSoundSettings, speakText, playSuccessSound, playClickSound } from '../utils/audio';

interface Props {
  settings: SoundSettings;
  onUpdateSettings: (newSettings: SoundSettings) => void;
}

export const AudioControls: React.FC<Props> = ({ settings, onUpdateSettings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  const handleToggleBgm = () => {
    playClickSound();
    const updated = { ...settings, bgmEnabled: !settings.bgmEnabled };
    onUpdateSettings(updated);
    updateSoundSettings(updated);
  };

  const handleChangeBgmVolume = (val: number) => {
    const updated = { ...settings, bgmVolume: val };
    onUpdateSettings(updated);
    updateSoundSettings(updated);
  };

  const handleToggleVoice = () => {
    playClickSound();
    const updated = { ...settings, voiceEnabled: !settings.voiceEnabled };
    onUpdateSettings(updated);
    updateSoundSettings(updated);
  };

  const handleChangeVoiceVolume = (val: number) => {
    const updated = { ...settings, voiceVolume: val };
    onUpdateSettings(updated);
    updateSoundSettings(updated);
  };

  const handleChangeVoiceEngine = (engine: 'gemini_child' | 'gemini_puck' | 'gemini_kore' | 'browser') => {
    playClickSound();
    const updated = { ...settings, voiceEngine: engine };
    onUpdateSettings(updated);
    updateSoundSettings(updated);
  };

  const handleChangeVoiceSpeed = (val: number) => {
    const updated = { ...settings, voiceSpeed: val };
    onUpdateSettings(updated);
    updateSoundSettings(updated);
  };

  const handleChangeVoicePitch = (val: number) => {
    const updated = { ...settings, voicePitch: val };
    onUpdateSettings(updated);
    updateSoundSettings(updated);
  };

  const handleToggleSfx = () => {
    playClickSound();
    const updated = { ...settings, sfxEnabled: !settings.sfxEnabled };
    onUpdateSettings(updated);
    updateSoundSettings(updated);
  };

  const handleChangeSfxVolume = (val: number) => {
    const updated = { ...settings, sfxVolume: val };
    onUpdateSettings(updated);
    updateSoundSettings(updated);
  };

  const handleTestVoice = async () => {
    playClickSound();
    setIsTesting(true);
    let sample = '¡Hola! Soy Tina. ¡Me encanta investigar contigo el cuerpo humano! ¿A que sueno como una niña real y divertida?';
    if (settings.voiceEngine === 'gemini_kore') {
      sample = '¡Hola, pequeña investigadora! Soy tu profesora de ciencias. ¡Vamos a descubrir juntos cómo funciona tu cuerpo!';
    } else if (settings.voiceEngine === 'gemini_puck') {
      sample = '¡Hola, súper campeona! ¡Qué emoción aprender ciencias jugando contigo! ¡Eres increíble!';
    }
    await speakText(sample, () => {
      setIsTesting(false);
    });
  };

  const allMuted = !settings.bgmEnabled && !settings.voiceEnabled && !settings.sfxEnabled;

  const toggleAllMute = () => {
    playClickSound();
    if (allMuted) {
      const updated = {
        ...settings,
        bgmEnabled: true,
        voiceEnabled: true,
        sfxEnabled: true,
      };
      onUpdateSettings(updated);
      updateSoundSettings(updated);
    } else {
      const updated = {
        ...settings,
        bgmEnabled: false,
        voiceEnabled: false,
        sfxEnabled: false,
      };
      onUpdateSettings(updated);
      updateSoundSettings(updated);
    }
  };

  const currentEngine = settings.voiceEngine || 'gemini_child';

  return (
    <>
      {/* Quick Access Sound Button */}
      <div className="flex items-center gap-1.5 bg-[#1e274a]/90 backdrop-blur-md p-1.5 rounded-2xl border-2 border-[#3b4c85] shadow-md">
        <button
          type="button"
          onClick={toggleAllMute}
          title={allMuted ? 'Activar sonido' : 'Silenciar todo'}
          className={`p-2 rounded-xl min-w-[44px] min-h-[44px] flex items-center justify-center transition-all ${
            allMuted
              ? 'bg-rose-500/30 text-rose-300 border border-rose-500/50'
              : 'bg-indigo-600/40 text-amber-300 border border-amber-400/30 hover:bg-indigo-600/60'
          }`}
        >
          {allMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>

        <button
          type="button"
          onClick={() => {
            playClickSound();
            setIsOpen(true);
          }}
          className="px-2.5 sm:px-3 py-2 text-xs font-black text-amber-300 bg-indigo-900/60 hover:bg-indigo-800/80 rounded-xl min-h-[44px] flex items-center gap-1.5 transition-colors border border-amber-400/40"
          title="Ajustar voces naturales e infantiles y música"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Voz & Sonido</span>
          <span className="sm:hidden">Audio</span>
        </button>
      </div>

      {/* Audio Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-3 sm:p-4 animate-in fade-in duration-200">
          <div
            className="game-dialog-card max-w-lg w-full max-h-[92vh] flex flex-col relative overflow-hidden shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="audio-title"
          >
            {/* Header ribbon */}
            <div className="p-4 sm:p-5 border-b border-purple-400/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-400 border-2 border-amber-500 shadow-[0_3px_0_0_#b45309] flex items-center justify-center text-amber-950 text-2xl">
                  👧
                </div>
                <div>
                  <h3 id="audio-title" className="text-xl font-black text-white drop-shadow-sm">
                    Estudio de Voz de Tina
                  </h3>
                  <p className="text-xs text-amber-300 font-bold">
                    Voz humana infantil con IA, música y efectos
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setIsOpen(false);
                }}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/20"
                aria-label="Cerrar ajustes de audio"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {/* Voice Personas Card */}
              <div className="p-4 rounded-2xl bg-purple-950/60 border border-purple-400/40">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Mic className="w-5 h-5 text-amber-400" />
                    <span className="font-black text-white text-sm">Voz de la Narradora</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleToggleVoice}
                    className={`px-3 py-1.5 rounded-xl font-black text-xs min-h-[40px] flex items-center gap-1.5 transition-transform active:scale-95 ${
                      settings.voiceEnabled
                        ? 'bg-gradient-to-b from-lime-400 to-lime-600 text-slate-950 border border-lime-300 shadow-[0_2px_0_0_#4d7c0f]'
                        : 'bg-slate-700 text-slate-300 border border-slate-600'
                    }`}
                  >
                    {settings.voiceEnabled ? <Check className="w-4 h-4 stroke-[3]" /> : null}
                    {settings.voiceEnabled ? 'Voz Activada' : 'En Silencio'}
                  </button>
                </div>

                {settings.voiceEnabled && (
                  <>
                    <p className="text-xs text-purple-200 mb-2 font-medium">
                      Elige qué voz humana te acompañará en las aventuras:
                    </p>

                    {/* Voice selector pills */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                      <button
                        type="button"
                        onClick={() => handleChangeVoiceEngine('gemini_child')}
                        className={`p-2.5 rounded-xl text-left border-2 transition-all flex items-center gap-2.5 ${
                          currentEngine === 'gemini_child'
                            ? 'bg-amber-400 text-amber-950 border-amber-300 shadow-[0_3px_0_0_#b45309] font-black'
                            : 'bg-purple-900/40 text-white border-purple-400/30 hover:bg-purple-900/70 font-semibold'
                        }`}
                      >
                        <span className="text-2xl">👧</span>
                        <div>
                          <div className="text-xs font-black">Tina (Infantil Dulce)</div>
                          <div className="text-[10px] opacity-80">IA Natural · Sonido humano</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleChangeVoiceEngine('gemini_puck')}
                        className={`p-2.5 rounded-xl text-left border-2 transition-all flex items-center gap-2.5 ${
                          currentEngine === 'gemini_puck'
                            ? 'bg-amber-400 text-amber-950 border-amber-300 shadow-[0_3px_0_0_#b45309] font-black'
                            : 'bg-purple-900/40 text-white border-purple-400/30 hover:bg-purple-900/70 font-semibold'
                        }`}
                      >
                        <span className="text-2xl">🌟</span>
                        <div>
                          <div className="text-xs font-black">Puck (Alegre y Enérgica)</div>
                          <div className="text-[10px] opacity-80">IA Dinámica y divertida</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleChangeVoiceEngine('gemini_kore')}
                        className={`p-2.5 rounded-xl text-left border-2 transition-all flex items-center gap-2.5 ${
                          currentEngine === 'gemini_kore'
                            ? 'bg-amber-400 text-amber-950 border-amber-300 shadow-[0_3px_0_0_#b45309] font-black'
                            : 'bg-purple-900/40 text-white border-purple-400/30 hover:bg-purple-900/70 font-semibold'
                        }`}
                      >
                        <span className="text-2xl">👩‍🏫</span>
                        <div>
                          <div className="text-xs font-black">Profesora Cariñosa</div>
                          <div className="text-[10px] opacity-80">IA Cálida y pedagógica</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleChangeVoiceEngine('browser')}
                        className={`p-2.5 rounded-xl text-left border-2 transition-all flex items-center gap-2.5 ${
                          currentEngine === 'browser'
                            ? 'bg-amber-400 text-amber-950 border-amber-300 shadow-[0_3px_0_0_#b45309] font-black'
                            : 'bg-purple-900/40 text-white border-purple-400/30 hover:bg-purple-900/70 font-semibold'
                        }`}
                      >
                        <span className="text-2xl">🎙️</span>
                        <div>
                          <div className="text-xs font-black">Voz Local del Dispositivo</div>
                          <div className="text-[10px] opacity-80">Sin conexión a Internet</div>
                        </div>
                      </button>
                    </div>

                    {/* Pitch & Speed personalization */}
                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-purple-400/20 text-xs text-purple-200">
                      <div>
                        <span className="font-bold block mb-1">Tono Infantil:</span>
                        <input
                          type="range"
                          min="0.9"
                          max="1.5"
                          step="0.05"
                          value={settings.voicePitch || 1.15}
                          onChange={(e) => handleChangeVoicePitch(parseFloat(e.target.value))}
                          className="w-full accent-amber-400 h-2 bg-purple-900 rounded-lg cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-purple-300 mt-0.5">
                          <span>Normal</span>
                          <span>Más Agudo 👧</span>
                        </div>
                      </div>

                      <div>
                        <span className="font-bold block mb-1">Velocidad:</span>
                        <input
                          type="range"
                          min="0.8"
                          max="1.2"
                          step="0.05"
                          value={settings.voiceSpeed || 0.95}
                          onChange={(e) => handleChangeVoiceSpeed(parseFloat(e.target.value))}
                          className="w-full accent-amber-400 h-2 bg-purple-900 rounded-lg cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-purple-300 mt-0.5">
                          <span>Pausada</span>
                          <span>Rápida</span>
                        </div>
                      </div>
                    </div>

                    {/* Test Voice Button */}
                    <div className="mt-3.5 flex items-center justify-between gap-3 bg-purple-900/50 p-2.5 rounded-xl border border-purple-400/30">
                      <div className="text-xs text-white font-bold flex items-center gap-1.5">
                        <Smile className="w-4 h-4 text-amber-300" />
                        <span>Comprobar cómo suena:</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleTestVoice}
                        disabled={isTesting}
                        className={`px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1.5 transition-transform active:scale-95 ${
                          isTesting
                            ? 'bg-amber-300 text-amber-950 animate-pulse'
                            : 'bg-gradient-to-b from-amber-300 to-amber-500 text-amber-950 border border-amber-600 shadow-[0_2px_0_0_#b45309]'
                        }`}
                      >
                        <span>{isTesting ? 'Hablando... 🗣️' : '▶ Escuchar a Tina'}</span>
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Music Settings */}
              <div className="p-4 rounded-2xl bg-purple-950/60 border border-purple-400/40">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Music className="w-5 h-5 text-amber-400" />
                    <span className="font-black text-white text-sm">Música Pentatónica Suave</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleToggleBgm}
                    className={`px-3 py-1.5 rounded-xl font-black text-xs min-h-[40px] flex items-center gap-1.5 transition-transform active:scale-95 ${
                      settings.bgmEnabled
                        ? 'bg-gradient-to-b from-lime-400 to-lime-600 text-slate-950 border border-lime-300 shadow-[0_2px_0_0_#4d7c0f]'
                        : 'bg-slate-700 text-slate-300 border border-slate-600'
                    }`}
                  >
                    {settings.bgmEnabled ? <Check className="w-4 h-4 stroke-[3]" /> : null}
                    {settings.bgmEnabled ? 'Música Sí' : 'Silencio'}
                  </button>
                </div>
                {settings.bgmEnabled && (
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-purple-200 font-bold w-16">Volumen:</span>
                    <input
                      type="range"
                      min="0.05"
                      max="0.8"
                      step="0.05"
                      value={settings.bgmVolume}
                      onChange={(e) => handleChangeBgmVolume(parseFloat(e.target.value))}
                      className="w-full accent-amber-400 h-2 bg-purple-900 rounded-lg cursor-pointer"
                    />
                    <span className="text-xs font-black text-amber-300 w-10 text-right">
                      {Math.round(settings.bgmVolume * 100)}%
                    </span>
                  </div>
                )}
              </div>

              {/* SFX Settings */}
              <div className="p-4 rounded-2xl bg-purple-950/60 border border-purple-400/40">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-amber-400" />
                    <span className="font-black text-white text-sm">Efectos y Campanitas</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleToggleSfx}
                    className={`px-3 py-1.5 rounded-xl font-black text-xs min-h-[40px] flex items-center gap-1.5 transition-transform active:scale-95 ${
                      settings.sfxEnabled
                        ? 'bg-gradient-to-b from-lime-400 to-lime-600 text-slate-950 border border-lime-300 shadow-[0_2px_0_0_#4d7c0f]'
                        : 'bg-slate-700 text-slate-300 border border-slate-600'
                    }`}
                  >
                    {settings.sfxEnabled ? <Check className="w-4 h-4 stroke-[3]" /> : null}
                    {settings.sfxEnabled ? 'Efectos Sí' : 'Silencio'}
                  </button>
                </div>
                {settings.sfxEnabled && (
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-purple-200 font-bold w-16">Volumen:</span>
                    <input
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.05"
                      value={settings.sfxVolume}
                      onChange={(e) => handleChangeSfxVolume(parseFloat(e.target.value))}
                      className="w-full accent-amber-400 h-2 bg-purple-900 rounded-lg cursor-pointer"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        playClickSound();
                        playSuccessSound();
                      }}
                      className="px-2.5 py-1 text-xs font-black bg-purple-800 hover:bg-purple-700 text-amber-300 border border-purple-400/40 rounded-lg transition-colors whitespace-nowrap min-h-[36px]"
                    >
                      Probar ⭐
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Footer OK Button */}
            <div className="p-4 border-t border-purple-400/30 bg-purple-950/40 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setIsOpen(false);
                }}
                className="game-button-ok w-full py-3.5 px-4 font-black text-base text-slate-950 uppercase tracking-wider rounded-2xl min-h-[50px] shadow-lg"
              >
                ¡Listo para Jugar! ✨
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
