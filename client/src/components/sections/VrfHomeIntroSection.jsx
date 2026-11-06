import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, Home, CheckCircle2, ArrowRight, ShieldCheck, 
  Sparkles, Layers, Wind, Cpu, Zap 
} from 'lucide-react';

export default function VrfHomeIntroSection({ onOpenQuote }) {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Tagline & Headline */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#009fe3]/10 text-[#009fe3] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Generation Residential Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight leading-tight">
            Why Choose VRF Homes
          </h2>
          <h3 className="text-lg sm:text-xl font-bold text-[#009fe3] mt-2.5 tracking-wide">
            Introduction to VRF Home
          </h3>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Variable Refrigerant Flow (VRF) is an intelligent, whole-home central air conditioning system designed for luxury villas, apartments, and modern houses.
          </p>
        </div>

        {/* 2-Column Intro: Explanation & Visual Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Visual Diagram: The VRF Home Concept & Real Outdoor Unit Control */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-3xl overflow-hidden border-2 border-slate-200/90 shadow-2xl bg-navy-950 group">
              <img
                src="/images/real/outdoor-unit-control-pcb.jpg"
                alt="Haier All-DC Inverter Outdoor Unit Internal Control Architecture by Shukla Enterprise"
                className="w-full h-80 sm:h-96 object-cover object-top brightness-95 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent"></div>

              {/* Floating Engineering Badges */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white shadow-lg flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold text-navy-950">Intelligent Microcomputer Inverter Control</span>
              </div>

              <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 bg-navy-900/95 backdrop-blur-md p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10 text-white">
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-[9px] sm:text-[10px] bg-[#009fe3] text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider shrink-0">
                        Shukla Enterprise
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-cyan-300 font-medium truncate">Haier Inverter Series</span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-white mt-1 truncate">Outdoor Unit Central PCB & Inverter Drive</h4>
                    <p className="text-[10px] sm:text-[11px] text-slate-300 mt-0.5 line-clamp-2 sm:line-clamp-none">
                      High-precision electronic expansion valves deliver cooling across every zone from a single outdoor condenser.
                    </p>
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#009fe3]/20 text-[#009fe3] flex items-center justify-center shrink-0 ml-2.5 sm:ml-3">
                    <Cpu className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Real Field Gallery Thumbnails */}
            <div className="grid grid-cols-3 gap-3">
              <div className="group relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 aspect-video">
                <img
                  src="/images/real/outdoor-unit-testing-gauges.jpg"
                  alt="Commissioning with Digital Pressure Gauges"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 to-transparent flex items-end p-2">
                  <span className="text-[10px] font-bold text-white leading-tight">Digital Testing & Calibrations</span>
                </div>
              </div>

              <div className="group relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 aspect-video">
                <img
                  src="/images/real/outdoor-units-installation-rack.jpg"
                  alt="Cantilever Frame Installation"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 to-transparent flex items-end p-2">
                  <span className="text-[10px] font-bold text-white leading-tight">Cantilever Wall Mounts</span>
                </div>
              </div>

              <div className="group relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 aspect-video">
                <img
                  src="/images/real/outdoor-units-cantilever-row.jpg"
                  alt="Kerala Multi-Zone Project"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 to-transparent flex items-end p-2">
                  <span className="text-[10px] font-bold text-white leading-tight">Zero Balcony Loss</span>
                </div>
              </div>
            </div>

            {/* Quick Stats Strip */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div className="text-xl font-extrabold text-[#009fe3]">1 Unit</div>
                <div className="text-[11px] font-semibold text-slate-500 mt-0.5">Replaces 6-12 Splits</div>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div className="text-xl font-extrabold text-emerald-600">20-40%</div>
                <div className="text-[11px] font-semibold text-slate-500 mt-0.5">Power Reduction</div>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div className="text-xl font-extrabold text-navy-950">20-38 dB</div>
                <div className="text-[11px] font-semibold text-slate-500 mt-0.5">Ultra Quiet</div>
              </div>
            </div>
          </div>

          {/* Right Column: In-Depth Context & Technology Pillars */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-[#009fe3]">
                How VRF Home Works
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
                Continuous Precision Comfort Without Temperature Swings
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Traditional split air conditioners repeatedly turn completely ON and completely OFF, causing heavy electricity spikes and noisy compressor clicks. 
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                <strong>VRF Home</strong> uses all-DC inverter compressors and electronic expansion valves (EEVs) that modulate refrigerant volume smoothly in real time. It delivers the exact cooling required for each individual room while running at ultra-low frequencies to cut electricity bills in half.
              </p>
            </div>

            {/* Key Advantages List */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#009fe3] flex items-center justify-center shrink-0 mt-0.5">
                  <Home className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy-950">Zero Balcony Clutter</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Your utility balconies and facades stay clean and open. A single outdoor condenser is mounted out of sight on the roof or service terrace.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy-950">Ultra-Slim Architectural Concealment</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Indoor units are hidden inside false ceilings requiring only a 200mm drop, discharging air through sleek linear slot grilles.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy-950">Individual Room Microclimates</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Each bedroom and lounge has its own independent digital thermostat or mobile app control. No wasted energy on unoccupied rooms.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => onOpenQuote && onOpenQuote({ propertyType: 'Luxury Villa VRF Home' })}
                className="px-6 py-3 rounded-xl bg-[#009fe3] hover:bg-[#0089c4] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#009fe3]/25 transition-all flex items-center space-x-2"
              >
                <span>Get a Free Estimate for Your Home</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/features"
                className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-navy-950 font-bold text-xs sm:text-sm transition-colors"
              >
                Explore Engineering Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
