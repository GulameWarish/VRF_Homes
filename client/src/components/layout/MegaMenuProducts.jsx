import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers, CheckCircle2 } from 'lucide-react';

export default function MegaMenuProducts({ onClose, onOpenQuote }) {
  const brands = [
    {
      name: 'Mitsubishi Electric',
      slug: 'mitsubishi-electric',
      logo: '/images/brands/mitsubishi-electric.svg',
      productImage: '/images/equipment/mitsubishi-outdoor.jpg',
      category: 'City Multi VRF & Silent Blowers',
      desc: 'Legendary Japanese engineering with whisper-silent indoor blowers down to 19 dB(A) and smart zoning.',
      link: '/products?brand=Mitsubishi+Electric'
    },
    {
      name: 'O General',
      slug: 'o-general',
      logo: '/images/brands/o-general.svg',
      productImage: '/images/equipment/ogeneral-outdoor.jpg',
      category: 'Tropical Heavy-Duty VRF & Splits',
      desc: 'Uncompromising cooling capacity under extreme desert-grade heat with high-efficiency twin rotary compressors.',
      link: '/products?brand=O+General'
    },
    {
      name: 'Carrier',
      slug: 'carrier',
      logo: '/images/brands/carrier.svg',
      productImage: '/images/equipment/carrier-outdoor.jpg',
      category: 'XPower VRF & Chiller Plants',
      desc: 'World leader in high-performance central chillers, air handling units (AHUs), and modular VRF systems.',
      link: '/products?brand=Carrier'
    },
    {
      name: 'Hitachi',
      slug: 'hitachi',
      logo: '/images/brands/hitachi.svg',
      productImage: '/images/equipment/hitachi-outdoor.jpg',
      category: 'Set-Free VRF Multi-Split',
      desc: 'Intelligent inverter scroll technology with high seasonal COP ratings and flexible copper piping geometry.',
      link: '/products?brand=Hitachi'
    },
    {
      name: 'Voltas',
      slug: 'voltas',
      logo: '/images/brands/voltas.svg',
      productImage: '/images/equipment/voltas-outdoor.jpg',
      category: 'Inverter VRF & Commercial Ducted',
      desc: 'A TATA Enterprise with proven robust reliability, broad nationwide service support, and high energy efficiency.',
      link: '/products?brand=Voltas'
    },
    {
      name: 'Trane',
      slug: 'trane',
      logo: '/images/brands/trane.svg',
      productImage: '/images/equipment/trane-outdoor.jpg',
      category: 'Helical Rotary Chillers & VRF',
      desc: 'Global benchmark for healthcare cleanroom HVAC, large central chillers, and continuous heavy-duty duty cycles.',
      link: '/products?brand=Trane'
    },
    {
      name: 'Haier',
      slug: 'haier',
      logo: '/images/brands/haier.svg',
      productImage: '/images/equipment/haier-outdoor-dual-fan.jpg',
      category: 'Twin-Fan Inverter VRF & Duct AC',
      desc: 'Advanced MRV multi-split technology with gold-fin anti-corrosion coils proven in coastal projects.',
      link: '/products?brand=Haier'
    }
  ];

  return (
    <div className="w-full bg-white border-b border-slate-200/90 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 select-none max-h-[82vh] overflow-y-auto overscroll-contain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-100 gap-2">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              <h3 className="text-base font-extrabold text-navy-950 uppercase tracking-wider">
                Authorized Multibrand HVAC Equipment Portfolio
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Compare premium global and Indian central air conditioning brands tailored to your specific architectural requirements.
            </p>
          </div>
          <Link
            to="/products"
            onClick={onClose}
            className="inline-flex items-center text-xs font-bold text-[#009fe3] hover:text-[#0089c4] group whitespace-nowrap"
          >
            <span>Explore All Brands & Products</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 8 Brand Showcase Cards (4x2 Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {brands.map((b, idx) => (
            <Link
              key={idx}
              to={b.link}
              onClick={onClose}
              className="group relative flex flex-col bg-slate-50 hover:bg-white rounded-xl border border-slate-200/80 hover:border-[#009fe3]/50 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Product preview image */}
              <div className="w-full h-24 overflow-hidden bg-slate-200 relative">
                <img
                  src={b.productImage}
                  alt={`${b.name} HVAC System`}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/20 to-transparent"></div>
                <span className="absolute bottom-1.5 left-2.5 text-[10px] font-bold text-white drop-shadow-sm truncate max-w-[90%]">
                  {b.category}
                </span>
              </div>

              {/* Brand Logo & Content Body */}
              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Authentic Official Brand Logo SVG */}
                  <div className="h-7 w-full flex items-center justify-start mb-2">
                    <img
                      src={b.logo}
                      alt={`${b.name} Official Logo`}
                      className="max-h-7 max-w-[130px] object-contain object-left group-hover:scale-102 transition-transform"
                    />
                  </div>

                  <h4 className="text-xs font-bold text-navy-950 group-hover:text-[#009fe3] transition-colors flex items-center justify-between">
                    <span>{b.name}</span>
                    <ArrowRight className="w-3 h-3 text-[#009fe3] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </h4>
                  
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                    {b.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-[#009fe3]">
                  <span>View Equipment Range</span>
                  <span className="text-slate-400 group-hover:text-[#009fe3]">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-slate-50 to-indigo-50/40 p-4 rounded-xl gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-navy-950">
                Need an unbiased multi-brand technical comparison?
              </div>
              <div className="text-[11px] text-slate-500">
                Our HVAC engineers compare SEER efficiency, sound levels, and warranty across all 7 authorized manufacturers.
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            <Link
              to="/products"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white border border-slate-300 text-xs font-bold text-navy-950 hover:bg-slate-100 transition-colors"
            >
              Explore All Brands
            </Link>
            <button
              onClick={() => {
                onClose();
                if (onOpenQuote) onOpenQuote({ enquiryType: 'Brand Comparison & Selection' });
              }}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20 flex items-center space-x-1.5"
            >
              <span>Compare Brands for Your Property</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
