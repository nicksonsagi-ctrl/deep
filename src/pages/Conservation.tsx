import React, { useState } from 'react';
import { CONSERVATION_TOPICS } from '../data/oceanData';
import { ASSETS } from '../data/assets';
import { ShieldCheck, Heart, AlertTriangle, ArrowRight, CheckCircle2, Waves, Sparkles } from 'lucide-react';
import { oceanAudio } from '../utils/audio';

export const Conservation: React.FC = () => {
  // Before / After Slider Position (0 to 100%)
  const [sliderPos, setSliderPos] = useState(50);
  const [pledges, setPledges] = useState<string[]>([]);
  const [pledgeSubmitted, setPledgeSubmitted] = useState(false);

  const togglePledge = (item: string) => {
    setPledges((prev) =>
      prev.includes(item) ? prev.filter((p) => p !== item) : [...prev, item]
    );
    oceanAudio.playBubble();
  };

  const submitPledge = () => {
    if (pledges.length > 0) {
      setPledgeSubmitted(true);
      oceanAudio.playBubble();
    }
  };

  const pledgeItems = [
    'Refuse single-use beverage plastic bottles and takeaway containers',
    'Choose only certified sustainable seafood or adopt plant-forward dining',
    'Support the Global Ocean Treaty goal of protecting 30% of high seas by 2030',
    'Switch to mineral reef-safe sunscreens without oxybenzone and octinoxate',
    'Participate in community waterway or coastline debris cleanups'
  ];

  return (
    <div className="min-h-screen pt-24 pb-24 bg-[#020915] text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/70 border border-teal-400/30 text-teal-300 text-xs font-mono mb-4">
            <Heart className="w-3.5 h-3.5 text-teal-400" />
            <span>Ecological Ocean Stewardship</span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white mb-4 tracking-tight">
            PROTECT WHAT WE CANNOT SEE
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            The ocean produces every second breath we take, absorbs 90% of global excess heat, and cradles millions of species. Yet pollution, warming, and overexploitation threaten to dismantle its delicate architecture.
          </p>
        </div>

        {/* Interactive Before & After Ocean Comparison Slider */}
        <section aria-label="Before and After Sanctuary Comparison" className="mb-20">
          <div className="glass-panel rounded-3xl border-cyan-500/30 p-6 sm:p-10 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                  Interactive Impact Comparison
                </span>
                <h2 className="font-display font-bold text-2xl text-white">
                  Pristine Sanctuary vs. Bleaching & Waste Impact
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-400">
                Drag slider horizontally to compare states
              </span>
            </div>

            {/* Slider Visual Container */}
            <div className="relative h-[320px] sm:h-[480px] rounded-2xl overflow-hidden select-none border border-cyan-500/20">
              {/* Healthy Sanctuary (Underneath) */}
              <div className="absolute inset-0">
                <img
                  src={ASSETS.oceanCoralReef}
                  alt="Pristine Vibrant Coral Sanctuary"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-teal-950/80 border border-teal-400/40 text-teal-200 text-xs font-mono font-semibold">
                  PRISTINE SANCTUARY REEF
                </div>
              </div>

              {/* Degraded State (Overlaid with clip-path) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                <img
                  src={ASSETS.oceanCoralReef}
                  alt="Bleached and Degraded Reef State"
                  className="w-full h-full object-cover filter grayscale contrast-125 brightness-75"
                  referrerPolicy="no-referrer"
                />
                {/* Synthetic plastic haze overlay */}
                <div className="absolute inset-0 bg-slate-900/40 backdrop-contrast-125" />
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-rose-950/80 border border-rose-400/40 text-rose-200 text-xs font-mono font-semibold">
                  THERMAL BLEACHING & RUNOFF
                </div>
              </div>

              {/* Interactive Divider Line & Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_#ffffff] cursor-ew-resize"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-cyan-400 border-2 border-white flex items-center justify-center text-slate-950 text-xs font-bold shadow-lg">
                  ↔
                </div>
              </div>

              {/* Native range input for touch & keyboard accessibility */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                aria-label="Reef condition comparison slider"
                className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
              />
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mt-4 px-1">
              <span>← Bleached & Stressed Habitat</span>
              <span>Living Thriving Sanctuary →</span>
            </div>
          </div>
        </section>

        {/* Major Conservation Crisis Pillars */}
        <section className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              Systemic Pressures
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white mt-1">
              Key Threats Confronting Marine Life
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CONSERVATION_TOPICS.map((topic) => (
              <div
                key={topic.id}
                className="glass-panel rounded-3xl p-8 border-cyan-500/20 glass-card-hover flex flex-col justify-between"
              >
                <div>
                  <div className="mb-4">
                    <span className="text-xs font-mono text-teal-400 uppercase tracking-wider block mb-1">
                      {topic.subtitle}
                    </span>
                    <h3 className="font-display font-bold text-2xl text-white">
                      {topic.title}
                    </h3>
                  </div>

                  <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/20 mb-6 text-center">
                    <span className="text-3xl font-display font-black text-cyan-300 block">
                      {topic.stat}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{topic.statLabel}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    {topic.impact}
                  </p>

                  <div className="space-y-2 mb-6">
                    <h4 className="text-[11px] font-mono text-cyan-400 uppercase font-semibold">
                      Scientific & Policy Solutions
                    </h4>
                    {topic.solutions.map((sol, i) => (
                      <div key={i} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-teal-400 font-mono">✓</span>
                        <span>{sol}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <h4 className="text-[11px] font-mono text-amber-400 uppercase font-semibold mb-2">
                    Everyday Action Tip
                  </h4>
                  <p className="text-xs text-slate-400 italic">
                    "{topic.actionTips[0]}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ocean Conservation Pledge Tracker */}
        <section className="glass-panel-dark rounded-3xl border-teal-500/30 p-8 sm:p-12 shadow-2xl max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-mono text-teal-400 uppercase tracking-widest font-semibold">
              Individual Impact Commitment
            </span>
            <h2 className="font-display font-black text-3xl text-white mt-1 mb-2">
              Deep Blue Conservation Pledge
            </h2>
            <p className="text-xs text-slate-400">
              Select the commitments you choose to uphold to defend ocean ecosystems.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {pledgeItems.map((item, idx) => {
              const isChecked = pledges.includes(item);
              return (
                <div
                  key={idx}
                  onClick={() => togglePledge(item)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    isChecked
                      ? 'bg-teal-950/60 border-teal-400 text-white'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-medium">{item}</span>
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                      isChecked
                        ? 'bg-teal-400 border-teal-300 text-slate-950'
                        : 'border-slate-600'
                    }`}
                  >
                    {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            {pledgeSubmitted ? (
              <div className="p-4 rounded-2xl bg-teal-950/80 border border-teal-400 text-teal-200 text-sm font-semibold flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-400" />
                <span>Pledge Registered! Thank you for standing as a guardian of the ocean.</span>
              </div>
            ) : (
              <button
                onClick={submitPledge}
                disabled={pledges.length === 0}
                className="px-8 py-3.5 rounded-xl font-display font-bold text-sm bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 text-slate-950 shadow-xl shadow-teal-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                Sign Ocean Stewardship Pledge ({pledges.length} selected)
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
