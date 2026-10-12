import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ALL_CREATURES, MarineCreature } from '../data/oceanData';
import { Search, Volume2, X, Sparkles, Filter, Info, ShieldCheck, Heart } from 'lucide-react';
import { oceanAudio } from '../utils/audio';

export const MarineLife: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeCreature, setActiveCreature] = useState<MarineCreature | null>(null);

  // Categories
  const categories = ['All', 'Mammals', 'Fish', 'Reptiles', 'Invertebrates', 'Deep-Sea'];

  // Handle URL creature param if passed from another page
  useEffect(() => {
    const creatureId = searchParams.get('creature');
    if (creatureId) {
      const match = ALL_CREATURES.find((c) => c.id === creatureId);
      if (match) {
        setActiveCreature(match);
      }
    }
  }, [searchParams]);

  const filteredCreatures = useMemo(() => {
    return ALL_CREATURES.filter((c) => {
      const matchesCategory =
        selectedCategory === 'All' || c.category === selectedCategory;
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.habitat.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const openCreatureModal = (creature: MarineCreature) => {
    setActiveCreature(creature);
    setSearchParams({ creature: creature.id });
    oceanAudio.playBubble();
  };

  const closeCreatureModal = () => {
    setActiveCreature(null);
    setSearchParams({});
  };

  const playCreatureAudio = (creature: MarineCreature) => {
    if (creature.soundType === 'whale') {
      oceanAudio.playWhaleSong();
    } else if (creature.soundType === 'sonar') {
      oceanAudio.pingSonar();
    } else {
      oceanAudio.playBubble();
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-24 bg-[#020817] relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-400/30 text-cyan-300 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Living Oceanic Taxa</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white mb-4 tracking-tight">
            MARINE LIFE CATALOG
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Discover Earth's most majestic sea life. Filter by taxonomic category, search anatomical features, and listen to synthesized hydrophone biosonar recordings.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="glass-panel p-4 sm:p-6 rounded-2xl border-cyan-500/20 mb-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  oceanAudio.playBubble();
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-200 font-semibold shadow-sm'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, diet, habitat..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Marine Life Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCreatures.map((creature) => (
            <div
              key={creature.id}
              onClick={() => openCreatureModal(creature)}
              className="glass-panel rounded-2xl overflow-hidden border-cyan-500/20 glass-card-hover flex flex-col group cursor-pointer"
            >
              <div className="relative h-56 overflow-hidden bg-slate-950">
                <img
                  src={creature.image}
                  alt={creature.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-transparent to-transparent" />
                
                {/* Depth Pill */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-400/30 text-[11px] font-mono text-cyan-300">
                  {creature.depth}
                </div>

                {/* Bioluminescent indicator */}
                {creature.bioluminescent && (
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-purple-950/80 border border-purple-400/40 text-[10px] font-mono text-purple-300 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                    <span>Bioluminescent</span>
                  </div>
                )}
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

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-400">
                    Status: <strong className="text-white">{creature.status}</strong>
                  </span>
                  <span className="text-cyan-400 group-hover:translate-x-1 transition-transform font-semibold font-mono text-[11px]">
                    Inspect Dossier →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCreatures.length === 0 && (
          <div className="text-center py-20 glass-panel rounded-3xl border-slate-800 p-8">
            <p className="text-slate-400 text-sm mb-4">
              No marine species matched your query "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-400 text-cyan-300 text-xs font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Creature Detail Modal View */}
      {activeCreature && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in"
        >
          <div className="relative glass-panel rounded-3xl border-cyan-500/40 max-w-3xl w-full overflow-hidden shadow-2xl my-8">
            {/* Close Button */}
            <button
              onClick={closeCreatureModal}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/80 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 transition-colors cursor-pointer"
              aria-label="Close creature details"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Hero */}
            <div className="relative h-64 sm:h-80 overflow-hidden bg-slate-950">
              <img
                src={activeCreature.image}
                alt={activeCreature.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#031C35] via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest block">
                    {activeCreature.category} · {activeCreature.zone}
                  </span>
                  <h2 className="font-display font-black text-2xl sm:text-4xl text-white">
                    {activeCreature.name}
                  </h2>
                  <span className="text-xs font-mono text-slate-300 italic">
                    {activeCreature.scientificName}
                  </span>
                </div>

                {/* Hydrophone sound trigger button */}
                <button
                  onClick={() => playCreatureAudio(activeCreature)}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-semibold flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Synthesize Hydrophone Call</span>
                </button>
              </div>
            </div>

            {/* Modal Body Info */}
            <div className="p-6 sm:p-8 space-y-6">
              <p className="text-slate-200 text-sm leading-relaxed">
                {activeCreature.description}
              </p>

              {/* Biological Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block">DEPTH</span>
                  <span className="text-xs font-bold text-cyan-300">{activeCreature.depth}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block">SIZE</span>
                  <span className="text-xs font-bold text-white">{activeCreature.size}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block">LIFESPAN</span>
                  <span className="text-xs font-bold text-white">{activeCreature.lifespan}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block">IUCN STATUS</span>
                  <span className="text-xs font-bold text-teal-300">{activeCreature.status}</span>
                </div>
              </div>

              {/* Habitat & Diet */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <strong className="text-cyan-400 font-mono block mb-1">HABITAT:</strong>
                  <span className="text-slate-300">{activeCreature.habitat}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <strong className="text-cyan-400 font-mono block mb-1">DIET:</strong>
                  <span className="text-slate-300">{activeCreature.diet}</span>
                </div>
              </div>

              {/* Scientifically Supported Facts */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-3">
                  Documented Behavioral Adaptations
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {activeCreature.facts.map((fact, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-900/40 border border-slate-800">
                      <span className="text-cyan-400 font-mono">0{idx + 1}.</span>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
