import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, ShieldCheck, X } from 'lucide-react';

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('vrf_cookie_consent');
    if (!consent) {
      // Gentle 1.2s delay for smooth entrance
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('vrf_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    localStorage.setItem('vrf_cookie_consent', 'essential');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside 
      aria-label="Cookie Consent Banner"
      className="fixed bottom-3 left-3 right-3 sm:left-6 sm:right-auto sm:max-w-md z-50 animate-in slide-in-from-bottom-5 duration-300 select-none"
    >
      <div className="bg-navy-950/85 backdrop-blur-2xl text-white p-4 sm:p-5 rounded-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
        
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#059669]/20 border border-[#059669]/40 flex items-center justify-center text-emerald-400 shrink-0">
              <Cookie className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-extrabold text-white tracking-wide">
                Cookie &amp; Privacy Notice
              </h3>
              <span className="text-[10px] text-emerald-300 font-medium">
                VRF Homes Engineering Platform
              </span>
            </div>
          </div>

          <button
            onClick={handleAcceptEssential}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Dismiss with Essential Cookies Only"
            aria-label="Dismiss cookie notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message */}
        <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed mb-3.5">
          We use cookies and secure telemetry to optimize your browsing experience, remember your HVAC project sizing preferences, and analyze site performance.
          Learn more in our{' '}
          <Link to="/privacy" className="text-[#059669] underline hover:text-emerald-300 font-semibold">
            Privacy Policy
          </Link>.
        </p>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 pt-1 border-t border-white/10">
          <button
            onClick={handleAcceptAll}
            className="flex-1 py-2 px-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs transition-all shadow-md shadow-[#059669]/30 text-center"
          >
            Accept All Cookies
          </button>
          <button
            onClick={handleAcceptEssential}
            className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 font-semibold text-xs transition-colors text-center shrink-0"
          >
            Essential Only
          </button>
        </div>

      </div>
    </aside>
  );
}
