import React, { useState, useEffect } from 'react';
import { Maximize2, Minimize2, Tablet, X } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface Props {
  className?: string;
  showLabel?: boolean;
  variant?: 'navbar' | 'floating';
}

export const FullscreenButton: React.FC<Props> = ({
  className = '',
  showLabel = false,
  variant = 'navbar',
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showIosTip, setShowIosTip] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFs = Boolean(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );
      setIsFullscreen(isFs);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    playClickSound();

    try {
      const doc = document as any;
      const docEl = document.documentElement as any;

      if (!isFullscreen) {
        // Request fullscreen
        if (docEl.requestFullscreen) {
          await docEl.requestFullscreen();
        } else if (docEl.webkitRequestFullscreen) {
          docEl.webkitRequestFullscreen();
        } else if (docEl.mozRequestFullScreen) {
          docEl.mozRequestFullScreen();
        } else if (docEl.msRequestFullscreen) {
          docEl.msRequestFullscreen();
        } else {
          // iOS Safari fallback tip
          setShowIosTip(true);
        }
      } else {
        // Exit fullscreen
        if (doc.exitFullscreen) {
          await doc.exitFullscreen();
        } else if (doc.webkitExitFullscreen) {
          doc.webkitExitFullscreen();
        } else if (doc.mozCancelFullScreen) {
          doc.mozCancelFullScreen();
        } else if (doc.msExitFullscreen) {
          doc.msExitFullscreen();
        }
      }
    } catch (err) {
      console.warn('Fullscreen request failed or restricted:', err);
      // If error occurred (common in iOS Safari or iframes), show friendly tip
      setShowIosTip(true);
    }
  };

  if (variant === 'floating') {
    return (
      <>
        <button
          type="button"
          onClick={toggleFullscreen}
          className={`fixed bottom-4 right-4 z-40 p-3 sm:p-3.5 rounded-2xl bg-gradient-to-b from-indigo-500 via-purple-600 to-indigo-700 hover:from-indigo-400 hover:to-purple-500 text-white border-2 border-indigo-300 shadow-[0_4px_0_0_#312e81,0_8px_16px_rgba(0,0,0,0.4)] flex items-center gap-2 cursor-pointer transition-transform active:translate-y-1 active:shadow-none min-h-[48px] min-w-[48px] ${className}`}
          title={isFullscreen ? 'Salir de pantalla completa' : 'Poner a pantalla completa en la tablet'}
          aria-label={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
        >
          {isFullscreen ? (
            <Minimize2 className="w-5 h-5 text-amber-300" />
          ) : (
            <Maximize2 className="w-5 h-5 text-amber-300" />
          )}
          {showLabel && (
            <span className="text-xs font-black uppercase tracking-wider hidden sm:inline">
              {isFullscreen ? 'Salir Completa' : 'Pantalla Completa'}
            </span>
          )}
        </button>

        {/* Modal / Tip for iOS Safari users where Fullscreen API is restricted */}
        {showIosTip && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="game-dialog-card p-6 max-w-md w-full relative text-white text-center shadow-2xl">
              <button
                type="button"
                onClick={() => setShowIosTip(false)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center border border-white/30"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-sky-400 border-2 border-sky-300 shadow-md flex items-center justify-center text-3xl">
                📱
              </div>

              <h3 className="text-xl font-black text-white mb-2">
                Pantalla Completa en iPad / Tablet
              </h3>

              <div className="text-left text-xs sm:text-sm text-purple-100 space-y-2.5 bg-purple-950/70 p-4 rounded-2xl border border-purple-400/40 mb-4">
                <p className="font-semibold">
                  En tablets iPad o navegadores móviles puedes abrir la app en <strong>pantalla completa total sin barras</strong>:
                </p>
                <div className="space-y-1.5 pl-2 font-medium">
                  <div className="flex items-start gap-2">
                    <span className="font-black text-amber-300">1.</span>
                    <span>Toca el botón <strong>Compartir</strong> del navegador (el cuadrado con la flecha hacia arriba <span className="text-base">⬆️</span>).</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-black text-amber-300">2.</span>
                    <span>Elige <strong>«Añadir a pantalla de inicio»</strong>.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-black text-amber-300">3.</span>
                    <span>¡Listo! Toca el nuevo icono en la pantalla de la tablet y jugará a pantalla completa como una app nativa.</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowIosTip(false)}
                className="game-button-ok w-full py-2.5 text-xs font-black uppercase tracking-wider"
              >
                ¡Entendido!
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Default: Navbar variant
  return (
    <>
      <button
        type="button"
        onClick={toggleFullscreen}
        className={`p-2 bg-gradient-to-b from-indigo-700 to-indigo-900 hover:from-indigo-600 hover:to-indigo-800 text-indigo-100 hover:text-white border border-indigo-400/60 rounded-2xl min-w-[44px] min-h-[44px] flex items-center justify-center transition-all shadow-[0_2px_0_0_#1e1b4b] active:translate-y-0.5 cursor-pointer ${className}`}
        title={isFullscreen ? 'Salir de pantalla completa' : 'Poner a pantalla completa en la tablet'}
        aria-label={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
      >
        {isFullscreen ? (
          <Minimize2 className="w-5 h-5 text-amber-300" />
        ) : (
          <Maximize2 className="w-5 h-5 text-amber-300" />
        )}
        {showLabel && (
          <span className="text-xs font-black ml-1.5 hidden md:inline">
            {isFullscreen ? 'Normal' : 'Completa'}
          </span>
        )}
      </button>

      {/* Modal / Tip for iOS Safari users where Fullscreen API is restricted */}
      {showIosTip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="game-dialog-card p-6 max-w-md w-full relative text-white text-center shadow-2xl">
            <button
              type="button"
              onClick={() => setShowIosTip(false)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center border border-white/30"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-sky-400 border-2 border-sky-300 shadow-md flex items-center justify-center text-3xl">
              📱
            </div>

            <h3 className="text-xl font-black text-white mb-2">
              Pantalla Completa en iPad / Tablet
            </h3>

            <div className="text-left text-xs sm:text-sm text-purple-100 space-y-2.5 bg-purple-950/70 p-4 rounded-2xl border border-purple-400/40 mb-4">
              <p className="font-semibold">
                En tablets iPad o navegadores móviles puedes abrir la app en <strong>pantalla completa total sin barras</strong>:
              </p>
              <div className="space-y-1.5 pl-2 font-medium">
                <div className="flex items-start gap-2">
                  <span className="font-black text-amber-300">1.</span>
                  <span>Toca el botón <strong>Compartir</strong> de Safari (el cuadrado con la flecha <span className="text-base">⬆️</span>).</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-black text-amber-300">2.</span>
                  <span>Elige <strong>«Añadir a pantalla de inicio»</strong>.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-black text-amber-300">3.</span>
                  <span>¡Listo! Toca el nuevo icono en la pantalla de la tablet y jugará a pantalla completa como una app nativa.</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowIosTip(false)}
              className="game-button-ok w-full py-2.5 text-xs font-black uppercase tracking-wider"
            >
              ¡Entendido!
            </button>
          </div>
        </div>
      )}
    </>
  );
};
