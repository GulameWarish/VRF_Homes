import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Home, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function SolutionsSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold tracking-wider uppercase text-hvac-600 bg-hvac-50 px-3 py-1 rounded-full mb-3">
            <span>Specialized Engineering Expertise</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
            Tailored Air Conditioning Solutions for Every Built Environment
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            From sterile medical cleanrooms to ultra-quiet luxury residences, our precision systems are engineered for uninterrupted comfort, architectural harmony, and optimal lifecycle efficiency.
          </p>
        </div>

        {/* 2 Premium Solutions Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 1: Commercial HVAC Solutions */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-premium-hover transition-all duration-300 overflow-hidden flex flex-col group">
            <div className="relative h-72 sm:h-80 overflow-hidden bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
                alt="Commercial HVAC Solutions"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent"></div>
              
              <div className="absolute top-4 left-4 bg-navy-900/80 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border border-white/10 flex items-center space-x-1.5">
                <Building2 className="w-4 h-4 text-cyan-300" />
                <span>Commercial & Industrial</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-2xl font-extrabold">Commercial HVAC Solutions</h3>
                <p className="text-xs text-slate-300 mt-1">High-capacity chillers, multi-zone VRF, cleanroom ventilation & BMS</p>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
              <p className="text-sm text-slate-600 leading-relaxed">
                Engineered for hospitals, 5-star hotels, corporate headquarters, IT campuses, pharmaceutical plants, restaurants, banquet halls, and industrial complexes. We satisfy strict NABH, ASHRAE, and IGBC standards.
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-700">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-hvac-500 shrink-0" />
                  <span>Hospitals & Surgical OTs</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-hvac-500 shrink-0" />
                  <span>Hotels, Resorts & Spas</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-hvac-500 shrink-0" />
                  <span>Corporate Office Campuses</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-hvac-500 shrink-0" />
                  <span>Pharma ISO Cleanrooms</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-hvac-500 shrink-0" />
                  <span>Restaurants & Kitchen Exhaust</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-hvac-500 shrink-0" />
                  <span>Data Centers & PAC</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">19+ Dedicated Industry Sectors</span>
                <Link
                  to="/commercial"
                  className="px-5 py-2.5 rounded-xl bg-navy-950 hover:bg-hvac-600 text-white text-xs font-bold transition-all flex items-center space-x-1.5 group-hover:shadow-md"
                >
                  <span>Explore Commercial</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2: Residential HVAC Solutions */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-premium-hover transition-all duration-300 overflow-hidden flex flex-col group">
            <div className="relative h-72 sm:h-80 overflow-hidden bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                alt="Residential HVAC Solutions"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent"></div>
              
              <div className="absolute top-4 left-4 bg-navy-900/80 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border border-white/10 flex items-center space-x-1.5">
                <Home className="w-4 h-4 text-cyan-300" />
                <span>Luxury Residences</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-2xl font-extrabold">Residential HVAC Solutions</h3>
                <p className="text-xs text-slate-300 mt-1">Concealed Central VRF Home, whisper-quiet operation & zero balcony clutter</p>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
              <p className="text-sm text-slate-600 leading-relaxed">
                Transform luxury villas, independent kothis, penthouses, and builder floors. Replace 10+ cluttered outdoor split units with a single compact terrace condenser connected to concealed duct units hidden inside false ceilings.
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-700">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-hvac-500 shrink-0" />
                  <span>Grand Luxury Villas & Kothis</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-hvac-500 shrink-0" />
                  <span>Penthouses & High-Rise Flats</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-hvac-500 shrink-0" />
                  <span>Architectural Concealment</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-hvac-500 shrink-0" />
                  <span>Independent Room Thermostats</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-hvac-500 shrink-0" />
                  <span>Whisper-Quiet 20-38 dB Sound</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-hvac-500 shrink-0" />
                  <span>Smart App & Voice Automation</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">Voltas, Carrier, O General, Hitachi, Mitsubishi & more</span>
                <Link
                  to="/residential"
                  className="px-5 py-2.5 rounded-xl bg-navy-950 hover:bg-hvac-600 text-white text-xs font-bold transition-all flex items-center space-x-1.5 group-hover:shadow-md"
                >
                  <span>Explore Residential</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
