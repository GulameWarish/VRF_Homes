import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowRight, Sparkles } from 'lucide-react';
import api from '../services/api';
import SEO from '../components/common/SEO';

export default function ResidentialCatalogPage({ onOpenQuote }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResidential = async () => {
      try {
        const res = await api.get('/residential');
        if (res.data.success) {
          setCategories(res.data.data);
        }
      } catch (err) {
        console.error('Residential catalog error:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchResidential();
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
            <Home className="w-3.5 h-3.5 text-cyan-300" />
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
          {loading ? (
            <div className="py-20 text-center">
              <div className="w-8 h-8 border-3 border-hvac-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-xs text-slate-500 font-semibold">Loading residential home typologies...</p>
            </div>
          ) : (
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
                        {cat.introduction}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        to={`/residential/${cat.slug}`}
                        className="text-xs font-bold text-navy-950 hover:text-hvac-600 flex items-center group-hover:translate-x-0.5 transition-transform"
                      >
                        <span>View System Details</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Link>
                      <button
                        onClick={() => onOpenQuote({ segment: 'Residential', propertyType: cat.name })}
                        className="text-[11px] font-bold text-hvac-700 bg-hvac-50 hover:bg-hvac-600 hover:text-white px-2.5 py-1 rounded-md transition-colors"
                      >
                        Calculate Sizing
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
