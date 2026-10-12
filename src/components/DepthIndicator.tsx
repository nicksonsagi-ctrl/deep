import React from 'react';
import { Compass, Waves, ArrowDown } from 'lucide-react';

interface DepthIndicatorProps {
  currentDepth: number; // 0 to 11000m
  maxDepth?: number;
  onZoneClick?: (depth: number) => void;
  showJumpControls?: boolean;
}

export const DepthIndicator: React.FC<DepthIndicatorProps> = ({
  currentDepth,
  maxDepth = 11000,
  onZoneClick,
  showJumpControls = false,
}) => {
  // Determine current active zone
  const getZoneInfo = (depth: number) => {
    if (depth < 200) {
      return { name: 'Sunlight Zone', color: 'text-[#00E5FF]', barColor: 'bg-[#00E5FF]' };
    } else if (depth < 1000) {
      return { name: 'Twilight Zone', color: 'text-[#00A3FF]', barColor: 'bg-[#00A3FF]' };
    } else if (depth < 4000) {
      return { name: 'Midnight Zone', color: 'text-[#865DFF]', barColor: 'bg-[#865DFF]' };
    } else if (depth < 6000) {
      return { name: 'Abyssal Zone', color: 'text-[#28F0D4]', barColor: 'bg-[#28F0D4]' };
    } else {
      return { name: 'Hadal Zone', color: 'text-[#00E5FF]', barColor: 'bg-[#00E5FF]' };
    }
  };

  const zoneInfo = getZoneInfo(currentDepth);
  const percentage = Math.min(100, Math.max(0, (currentDepth / maxDepth) * 100));

  const zoneMilestones = [
    { label: '0m', depth: 0, title: 'Surface' },
    { label: '200m', depth: 200, title: 'Twilight' },
    { label: '1,000m', depth: 1000, title: 'Midnight' },
    { label: '4,000m', depth: 4000, title: 'Abyss' },
    { label: '6,000m+', depth: 6000, title: 'Hadal' },
  ];

  return (
    <aside
      aria-label="Ocean Depth Indicator"
      className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 flex items-center gap-3 select-none pointer-events-auto"
    >
      {/* Zone Quick-Jump Milestones */}
      <div className="hidden lg:flex flex-col items-end gap-5 text-right font-mono text-xs">
        {zoneMilestones.map((milestone) => {
          const isActive =
            (milestone.depth === 0 && currentDepth < 200) ||
            (milestone.depth === 200 && currentDepth >= 200 && currentDepth < 1000) ||
            (milestone.depth === 1000 && currentDepth >= 1000 && currentDepth < 4000) ||
            (milestone.depth === 4000 && currentDepth >= 4000 && currentDepth < 6000) ||
            (milestone.depth === 6000 && currentDepth >= 6000);

          return (
            <button
              key={milestone.label}
              onClick={() => onZoneClick?.(milestone.depth)}
              className={`transition-all duration-300 text-right group flex items-center gap-2 cursor-pointer ${
                isActive ? 'text-[#00E5FF] font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className={`text-[11px] transition-opacity ${isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}>
                {milestone.title}
              </span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] tabular-nums transition-colors ${
                isActive ? 'bg-[#00E5FF]/20 text-[#00E5FF]' : 'bg-slate-900/60 text-slate-400'
              }`}>
                {milestone.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Vertical Depth Gauge Bar */}
      <div className="relative w-3.5 h-64 md:h-80 bg-slate-950/80 rounded-full border border-cyan-500/20 backdrop-blur-md p-0.5 flex flex-col justify-between overflow-hidden shadow-2xl shadow-cyan-950/50">
        {/* Dynamic Water fill */}
        <div
          className={`w-full rounded-full transition-all duration-300 ease-out ${zoneInfo.barColor} opacity-80`}
          style={{ height: `${Math.max(4, percentage)}%` }}
        />

        {/* Glow bead indicator */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_12px_#00E5FF] transition-all duration-300 pointer-events-none"
          style={{ top: `calc(${percentage}% - 8px)` }}
        />
      </div>

      {/* Floating Readout Card */}
      <div className="glass-panel px-3 py-2 rounded-xl border border-cyan-500/30 shadow-xl flex flex-col min-w-[100px] text-left">
        <div className="flex items-center gap-1.5 text-[10px] text-cyan-300 font-mono tracking-wider">
          <Waves className="w-3 h-3 text-cyan-400 animate-pulse" />
          <span>DEPTH</span>
        </div>
        <div className="text-sm md:text-base font-mono font-bold text-white tabular-nums tracking-tight">
          {Math.round(currentDepth).toLocaleString()}
          <span className="text-xs text-cyan-400 ml-0.5">m</span>
        </div>
        <div className={`text-[10px] font-medium tracking-wide mt-0.5 truncate ${zoneInfo.color}`}>
          {zoneInfo.name}
        </div>
      </div>
    </aside>
  );
};
