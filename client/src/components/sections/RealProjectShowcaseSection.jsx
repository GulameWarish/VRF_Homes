import React, { useState } from 'react';
import { 
  Building2, MapPin, CheckCircle2, ArrowRight, 
  ShieldCheck, Wrench, Eye, Layers, Compass 
} from 'lucide-react';

const REAL_PROJECTS = [
  {
    id: 'kerala-aluva',
    region: 'kerala',
    title: 'Luxury 4,800 sq.ft Waterfront Villa, Aluva (Kochi Hub)',
    city: 'Aluva, Kochi, Kerala',
    category: 'Residential VRF',
    equipment: 'Haier MRV-S All-DC Inverter 14 HP',
    units: '5 Slim Concealed Ducted + 3 Round-Flow Cassettes',
    scope: 'Structural cantilever outdoor mounting, acoustic vibration isolators, zero balcony clutter',
    image: '/images/real/outdoor-units-cantilever-row.jpg',
    badge: 'Kerala Field Execution'
  },
  {
    id: 'kerala-thrissur',
    region: 'kerala',
    title: 'Commercial Complex & Diagnostic Center, St. Joseph Tower',
    city: 'Mannuthy Nadathara Road, Thrissur, Kerala',
    category: 'Commercial Ducted AC',
    equipment: 'Voltas & Haier Twin-Fan High-Static Ducted 22 TR',
    units: 'Custom GI ducting, linear slot supply diffusers, return plenum filters',
    scope: 'Turnkey duct fabrication, 550 PSI nitrogen decay test, precision airflow balancing',
    image: '/images/real/outdoor-units-installation-rack.jpg',
    badge: 'Commercial Handover'
  },
  {
    id: 'delhi-dwarka',
    region: 'delhi',
    title: 'Modern 3-Storey Duplex Villa, Dwarka Sector 11',
    city: 'Dwarka / Bindapur, New Delhi',
    category: 'Residential VRF',
    equipment: 'Mitsubishi Electric City Multi 12 HP VRF',
    units: '100% Concealed Hi-Wall & Ducted units with touch thermostats',
    scope: 'Replaced 7 aging split ACs with 1 rooftop condenser. 20-40% monthly electricity savings.',
    image: '/images/real/outdoor-unit-testing-gauges.jpg',
    badge: 'Turnkey Retrofit'
  },
  {
    id: 'noida-corporate',
    region: 'delhi',
    title: 'Tech Park IT Corporate Floor, Sector 62',
    city: 'Noida, Uttar Pradesh / Delhi NCR',
    category: 'Corporate HVAC',
    equipment: 'Carrier XPower VRF Modular 28 HP System',
    units: '8-Way Cassette units with individual zone scheduling & BMS integration',
    scope: 'Continuous fresh air modulation, PM2.5 filtration, automated energy monitoring',
    image: '/images/commercial/supermarket-suspended-ductable-ac.jpg',
    badge: 'Corporate Standard'
  },
  {
    id: 'lucknow-gomti',
    region: 'lucknow',
    title: 'Executive Healthcare Clinic & Diagnostic Lab',
    city: 'Gomti Nagar / Vibhuti Khand, Lucknow',
    category: 'Healthcare Precision Cooling',
    equipment: 'Voltas VRF Smart Series 16 HP',
    units: 'Ceiling flush cassettes + HEPA filter integration for operation theatre & waiting suites',
    scope: 'Independent room temperature control down to ±0.5°C with zero acoustic compressor hum',
    image: '/images/real/outdoor-unit-control-pcb.jpg',
    badge: 'Healthcare Division'
  },
  {
    id: 'kerala-marine-drive',
    region: 'kerala',
    title: 'Coastal High-Rise Penthouse, Marine Drive',
    city: 'Kochi, Kerala',
    category: 'Luxury Coastal VRF',
    equipment: 'O General Tropical Inverter VRF 10 HP',
    units: 'Anti-corrosion marine grade hydrophilic coated condenser coils',
    scope: 'Resistant to saline coastal humidity, extreme whisper-quiet sleep operation down to 21 dB',
    image: '/images/real/luxury-villa-hero.webp',
    badge: 'Coastal Architecture'
  }
];

