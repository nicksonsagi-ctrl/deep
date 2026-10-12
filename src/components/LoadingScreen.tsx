import React, { useState, useEffect } from 'react';
import { Waves, ArrowDown } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [depth, setDepth] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const targetDepth = 10928; // Challenger deep in meters
    const duration = 1600; // ms
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDepth(Math.round(eased * targetDepth));

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setTimeout(() => {
          setOpacity(0);
          setTimeout(onComplete, 400);
        }, 300);
      }
    };

    const frameId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(frameId);
  }, [onComplete]);

  return (
    <div
      style={{ opacity, transition: 'opacity 0.4s ease-out' }}
      className="fixed inset-0 z-50 bg-[#020817] flex flex-col items-center justify-center p-6 select-none pointer-events-none"
    >
      {/* Background radial caustic light */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.08)_0,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-md w-full">
        {/* Pulsing Ocean Emblem */}
        <div className="w-16 h-16 rounded-2xl bg-cyan-950/80 border border-cyan-400/40 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,229,255,0.3)] animate-pulse">
          <Waves className="w-8 h-8 text-cyan-300" />
        </div>

        <h2 className="font-display font-black text-2xl md:text-3xl tracking-widest text-white mb-2 text-glow-cyan">
          ENTERING THE DEEP...
        </h2>
        <p className="text-xs font-mono text-cyan-400 tracking-wider uppercase mb-8">
          Calibrating Hydrostatic Telemetry
        </p>

        {/* Ocean Depth Progress Bar */}
        <div className="w-full bg-slate-900/90 rounded-full h-2 border border-cyan-500/30 overflow-hidden mb-4 p-0.5">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-500 rounded-full transition-all duration-75"
            style={{ width: `${(depth / 10928) * 100}%` }}
          />
        </div>

        {/* Depth Counter Display */}
        <div className="flex items-center justify-between w-full font-mono text-xs text-slate-400">
          <span className="flex items-center gap-1 text-cyan-400">
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            <span>DEPTH</span>
          </span>
          <span className="text-base font-bold text-white tabular-nums tracking-wider">
            {depth.toLocaleString()} <span className="text-xs text-cyan-300">m</span>
          </span>
        </div>
      </div>
    </div>
  );
};
