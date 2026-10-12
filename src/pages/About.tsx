import React from 'react';
import { EXPLORATION_TIMELINE } from '../data/oceanData';
import { Compass, BookOpen, Globe2, Award, Waves, UserCheck, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { oceanAudio } from '../utils/audio';

export const About: React.FC = () => {
  const teamRoles = [
    {
      title: 'Dr. Elena Rostova',
      role: 'Chief Deep Benthic Ecologist',
      affiliation: 'Institute of Marine Research (Academic Placeholder)',
      bio: 'Specializing in hadal trench piezophilic organisms and hydrothermal chemosynthetic food webs with over 18 dives in DSV Alvin.'
    },
    {
      title: 'Marcus Vance',
      role: 'Submersible Systems & ROV Pilot',
      affiliation: 'Deep-Ocean Exploration Corps (Operational Placeholder)',
      bio: 'Veteran pilot of autonomous robotic vehicles and deep-tethered telepresence systems rated for 6,000-meter abyssal descents.'
    },
    {
      title: 'Dr. Tarek Al-Mansoor',
      role: 'Director of Bio-Acoustic Oceanography',
      affiliation: 'Ocean Sound Observatory (Research Placeholder)',
      bio: 'Deciphering low-frequency whale migrations and deep scattering layer acoustic backscatter across equatorial Pacific basins.'
    },
    {
      title: 'Aria Chen',
      role: 'Lead Conservation Cartographer',
      affiliation: 'Marine Protected Areas Registry (Policy Placeholder)',
      bio: 'Authoring high-resolution geospatial models to identify critical pelagic corridors and designate international high-seas sanctuaries.'
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-24 bg-[#020817] text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-400/30 text-cyan-300 text-xs font-mono mb-4">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Charter & Scientific Integrity</span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white mb-6 tracking-tight">
            ABOUT DEEP BLUE
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            DEEP BLUE was conceived to illuminate the 95% of our planet's oceans that remain unseen. We synthesize open oceanographic telemetry, educational bathymetry, and conservation advocacy into an interactive digital museum.
          </p>
        </div>

        {/* Pillars / Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="glass-panel p-8 rounded-3xl border-cyan-500/20 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-6">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-2xl text-white mb-3">
                Exploration Vision
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Earth is fundamentally an ocean planet. Expanding visual access to the abyss transforms human understanding of life's extremes, evolutionary origins, and planetary heat buffers.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-800 text-xs font-mono text-cyan-400">
              Open Science · Global Access
            </div>
          </div>

          <div className="glass-panel p-8 rounded-3xl border-cyan-500/20 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-400/30 flex items-center justify-center text-teal-400 mb-6">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-2xl text-white mb-3">
                Educational Charter
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We present verified peer-reviewed scientific findings from NOAA, WHOI, GEBCO, and global oceanographic consortia without sensationalism or fabricated science.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-800 text-xs font-mono text-teal-400">
              Rigorous Standards · No Misinformation
            </div>
          </div>

          <div className="glass-panel p-8 rounded-3xl border-cyan-500/20 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-400/30 flex items-center justify-center text-purple-400 mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-2xl text-white mb-3">
                Sanctuary Advocacy
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Advocating for the United Nations High Seas Treaty and the creation of highly protected marine reserves to halt deep-sea seabed mining and destructive bottom trawling.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-800 text-xs font-mono text-purple-400">
              30x30 Target · Marine Sanctuaries
            </div>
          </div>
        </div>

        {/* Historical Timeline of Deep Ocean Exploration */}
        <section className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              Deep-Sea Chronology
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white mt-1">
              Milestones of Abyssal Discovery
            </h2>
          </div>

          <div className="relative border-l border-cyan-500/30 ml-4 sm:ml-32 space-y-12">
            {EXPLORATION_TIMELINE.map((item, idx) => (
              <div key={idx} className="relative pl-8 sm:pl-12 group">
                {/* Glowing Node Dot */}
                <div className="absolute -left-2.5 top-1.5 w-5 h-5 rounded-full bg-[#020817] border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_12px_#00E5FF]">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-300" />
                </div>

                {/* Year Label */}
                <span className="font-mono text-xs text-cyan-400 font-bold block mb-1">
                  {item.year}
                </span>

                <div className="glass-panel p-6 rounded-2xl border-cyan-500/20 max-w-2xl">
                  <h3 className="font-display font-bold text-lg text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Research Team / Academic Advisory Section */}
        <section className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              Scientific Contributors
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white mt-1">
              Research Roles & Disciplines
            </h2>
            <p className="text-xs text-slate-400 mt-2">
              Representing essential oceanographic disciplines (identified educational roles).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamRoles.map((member, i) => (
              <div
                key={i}
                className="glass-panel p-6 rounded-2xl border-cyan-500/20 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-slate-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 font-mono text-xs font-bold">
                    0{i + 1}
                  </div>
                  <h3 className="font-display font-bold text-lg text-white mb-0.5">
                    {member.title}
                  </h3>
                  <div className="text-xs font-mono text-cyan-300 mb-1">{member.role}</div>
                  <div className="text-[10px] text-slate-400 italic mb-3">
                    {member.affiliation}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA to Explore */}
        <div className="text-center pt-8">
          <Link
            to="/ocean-zones"
            onClick={() => oceanAudio.playBubble()}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-display font-bold text-sm bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 shadow-xl shadow-cyan-500/25 hover:scale-105 transition-all cursor-pointer"
          >
            <Waves className="w-4 h-4 text-slate-950" />
            <span>Embark on the Ocean Descent</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
