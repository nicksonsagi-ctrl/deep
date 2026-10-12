import React, { useState } from 'react';
import { ALL_CREATURES, MarineCreature } from '../data/oceanData';
import { Sparkles, Eye, Lightbulb, Zap, Compass, Volume2 } from 'lucide-react';
import { oceanAudio } from '../utils/audio';

export const DeepSeaCreatures: React.FC = () => {
  const [floodlightOn, setFloodlightOn] = useState(false);
  const [selectedAbyssalId, setSelectedAbyssalId] = useState<string>('anglerfish');

  // Filter deep sea creatures
  const abyssalCreatures = ALL_CREATURES.filter(
    (c) =>
      c.id === 'anglerfish' ||
      c.id === 'vampire-squid' ||
      c.id === 'giant-squid' ||
      c.id === 'dumbo-octopus' ||
      c.id === 'biolum-jellyfish' ||
      c.id === 'gulper-eel' ||
      c.id === 'barreleye-fish'
  );

  const activeCreature =
    abyssalCreatures.find((c) => c.id === selectedAbyssalId) || abyssalCreatures[0];

  const toggleFloodlight = () => {
    setFloodlightOn(!floodlightOn);
    oceanAudio.pingSonar();
  };

  return (
    <div
      className={`min-h-screen pt-24 pb-24 transition-colors duration-1000 ${
        floodlightOn ? 'bg-[#021327]' : 'bg-[#010309]'
      } relative overflow-hidden`}
    >
      {/* Bioluminescent drifting particles in background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/5 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Mysterious Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-400/30 text-purple-300 text-xs font-mono mb-4">
            <Zap className="w-3.5 h-3.5 text-purple-400" />
            <span>The Midnight & Abyssal Ecosystem</span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white mb-4 tracking-tight text-glow-purple">
            LIFE BEYOND SUNLIGHT
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
            Miles beneath the waves, life has severed all reliance on the sun. Here in perpetual darkness, organisms manufacture their own cold celestial light, unhinge colossal jaws, and withstand crushing hydrostatic pressure.
          </p>

          {/* Submarine Floodlight Toggle Control */}
          <div className="inline-flex items-center gap-3 p-1.5 rounded-2xl bg-slate-950/80 border border-cyan-500/30 backdrop-blur-md">
            <button
              onClick={() => {
                if (floodlightOn) toggleFloodlight();
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                !floodlightOn
                  ? 'bg-purple-950/90 text-purple-200 border border-purple-500/40 shadow-[0_0_15px_rgba(134,93,255,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Natural Abyss (Bioluminescence)
            </button>
            <button
              onClick={() => {
                if (!floodlightOn) toggleFloodlight();
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                floodlightOn
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_20px_rgba(0,229,255,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>ROV Floodlights</span>
            </button>
          </div>
        </div>

        {/* Interactive Creature Spotlight Hero Card */}
        <div className="glass-panel-dark rounded-3xl border-purple-500/30 p-6 sm:p-10 mb-16 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Screen with Simulated Glow */}
            <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-black min-h-[340px] flex items-center justify-center group">
              <img
                src={activeCreature.image}
                alt={activeCreature.name}
                className={`w-full h-80 sm:h-96 object-cover transition-all duration-1000 ${
                  floodlightOn ? 'brightness-110 contrast-105' : 'brightness-90 contrast-125'
                }`}
                referrerPolicy="no-referrer"
              />

              {/* Glowing aura around creature in bioluminescence mode */}
              {!floodlightOn && (
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.2)_0,transparent_60%)] pointer-events-none" />
              )}

              {/* Floating Status Pill */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 border border-cyan-400/30 text-xs font-mono text-cyan-300">
                Depth: {activeCreature.depth}
              </div>

              {activeCreature.bioluminescent && (
                <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-400/40 text-xs font-mono text-purple-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                  <span>Luciferin Light Emitting</span>
                </div>
              )}
            </div>

            {/* Creature Dossier Details */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="flex items-center gap-2 font-mono text-xs text-purple-400">
                <span>{activeCreature.zone}</span>
                <span>·</span>
                <span className="italic">{activeCreature.scientificName}</span>
              </div>

              <h2 className="font-display font-black text-3xl sm:text-4xl text-white">
                {activeCreature.name}
              </h2>

              <p className="text-slate-200 text-sm leading-relaxed">
                {activeCreature.description}
              </p>

              {/* Adaptations List */}
              <div className="space-y-2 mt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                  Abyssal Adaptations
                </h4>
                {activeCreature.facts.map((fact, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5"
                  >
                    <span className="text-purple-400 font-mono font-bold">0{idx + 1}.</span>
                    <span>{fact}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => {
                    oceanAudio.pingSonar();
                    oceanAudio.playBubble();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/40 border border-purple-400/50 text-purple-200 text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Volume2 className="w-4 h-4 text-purple-300" />
                  <span>Play Abyssal Sonar Ping</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Creature Selector Grid */}
        <div className="mb-14">
          <h3 className="font-display font-bold text-2xl text-white mb-6">
            Explore All Abyssal Organisms
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {abyssalCreatures.map((creature) => {
              const isSelected = creature.id === selectedAbyssalId;
              return (
                <button
                  key={creature.id}
                  onClick={() => {
                    setSelectedAbyssalId(creature.id);
                    oceanAudio.playBubble();
                  }}
                  className={`p-4 rounded-2xl text-left transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-purple-950/60 border-2 border-purple-400 shadow-lg shadow-purple-950/60'
                      : 'glass-panel border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-cyan-400">{creature.depth}</span>
                    {creature.bioluminescent && (
                      <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                    )}
                  </div>
                  <h4 className="font-display font-bold text-base text-white mb-1">
                    {creature.name}
                  </h4>
                  <p className="text-xs text-slate-400 truncate">{creature.scientificName}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
