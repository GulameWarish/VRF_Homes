import React from 'react';
import { 
  Check, X, Zap, Volume2, ShieldCheck, Home, 
  ArrowRight, Award, Compass, Smartphone, 
  Sliders, Layers, Wind, CheckCircle2, ChevronRight
} from 'lucide-react';

export default function WhyVrfHomeSection({ onOpenQuote }) {
  const coreBenefits = [
    {
      number: '01',
      title: '1 Single Outdoor Unit for the Entire Home',
      tag: 'Zero Balcony Clutter',
      desc: 'Instead of hanging 6 to 12 noisy outdoor AC compressors on balconies and bedroom walls, a single compact unit sits discreetly on your terrace, keeping your exterior architecture 100% clean and elegant.',
      icon: Home,
      stat: '1 vs 10 Units',
      highlight: 'Keeps Balconies 100% Usable'
    },
    {
      number: '02',
      title: 'Completely Concealed Inside False Ceilings',
      tag: 'Zero Wall Clutter',
      desc: 'Say goodbye to bulky plastic boxes hanging on your expensive luxury wallpaper. VRF indoor units disappear completely inside false ceilings, leaving only sleek architectural linear slot diffusers visible.',
      icon: Layers,
      stat: '100% Concealed',
      highlight: 'Luxury Hotel & Villa Aesthetic'
    },
    {
      number: '03',
      title: 'Independent Room-by-Room Temperature Control',
      tag: 'Personalized Microclimate',
      desc: 'Every family member enjoys their own preferred comfort. The master bedroom can be at 20°C, the kids room at 23°C, and the living hall at 24°C — all operating independently at the exact same time.',
      icon: Sliders,
      stat: '±0.5°C Precision',
      highlight: 'Independent Digital Thermostats'
    },
    {
      number: '04',
      title: '20-40% Lower Electricity Bills',
      tag: 'Smart Inverter Power',
      desc: 'Conventional split ACs continuously turn fully on and off, creating massive power surges. VRF Home dynamically modulates down to 10% capacity, consuming electricity only for the rooms currently in use.',
      icon: Zap,
      stat: '20-40% Savings',
      highlight: 'Dynamic Inverter Capacity'
    },
    {
      number: '05',
      title: '20-38 dB(A) Quiet Deep Sleep',
      tag: 'Silent Bedroom Comfort',
      desc: 'Engineered specifically for luxury living. Indoor sound levels drop down to 20-38 dB(A) — quieter than rustling leaves. Zero compressor hum and zero mechanical vibration through bedroom walls.',
      icon: Volume2,
      stat: '20-38 dB Quiet',
      highlight: 'Soundless Deep Sleep'
    },
    {
      number: '06',
      title: 'Smart Mobile App & Voice Automation',
      tag: 'Total Connected Control',
      desc: 'Pre-cool your home before arriving from office, set automatic night sleep curves, and control every room from your smartphone, touch-screen wall panel, or voice assistants like Alexa and Google Home.',
      icon: Smartphone,
      stat: 'WiFi & BMS Ready',
      highlight: 'Remote Worldwide Access'
    }
  ];

  const quickComparison = [
    {
      feature: 'Balcony & Exterior Facade',
      split: '6 to 10 noisy outdoor units cluttering balconies and walls',
      vrf: 'Only 1 compact condenser placed quietly on top terrace'
    },
    {
      feature: 'Interior Design & Walls',
      split: 'Bulky plastic indoor AC boxes hanging on finished walls',
      vrf: 'Hidden in ceiling with architectural linear slot diffusers'
    },
    {
      feature: 'Electricity Consumption',
      split: 'Constant on/off power spikes consuming excessive energy',
      vrf: 'Inverter modulates to active rooms only — saves 20-40%'
    },
    {
      feature: 'Piping Reach & Distance',
      split: 'Strictly limited to 15m; outdoor unit forced on balcony',
      vrf: 'Up to 100m piping reach; terrace condenser out of earshot'
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-slate-50 border-t border-slate-200/90 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 1. SIGNATURE "WHY VRF HOME?" HERO BANNER (Directly matching user's visual style) */}
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-white mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[340px] sm:min-h-[420px]">
            
            {/* Left Column: Balcony Single Outdoor Unit Visual */}
            <div className="lg:col-span-7 relative min-h-[260px] sm:min-h-[340px] lg:min-h-full overflow-hidden bg-slate-900 group">
              <img
                src="/images/real/why-vrf-home-banner.jpg"
                alt="VRF Home Outdoor Balcony Installation"
                className="w-full h-full object-cover object-left group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/20 lg:to-transparent"></div>
              
              {/* Floating Quality Badge on Image */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-navy-950/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20 text-white shadow-lg flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs font-bold tracking-wide">Single Compact Outdoor Condenser</span>
              </div>
            </div>

            {/* Right Column: Signature Blue Block "WHY VRF HOME?" */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#059669] via-[#047857] to-[#0b2447] text-white p-8 sm:p-12 lg:p-14 flex flex-col justify-center relative overflow-hidden">
              {/* Subtle architectural background pattern overlay */}
              <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-cyan-400/15 rounded-full blur-2xl pointer-events-none"></div>

              <div className="relative z-10">
                <span className="text-xs sm:text-sm font-extrabold tracking-widest uppercase text-cyan-200 block mb-2">
                  Central & VRF Climate Systems
                </span>
                
                <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none text-white drop-shadow-md">
                  WHY
                </h2>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mt-1 drop-shadow-md">
                  VRF HOME?
                </h2>

                <div className="w-16 h-1 bg-white/40 my-5 rounded-full"></div>

                <p className="text-sm sm:text-base text-cyan-50 font-medium leading-relaxed">
                  An air-conditioning solution that packages engineering and luxury together. One single outdoor unit controls multiple indoor units, freeing your balconies while saving 20-40% power.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={() => onOpenQuote && onOpenQuote({ propertyType: 'Luxury Villa / Residential VRF' })}
                    className="px-6 py-3 rounded-xl bg-white text-navy-950 font-extrabold text-xs sm:text-sm hover:bg-cyan-50 transition-all shadow-lg flex items-center space-x-2 group"
                  >
                    <span>Get a Free Estimate</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#059669]" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* 2. CLIENT-FRIENDLY CONTEXT SECTION ("Client easily samjh sake") */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-navy-950 text-white text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span>Understanding VRF Home Made Simple</span>
          </div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-950 tracking-tight">
            How VRF Home Transforms Your Living Experience
          </h3>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            Unlike traditional split ACs that require an outdoor unit for each room, a VRF Home system connects your entire residence to a single terrace-mounted condenser, keeping your walls and balconies pristine.
          </p>
        </div>

        {/* 3. 6 CORE CLIENT BENEFITS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {coreBenefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white hover:bg-slate-50/80 rounded-2xl border border-slate-200/90 hover:border-[#059669]/50 p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Icon + Number */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#059669] border border-emerald-100 flex items-center justify-center group-hover:scale-108 group-hover:bg-[#059669] group-hover:text-white transition-all shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-black text-slate-300 group-hover:text-emerald-500 transition-colors">
                      {item.number}
                    </span>
                  </div>

                  <span className="text-[11px] font-bold text-[#059669] uppercase tracking-wider block mb-1">
                    {item.tag}
                  </span>

                  <h4 className="text-base sm:text-lg font-bold text-navy-950 group-hover:text-[#059669] transition-colors leading-snug">
                    {item.title}
                  </h4>

                  <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Highlight Pill */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">{item.highlight}</span>
                  <span className="text-[11px] font-extrabold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {item.stat}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4. QUICK 4-POINT COMPARISON CARD (Easy to grasp in 10 seconds) */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-3">
            <div>
              <span className="text-xs font-bold text-[#059669] uppercase tracking-wider block mb-1">
                Quick Reality Check
              </span>
              <h4 className="text-xl sm:text-2xl font-extrabold text-navy-950">
                Split ACs vs. VRF Home: At a Glance
              </h4>
            </div>
            <span className="text-xs text-slate-500 max-w-xs">
              Clear facts to help you choose the right air conditioning for your dream property.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {quickComparison.map((item, idx) => (
              <div 
                key={idx}
                className="bg-slate-50/90 rounded-2xl p-5 border border-slate-200/80 flex flex-col justify-between"
              >
                <div className="text-xs font-bold text-navy-950 uppercase tracking-wider mb-3">
                  {item.feature}
                </div>
                
                <div className="space-y-2.5 text-xs sm:text-sm">
                  <div className="flex items-start text-slate-600 bg-rose-50/60 p-2.5 rounded-lg border border-rose-100/80">
                    <X className="w-4 h-4 text-rose-500 mr-2 shrink-0 mt-0.5" />
                    <span><strong className="text-rose-700 font-semibold">Split AC:</strong> {item.split}</span>
                  </div>
                  
                  <div className="flex items-start text-navy-950 bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-100/80 font-medium">
                    <Check className="w-4 h-4 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <span><strong className="text-emerald-700 font-bold">VRF Home:</strong> {item.vrf}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Conversion Banner */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-slate-50 via-blue-50/40 to-slate-50 p-5 rounded-2xl gap-4">
            <div className="flex items-center space-x-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-[#059669]/10 text-[#059669] flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-sm sm:text-base font-bold text-navy-950">
                  Planning AC for a Villa, Penthouse, or Renovation?
                </h5>
                <p className="text-xs text-slate-500 mt-0.5">
                  Get a free heat-load calculation and VRF architectural layout recommendation within 24 hours.
                </p>
              </div>
            </div>

            <button
              onClick={() => onOpenQuote && onOpenQuote({ propertyType: 'Luxury Villa / Residential VRF' })}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-extrabold text-xs sm:text-sm transition-all shadow-md shadow-[#059669]/25 flex items-center justify-center space-x-2 shrink-0 group"
            >
              <span>Get a Free Estimate</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
