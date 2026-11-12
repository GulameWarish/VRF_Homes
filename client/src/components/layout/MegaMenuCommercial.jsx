import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, Hospital, Hotel, ShoppingBag, GraduationCap, 
  Factory, Cpu, Wind, ArrowRight, ShieldCheck 
} from 'lucide-react';

export default function MegaMenuCommercial({ onClose, onOpenQuote }) {
  const categories = [
    {
      title: 'Office HVAC Solutions',
      slug: '/commercial/corporate-offices',
      desc: 'Balanced zoning for tech parks, open work floors, and executive boardroom suites.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
      badge: 'Corporate Hubs'
    },
    {
      title: 'Hotels & Resorts',
      slug: '/commercial/hotels-resorts',
      desc: 'Guest room acoustic silence with master BMS central energy supervision.',
      image: '/images/real/hotels-resorts.jpg',
      badge: 'Hospitality'
    },
    {
      title: 'Hospitals & Healthcare',
      slug: '/commercial/hospitals',
      desc: 'NABH sterile positive pressure OT suites and terminal H14 HEPA filtration.',
      image: '/images/real/hospital-hvac.webp',
      badge: 'Cleanrooms & OTs'
    },
    {
      title: 'Malls & Retail Spaces',
      slug: '/commercial/malls-retail',
      desc: 'High-displacement suspended ductable air distribution engineered for heavy retail footfall surges.',
      image: '/images/commercial/supermarket-suspended-ductable-ac.jpg',
      badge: 'Supermarket & Retail'
    },
    {
      title: 'Schools & Institutions',
      slug: '/commercial',
      desc: 'Fresh air heat recovery ventilation (HRV) for universities, libraries, and auditoriums.',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80',
      badge: 'Academic Auditoriums'
    },
    {
      title: 'Industrial HVAC Solutions',
      slug: '/commercial/industrial',
      desc: 'Heavy process cooling, pharmaceutical manufacturing, and precision server rooms.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
      badge: 'Industrial Plants'
    },
    {
      title: 'VRF Systems',
      slug: '/products?category=VRF+Air+Conditioning+Systems',
      desc: 'High-capacity centralized all-DC inverter modular condensers with 1,000m piping networks.',
      image: '/images/equipment/mitsubishi-outdoor.jpg',
      badge: 'Modular Inverter VRF'
    },
    {
      title: 'Chillers & AHUs',
      slug: '/products?category=Chiller+Systems',
      desc: 'Air-cooled and water-cooled screw chillers with automated VFD primary pumping.',
      image: '/images/real/hotel-ahu.webp',
      badge: 'Central Chiller Plants'
    }
  ];

  return (
    <div className="w-full bg-white border-b border-slate-200/90 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 select-none max-h-[82vh] overflow-y-auto overscroll-contain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-100 gap-2">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <h3 className="text-base font-extrabold text-navy-950 uppercase tracking-wider">
                Commercial & Industrial HVAC Engineering
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Turnkey mechanical contracting, central chillers, AHUs, and high-ambient commercial VRF systems across India.
            </p>
          </div>
          <Link
            to="/commercial"
            onClick={onClose}
            className="inline-flex items-center text-xs font-bold text-[#059669] hover:text-[#047857] group whitespace-nowrap"
          >
            <span>All Commercial Sectors</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 8 Commercial Categories in 4x2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((item, idx) => (
            <Link
              key={idx}
              to={item.slug}
              onClick={onClose}
              className="group relative flex flex-col bg-slate-50 hover:bg-white rounded-xl border border-slate-200/80 hover:border-[#059669]/50 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Image banner */}
              <div className="w-full h-28 overflow-hidden bg-slate-200 relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent"></div>
                <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-md text-[9px] font-extrabold uppercase px-2 py-0.5 rounded text-navy-950 shadow-xs">
                  {item.badge}
                </span>
                <span className="absolute bottom-2 left-2 text-xs font-bold text-white group-hover:text-emerald-300 transition-colors drop-shadow-sm">
                  {item.title}
                </span>
              </div>

              {/* Description Body */}
              <div className="p-3 flex-1 flex flex-col justify-between">
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {item.desc}
                </p>
                <div className="flex items-center text-[11px] font-bold text-[#059669] mt-2.5 pt-2 border-t border-slate-100">
                  <span>Explore Sector</span>
                  <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-slate-50 to-emerald-50/50 p-4 rounded-xl gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-navy-950">
                Executing a Commercial Complex, Hospital or Hotel Project?
              </div>
              <div className="text-[11px] text-slate-500">
                Verified MEP engineering drawings, BOQ validation, and factory equipment delivery schedules.
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            <Link
              to="/commercial"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white border border-slate-300 text-xs font-bold text-navy-950 hover:bg-slate-100 transition-colors"
            >
              Explore Commercial Solutions
            </Link>
            <button
              onClick={() => {
                onClose();
                if (onOpenQuote) onOpenQuote({ propertyType: 'Commercial Complex / Facility' });
              }}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20 flex items-center space-x-1.5"
            >
              <span>Request Commercial Tender BOQ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
