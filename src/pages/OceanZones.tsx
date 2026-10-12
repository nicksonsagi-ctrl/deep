import React, { useState } from 'react';
import { OCEAN_ZONES } from '../data/oceanData';
import { Thermometer, Gauge, Sun, Sparkles, ChevronDown, Compass, Fish, ArrowRight } from 'lucide-react';
import { oceanAudio } from '../utils/audio';
import { Link } from 'react-router-dom';

export const OceanZones: React.FC = () => {
  const [activeZoneIndex, setActiveZoneIndex] = useState(0);
  const [sliderDepth, setSliderDepth] = useState(0);

  const activeZone = OCEAN_ZONES[activeZoneIndex];

  // Handle interactive slider change
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSliderDepth(val);

    // Map slider value (0 - 11000) to zone index
    let newIndex = 0;
    if (val < 200) newIndex = 0;
    else if (val < 1000) newIndex = 1;
    else if (val < 4000) newIndex = 2;
    else if (val < 6000) newIndex = 3;
    else newIndex = 4;

    if (newIndex !== activeZoneIndex) {
      setActiveZoneIndex(newIndex);
      oceanAudio.playBubble();
    }
  };

  const selectZone = (index: number) => {
    setActiveZoneIndex(index);
    setSliderDepth(OCEAN_ZONES[index].minDepth);
    oceanAudio.playBubble();
  };

  // Dynamic background style based on zone
  const getZoneAtmosphere = (id: string) => {
    switch (id) {
      case 'sunlight':
        return 'from-[#033B6A] via-[#054E82] to-[#021832]';
      case 'twilight':
        return 'from-[#032345] via-[#021832] to-[#010e20]';
      case 'midnight':
        return 'from-[#021124] via-[#010915] to-[#01050e]';
      case 'abyssal':
        return 'from-[#010915] via-[#01050e] to-[#000206]';
      case 'hadal':
      default:
        return 'from-[#01040a] via-[#000205] to-[#000102]';
    }
  };

  return (
    <div className={`min-h-screen pt-24 pb-20 bg-gradient-to-b ${getZoneAtmosphere(activeZone.id)} transition-all duration-700`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-400/30 text-cyan-300 text-xs font-mono mb-4">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Vertical Stratification Exploration</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white mb-4 tracking-tight">
            THE OCEAN ZONES
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Drag the depth slider or choose a stratum to witness how hydrostatic pressure mounts, temperatures plunge, and biological light takes command of the darkness.
          </p>
        </div>

        {/* Interactive Depth Slider Controller */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border-cyan-500/30 mb-14 shadow-2xl max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                Simulated Depth Control
              </span>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-white tabular-nums">
                {sliderDepth.toLocaleString()} <span className="text-cyan-400 text-base">m</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-slate-400 block">Current Stratum</span>
              <span className="text-base font-display font-bold text-cyan-300">
                {activeZone.name} ({activeZone.scientificName})
              </span>
            </div>
          </div>

          {/* Slider bar */}
          <div className="relative py-4">
            <input
              type="range"
              min="0"
              max="11034"
              step="50"
              value={sliderDepth}
              onChange={handleSliderChange}
              aria-label="Ocean depth slider"
              className="w-full h-3 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400 border border-cyan-500/30 focus:outline-none"
            />
            {/* Zone Markers along slider */}
            <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-3">
              <span>0m</span>
              <span>200m</span>
              <span>1,000m</span>
              <span>4,000m</span>
              <span>6,000m</span>
              <span>11,034m</span>
            </div>
          </div>

          {/* Zone Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-6 pt-4 border-t border-slate-800">
            {OCEAN_ZONES.map((zone, idx) => (
              <button
                key={zone.id}
                onClick={() => selectZone(idx)}
                className={`px-3 py-2.5 rounded-xl text-xs font-mono transition-all duration-300 text-center cursor-pointer ${
                  activeZoneIndex === idx
                    ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-200 font-bold shadow-lg shadow-cyan-950/60'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="font-semibold truncate">{zone.name}</div>
                <div className="text-[10px] opacity-75 truncate">{zone.depthRange.split('(')[0]}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Active Zone Detail Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Main Info Panel (7 cols) */}
          <div className="lg:col-span-7 glass-panel p-8 sm:p-10 rounded-3xl border-cyan-500/30 shadow-2xl flex flex-col gap-6">
            <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
                  Zone 0{activeZoneIndex + 1}
                </span>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-white mt-0.5">
                  {activeZone.name}
                </h2>
                <span className="text-xs font-mono text-slate-400 italic">
                  {activeZone.scientificName}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-slate-400 block">Depth Range</span>
                <span className="text-sm font-mono font-bold text-cyan-300">
                  {activeZone.depthRange}
                </span>
              </div>
            </div>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              {activeZone.description}
            </p>

            {/* Environmental Conditions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2">
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-cyan-500/20 flex flex-col">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-1">
                  <Thermometer className="w-4 h-4" />
                  <span>TEMPERATURE</span>
                </div>
                <span className="text-sm font-mono font-bold text-white mt-1">
                  {activeZone.temperature}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-cyan-500/20 flex flex-col">
                <div className="flex items-center gap-2 text-teal-400 text-xs font-mono mb-1">
                  <Gauge className="w-4 h-4" />
                  <span>PRESSURE</span>
                </div>
                <span className="text-sm font-mono font-bold text-white mt-1">
                  {activeZone.pressure}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-cyan-500/20 flex flex-col">
                <div className="flex items-center gap-2 text-purple-400 text-xs font-mono mb-1">
                  <Sun className="w-4 h-4" />
                  <span>LIGHT LEVEL</span>
                </div>
                <span className="text-xs text-slate-200 mt-1 line-clamp-2">
                  {activeZone.lightLevel}
                </span>
              </div>
            </div>

            {/* Key Characteristics */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-3">
                Key Physical Characteristics
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {activeZone.characteristics.map((charac, i) => (
                  <li key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-900/50 border border-slate-800">
                    <span className="text-cyan-400 font-mono">▸</span>
                    <span>{charac}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Historical Exploration Story */}
            <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-400/20 text-xs">
              <span className="font-mono text-cyan-300 font-semibold block mb-1">
                Exploration Chronicle:
              </span>
              <p className="text-slate-300 leading-relaxed">
                {activeZone.explorationStory}
              </p>
            </div>
          </div>

          {/* Right Column: Species in this zone (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border-cyan-500/30 shadow-2xl">
              <h3 className="font-display font-bold text-xl text-white mb-2 flex items-center gap-2">
                <Fish className="w-5 h-5 text-cyan-400" />
                <span>Representative Organisms</span>
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Species exquisitely adapted to survive in {activeZone.name}.
              </p>

              <div className="space-y-3">
                {activeZone.keySpecies.map((speciesName) => (
                  <div
                    key={speciesName}
                    className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between hover:border-cyan-400/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-cyan-400" />
                      <span className="text-sm font-semibold text-white">{speciesName}</span>
                    </div>
                    <Link
                      to="/marine-life"
                      onClick={() => oceanAudio.playBubble()}
                      className="text-xs text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1"
                    >
                      <span>Profile</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800">
                <Link
                  to="/deep-sea-creatures"
                  onClick={() => oceanAudio.playBubble()}
                  className="w-full py-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Inspect Abyssal Creature Adaptations</span>
                </Link>
              </div>
            </div>

            {/* Quick depth comparison card */}
            <div className="glass-panel-dark p-6 rounded-3xl border-cyan-500/20">
              <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-2">
                Depth Comparison Perspective
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Mount Everest (8,848m) placed into the Hadal Trench would still be submerged beneath more than two kilometers of crushing seawater.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
