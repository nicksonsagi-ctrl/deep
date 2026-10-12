import React, { useState, useEffect } from 'react';
import { GALLERY_PHOTOS, GalleryPhoto } from '../data/oceanData';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight, Compass, Camera, MapPin } from 'lucide-react';
import { oceanAudio } from '../utils/audio';

export const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const categories = ['All', 'Giants', 'Bioluminescence', 'Coral Reefs', 'Deep Abyss', 'Expeditions'];

  const filteredPhotos = GALLERY_PHOTOS.filter(
    (photo) => selectedCategory === 'All' || photo.category === selectedCategory
  );

  const openLightbox = (index: number) => {
    setActivePhotoIndex(index);
    oceanAudio.playBubble();
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
  };

  const nextPhoto = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((prev) => (prev! + 1) % filteredPhotos.length);
      oceanAudio.playBubble();
    }
  };

  const prevPhoto = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((prev) => (prev! - 1 + filteredPhotos.length) % filteredPhotos.length);
      oceanAudio.playBubble();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, filteredPhotos.length]);

  const currentPhoto = activePhotoIndex !== null ? filteredPhotos[activePhotoIndex] : null;

  return (
    <div className="min-h-screen pt-24 pb-24 bg-[#020714] text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Gallery Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-400/30 text-cyan-300 text-xs font-mono mb-4">
            <Camera className="w-3.5 h-3.5 text-cyan-400" />
            <span>Deep Submergence Photographic Archive</span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white mb-4 tracking-tight">
            OCEAN GALLERY
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            A curated photographic exhibition celebrating underwater light, colossal pelagic creatures, and the strange glowing fauna of the abyssal plain.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                oceanAudio.playBubble();
              }}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-200 font-semibold shadow-sm'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(index)}
              className="glass-panel rounded-2xl overflow-hidden border-cyan-500/20 glass-card-hover group cursor-pointer flex flex-col"
            >
              <div className="relative h-64 overflow-hidden bg-slate-950">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020714] via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                <div className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/80 text-cyan-300 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>

                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 border border-cyan-500/30 text-[10px] font-mono text-cyan-300">
                  {photo.depth}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                    {photo.category} · {photo.location}
                  </span>
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
                    {photo.title}
                  </h3>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Photo: {photo.photographer}</span>
                  <span className="text-cyan-400">View</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {currentPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-8 animate-in fade-in"
        >
          {/* Top Bar with Title and Close */}
          <div className="w-full max-w-6xl flex items-center justify-between z-20 pb-4">
            <div className="flex flex-col">
              <span className="text-xs font-mono text-cyan-400">
                {currentPhoto.category} · DEPTH: {currentPhoto.depth}
              </span>
              <h2 className="font-display font-bold text-lg sm:text-xl text-white">
                {currentPhoto.title}
              </h2>
            </div>

            <button
              onClick={closeLightbox}
              className="p-2.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 transition-colors cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Center Image with Navigation Buttons */}
          <div className="relative w-full max-w-5xl flex-1 flex items-center justify-center overflow-hidden my-auto py-2">
            <button
              onClick={prevPhoto}
              className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 transition-all cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <img
              src={currentPhoto.image}
              alt={currentPhoto.title}
              className="max-h-[72vh] max-w-full object-contain rounded-2xl shadow-2xl border border-cyan-500/20"
              referrerPolicy="no-referrer"
            />

            <button
              onClick={nextPhoto}
              className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 transition-all cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Caption Details */}
          <div className="w-full max-w-3xl text-center pt-4 border-t border-slate-800">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-2">
              {currentPhoto.description}
            </p>
            <div className="flex items-center justify-center gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{currentPhoto.location}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Camera className="w-3.5 h-3.5 text-teal-400" />
                <span>{currentPhoto.photographer}</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
