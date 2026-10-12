import React, { useState } from 'react';
import { Mail, Send, CheckCircle, AlertCircle, Compass, MessageSquare, MapPin, Globe } from 'lucide-react';
import { oceanAudio } from '../utils/audio';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    inquiryType: 'Expedition Research',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const inquiryTypes = [
    'Expedition Research',
    'Educational & Academic',
    'Media & Documentary',
    'Conservation Partnership'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.fullName.trim()) {
      setErrorMessage('Please provide your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (!formData.subject.trim()) {
      setErrorMessage('Please provide a subject line.');
      return;
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      setErrorMessage('Please provide a detailed message (at least 10 characters).');
      return;
    }

    setSubmitted(true);
    oceanAudio.playBubble();
  };

  return (
    <div className="min-h-screen pt-24 pb-24 bg-[#010614] text-slate-200 relative overflow-hidden">
      {/* Background radial caustic light */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-400/30 text-cyan-300 text-xs font-mono mb-4">
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>Oceanographic Communications</span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white mb-4 tracking-tight">
            CONTACT US
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Connect with deep-sea researchers, propose educational collaborations, or request expedition visual assets.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7 glass-panel p-8 sm:p-10 rounded-3xl border-cyan-500/30 shadow-2xl">
            {submitted ? (
              <div className="py-12 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-cyan-950 border border-cyan-400/40 flex items-center justify-center text-cyan-400 mb-6 shadow-[0_0_30px_rgba(0,229,255,0.3)]">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white mb-3">
                  Message Transmitted
                </h3>
                <p className="text-sm text-slate-300 max-w-md leading-relaxed mb-6">
                  Thank you, <strong>{formData.fullName}</strong>. Your communication regarding "{formData.subject}" has been queued in our simulated oceanographic dispatch terminal.
                </p>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-slate-400 mb-8">
                  STATUS: SIMULATED INQUIRY LOGGED (DEMO APPLICATION ENVIRONMENT)
                </div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: '',
                      email: '',
                      inquiryType: 'Expedition Research',
                      subject: '',
                      message: ''
                    });
                  }}
                  className="px-6 py-2.5 rounded-xl bg-cyan-500/20 border border-cyan-400 text-cyan-300 text-xs font-semibold hover:bg-cyan-500/30 transition-colors cursor-pointer"
                >
                  Send Another Dispatch
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMessage && (
                  <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Dr. Sylvia Earle"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="oceanographer@institute.org"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-2">
                    Inquiry Classification
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
                  >
                    {inquiryTypes.map((type) => (
                      <option key={type} value={type} className="bg-slate-950 text-white">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-2">
                    Subject Line *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Hydrothermal Vent Telemetry Collaboration"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-2">
                    Message Dossier *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your inquiry, research proposal, or educational request..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] font-mono text-slate-500">
                    * Interactive prototype demonstration mode
                  </span>
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-xl font-display font-bold text-sm bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-950 shadow-xl shadow-cyan-500/25 flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
                  >
                    <Send className="w-4 h-4 text-slate-950" />
                    <span>Send Dispatch</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Coordinates & Field Stations (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="glass-panel p-8 rounded-3xl border-cyan-500/20">
              <h3 className="font-display font-bold text-xl text-white mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-cyan-400" />
                <span>Global Ocean Observatory Points</span>
              </h3>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="font-mono text-cyan-400 block font-semibold mb-0.5">
                    Woods Hole Deep Submergence Facility
                  </span>
                  <span className="text-slate-400">Cape Cod, Massachusetts, USA · 41°31′N 70°40′W</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="font-mono text-teal-400 block font-semibold mb-0.5">
                    Oceanographic Museum of Monaco
                  </span>
                  <span className="text-slate-400">Avenue Saint-Martin, Monaco · 43°43′N 7°25′E</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="font-mono text-purple-400 block font-semibold mb-0.5">
                    Mariana Basin Hydrophone Station
                  </span>
                  <span className="text-slate-400">Challenger Deep Seafloor Relay · Depth 10,850m</span>
                </div>
              </div>
            </div>

            <div className="glass-panel-dark p-6 rounded-3xl border-cyan-500/20 text-xs">
              <h4 className="font-mono text-cyan-400 uppercase tracking-wider mb-2 font-semibold">
                Direct Communication Protocols
              </h4>
              <p className="text-slate-300 leading-relaxed mb-3">
                For urgent academic inquiries or scientific footage licensing, contact the deep-ocean media team directly:
              </p>
              <div className="font-mono text-white text-xs">
                inquiries@deepblue-ocean.org
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
