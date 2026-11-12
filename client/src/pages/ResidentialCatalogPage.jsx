import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowRight } from 'lucide-react';
import api from '../services/api';
import SEO from '../components/common/SEO';
import { FALLBACK_RESIDENTIAL } from '../data/fallbackData';

export default function ResidentialCatalogPage({ onOpenQuote }) {
  const [categories, setCategories] = useState(FALLBACK_RESIDENTIAL);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchResidential = async () => {
      try {
        const res = await api.get('/residential');
        if (isMounted && res.data?.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
          setCategories(res.data.data);
        }
      } catch (err) {
        // Keeps fallback data seamlessly
      }
    };
    fetchResidential();
    return () => { isMounted = false; };
  }, []);

  return (
    <>
      <SEO 
        title="Residential HVAC & Luxury Home Air Conditioning"
        description="Explore Central VRF Home systems, concealed ducted AC, and high-efficiency multi-split systems for luxury villas, penthouses, independent houses, and apartments."
      />

      <section className="bg-navy-950 text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-cyan-200 text-xs font-semibold mb-4 border border-white/15">
            <Home className="w-3.5 h-3.5 text-emerald-300" />
            <span>Luxury Residential Climate Engineering</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Residential Air Conditioning Solutions
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Say goodbye to cluttered balconies and noisy split compressors. Discover single-condenser VRF systems that hide inside ceilings and operate quieter than a whisper.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50 min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div
                key={cat._id || cat.slug}
                className="rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-premium-hover transition-all duration-300 flex flex-col overflow-hidden group"
              >
                <div className="relative h-52 bg-slate-100 overflow-hidden">
                  <img
                    src={cat.heroImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 text-white">
                    <h3 className="text-base font-bold">{cat.name}</h3>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-hvac-600 font-bold mb-1.5">
                      {cat.tagline || 'Residential VRF System'}
                    </p>
                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                      {cat.overview || cat.introduction}
                    </p>

                    {cat.recommendedSolutions && (
                      <div className="mt-4 pt-3 border-t border-slate-100">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                          Recommended Architecture
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {cat.recommendedSolutions.slice(0, 2).map((sol, i) => (
                            <span
                              key={i}
                              className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium"
                            >
                              {sol.name || sol}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      to={`/residential/${cat.slug}`}
                      className="text-xs font-bold text-hvac-600 hover:text-hvac-700 inline-flex items-center space-x-1"
                    >
                      <span>Explore Typology</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => onOpenQuote?.({ segment: 'Residential', propertyType: cat.name })}
                      className="text-xs font-bold px-3 py-1.5 bg-slate-100 hover:bg-hvac-50 text-slate-700 hover:text-hvac-700 rounded-lg transition-colors"
                    >
                      Get Sizing
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
