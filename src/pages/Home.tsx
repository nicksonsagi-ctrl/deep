import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, Compass, Fish, Sparkles, ChevronRight, Eye, Layers, ShieldCheck } from 'lucide-react';
import { OceanCanvas } from '../components/OceanCanvas';
import { DepthIndicator } from '../components/DepthIndicator';
import { ALL_CREATURES } from '../data/oceanData';
import { oceanAudio } from '../utils/audio';

export const Home: React.FC = () => {
  const [scrollDepth, setScrollDepth] = useState(0);

  // Calculate current depth in meters based on page scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, scrollY / Math.max(1, docHeight)));
      // Maps scroll progress to 0m -> 10,928m
      const calculatedDepth = Math.round(progress * 10928);
      setScrollDepth(calculatedDepth);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToZone = (depth: number) => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetScroll = (depth / 10928) * docHeight;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    oceanAudio.playBubble();
  };

  const previewCreatures = [
    ALL_CREATURES.find((c) => c.id === 'blue-whale')!,
    ALL_CREATURES.find((c) => c.id === 'great-white-shark')!,
    ALL_CREATURES.find((c) => c.id === 'manta-ray')!,
    ALL_CREATURES.find((c) => c.id === 'sea-turtle')!,
    ALL_CREATURES.find((c) => c.id === 'biolum-jellyfish')!,
    ALL_CREATURES.find((c) => c.id === 'bottlenose-dolphin')!,
  ].filter(Boolean);

  return (
    <div className="relative min-h-screen">
      {/* Interactive Depth Indicator */}
      <DepthIndicator
        currentDepth={scrollDepth}
        onZoneClick={scrollToZone}
        showJumpControls={true}
      />

      {/* Hero Section with Fullscreen 3D Underwater Simulation */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background 3D Canvas */}
        <div className="absolute inset-0 z-0">
          <OceanCanvas depth={scrollDepth} interactive={true} />
        </div>

        {/* Ambient Gradient Overlay for text readability */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-t from-[#020817] via-transparent to-[#020817]/40" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-400/40 text-cyan-300 text-xs font-mono mb-6 backdrop-blur-md shadow-lg shadow-cyan-950/50">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Interactive Vertical Expedition · 0 to 11,000m</span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white mb-6 leading-none text-glow-cyan">
            THE OCEAN <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-300 via-teal-200 to-blue-400 bg-clip-text text-transparent">
              IS CALLING
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-200 max-w-2xl mb-10 leading-relaxed font-light drop-shadow">
            Journey beneath the surface and discover a world beyond imagination. Dive through the sunlit reefs into the perpetual twilight and the mysterious abyss.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              to="/ocean-zones"
              onClick={() => oceanAudio.playBubble()}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-display font-bold text-sm bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-950 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-400/40 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-slate-950" />
              <span>Start Exploring</span>
            </Link>

            <Link
              to="/marine-life"
              onClick={() => oceanAudio.playBubble()}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-display font-semibold text-sm glass-panel border border-cyan-500/40 hover:border-cyan-400 text-cyan-200 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Fish className="w-4 h-4 text-cyan-400" />
              <span>Discover Marine Life</span>
            </Link>
          </div>

          {/* Scroll Down Prompter */}
          <button
            onClick={() => scrollToZone(200)}
            className="mt-16 flex flex-col items-center gap-2 text-xs font-mono text-cyan-300/70 hover:text-cyan-300 transition-colors cursor-pointer group"
          >
            <span>SCROLL TO DIVE DEEPER</span>
            <div className="w-8 h-8 rounded-full border border-cyan-400/30 flex items-center justify-center group-hover:border-cyan-400 group-hover:bg-cyan-500/10 transition-all">
              <ArrowDown className="w-4 h-4 text-cyan-400 animate-bounce" />
            </div>
          </button>
        </div>
      </section>

      {/* Scroll-Driven Diving Journey Stages */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
            Vertical Descent Journey
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white mt-2 mb-4">
            Five Layers of Mystery
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            As you plunge into the water column, pressure mounts, sunlight extinguishes, and strange evolutionary marvels come to life.
          </p>
        </div>

        {/* Stage 1: Sunlight Zone (0-200m) */}
        <div className="relative mb-28 p-8 sm:p-12 rounded-3xl glass-panel border-cyan-500/30 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 font-mono text-xs text-cyan-400 mb-3">
                <span className="px-2 py-0.5 rounded bg-cyan-500/20">0 – 200 METERS</span>
                <span>·</span>
                <span>Sunlight Zone (Epipelagic)</span>
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-4">
                The Sunlit Cradle of Life
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Golden rays dance through crystalline turquoise currents. In this vibrant photic zone, phytoplankton generate half of Earth's breathable oxygen. Sea turtles navigate ancestral highways, dolphins hunt in coordinated pods, and colossal blue whales breach through sun-warmed swells.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-300">
                <span className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/80">
                  Temp: 20°C to 28°C
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/80">
                  Pressure: 1 to 20 atm
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/80">
                  Biodiversity: 90% of Marine Life
                </span>
              </div>
            </div>
            <div className="lg:col-span-5 relative group overflow-hidden rounded-2xl border border-cyan-500/30">
              <img
                src={previewCreatures[3]?.image}
                alt="Sunlight Coral Reef and Sea Turtle"
                className="w-full h-64 sm:h-72 object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs font-mono text-cyan-300">Epipelagic Sanctuary Reef</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stage 2 & 3: Twilight & Midnight Zones */}
        <div className="relative mb-28 p-8 sm:p-12 rounded-3xl glass-panel-dark border-purple-500/30 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1 relative group overflow-hidden rounded-2xl border border-purple-500/30">
              <img
                src={ALL_CREATURES.find((c) => c.id === 'biolum-jellyfish')?.image}
                alt="Bioluminescent Jellyfish in Midnight Zone"
                className="w-full h-64 sm:h-72 object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs font-mono text-purple-300">Atolla Crown Jellyfish · 1,400m</span>
              </div>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="flex items-center gap-3 font-mono text-xs text-purple-400 mb-3">
                <span className="px-2 py-0.5 rounded bg-purple-500/20">200 – 4,000 METERS</span>
                <span>·</span>
                <span>Twilight & Midnight Zones</span>
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-4">
                The Realm of Living Lights
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Solar rays fade to indigo and extinguish completely at 1,000 meters. Here, 90% of inhabitants manufacture their own light through Luciferin chemical reactions. Ethereal crown jellyfish pulse neon blue warning waves, while giant squids navigate the cold eternal midnight.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-300">
                <span className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/80">
                  Temp: 4°C Constant
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/80">
                  Pressure: 100 to 400 atm
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/80">
                  Light: 100% Bioluminescence
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stage 4 & 5: Abyssal & Hadal Zones (4,000m to 11,000m) */}
        <div className="relative mb-24 p-8 sm:p-12 rounded-3xl bg-[#01040a] border border-cyan-500/20 overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 font-mono text-xs text-teal-400 mb-3">
                <span className="px-2 py-0.5 rounded bg-teal-500/20">4,000 – 11,034 METERS</span>
                <span>·</span>
                <span>Abyssal & Hadal Trenches</span>
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-4">
                The Hadal Trenches & Hydrothermal Vents
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Under crushing pressure reaching 1,100 atmospheres, life thrives around superheated volcanic black smokers. Deep-sea anglerfish lure prey with glowing bacterium bulbs, and Mariana snailfish swim effortlessly under pressure that would flatten a titanium tank.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-300">
                <span className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/80">
                  Pressure: Up to 16,000 psi
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/80">
                  Floor: Challenger Deep
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/80">
                  Energy: Chemosynthesis
                </span>
              </div>
            </div>
            <div className="lg:col-span-5 relative group overflow-hidden rounded-2xl border border-cyan-500/30">
              <img
                src={ALL_CREATURES.find((c) => c.id === 'anglerfish')?.image}
                alt="Deep Sea Anglerfish in Abyssal Trench"
                className="w-full h-64 sm:h-72 object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs font-mono text-cyan-300">Abyssal Anglerfish · 3,200m</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marine Life Preview Showcase */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              Wildlife Exhibition
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white mt-1">
              Remarkable Ocean Inhabitants
            </h2>
          </div>
          <Link
            to="/marine-life"
            onClick={() => oceanAudio.playBubble()}
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group cursor-pointer"
          >
            <span>Explore All Species in Catalog</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewCreatures.map((creature) => (
            <div
              key={creature.id}
              className="glass-panel rounded-2xl overflow-hidden border-cyan-500/20 glass-card-hover flex flex-col group"
            >
              <div className="relative h-52 overflow-hidden bg-slate-950">
                <img
                  src={creature.image}
                  alt={creature.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#031C35] via-transparent to-transparent" />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-400/30 text-[11px] font-mono text-cyan-300">
                  {creature.depth}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                    <span>{creature.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="italic">{creature.scientificName}</span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {creature.name}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                    {creature.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">
                    Status: <strong className="text-white">{creature.status}</strong>
                  </span>
                  <Link
                    to={`/marine-life?creature=${creature.id}`}
                    onClick={() => oceanAudio.playBubble()}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 cursor-pointer"
                  >
                    <span>View Dossier</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ocean Statistics Counters */}
      <section className="relative py-20 bg-[#020b1c]/80 border-y border-cyan-500/20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              Hydrographic Realities
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white mt-1">
              The Planetary Ocean by Numbers
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="p-6 rounded-2xl glass-panel border-cyan-500/20 text-center flex flex-col items-center">
              <span className="font-display font-black text-4xl sm:text-5xl text-cyan-300 tabular-nums mb-2">
                71%
              </span>
              <span className="text-sm font-semibold text-white mb-1">Earth's Surface</span>
              <span className="text-xs text-slate-400">Total global water coverage</span>
            </div>

            <div className="p-6 rounded-2xl glass-panel border-cyan-500/20 text-center flex flex-col items-center">
              <span className="font-display font-black text-4xl sm:text-5xl text-teal-300 tabular-nums mb-2">
                11,034m
              </span>
              <span className="text-sm font-semibold text-white mb-1">Mariana Trench</span>
              <span className="text-xs text-slate-400">Deepest point at Challenger Deep</span>
            </div>

            <div className="p-6 rounded-2xl glass-panel border-cyan-500/20 text-center flex flex-col items-center">
              <span className="font-display font-black text-4xl sm:text-5xl text-purple-300 tabular-nums mb-2">
                95%
              </span>
              <span className="text-sm font-semibold text-white mb-1">Unexplored Ocean</span>
              <span className="text-xs text-slate-400">Deep abyss still unmapped by eye</span>
            </div>

            <div className="p-6 rounded-2xl glass-panel border-cyan-500/20 text-center flex flex-col items-center">
              <span className="font-display font-black text-4xl sm:text-5xl text-cyan-300 tabular-nums mb-2">
                240K+
              </span>
              <span className="text-sm font-semibold text-white mb-1">Cataloged Species</span>
              <span className="text-xs text-slate-400">Millions more awaiting discovery</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-28 px-4 sm:px-6 lg:px-8 text-center overflow-hidden z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.08)_0,transparent_70%)] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-3">
            Perpetual Deep Frontier
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white mb-6 tracking-tight text-glow-cyan">
            THE DEEPER YOU GO, <br />
            THE MORE YOU DISCOVER
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mb-10 leading-relaxed font-light">
            Step into the darkness where sunlight never reaches and encounter nature's most enigmatic bioluminescent hunters and hydrothermal sanctuaries.
          </p>

          <Link
            to="/deep-sea-creatures"
            onClick={() => oceanAudio.playBubble()}
            className="px-9 py-4 rounded-xl font-display font-bold text-sm bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-950 shadow-2xl shadow-cyan-400/40 hover:scale-105 transition-all duration-300 flex items-center gap-3 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>Explore the Deep Ocean</span>
          </Link>
        </div>
      </section>
    </div>
  );
};
