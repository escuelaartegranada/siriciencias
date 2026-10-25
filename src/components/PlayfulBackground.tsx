import React, { useState } from 'react';
import { playClickSound } from '../utils/audio';

export const PlayfulBackground: React.FC = () => {
  const [poppedBubbles, setPoppedBubbles] = useState<number[]>([]);

  const handlePop = (id: number) => {
    playClickSound();
    setPoppedBubbles((prev) => [...prev, id]);
    setTimeout(() => {
      setPoppedBubbles((prev) => prev.filter((b) => b !== id));
    }, 4000);
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Soft Sunny Ambient Radial Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-200/50 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl" />

      {/* Floating 3D Clouds (Top Layer) */}
      <div className="absolute top-4 left-6 hidden sm:block animate-float-slow opacity-80 pointer-events-auto">
        <svg width="110" height="60" viewBox="0 0 110 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="55" cy="40" rx="45" ry="18" fill="#FFFFFF" filter="drop-shadow(0 6px 4px rgba(186, 230, 253, 0.5))" />
          <circle cx="38" cy="30" r="18" fill="#FFFFFF" />
          <circle cx="65" cy="24" r="22" fill="#FFFFFF" />
          {/* Cute cloud face */}
          <circle cx="50" cy="36" r="2" fill="#0284C7" />
          <circle cx="62" cy="36" r="2" fill="#0284C7" />
          <path d="M53 41Q56 44 59 41" stroke="#0284C7" strokeWidth="1.5" strokeLinecap="round" />
          <ellipse cx="45" cy="39" rx="3" ry="1.5" fill="#FDA4AF" />
          <ellipse cx="67" cy="39" rx="3" ry="1.5" fill="#FDA4AF" />
        </svg>
      </div>

      <div className="absolute top-8 right-12 hidden md:block animate-float-delayed opacity-85 pointer-events-auto">
        <svg width="120" height="65" viewBox="0 0 120 65" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="60" cy="45" rx="50" ry="18" fill="#FFFFFF" filter="drop-shadow(0 6px 6px rgba(254, 215, 170, 0.5))" />
          <circle cx="45" cy="34" r="18" fill="#FFFFFF" />
          <circle cx="75" cy="28" r="22" fill="#FFFFFF" />
          {/* Cute face */}
          <circle cx="54" cy="38" r="2" fill="#EA580C" />
          <circle cx="66" cy="38" r="2" fill="#EA580C" />
          <path d="M57 43Q60 46 63 43" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Floating 3D Science Sticker: Cute Bubbling Flask (Left Margin) */}
      <div className="absolute top-1/4 left-3 hidden xl:block animate-float-delayed pointer-events-auto">
        <div 
          className="p-3 bg-white/90 backdrop-blur-xs rounded-3xl border-3 border-amber-300 shadow-[0_8px_0_#d97706] hover:scale-110 transition-transform cursor-pointer"
          title="¡Frasco de experimentos científicos!"
        >
          <svg width="44" height="48" viewBox="0 0 100 100" fill="none">
            <rect x="44" y="10" width="12" height="25" rx="4" fill="#E2E8F0" stroke="#475569" strokeWidth="4" />
            <path d="M38 10H62" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
            <path d="M44 32L18 80C14 87 19 92 28 92H72C81 92 86 87 82 80L56 32Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="5" />
            <ellipse cx="50" cy="84" rx="20" ry="4" fill="#0284C7" opacity="0.3" />
            {/* Bubbles */}
            <circle cx="40" cy="68" r="5" fill="#FFFFFF" />
            <circle cx="58" cy="74" r="4" fill="#FFFFFF" />
            <circle cx="48" cy="54" r="3" fill="#FFFFFF" />
          </svg>
        </div>
      </div>

      {/* Floating 3D Science Sticker: Golden 3D Star (Right Margin) */}
      <div className="absolute top-1/3 right-3 hidden xl:block animate-float-slow pointer-events-auto">
        <div 
          className="p-3 bg-white/90 backdrop-blur-xs rounded-3xl border-3 border-yellow-300 shadow-[0_8px_0_#ca8a04] hover:scale-110 transition-transform cursor-pointer"
          title="¡Estrella de Ciencias!"
        >
          <svg width="44" height="44" viewBox="0 0 100 100" fill="none">
            <path 
              d="M50 10L61 35L88 38L68 56L73 83L50 69L27 83L32 56L12 38L39 35Z" 
              fill="url(#star-grad)" 
              stroke="#D97706" 
              strokeWidth="5" 
              strokeLinejoin="round"
            />
            {/* 3D Gloss Highlight */}
            <path d="M50 18L58 36L78 38" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
            {/* Eyes */}
            <circle cx="45" cy="46" r="3" fill="#78350F" />
            <circle cx="55" cy="46" r="3" fill="#78350F" />
            <path d="M47 54Q50 58 53 54" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
            <defs>
              <linearGradient id="star-grad" x1="50" y1="10" x2="50" y2="83" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FDE047" />
                <stop offset="1" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Floating 3D Science Sticker: DNA / Health Heart (Lower Left) */}
      <div className="absolute bottom-28 left-4 hidden 2xl:block animate-float-slow pointer-events-auto">
        <div className="p-3 bg-white/90 backdrop-blur-xs rounded-3xl border-3 border-rose-300 shadow-[0_8px_0_#e11d48] hover:scale-110 transition-transform cursor-pointer">
          <svg width="40" height="40" viewBox="0 0 100 100" fill="none">
            <path
              d="M50 32C42 18 20 22 18 42C16 60 36 76 50 88C64 76 84 60 82 42C80 22 58 18 50 32Z"
              fill="url(#heart-grad)"
              stroke="#BE123C"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            <path d="M30 38C28 44 32 52 38 56" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
            <defs>
              <linearGradient id="heart-grad" x1="50" y1="20" x2="50" y2="88" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FB7185" />
                <stop offset="1" stopColor="#E11D48" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Floating Interactive 3D Bubbles across viewport */}
      {[
        { id: 1, x: '12%', y: '45%', size: 36, color: '#38BDF8' },
        { id: 2, x: '88%', y: '60%', size: 42, color: '#A855F7' },
        { id: 3, x: '6%', y: '75%', size: 30, color: '#34D399' },
        { id: 4, x: '92%', y: '25%', size: 32, color: '#FBBF24' },
      ].map((b) => {
        if (poppedBubbles.includes(b.id)) return null;
        return (
          <button
            key={b.id}
            type="button"
            onClick={() => handlePop(b.id)}
            style={{ left: b.x, top: b.y, width: b.size, height: b.size }}
            className="absolute rounded-full border-2 border-white/90 shadow-md backdrop-blur-xs animate-float-slow cursor-pointer hover:scale-125 transition-transform pointer-events-auto"
            title="¡Toca para hacer pop!"
          >
            <div 
              className="w-full h-full rounded-full opacity-60" 
              style={{ background: `radial-gradient(circle at 30% 30%, #ffffff, ${b.color})` }}
            />
            <div className="absolute top-1 left-1.5 w-2 h-1 bg-white rounded-full opacity-80" />
          </button>
        );
      })}

      {/* Bottom Layer: Playful 3D Wave Hills in Gentle Pastels */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none opacity-40">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full h-full preserve-3d" preserveAspectRatio="none">
          <path
            d="M0,40 C320,100 500,10 800,50 C1100,90 1300,20 1440,40 L1440,120 L0,120 Z"
            fill="#FEF3C7"
          />
          <path
            d="M0,70 C360,20 600,110 960,60 C1200,30 1350,80 1440,70 L1440,120 L0,120 Z"
            fill="#FDE68A"
          />
        </svg>
      </div>
    </div>
  );
};
