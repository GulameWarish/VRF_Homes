import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Wrench, Compass, ShieldCheck, Activity, RefreshCw, 
  Clock, ArrowRight, PhoneCall, FileCheck 
} from 'lucide-react';

export default function MegaMenuServices({ onClose, onOpenQuote }) {
  const services = [
    {
      title: 'HVAC Design & Consultation',
      icon: Compass,
      image: '/images/equipment/commercial-heavy-ductable-unit.jpg',
      desc: 'ASHRAE & ISHRAE compliant heat load estimation, CFM airflow sizing, and CAD duct layout drafting.',
      badge: 'Engineering Sizing'
    },
    {
      title: 'AC Installation',
      icon: Wrench,
      image: '/images/real/outdoor-units-cantilever-row.jpg',
      desc: 'Precision copper piping brazing with dry nitrogen purge, 600 PSI pressure holding, and <500 micron deep vacuum.',
      badge: 'Certified Execution'
    },
    {
      title: 'Repair & Troubleshooting',
      icon: Activity,
      image: '/images/real/outdoor-unit-testing-gauges.jpg',
      desc: 'Inverter PCB microcomputer diagnostics, scroll compressor testing, and digital refrigerant leak pinpointing.',
      badge: 'Rapid Diagnostic'
    },
    {
      title: 'Preventive Maintenance',
      icon: ShieldCheck,
      image: '/images/real/outdoor-units-installation-rack.jpg',
      desc: 'Condenser coil chemical washing, electrical terminal retorquing, superheat calibration, and drain line sanitation.',
      badge: 'Lifecycle Care'
    },
    {
      title: 'Annual Maintenance Contract (AMC)',
      icon: Clock,
      image: '/images/real/outdoor-unit-control-pcb.jpg',
      desc: 'Comprehensive and non-comprehensive enterprise AMCs with 24/7 breakdown support and priority parts availability.',
      badge: '24/7 SLA Support'
    },
    {
      title: 'System Upgradation',
      icon: RefreshCw,
      image: '/images/commercial/retail-jet-nozzle-diffuser.jpg',
      desc: 'Retrofitting aging split ACs and obsolete R22 systems to high-efficiency all-DC inverter central VRF equipment.',
      badge: 'Energy Retrofits'
    }
  ];

  return (
    <div className="w-full bg-white border-b border-slate-200/90 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 select-none max-h-[82vh] overflow-y-auto overscroll-contain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-100 gap-2">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <h3 className="text-base font-extrabold text-navy-950 uppercase tracking-wider">
                Certified Mechanical & HVAC Engineering Services
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              End-to-end design, factory-standard installation, preventative maintenance, and 24/7 breakdown troubleshooting.
            </p>
          </div>
          <button
            onClick={() => {
              onClose();
              if (onOpenQuote) onOpenQuote({ enquiryType: 'Technical Consultation' });
            }}
            className="inline-flex items-center text-xs font-bold text-[#059669] hover:text-[#047857] group whitespace-nowrap"
          >
            <span>Book Certified Technician</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 6 Services Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                onClick={() => {
                  onClose();
                  if (onOpenQuote) onOpenQuote({ serviceRequired: item.title, enquiryType: 'Service & Maintenance' });
                }}
                className="group relative flex bg-slate-50 hover:bg-white rounded-xl border border-slate-200/80 hover:border-amber-400 p-3.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer overflow-hidden"
              >
                {/* Thumbnail Preview */}
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-slate-200 shrink-0 relative mr-3.5 border border-slate-200/60">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-navy-950/20 group-hover:bg-transparent transition-colors"></div>
                  <div className="absolute top-1 left-1 bg-white/90 p-1 rounded-md text-navy-950 shadow-xs">
                    <Icon className="w-3.5 h-3.5 text-amber-600" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    <div className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-0.5">
                      {item.badge}
                    </div>
                    <h4 className="text-xs font-bold text-navy-950 group-hover:text-amber-600 transition-colors leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="flex items-center text-[10px] font-bold text-slate-700 group-hover:text-amber-600 mt-2">
                    <span>Schedule service</span>
                    <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Engineering Spec Sheets Integration in Services Section */}
        <div className="mt-4 p-3 bg-gradient-to-r from-navy-950 via-slate-900 to-navy-950 text-white rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 border border-cyan-500/30">
          <div className="flex items-center space-x-2.5">
            <span className="p-1.5 rounded-lg bg-[#059669]/20 text-emerald-400 shrink-0">
              <FileCheck className="w-4 h-4" />
            </span>
            <div>
              <span className="text-xs font-bold text-white block">
                Engineering Services Spec Sheets &amp; CAD Catalogs
              </span>
              <span className="text-[10px] text-slate-300">
                Official OEM technical manuals for Voltas, Haier, Carrier, Mitsubishi Electric &amp; Trane.
              </span>
            </div>
          </div>
          <a
            href="/#spec-sheets"
            onClick={onClose}
            className="px-3.5 py-1.5 bg-[#059669] hover:bg-[#047857] text-navy-950 hover:text-white font-black text-[11px] rounded-lg transition-colors flex items-center space-x-1 shrink-0"
          >
            <span>Download Spec Sheets</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-slate-50 to-amber-50/40 p-4 rounded-xl gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-navy-950">
                Experiencing unexpected AC cooling drops or error codes?
              </div>
              <div className="text-[11px] text-slate-500">
                Emergency diagnosis response within 4 hours across Delhi NCR, Lucknow, Mumbai, and Kerala hubs.
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            <a
              href="tel:+918896921318"
              className="px-4 py-2 rounded-lg bg-white border border-slate-300 text-xs font-bold text-navy-950 hover:bg-slate-100 transition-colors flex items-center space-x-1"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#059669]" />
              <span>Call Helpline: +91 88969 21318</span>
            </a>
            <button
              onClick={() => {
                onClose();
                if (onOpenQuote) onOpenQuote({ enquiryType: 'Service & Maintenance Inspection' });
              }}
              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all shadow-md shadow-amber-500/20 flex items-center space-x-1.5"
            >
              <span>Schedule Service Inspection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
