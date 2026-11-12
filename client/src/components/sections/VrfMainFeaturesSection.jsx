import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Layers, Wind, Cpu, ShieldCheck, 
  ArrowRight, Maximize2, Compass, CheckCircle2 
} from 'lucide-react';

export default function VrfMainFeaturesSection({ onOpenQuote }) {
  const [activeTab, setActiveTab] = useState(0);

  const featuresData = [
    {
      id: 0,
      title: 'Variable Refrigerant Network Circuit',
      tabName: 'Variable Refrigerant',
      drawingType: 'FIELD EXECUTION // ROOFTOP VRF CONDENSERS & REFRIGERANT TRUNK',
      image: '/images/features/vrf-refrigerant-rooftop-piping.jpg',
      badge: 'Terrace Modular Condensers',
      summary: 'Advanced multi-zone inverter refrigerant trunk distribution feeding multiple indoor rooms from a single elevated rooftop condenser bank.',
      bullets: [
        'Electronic Expansion Valves (EEV) calibrate refrigerant flow in micro-steps',
        'Single terrace condenser replaces 6 to 12 noisy balcony split units',
        'Total equivalent copper refrigerant piping flexibility up to 100 meters',
        'Heavy insulated refrigerant lines on galvanized channels prevent thermal loss'
      ]
    },
    {
      id: 1,
      title: 'In-Ceiling Concealed Ducted Architecture',
      tabName: 'In-Ceiling Concealed',
      drawingType: 'FIELD EXECUTION // FALSE CEILING DUCTED & FLUSH CASSETTE',
      image: '/images/features/in-ceiling-concealed-ducted.jpg',
      altImage: '/images/features/in-ceiling-cassette-finished.jpg',
      badge: '200mm Slim Ceiling Profile',
      summary: 'Preserves full interior ceiling height while concealing indoor cooling machinery and duct runs entirely above false ceilings with zero wall clutter.',
      bullets: [
        'Ultra-compact 200mm chassis height preserves maximum room ceiling height',
        'Discharges air through flush architectural linear slot grilles or 4-way cassettes',
        'Built-in high-lift condensate drain pump prevents water leakage and moisture damage',
        'Acoustically lined return air plenum drops operating sound down to 19 dB(A)'
      ]
    },
    {
      id: 2,
      title: 'Multi-Zone Independent Thermal Control',
      tabName: 'Multi-Zone Independent',
      drawingType: '3D ARCHITECTURAL TOPOLOGY // 5-ZONE INDEPENDENT DUCTING',
      image: '/images/features/multi-zone-independent-3d-plan.jpg',
      badge: '5-Zone Independent Control',
      summary: 'True room-by-room temperature independence across Zone 1 (Bedroom), Zone 2 (Living), Zone 3 (Dining), Zone 4 (Guest Bed), and Zone 5 (Studio). Cool only occupied spaces with 24V motorized zone dampers.',
      bullets: [
        'Master bedroom set to 20°C for deep sleep while living room is at 24°C',
        'Motorized electronic zone dampers automatically close off unoccupied rooms',
        'Zero energy wasted cooling vacant guest suites, dining rooms, or studios',
        'Rapid turbo pull-down cools sun-facing zones in under 10 minutes'
      ]
    },
    {
      id: 3,
      title: 'Central Touch Screen BMS & Smart IoT',
      tabName: 'Central Touch',
      drawingType: 'SMART BMS INTERFACE // COLOR TOUCH SCREEN CLIMATE CONTROL',
      image: '/images/features/central-touch-smart-screen.jpg',
      badge: 'Color Touch Screen & Schedules',
      summary: 'Unified central management via a sleek wall-mounted color touch screen showing room temperatures down to 0.1°C, programmable 7-day schedules, and power consumption graphs.',
      bullets: [
        'High-resolution touchscreen display with auto, heat, dry, cold & fan modes',
        'Full integration with luxury home automation: Crestron, Control4 & mobile apps',
        'Turn on whole-home cooling remotely from your smartphone before arriving home',
        'Automated night setback profiling saves an additional 15% overnight power'
      ]
    }
  ];

  const current = featuresData[activeTab];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#009fe3]/10 text-[#009fe3] text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Field Engineering & Equipment Execution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight">
            Main Features of VRF Home
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Real engineering execution from elevated rooftop refrigerant trunk lines to in-ceiling false ceiling concealment and multi-zone touch controllers.
          </p>

          {/* Feature Tab Selector Pills */}
          <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
            {featuresData.map((f, idx) => (
              <button
                key={f.id}
                onClick={() => setActiveTab(idx)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 ${
                  activeTab === idx
                    ? 'bg-navy-950 text-white shadow-md shadow-navy-950/20 scale-102'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <span>{f.tabName}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Feature Showcase: Real Equipment Photo & Deep Context */}
        <div className="bg-slate-900 rounded-3xl border-2 border-slate-800 shadow-2xl overflow-hidden p-6 sm:p-10 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Real Equipment / Installation Image */}
            <div className="lg:col-span-7 relative group">
              <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-[#0b2447] shadow-xl shadow-cyan-950/40 min-h-[280px] sm:min-h-[380px]">
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full min-h-[280px] max-h-[440px] object-cover transform group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 bg-navy-950/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-mono text-cyan-300 border border-cyan-500/30 flex items-center space-x-1.5 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                  <span>{current.drawingType}</span>
                </div>
              </div>
            </div>

            {/* Right: Technical Explanation & Specifications */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="inline-block text-xs font-bold text-cyan-300 uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full mb-3">
                  {current.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {current.title}
                </h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed font-normal">
                  {current.summary}
                </p>
              </div>

              {/* Technical Specifications Bullets */}
              <div className="space-y-3 pt-2">
                {current.bullets.map((b, i) => (
                  <div key={i} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              {/* Call to action in feature */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => onOpenQuote && onOpenQuote({ productInterest: 'VRF Air Conditioning Systems' })}
                  className="px-6 py-3 rounded-xl bg-[#009fe3] hover:bg-[#0089c4] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center space-x-2"
                >
                  <span>Get a Free Estimate</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  to="/features"
                  className="text-xs font-bold text-cyan-300 hover:text-white transition-colors flex items-center"
                >
                  <span>All 12 Features</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Feature Blueprint Thumbnails Grid Below */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {featuresData.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActiveTab(index)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                activeTab === index
                  ? 'bg-slate-900 text-white border-[#009fe3] shadow-lg shadow-cyan-900/20'
                  : 'bg-white text-navy-950 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="w-full h-24 rounded-lg overflow-hidden bg-slate-100 mb-3 border border-slate-200/50">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <h5 className={`text-xs font-bold truncate ${activeTab === index ? 'text-white' : 'text-navy-950'}`}>
                {item.title}
              </h5>
              <p className={`text-[11px] truncate mt-0.5 ${activeTab === index ? 'text-cyan-300' : 'text-slate-500'}`}>
                {item.badge}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
