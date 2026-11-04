import React, { useState } from 'react';
import { MessageCircle, Phone, X, Sparkles, Send } from 'lucide-react';

export default function FloatingContactWidget({ onOpenQuote }) {
  const [isOpen, setIsOpen] = useState(false);

  const phoneNumber = '+91 88969 21318';
  const cleanPhone = '918896921318';
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=Hi%20VRF%20Homes%20Team,%20I%20would%20like%20to%20request%20an%20HVAC%20/%20VRF%20air%20conditioning%20consultation.`;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end select-none">
      {/* Expanded Quick Options Menu */}
      {isOpen && (
        <div className="mb-3 bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-4 w-[calc(100vw-2rem)] max-w-xs sm:w-72 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold text-navy-950 uppercase tracking-wide">
                VRF Climate Advisory
              </span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-0.5 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-600 mb-3 leading-relaxed">
            Need pricing, capacity calculations, or a site inspection? Speak with our HVAC engineers directly:
          </p>

          <div className="space-y-2">
            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>

            {/* Direct Phone Call */}
            <a
              href={`tel:+${cleanPhone}`}
              className="flex items-center justify-center space-x-2 w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-navy-950 text-xs font-bold transition-colors"
            >
              <Phone className="w-4 h-4 text-[#009fe3]" />
              <span>Call: {phoneNumber}</span>
            </a>

            {/* Quote Modal Trigger */}
            <button
              onClick={() => {
                setIsOpen(false);
                if (onOpenQuote) onOpenQuote();
              }}
              className="flex items-center justify-center space-x-2 w-full py-2.5 px-3 rounded-xl bg-[#009fe3] hover:bg-[#0089c4] text-white text-xs font-bold transition-colors shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Get a Free Estimate</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Trigger Pill inspired by reference image */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-navy-950 hover:bg-black text-white px-4 py-3 rounded-full shadow-2xl hover:shadow-cyan-500/20 border-2 border-white/20 transition-all transform hover:scale-105 group"
        title="Chat with VRF Homes Engineering Support"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
        <MessageCircle className="w-4 h-4 text-[#009fe3] group-hover:rotate-12 transition-transform" />
        <span className="text-xs font-bold tracking-wider uppercase">
          {isOpen ? 'Close' : 'Chat With Us'}
        </span>
      </button>
    </div>
  );
}
