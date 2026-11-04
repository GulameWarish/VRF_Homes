import React from 'react';
import { ShieldCheck, Award } from 'lucide-react';

export default function BrandsSection({ brands }) {
  if (!brands || brands.length === 0) return null;

  return (
    <section className="py-16 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold tracking-wider uppercase text-slate-500 bg-slate-100 px-3 py-1 rounded-full mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-hvac-600" />
            <span>Authorized Equipment Integration & Sales</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-navy-950">
            World-Class Air Conditioning Brands We Engineer & Service
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Official integration, installation, and warranty maintenance across premier global HVAC manufacturers.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {brands.map((b) => (
            <div
              key={b._id || b.slug}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 hover:border-hvac-300 hover:bg-white hover:shadow-sm transition-all duration-200 flex flex-col items-center justify-center text-center group"
            >
              <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 flex items-center justify-center mb-2 shadow-2xs group-hover:scale-105 transition-transform overflow-hidden">
                {b.logo ? (
                  <img src={b.logo} alt={b.name} className="w-8 h-8 object-contain" />
                ) : (
                  <Award className="w-6 h-6 text-hvac-600" />
                )}
              </div>
              <span className="text-xs font-bold text-navy-900 group-hover:text-hvac-600 transition-colors">
                {b.name}
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5">
                {b.isPartner ? 'Authorized' : 'Certified'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
