import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Volume2, VolumeX, Menu, X, Compass, Waves } from 'lucide-react';
import { oceanAudio } from '../utils/audio';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audioActive, setAudioActive] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleSoundscape = () => {
    const isPlaying = oceanAudio.toggleMute();
    setAudioActive(isPlaying);
    if (isPlaying) {
      oceanAudio.playBubble();
    }
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/ocean-zones', label: 'Ocean Zones' },
    { to: '/marine-life', label: 'Marine Life' },
    { to: '/deep-sea-creatures', label: 'Deep Sea' },
    { to: '/exploration', label: 'Exploration' },
    { to: '/conservation', label: 'Conservation' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#020817]/85 backdrop-blur-md border-b border-cyan-500/20 py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          {/* Brand Wordmark & Animated Ocean Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group whitespace-nowrap shrink-0 select-none"
            aria-label="DEEP BLUE Home"
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 via-teal-500 to-blue-700 p-0.5 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/40 transition-shadow">
              <div className="w-full h-full bg-[#020817] rounded-[10px] flex items-center justify-center overflow-hidden relative">
                <Waves className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors animate-pulse" />
                <div className="absolute inset-0 bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-lg md:text-xl tracking-wider text-white group-hover:text-cyan-300 transition-colors">
                DEEP BLUE
              </span>
              <span className="text-[10px] tracking-widest text-cyan-400/80 uppercase font-mono -mt-1 hidden sm:block">
                Discover The Unknown
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden xl:flex items-center gap-1 lg:gap-2 text-sm font-medium"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-all duration-300 ${
                    isActive
                      ? 'text-cyan-300 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-cyan-500/10'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full shadow-[0_0_8px_#00E5FF]" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Controls: Ambient Audio Toggle & Quick Dive Button */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Hydrophone Audio Toggle */}
            <button
              onClick={toggleSoundscape}
              aria-label={audioActive ? 'Mute underwater soundscape' : 'Enable underwater soundscape'}
              title={audioActive ? 'Mute ambient soundscape' : 'Enable ambient soundscape'}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono border transition-all duration-300 cursor-pointer ${
                audioActive
                  ? 'bg-cyan-950/80 border-cyan-400/50 text-cyan-300 shadow-[0_0_15px_rgba(0,229,255,0.25)]'
                  : 'bg-slate-900/60 border-slate-700/60 text-slate-400 hover:text-slate-200 hover:border-slate-500'
              }`}
            >
              {audioActive ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden sm:inline">Hydrophone</span>
                  <span className="flex gap-0.5 items-end h-3">
                    <span className="w-0.5 h-2 bg-cyan-400 animate-pulse" />
                    <span className="w-0.5 h-3 bg-cyan-300 animate-pulse delay-75" />
                    <span className="w-0.5 h-1.5 bg-cyan-400 animate-pulse delay-150" />
                  </span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sound</span>
                </>
              )}
            </button>

            {/* Dive CTA Button */}
            <Link
              to="/ocean-zones"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 transition-all duration-300 whitespace-nowrap shrink-0 font-display cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Dive In</span>
            </Link>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-slate-900/80 border border-slate-700/60 text-slate-200 hover:text-cyan-300 focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#020817]/95 backdrop-blur-xl border-b border-cyan-500/20 px-6 py-6 transition-all duration-300 animate-in fade-in slide-in-from-top-4">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`
                }
              >
                <span>{link.label}</span>
                <span className="text-cyan-400 text-xs font-mono">→</span>
              </NavLink>
            ))}
            <div className="pt-4 mt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">Ambient Hydrophone</span>
              <button
                onClick={toggleSoundscape}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono border ${
                  audioActive ? 'border-cyan-400 text-cyan-300 bg-cyan-950/60' : 'border-slate-700 text-slate-400'
                }`}
              >
                {audioActive ? 'Mute' : 'Turn On'}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
