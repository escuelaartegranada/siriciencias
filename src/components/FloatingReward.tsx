import React, { useEffect, useState } from 'react';
import { Star, Sparkles, Award } from 'lucide-react';

export interface RewardEvent {
  id: number;
  stars: number;
  points: number;
  message: string;
}

interface Props {
  reward: RewardEvent | null;
  onClear: () => void;
}

export const FloatingReward: React.FC<Props> = ({ reward, onClear }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reward) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClear, 400);
      }, 2400);
      return () => clearTimeout(timer);
    }
  }, [reward, onClear]);

  if (!reward || !visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center p-4">
      {/* Background soft glow */}
      <div className="absolute inset-0 bg-indigo-950/20 backdrop-blur-[2px] transition-opacity duration-300" />

      {/* Floating Star Reward Card */}
      <div className="relative animate-in zoom-in-75 duration-300 flex flex-col items-center">
        {/* Floating star particles */}
        <div className="absolute -top-12 -left-8 text-3xl animate-bounce duration-700">⭐</div>
        <div className="absolute -top-16 right-0 text-4xl animate-pulse">🌟</div>
        <div className="absolute -bottom-8 -left-6 text-2xl animate-spin">✨</div>
        <div className="absolute -top-8 right-12 text-3xl animate-bounce">💖</div>

        <div className="game-dialog-card p-6 px-8 max-w-sm text-center shadow-[0_20px_50px_rgba(0,0,0,0.6)] border-4 border-amber-300 transform scale-105">
          {/* Header ribbon */}
          <div className="inline-flex items-center gap-2 game-ribbon-yellow px-5 py-1.5 -mt-10 mb-3 shadow-lg">
            <Sparkles className="w-5 h-5 text-amber-950 animate-spin" />
            <span className="text-sm font-black text-amber-950 uppercase tracking-wider">
              {reward.message || '¡Punto Estrella!'}
            </span>
          </div>

          {/* Big Stars Pill */}
          <div className="my-2 flex items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-amber-300 to-amber-500 border-2 border-amber-600 shadow-[0_4px_0_0_#b45309] flex items-center justify-center text-3xl animate-bounce">
              ⭐
            </div>
            <div className="text-left">
              <span className="block text-2xl sm:text-3xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                +{reward.stars} {reward.stars === 1 ? 'Estrella' : 'Estrellas'}
              </span>
              <span className="text-sm font-extrabold text-lime-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                +{reward.points} Puntos de Ciencias
              </span>
            </div>
          </div>

          <p className="text-xs text-purple-100 font-bold mt-2 bg-purple-900/60 py-1 px-3 rounded-full border border-purple-400/40">
            ¡Sigue así, investigadora brillante! 👩‍🔬
          </p>
        </div>
      </div>
    </div>
  );
};
