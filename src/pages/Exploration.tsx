import React, { useState } from 'react';
import { SUBMERSIBLES, Submersible } from '../data/oceanData';
import { ASSETS } from '../data/assets';
import { Compass, Lightbulb, Radio, ArrowUp, ArrowDown, Shield, Gauge, Thermometer, Wind, Play } from 'lucide-react';
import { oceanAudio } from '../utils/audio';

export const Exploration: React.FC = () => {
  // Submarine Cockpit Simulation State
  const [cockpitDepth, setCockpitDepth] = useState(3800);
  const [headlightsOn, setHeadlightsOn] = useState(true);
  const [sonarActive, setSonarActive] = useState(false);
  const [selectedSubIndex, setSelectedSubIndex] = useState(0);

  const selectedSub = SUBMERSIBLES[selectedSubIndex];

  // Calculated hydrostatic parameters based on depth
  const pressureAtm = Math.round(1 + (cockpitDepth / 10));
  const pressurePsi = Math.round(pressureAtm * 14.696);
  const tempCelsius = cockpitDepth < 200 ? 22 : Math.max(1.4, Number((20 - Math.log(cockpitDepth) * 2.1).toFixed(1)));

  const diveDeeper = () => {
    setCockpitDepth((prev) => Math.min(10928, prev + 500));
    oceanAudio.playBubble();
  };

  const surfaceSub = () => {
    setCockpitDepth((prev) => Math.max(0, prev - 500));
    oceanAudio.playBubble();
  };

  const pingSonar = () => {
    setSonarActive(true);
    oceanAudio.pingSonar();
    setTimeout(() => setSonarActive(false), 1800);
  };

  return (
    <div className="min-h-screen pt-24 pb-24 bg-[#010612] text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-400/30 text-cyan-300 text-xs font-mono mb-4">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Manned & Autonomous Deep-Sea Engineering</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white mb-4 tracking-tight">
            OCEAN EXPLORATION
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            From the titanium hulls of DSV Alvin to autonomous robotic gliders mapping the seabed, explore the technological marvels penetrating Earth's final frontier.
          </p>
        </div>

        {/* Interactive Submarine Cockpit Simulation */}
        <section aria-label="Interactive Submarine Simulation" className="mb-20">
          <div className="glass-panel rounded-3xl border-cyan-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                  Interactive Research Simulator
                </span>
                <h2 className="font-display font-bold text-2xl text-white">
                  DSV Deep Explorer Viewport
                </h2>
              </div>
              <div className="px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-mono">
                SIMULATED SENSOR READINGS // EDUCATIONAL DEMO
              </div>
            </div>

            {/* Submarine Viewport Screen */}
            <div className="relative rounded-2xl overflow-hidden bg-black border-2 border-slate-700 min-h-[380px] sm:min-h-[460px] flex items-center justify-center mb-6">
              {/* Outer View Image */}
              <img
                src={ASSETS.submarineExpedition}
                alt="Underwater Submarine View"
                className={`w-full h-full object-cover transition-all duration-700 ${
                  headlightsOn ? 'brightness-100 contrast-110' : 'brightness-20 contrast-150'
                }`}
                referrerPolicy="no-referrer"
              />

              {/* Viewport Circular Glass Mask */}
              <div className="absolute inset-0 border-[24px] sm:border-[40px] border-[#020d1c] rounded-2xl pointer-events-none shadow-[inset_0_0_50px_rgba(0,0,0,0.9)]" />

              {/* Sonar Ping Radar Effect */}
              {sonarActive && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-32 h-32 rounded-full border-2 border-cyan-400 animate-ping" />
                  <div className="w-64 h-64 rounded-full border border-cyan-400/50 animate-ping delay-200" />
                </div>
              )}

              {/* HUD Overlay Displays */}
              <div className="absolute top-8 left-8 sm:top-12 sm:left-12 font-mono text-xs text-cyan-300 space-y-1 bg-slate-950/70 p-3 rounded-xl border border-cyan-500/30 backdrop-blur-sm">
                <div>COORD: 11°22′N 142°35′E</div>
                <div>SONAR: {sonarActive ? 'PINGING...' : 'STANDBY'}</div>
                <div>LIGHTS: {headlightsOn ? '100% BEAM' : 'OFF'}</div>
              </div>

              <div className="absolute top-8 right-8 sm:top-12 sm:right-12 font-mono text-right text-xs bg-slate-950/70 p-3 rounded-xl border border-cyan-500/30 backdrop-blur-sm">
                <span className="text-[10px] text-slate-400 block">DEPTH TELEMETRY</span>
                <span className="text-xl font-bold text-white tabular-nums">
                  {cockpitDepth.toLocaleString()} <span className="text-cyan-400 text-xs">m</span>
                </span>
              </div>
            </div>

            {/* Submarine Telemetry Instruments Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center gap-3">
                <Gauge className="w-5 h-5 text-cyan-400 shrink-0" />
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block">HYDROSTATIC PRESSURE</span>
                  <span className="text-sm font-mono font-bold text-white tabular-nums">
                    {pressureAtm} atm / {pressurePsi.toLocaleString()} psi
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center gap-3">
                <Thermometer className="w-5 h-5 text-teal-400 shrink-0" />
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block">WATER TEMPERATURE</span>
                  <span className="text-sm font-mono font-bold text-white tabular-nums">
                    {tempCelsius}°C
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center gap-3">
                <Wind className="w-5 h-5 text-purple-400 shrink-0" />
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block">OXYGEN RESERVE</span>
                  <span className="text-sm font-mono font-bold text-white">98.4% (Normoxic)</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center gap-3">
                <Shield className="w-5 h-5 text-cyan-400 shrink-0" />
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block">TITANIUM HULL INTEGRITY</span>
                  <span className="text-sm font-mono font-bold text-cyan-300">100% SECURE</span>
                </div>
              </div>
            </div>

            {/* Submarine Cockpit Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-3">
                <button
                  onClick={diveDeeper}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/40 hover:bg-cyan-500/20 text-xs font-mono font-semibold text-cyan-300 flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <ArrowDown className="w-4 h-4" />
                  <span>Dive (+500m)</span>
                </button>

                <button
                  onClick={surfaceSub}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-xs font-mono font-semibold text-slate-300 flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <ArrowUp className="w-4 h-4" />
                  <span>Surface (-500m)</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setHeadlightsOn(!headlightsOn)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-2 cursor-pointer transition-all ${
                    headlightsOn
                      ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20'
                      : 'bg-slate-900 border border-slate-700 text-slate-400'
                  }`}
                >
                  <Lightbulb className="w-4 h-4" />
                  <span>{headlightsOn ? 'Headlights: ON' : 'Headlights: OFF'}</span>
                </button>

                <button
                  onClick={pingSonar}
                  className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-mono font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/25 cursor-pointer transition-colors"
                >
                  <Radio className="w-4 h-4" />
                  <span>Ping Active Sonar</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Famous Research Submersibles Fleet */}
        <section className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              Deep Submergence Fleet
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white mt-1">
              Legendary Research Vessels
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Submersible Tabs (4 cols) */}
            <div className="lg:col-span-4 space-y-3">
              {SUBMERSIBLES.map((sub, idx) => (
                <button
                  key={sub.name}
                  onClick={() => {
                    setSelectedSubIndex(idx);
                    oceanAudio.playBubble();
                  }}
                  className={`w-full p-4 rounded-2xl text-left transition-all duration-300 cursor-pointer ${
                    selectedSubIndex === idx
                      ? 'bg-cyan-950/60 border-2 border-cyan-400 shadow-lg shadow-cyan-950/60'
                      : 'glass-panel border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono text-cyan-400">{sub.depthRecord}</span>
                    <span className="text-xs font-mono text-slate-400">Est. {sub.yearBuilt}</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-white">{sub.name}</h3>
                  <p className="text-xs text-slate-400 truncate">{sub.operator}</p>
                </button>
              ))}
            </div>

            {/* Submersible Spec Sheet (8 cols) */}
            <div className="lg:col-span-8 glass-panel p-8 sm:p-10 rounded-3xl border-cyan-500/30 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
                <div>
                  <h3 className="font-display font-black text-3xl text-white">{selectedSub.name}</h3>
                  <span className="text-xs font-mono text-cyan-400">{selectedSub.operator}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-slate-400 block">Maximum Rating</span>
                  <span className="text-lg font-mono font-bold text-cyan-300">
                    {selectedSub.depthRecord}
                  </span>
                </div>
              </div>

              <p className="text-slate-200 text-sm leading-relaxed mb-6">
                {selectedSub.description}
              </p>

              {/* Tech Features */}
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-3">
                  Engineering Systems
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedSub.features.map((feat, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 flex items-center gap-2">
                      <span className="text-cyan-400">▸</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notable Missions */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-teal-400 font-semibold mb-3">
                  Notable Historic Milestones
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {selectedSub.notableMissions.map((miss, i) => (
                    <li key={i} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                      <span>{miss}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
