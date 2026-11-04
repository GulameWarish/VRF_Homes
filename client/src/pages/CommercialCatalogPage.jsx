import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building2, ArrowRight, Sparkles, Search } from 'lucide-react';
import api from '../services/api';
import SEO from '../components/common/SEO';

export default function CommercialCatalogPage({ onOpenQuote }) {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/commercial');
        if (res.data.success) {
          setCategories(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching commercial categories:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const filtered = categories.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    (c.tagline && c.tagline.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <SEO 
        title="Commercial HVAC Engineering & Sector Solutions"
        description="Turnkey HVAC and VRF solutions for hospitals, hotels, corporate offices, IT parks, pharmaceutical cleanrooms, restaurants, and industrial facilities."
      />

      {/* Hero Header */}
      <section className="bg-navy-950 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-cyan-200 text-xs font-semibold mb-4 border border-white/15">
            <Building2 className="w-3.5 h-3.5 text-cyan-300" />
            <span>Enterprise Mechanical Contracting</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Commercial HVAC Applications
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Explore dedicated mechanical cooling, ventilation, and chiller solutions engineered for 19+ distinct commercial industries.
          </p>

          {/* Search bar inside header */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter commercial sectors (e.g. Hospital, Hotel, IT)..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-slate-800 placeholder-slate-400 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-hvac-500 shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-slate-50 min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="py-20 text-center">
              <div className="w-8 h-8 border-3 border-hvac-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-xs text-slate-500 font-semibold">Loading commercial sectors...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-slate-500">
              <p className="text-sm font-bold text-slate-700">No commercial applications found matching "{search}"</p>
              <button onClick={() => setSearch('')} className="mt-2 text-xs text-hvac-600 font-bold hover:underline">
                Clear search filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((cat) => (
                <div
                  key={cat._id || cat.slug}
                  className="rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-premium-hover transition-all duration-300 flex flex-col overflow-hidden group"
                >
                  <div className="relative h-48 bg-slate-100 overflow-hidden">
                    <img
                      src={cat.heroImage || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'}
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
                        {cat.tagline || 'Specialized HVAC Solution'}
                      </p>
                      <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                        {cat.introduction}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        to={`/commercial/${cat.slug}`}
                        className="text-xs font-bold text-navy-950 hover:text-hvac-600 flex items-center group-hover:translate-x-0.5 transition-transform"
                      >
                        <span>View Sector Specifications</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Link>
                      <button
                        onClick={() => onOpenQuote({ segment: 'Commercial', propertyType: cat.name })}
                        className="text-[11px] font-bold text-hvac-700 bg-hvac-50 hover:bg-hvac-600 hover:text-white px-2.5 py-1 rounded-md transition-colors"
                      >
                        Get Quote
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
