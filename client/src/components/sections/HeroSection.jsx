import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Sliders, Volume2, VolumeX, Wind, Zap, ShieldCheck, Play, Pause, Film, LayoutGrid
} from 'lucide-react';

export default function HeroSection({ settings, onOpenQuote }) {
  const [selectedUnit, setSelectedUnit] = useState(1); // default active unit starts from Unit 1
  const [viewMode, setViewMode] = useState('video'); // 'video' | 'interactive'
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const indoorUnits = [
    {
      id: 1,
      title: 'INDOOR UNIT 1',
      name: 'Slim Concealed Duct Unit',
      category: 'Ducted Central AC',
      room: 'Living Room & Dining Hall',
      noise: '21 dB(A)',
      features: 'Completely hidden within false ceiling with linear architectural slot diffusers.',
      image: '/images/units/unit1-concealed.svg',
      calloutPos: 'bottom-4 left-6 sm:bottom-8 sm:left-12',
      pinPos: { top: '78%', left: '26%' }
    },
    {
      id: 2,
      title: 'INDOOR UNIT 2',
      name: 'Architectural Compact Cassette Unit',
      category: '4-Way Cassette AC',
      room: 'Drawing Room & Formal Lounge',
      noise: '20 dB(A)',
      features: '360° uniform airflow distribution with whisper-quiet DC fan motor and motorized vanes.',
      image: '/images/units/unit4-ducted.svg',
      calloutPos: 'top-20 left-12 sm:top-24 sm:left-24',
      pinPos: { top: '65%', left: '42%' }
    },
    {
      id: 3,
      title: 'INDOOR UNIT 3',
      name: 'Designer Hi-Wall Inverter',
      category: 'Inverter Split AC',
      room: 'Guest Lounge & Patio Suite',
      noise: '19 dB(A)',
      features: 'Ultra-slim profile with precision thermostat for rapid cooling.',
      image: '/images/units/unit5-split.svg',
      calloutPos: 'top-24 left-4 sm:top-28 sm:left-8',
      pinPos: { top: '56%', left: '22%' }
    },
    {
      id: 4,
      title: 'INDOOR UNIT 4',
      name: 'Low-Static Ceiling Concealed Blower',
      category: 'Concealed VRF Unit',
      room: 'Central Family Lounge & Foyer',
      noise: '22 dB(A)',
      features: 'High air volume with automatic fan modulation and PM2.5 air filtration.',
      image: '/images/units/unit4-ducted.svg',
      calloutPos: 'top-4 left-1/4 sm:top-6 sm:left-1/3',
      pinPos: { top: '38%', left: '52%' }
    },
    {
      id: 5,
      title: 'INDOOR UNIT 5',
      name: 'Whisper-Quiet Bedroom Unit',
      category: 'Concealed / Hi-Wall Inverter',
      room: 'Master Bedroom Suite',
      noise: '18 dB(A)',
      features: 'Sleep comfort temperature profiling with zero mechanical compressor noise.',
      image: '/images/units/unit5-split.svg',
      calloutPos: 'top-6 right-4 sm:top-8 sm:right-16',
      pinPos: { top: '44%', left: '72%' }
    }
  ];

  const currentUnit = indoorUnits.find(u => u.id === selectedUnit) || indoorUnits[0];

  return (
    <section className="relative bg-gradient-to-b from-[#059669]/10 via-slate-50 to-white overflow-hidden pb-12 pt-6 sm:pt-10">
      {/* Ambient Glass Glow Orbs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none -z-0"></div>
      <div className="absolute top-40 right-1/4 w-80 h-80 bg-teal-400/15 rounded-full blur-3xl pointer-events-none -z-0"></div>
      
      {/* Top Banner Tagline */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-6">
        <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#059669]/10 text-[#059669] text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-sm border border-[#059669]/20 shadow-xs">
          <span>VRF Home Climate Technology</span>
        </div>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight">
          One Outdoor Unit Powers Your Entire Home
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
          Independent zone temperature control for every room, whisper-quiet operation down to 20-38 dB, and zero unsightly outdoor units cluttering your balconies.
        </p>

        {/* View Mode Toggle Switcher: 3D Video Simulation vs Interactive Floor Plan */}
        <div className="flex items-center justify-center gap-2 mt-4 mb-2">
          <button
            type="button"
            onClick={() => setViewMode('video')}
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs ${
              viewMode === 'video'
                ? 'bg-[#059669] text-white shadow-md shadow-[#059669]/30 scale-105'
                : 'bg-white/80 text-slate-700 hover:bg-white border border-slate-200/80'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>3D Multi-Room Video Simulation</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('interactive')}
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs ${
              viewMode === 'interactive'
                ? 'bg-[#059669] text-white shadow-md shadow-[#059669]/30 scale-105'
                : 'bg-white/80 text-slate-700 hover:bg-white border border-slate-200/80'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Interactive Room Plan</span>
          </button>
        </div>

        {/* Quick Unit Selector Pills (Swipeable on Mobile) */}
        <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 mt-2 overflow-x-auto no-scrollbar py-1 px-1 sm:px-0">
          {indoorUnits.map((unit) => (
            <button
              key={unit.id}
              onClick={() => {
                setSelectedUnit(unit.id);
                setViewMode('interactive');
              }}
              className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all whitespace-nowrap shrink-0 backdrop-blur-md ${
                selectedUnit === unit.id && viewMode === 'interactive'
                  ? 'bg-[#059669] text-white shadow-md shadow-[#059669]/30 scale-105 border border-white/20'
                  : 'bg-white/80 text-slate-700 hover:bg-white border border-white/80 shadow-xs'
              }`}
            >
              {unit.title}: {unit.room.split('&')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Visualizer & Video Demonstration Container */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6 relative">
        <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white bg-slate-900 group">
          
          {viewMode === 'video' ? (
            /* 3D Multi-Room Video Player (True 16:9 Landscape Demonstration) */
            <div className="relative w-full aspect-[16/9] bg-slate-950 flex items-center justify-center overflow-hidden">
              {/* Main Crisp 16:9 Landscape Video Player */}
              <video
                ref={videoRef}
                src="/videos/vrf-home-multi-room-animation.mp4"
                poster="/videos/vrf-home-multi-room-poster.jpg"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover sm:object-contain"
              />

              {/* Top Floating Badge */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white text-[11px] sm:text-xs shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse"></span>
                <span className="font-semibold">3D Architectural Simulation • 1 Outdoor Unit Powers All Rooms</span>
              </div>

              {/* Floating Video Action Controls */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex items-center gap-2">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all shadow-lg cursor-pointer"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                </button>
                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all shadow-lg cursor-pointer"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                </button>
              </div>

              {/* Switch to Interactive Plan pill at bottom right of video */}
              <div className="absolute bottom-3 right-3 z-20 hidden md:block">
                <button
                  type="button"
                  onClick={() => setViewMode('interactive')}
                  className="px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 text-xs font-semibold transition-all flex items-center gap-1.5 shadow-lg"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Inspect Room Floor Plan →</span>
                </button>
              </div>
            </div>
          ) : (
            /* Interactive 3D Architectural Villa Floor Plan Cutaway */
            <div className="relative min-h-[260px] xs:min-h-[300px] sm:min-h-[360px] md:aspect-[16/9] w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85"
                alt="3D Architectural VRF Home Floor Plan Cutaway"
                className="w-full h-full object-cover object-center brightness-90 contrast-105"
              />
              {/* Ambient Lighting Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-navy-900/40 pointer-events-none"></div>

              {/* Dotted Refrigerant Piping Network Overlay */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="coolPipe" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#059669" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.8" />
                  </linearGradient>
                </defs>

                {/* Dotted lines connecting units to room nodes */}
                <line 
                  x1="18%" y1="36%" x2="22%" y2="56%" 
                  stroke="url(#coolPipe)" strokeWidth="3" strokeDasharray="6,6" 
                  className="animate-pulse" 
                />
                <line 
                  x1="38%" y1="20%" x2="52%" y2="38%" 
                  stroke="url(#coolPipe)" strokeWidth="3" strokeDasharray="6,6" 
                  className="animate-pulse" 
                />
                <line 
                  x1="76%" y1="20%" x2="72%" y2="44%" 
                  stroke="url(#coolPipe)" strokeWidth="3" strokeDasharray="6,6" 
                  className="animate-pulse" 
                />
                <line 
                  x1="16%" y1="84%" x2="26%" y2="78%" 
                  stroke="url(#coolPipe)" strokeWidth="3" strokeDasharray="6,6" 
                  className="animate-pulse" 
                />
                <path 
                  d="M 22 56 Q 36 48 52 38 T 72 44" 
                  fill="none" 
                  stroke="#059669" 
                  strokeWidth="2.5" 
                  strokeDasharray="4,4" 
                  opacity="0.75" 
                />
              </svg>

              {/* Pulsing White Circular Nodes on the Rooms */}
              {indoorUnits.map((unit) => (
                <button
                  key={unit.id}
                  onClick={() => setSelectedUnit(unit.id)}
                  style={{ top: unit.pinPos.top, left: unit.pinPos.left }}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none"
                  title={`Click to inspect ${unit.title} (${unit.room})`}
                >
                  <span className="relative flex h-7 w-7 items-center justify-center">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      selectedUnit === unit.id ? 'bg-[#059669]' : 'bg-white'
                    }`}></span>
                    <span className={`relative inline-flex rounded-full h-5 w-5 border-2 border-navy-900 shadow-md ${
                      selectedUnit === unit.id ? 'bg-[#059669]' : 'bg-white'
                    }`}></span>
                  </span>
                </button>
              ))}

              {/* Active Unit Mini Card Overlay on Mobile Phones (< sm) */}
              <div className="sm:hidden absolute top-2.5 left-2.5 z-30 max-w-[210px] bg-white/85 backdrop-blur-xl rounded-xl p-2.5 border border-white/80 shadow-2xl">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-black tracking-wider text-[#059669] uppercase">
                    {currentUnit.title}
                  </span>
                  <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/50">
                    {currentUnit.noise}
                  </span>
                </div>
                <div className="w-full h-11 rounded overflow-hidden bg-slate-100 mb-1 border border-slate-200/60">
                  <img 
                    src={currentUnit.image} 
                    alt={currentUnit.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="text-[11px] font-bold text-navy-950 truncate">
                  {currentUnit.name}
                </div>
                <div className="text-[10px] text-slate-500 truncate">
                  {currentUnit.room}
                </div>
              </div>

              {/* Floating Unit Cards with Dotted Callouts */}
              {indoorUnits.map((unit) => {
                const isActive = selectedUnit === unit.id;
                return (
                  <div
                    key={unit.id}
                    onClick={() => setSelectedUnit(unit.id)}
                    className={`absolute z-30 transition-all duration-300 cursor-pointer hidden sm:block ${unit.calloutPos} ${
                      isActive 
                        ? 'scale-105 ring-2 ring-[#059669] shadow-2xl' 
                        : 'hover:scale-102 opacity-90'
                    }`}
                  >
                    <div className="bg-white/85 backdrop-blur-xl rounded-xl p-2.5 sm:p-3 border border-white/80 shadow-[0_12px_35px_rgba(0,0,0,0.18)] max-w-[180px] sm:max-w-[220px]">
                      <div className="text-[10px] sm:text-xs font-black tracking-wider text-[#059669] uppercase mb-1">
                        {unit.title}
                      </div>
                      <div className="w-full h-12 sm:h-16 rounded-lg overflow-hidden bg-slate-100 mb-1.5 border border-slate-200/60">
                        <img 
                          src={unit.image} 
                          alt={unit.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="text-[11px] sm:text-xs font-bold text-navy-950 truncate">
                        {unit.name}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate">
                        {unit.room}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Bottom Interactive Spec Bar (Responsive Layout) */}
          <div className="bg-navy-950/85 backdrop-blur-2xl text-white p-3.5 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between border-t border-white/10 gap-3.5 sm:gap-4 shadow-xl">
            <div className="flex items-start sm:items-center space-x-3 sm:space-x-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#059669]/20 border border-[#059669]/40 flex items-center justify-center text-[#059669] shrink-0 mt-0.5 sm:mt-0">
                <Wind className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] sm:text-xs font-bold text-[#059669] uppercase tracking-wider">
                    {currentUnit.title}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-[11px] sm:text-xs text-emerald-400 font-semibold flex items-center">
                    <Volume2 className="w-3 h-3 mr-1" />
                    Sound: {currentUnit.noise}
                  </span>
                </div>
                <div className="text-xs sm:text-base font-bold text-white mt-0.5">
                  {currentUnit.name} — <span className="text-cyan-200">{currentUnit.room}</span>
                </div>
                <div className="text-[10px] sm:text-xs text-slate-400 mt-0.5 line-clamp-1 sm:line-clamp-none">
                  {currentUnit.features}
                </div>
              </div>
            </div>

            {/* Action Buttons (Full width on mobile, inline on desktop) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full md:w-auto justify-end shrink-0">
              <Link
                to="/quote"
                className="px-4 sm:px-5 py-2.5 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-[#059669]/30 flex items-center justify-center space-x-1.5 text-center"
              >
                <span>Get Free Estimate for This Setup</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/products"
                className="px-3.5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-colors text-center"
              >
                All Products
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Highlights Grid Below Hero (Responsive Glass Cards) */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6 mt-6 sm:mt-8 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
        <div className="glass-card p-3 sm:p-4 rounded-xl border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex items-center space-x-2.5 sm:space-x-3 transition-all hover:scale-102">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-emerald-50 text-[#059669] flex items-center justify-center shrink-0 border border-emerald-100">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xs sm:text-sm font-bold text-navy-950 truncate">20-40% Less Power</div>
            <div className="text-[10px] sm:text-[11px] text-slate-500 truncate">Inverter DC Drive</div>
          </div>
        </div>

        <div className="glass-card p-3 sm:p-4 rounded-xl border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex items-center space-x-2.5 sm:space-x-3 transition-all hover:scale-102">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
            <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xs sm:text-sm font-bold text-navy-950 truncate">20-38 dB(A) Quiet</div>
            <div className="text-[10px] sm:text-[11px] text-slate-500 truncate">Quieter Than Whisper</div>
          </div>
        </div>

        <div className="glass-card p-3 sm:p-4 rounded-xl border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex items-center space-x-2.5 sm:space-x-3 transition-all hover:scale-102">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xs sm:text-sm font-bold text-navy-950 truncate">Single Outdoor Unit</div>
            <div className="text-[10px] sm:text-[11px] text-slate-500 truncate">Zero Balcony Clutter</div>
          </div>
        </div>

        <div className="glass-card p-3 sm:p-4 rounded-xl border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex items-center space-x-2.5 sm:space-x-3 transition-all hover:scale-102">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
            <Sliders className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xs sm:text-sm font-bold text-navy-950 truncate">Individual Control</div>
            <div className="text-[10px] sm:text-[11px] text-slate-500 truncate">Room-by-Room Tuning</div>
          </div>
        </div>
      </div>
    </section>
  );
}
