import React from 'react';
import { Quote, CheckCircle2 } from 'lucide-react';

export default function TestimonialsSection({ testimonials }) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold tracking-wider uppercase text-hvac-600 bg-hvac-50 px-3 py-1 rounded-full mb-3">
            <span>Verified Client Endorsements</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
            Trusted by Luxury Homeowners & Corporate Leaders
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            Real feedback from villa owners, hospital directors, and facility heads whose spaces we have engineered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <Quote className="w-6 h-6 text-[#009fe3] mb-3 opacity-70" />
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{t.review}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-navy-950">{t.clientName}</h4>
                  <p className="text-[11px] text-slate-500">{t.roleOrCompany}</p>
                </div>
                <div className="flex items-center text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/50">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Verified
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
