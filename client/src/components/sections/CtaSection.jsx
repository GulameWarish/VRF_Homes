import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneCall, ArrowRight } from 'lucide-react';

export default function CtaSection({ onOpenQuote, settings }) {
  return (
    <section className="py-20 bg-gradient-to-r from-navy-950 via-navy-900 to-hvac-900 text-white relative overflow-hidden">
      {/* Decorative Glow Orbs */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card-dark rounded-3xl p-8 sm:p-14 text-center border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-emerald-300 mb-6 border border-white/15">
            <span>Turnkey Mechanical MEP & VRF Contracting</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-2xl mx-auto">
            Planning Your Next HVAC Project?
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Talk to our senior engineering team and discover the ideal air conditioning, ventilation, or chiller solution tailored for your architecture and operational budget.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenQuote}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-hvac-500 to-hvac-600 hover:from-hvac-600 hover:to-hvac-700 text-white font-bold text-sm shadow-xl shadow-hvac-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
            >
              <span>Get a Free Estimate & Heat Load Review</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={`tel:${(settings?.phone || '+91 88969 21318').replace(/[^0-9+]/g, '')}`}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-sm transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
            >
              <PhoneCall className="w-4 h-4 text-emerald-300" />
              <span>Call Our Experts: {settings?.phone || '+91 88969 21318'}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
