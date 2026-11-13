import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, Building2, Wind, ShieldCheck, Cpu, Wrench, 
  ArrowRight, CheckCircle2 
} from 'lucide-react';

export default function MegaMenuResidential({ onClose, onOpenQuote }) {
  const categories = [
    {
      title: 'Home & Villa AC Solutions',
      slug: '/residential/luxury-villas',
      fallback: '/residential',
      desc: 'Central VRF climate systems with individual room thermostats, silent operation, and zero balcony clutter.',
      image: '/images/real/home-villa-ac-so.jpg',
      badge: 'Bestseller for Villas'
    },
    {
      title: 'Apartment HVAC Solutions',
      slug: '/residential/apartments-penthouses',
      fallback: '/residential',
      desc: 'Compact outdoor condenser footprint engineered specifically for high-rise residential balconies.',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
      badge: 'High-Rise Optimized'
    },
    {
      title: 'Ductable & Cassette AC',
      slug: '/products?category=Ductable+AC',
      fallback: '/products',
      desc: 'Completely concealed within false ceilings with architectural linear slot diffusers and round-flow grilles.',
      image: '/images/equipment/duct-installation-1.jpg',
      badge: 'Architectural Concealment'
    },
    {
      title: 'Split & Tower AC',
      slug: '/products?category=Split+AC',
      fallback: '/products',
      desc: 'High-ambient inverter cooling for drawing halls, home theaters, and bedroom suites.',
      image: '/images/equipment/voltas-indoor.jpg',
      badge: 'Rapid Cooling'
    },
    {
      title: 'Smart Home Climate Control',
      slug: '/features',
      fallback: '/features',
      desc: 'Touchscreen central BMS, WiFi scheduling, mobile phone control, and real-time energy telemetry.',
      image: '/images/features/central-touch-smart-screen.jpg',
      badge: 'IoT & Automation'
    },
    {
      title: 'Installation & AMC',
      slug: '/quote',
      fallback: '/quote',
      desc: 'Certified nitrogen holding tests, anti-vibration mounting, and periodic preventive maintenance.',
      image: '/images/real/outdoor-unit-testing-gauges.jpg',
      badge: 'Factory Protocols'
    }
  ];

  return (
    <div className="w-full bg-white/90 backdrop-blur-2xl border-b border-white/60 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] animate-in fade-in slide-in-from-top-2 duration-200 select-none max-h-[82vh] overflow-y-auto overscroll-contain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-100 gap-2">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#059669]"></span>
              <h3 className="text-base font-extrabold text-navy-950 uppercase tracking-wider">
                Residential Air Conditioning & Villa Climate Engineering
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Single-condenser multi-room central cooling designed for luxury bungalows, penthouses, and modern apartments.
            </p>
          </div>
          <Link
            to="/residential"
            onClick={onClose}
            className="inline-flex items-center text-xs font-bold text-[#059669] hover:text-[#047857] group whitespace-nowrap"
          >
            <span>View All Residential Topologies</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 6 Category Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((item, idx) => (
            <Link
              key={idx}
              to={item.slug}
              onClick={onClose}
              className="group relative flex bg-slate-50 hover:bg-white rounded-xl border border-slate-200/80 hover:border-[#059669]/50 p-3.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden"
            >
              {/* Thumbnail Image */}
              <div className="w-24 h-24 rounded-lg overflow-hidden bg-slate-200 shrink-0 relative mr-3.5 border border-slate-200/60">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-navy-950/10 group-hover:bg-transparent transition-colors"></div>
              </div>

              {/* Text Info */}
              <div className="flex flex-col justify-between flex-1 min-w-0">
                <div>
                  <div className="inline-block text-[10px] font-bold text-[#059669] uppercase tracking-wider mb-1">
                    {item.badge}
                  </div>
                  <h4 className="text-sm font-bold text-navy-950 group-hover:text-[#059669] transition-colors leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="flex items-center text-[11px] font-bold text-slate-700 group-hover:text-[#059669] mt-2">
                  <span>Explore details</span>
                  <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-slate-50 to-blue-50/50 p-4 rounded-xl gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-[#059669]/10 text-[#059669] flex items-center justify-center shrink-0">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-navy-950">
                Planning HVAC for a new villa, penthouse or renovation?
              </div>
              <div className="text-[11px] text-slate-500">
                Get a customized heat load estimation and ducting layout blueprint at zero cost.
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            <Link
              to="/residential"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white border border-slate-300 text-xs font-bold text-navy-950 hover:bg-slate-100 transition-colors"
            >
              Explore Residential Solutions
            </Link>
            <button
              onClick={() => {
                onClose();
                if (onOpenQuote) onOpenQuote({ propertyType: 'Luxury Villa / Residential' });
              }}
              className="px-4 py-2 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold transition-all shadow-md shadow-[#059669]/20 flex items-center space-x-1.5"
            >
              <span>Get Free Villa Sizing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
