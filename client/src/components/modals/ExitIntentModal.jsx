import React, { useState, useEffect } from 'react';
import { X, Phone, ShieldCheck, ArrowRight, Home, CheckCircle2 } from 'lucide-react';

export default function ExitIntentModal({ onOpenQuote }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user already dismissed or interacted with exit intent in this session
    const hasSeen = sessionStorage.getItem('vrf_exit_modal_seen');
    if (hasSeen) return;

    const handleMouseLeave = (e) => {
      // Trigger when mouse moves out towards the top (tabs / URL bar / close button)
      if (e.clientY <= 15 && !sessionStorage.getItem('vrf_exit_modal_seen')) {
        setIsOpen(true);
        sessionStorage.setItem('vrf_exit_modal_seen', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  if (!isOpen) return null;

  const handleAction = () => {
    setIsOpen(false);
    if (onOpenQuote) {
      onOpenQuote({
        enquiryType: 'Free Site Inspection & Sizing',
        segment: 'Residential',
        propertyType: 'Luxury Villa / House'
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-navy-950/80 backdrop-blur-md animate-in fade-in duration-300 select-none overflow-y-auto">
      <div className="relative w-full max-w-lg max-h-[92vh] flex flex-col bg-white rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-white/40 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Top Decorative Header with Blueprint Accent */}
        <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-[#009fe3] text-white p-5 sm:p-8 relative shrink-0">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/15 text-cyan-200 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Special Invitation</span>
          </div>

          <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
            Leaving So Soon?
          </h3>
          <p className="text-xs text-cyan-100 font-semibold mt-1">
            Don't compromise your home's luxury aesthetics and energy efficiency.
          </p>
        </div>

        {/* Modal Body with internal scroll containment */}
        <div className="p-5 sm:p-8 text-center overflow-y-auto overscroll-contain">
          
          {/* Exactly 15 Words Context about VRF Home */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-6 shadow-inner">
            <p className="text-sm sm:text-base font-semibold text-navy-950 leading-relaxed">
              "Upgrade your luxury space with whisper-quiet VRF air conditioning, single-outdoor-unit aesthetics, and 20-40% power savings."
            </p>
            <span className="text-[11px] text-slate-500 font-medium block mt-1">
              — Zero Balcony Clutter • Independent Room Comfort
            </span>
          </div>

          {/* Quick Perks */}
          <div className="grid grid-cols-2 gap-2 text-left mb-6 text-xs text-slate-700">
            <div className="flex items-center space-x-1.5 bg-emerald-50 text-emerald-800 p-2 rounded-lg font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Free Heat Load Sizing</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-cyan-50 text-cyan-800 p-2 rounded-lg font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#009fe3] shrink-0" />
              <span>Zero Obligation Visit</span>
            </div>
          </div>

          {/* Primary Action Button: Get a Free Inspection */}
          <button
            onClick={handleAction}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#009fe3] to-sky-600 hover:from-[#0089c4] hover:to-sky-700 text-white font-extrabold text-sm sm:text-base tracking-wide transition-all shadow-xl shadow-[#009fe3]/30 flex items-center justify-center space-x-2 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Get a Free Inspection</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Secondary direct call link */}
          <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-slate-500">
            <span>Or call our Senior Engineers directly:</span>
            <a 
              href="tel:+918896921318" 
              className="text-[#009fe3] font-bold hover:underline inline-flex items-center"
            >
              <Phone className="w-3 h-3 mr-1" /> +91 88969 21318
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