export default function RealProjectShowcaseSection({ onOpenQuote }) {
  const [activeTab, setActiveTab] = useState('all');
  const [beforeAfterSlider, setBeforeAfterSlider] = useState(50); // percentage

  const filteredProjects = activeTab === 'all' 
    ? REAL_PROJECTS 
    : REAL_PROJECTS.filter(p => p.region === activeTab);

  return (
    <section id="real-projects" className="py-16 sm:py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-cyan-700" />
            <span>Field Proven Engineering Excellence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-950 tracking-tight leading-tight">
            Real Project Showcase: Kerala, Delhi NCR &amp; Lucknow
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Explore authentic turnkey HVAC installations by Shukla Enterprise engineers. From high-elevation cantilever frame outdoor mounting to precision electronic expansion valve calibration.
          </p>
        </div>

        {/* Interactive Before vs After Comparison Card */}
        <div className="mb-16 bg-gradient-to-br from-navy-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-slate-800 overflow-hidden">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider block mb-1">
              Visual Transformation
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Before vs. After VRF Home System Integration
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Drag the interactive slider below to witness how VRF technology transforms cluttered villa facades into clean architectural masterpieces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Before Card */}
            <div className="bg-red-950/20 rounded-2xl p-6 border border-red-500/30 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-bold uppercase tracking-wider mb-3">
                  <span>❌ Conventional Split AC Setup</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Cluttered Balconies &amp; High Energy Waste</h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2 font-bold">•</span>
                    <span>5 to 8 unsightly outdoor compressor units blocking balcony views and natural light.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2 font-bold">•</span>
                    <span>Loud 52+ dB mechanical compressor drone disturbing master bedroom sleep.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2 font-bold">•</span>
                    <span>Messy exposed copper piping, water drain tubes, and electrical wiring outside.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2 font-bold">•</span>
                    <span>High electricity bills with no inverter diversity or capacity staging.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-red-500/20 text-[11px] text-red-300 font-semibold">
                Result: Unplanned repairs, high power bills &amp; ruined elevation.
              </div>
            </div>

            {/* After Card */}
            <div className="bg-emerald-950/20 rounded-2xl p-6 border border-emerald-500/30 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
                  <span>✅ Modern VRF Home Engineering</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Clean Architecture &amp; 20-40% Power Savings</h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start">
                    <span className="text-emerald-400 mr-2 font-bold">✓</span>
                    <span><strong>Only 1 single compact outdoor condenser</strong> installed out-of-sight on roof or cantilever frame.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-400 mr-2 font-bold">✓</span>
                    <span><strong>Whisper-quiet 20 - 38 dB(A)</strong> indoor sound — quieter than a library whisper.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-400 mr-2 font-bold">✓</span>
                    <span>100% concealed slim ducts or architectural 4-way cassettes flush with false ceiling.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-400 mr-2 font-bold">✓</span>
                    <span><strong>20-40% lower power bills</strong> thanks to DC inverter continuous electronic modulation.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-emerald-500/20 text-[11px] text-emerald-300 font-semibold">
                Result: Luxury aesthetics, individual zone cooling &amp; massive savings.
              </div>
            </div>
          </div>
        </div>

        {/* Region Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Project Locations' },
            { id: 'kerala', label: 'Kerala Division (Aluva / Thrissur / Kochi)' },
            { id: 'delhi', label: 'Delhi NCR (Dwarka / Bindapur / Noida)' },
            { id: 'lucknow', label: 'Uttar Pradesh (Lucknow / Gomti Nagar)' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-navy-950 text-white shadow-md'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((p) => (
            <div 
              key={p.id}
              className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 hover:border-cyan-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative h-48 bg-navy-950 overflow-hidden">
                <img 
                  src={p.image} 
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent"></div>
                
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-cyan-600/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs">
                  {p.badge}
                </span>

                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[11px] font-bold text-cyan-300 block uppercase tracking-wider">
                    {p.category}
                  </span>
                  <div className="flex items-center text-xs text-white font-medium mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 mr-1 shrink-0" />
                    <span className="truncate">{p.city}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-navy-950 mb-3 group-hover:text-[#009fe3] transition-colors leading-snug">
                    {p.title}
                  </h4>

                  <div className="space-y-2 text-xs text-slate-600 bg-white p-3.5 rounded-2xl border border-slate-200/80 mb-4">
                    <div>
                      <strong className="text-navy-950">System:</strong> {p.equipment}
                    </div>
                    <div>
                      <strong className="text-navy-950">Indoor Mix:</strong> {p.units}
                    </div>
                    <div>
                      <strong className="text-navy-950">Engineering:</strong> {p.scope}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenQuote && onOpenQuote({ propertyType: p.category, requirements: `Enquiring for project layout similar to: ${p.title} (${p.city})` })}
                  className="w-full py-2.5 px-4 bg-white hover:bg-[#009fe3] text-navy-950 hover:text-white border border-slate-200 hover:border-[#009fe3] rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 shadow-xs"
                >
                  <span>Request Similar Site Estimation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
