import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Waves, Send, Compass, ShieldCheck, Mail, MapPin, CheckCircle, Globe, Anchor } from 'lucide-react';
import { oceanAudio } from '../utils/audio';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      oceanAudio.playBubble();
    }
  };

  const navLinks = [
    { to: '/', label: 'Home Ocean' },
    { to: '/ocean-zones', label: 'Vertical Ocean Zones' },
    { to: '/marine-life', label: 'Marine Life Catalog' },
    { to: '/deep-sea-creatures', label: 'Deep Sea Abyssal Fauna' },
    { to: '/exploration', label: 'Research Expeditions' },
    { to: '/conservation', label: 'Conservation & Sanctuaries' },
    { to: '/gallery', label: 'Expedition Gallery' },
    { to: '/about', label: 'Scientific Mission' },
    { to: '/contact', label: 'Contact Oceanographers' },
  ];

  return (
    <footer className="relative bg-[#01050e] border-t border-cyan-500/20 text-slate-300 overflow-hidden pt-16 pb-12 select-none">
      {/* Background ambient bioluminescent glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-14">
          {/* Col 1: Brand & Ocean Manifesto (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 p-0.5 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <div className="w-full h-full bg-[#020817] rounded-[10px] flex items-center justify-center">
                  <Waves className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-xl text-white tracking-wider group-hover:text-cyan-300 transition-colors">
                  DEEP BLUE
                </span>
                <span className="text-[10px] tracking-widest text-cyan-400/80 uppercase font-mono -mt-1">
                  Discover The Unknown
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              An immersive digital deep-sea expedition dedicated to revealing the unexplored frontiers of Earth’s oceans, from sunlit coral reefs to the crushing depths of the Mariana Trench.
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs text-cyan-300/80 font-mono">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Challenger Deep · 10,928m · 11°22′N 142°35′E</span>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-semibold mb-1">
              Exploration Routes
            </h4>
            <ul className="space-y-2 text-sm">
              {navLinks.slice(0, 5).map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="hover:text-cyan-300 transition-colors hover:translate-x-1 inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Science & Sanctuaries (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-semibold mb-1">
              Sanctuary
            </h4>
            <ul className="space-y-2 text-sm">
              {navLinks.slice(5).map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="hover:text-cyan-300 transition-colors hover:translate-x-1 inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Dispatch Newsletter & Inquiries (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-semibold">
              Deep Sea Dispatches
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Receive monthly expedition updates, newly documented abyssal species, and marine conservation bulletins.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-cyan-950/60 border border-cyan-400/40 text-cyan-300 text-xs">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Subscribed! Welcome to the Deep Blue expedition corps.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors pr-10"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to expedition dispatches"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[11px] text-slate-500">
                  Strictly scientific dispatches. Zero marketing spam.
                </span>
              </form>
            )}

            <div className="pt-2 text-xs text-slate-400 flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>expeditions@deepblue-ocean.org</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>Global Ocean Observatory · Monaco & Woods Hole</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Unboxed Metadata */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} DEEP BLUE Foundation</span>
            <span aria-hidden="true">·</span>
            <span>All rights reserved</span>
            <span aria-hidden="true">·</span>
            <span>Bathymetric Data Grounded via GEBCO & NOAA</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <Link to="/conservation" className="hover:text-cyan-300 transition-colors">
              Conservation Charter
            </Link>
            <Link to="/about" className="hover:text-cyan-300 transition-colors">
              Science Ethics
            </Link>
            <Link to="/contact" className="hover:text-cyan-300 transition-colors">
              Media Inquiries
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
