import React, { useState, useEffect } from 'react';
import { Volume2, Square } from 'lucide-react';
import { speakText, stopSpeaking, subscribeSpeaking, playClickSound } from '../utils/audio';

interface Props {
  text: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  variant?: 'primary' | 'subtle' | 'inline';
}

export const NarratorSpeaker: React.FC<Props> = ({
  text,
  label = 'Escuchar',
  size = 'md',
  className = '',
  variant = 'primary'
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const unsub = subscribeSpeaking((speaking) => {
      if (!speaking) {
        setIsPlaying(false);
      }
    });
    return unsub;
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound();
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      speakText(text, () => {
        setIsPlaying(false);
      });
    }
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm gap-1.5 min-h-[44px]',
    md: 'px-4 py-2 text-base gap-2 min-h-[48px]',
    lg: 'px-5 py-3 text-lg font-bold gap-2.5 min-h-[52px]'
  };

  const variantClasses = {
    primary: isPlaying 
      ? 'bg-amber-500 text-white shadow-md animate-pulse ring-4 ring-amber-300' 
      : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border-2 border-amber-300 active:scale-95 shadow-sm',
    subtle: isPlaying
      ? 'bg-indigo-500 text-white shadow-md animate-pulse'
      : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 active:scale-95 shadow-sm',
    inline: isPlaying
      ? 'text-amber-600 bg-amber-50'
      : 'text-amber-700 hover:text-amber-800 bg-amber-50/60 hover:bg-amber-100'
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isPlaying ? 'Detener lectura en voz alta' : `Escuchar: ${label}`}
      className={`inline-flex items-center justify-center font-semibold rounded-2xl cursor-pointer transition-all duration-150 touch-manipulation select-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {isPlaying ? (
        <>
          <Square className="w-5 h-5 fill-current animate-spin" />
          <span>{label ? 'Parar' : ''}</span>
        </>
      ) : (
        <>
          <Volume2 className="w-5 h-5 flex-shrink-0" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
};
