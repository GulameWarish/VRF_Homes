import React, { useState } from 'react';
import { MessageCircle, Phone, X, Send } from 'lucide-react';

export default function FloatingContactWidget({ onOpenQuote }) {
  const [isOpen, setIsOpen] = useState(false);

  const phoneNumber = '+91 88969 21318';
  const cleanPhone = '918896921318';
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=Hi%20VRF%20Homes%20Team,%20I%20would%20like%20to%20request%20an%20HVAC%20/%20VRF%20air%20conditioning%20consultation.`;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end select-none">
      {/* Expanded Quick Options Menu with Frosted Glass Theme */}
      {isOpen && (
        <div className="mb-3 glass-card bg-white/85 backdrop-blur-2xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-white/80 p-4 w-[calc(100vw-2rem)] max-w-xs sm:w-72 animate-in fade-in slide-in-from-bottom-4 duration-200">
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
              className="flex items-center justify-center space-x-2 w-full py-2.5 px-3 rounded-xl bg-slate-100/80 hover:bg-slate-200/90 text-navy-950 text-xs font-bold transition-colors border border-white/60"
            >
              <Phone className="w-4 h-4 text-[#059669]" />
              <span>Call: {phoneNumber}</span>
            </a>

            {/* Quote Modal Trigger */}
            <button
              onClick={() => {
                setIsOpen(false);
                if (onOpenQuote) onOpenQuote();
              }}
              className="flex items-center justify-center space-x-2 w-full py-2.5 px-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold transition-colors shadow-sm"
            >
              <span>Get a Free Estimate</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Trigger Pill with Frosted Dark Glass Theme */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-navy-950/80 hover:bg-navy-950/95 backdrop-blur-xl text-white px-4 py-3 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.3)] hover:shadow-emerald-500/25 border border-white/20 transition-all transform hover:scale-105 group"
        title="Chat with VRF Homes Engineering Support"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
        <MessageCircle className="w-4 h-4 text-[#059669] group-hover:rotate-12 transition-transform" />
        <span className="text-xs font-bold tracking-wider uppercase">
          {isOpen ? 'Close' : 'Chat With Us'}
        </span>
      </button>
    </div>
  );
}
