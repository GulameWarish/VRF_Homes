import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, Package, Building2, Home, FolderKanban, 
  BookOpen, Layers, ArrowRight, Zap 
} from 'lucide-react';
import api from '../services/api';
import SEO from '../components/common/SEO';
import ProductCard from '../components/cards/ProductCard';
import ProjectCard from '../components/cards/ProjectCard';

export default function SearchResultsPage({ onOpenQuote }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setResults(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await api.get(`/search?q=${encodeURIComponent(query.trim())}`);
        if (res.data.success) {
          setResults(res.data);
        }
      } catch (err) {
        console.error('Search error:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  const totalHits = results ? results.total : 0;

  return (
    <>
      <SEO
        title={`Search Results for "${query}" | VRF Homes`}
        description={`Search results across commercial categories, residential systems, products, and projects for ${query}.`}
      />

      <section className="bg-navy-950 text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 text-xs text-emerald-300 uppercase tracking-wider font-bold mb-2">
            <Search className="w-4 h-4" />
            <span>Search Results Database</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Results for <span className="text-emerald-300">"{query}"</span>
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-300">
            Found <strong className="text-white">{totalHits}</strong> matching records across products, sectors, projects, and insights.
          </p>
        </div>
      </section>

      <section className="py-12 bg-slate-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {loading ? (
            <div className="py-24 text-center">
              <div className="w-8 h-8 border-3 border-hvac-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-xs text-slate-500 font-semibold">Performing database search across all collections...</p>
            </div>
          ) : totalHits === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 max-w-lg mx-auto">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-navy-950">No matching HVAC records found</h3>
              <p className="text-xs text-slate-500 mt-1 mb-6">
                We couldn't find any items matching "{query}". Try searching for broader terms like "VRF", "Hospital", "Chiller", or "Carrier".
              </p>
              <Link to="/" className="px-5 py-2.5 bg-hvac-600 text-white rounded-xl text-xs font-bold">
                Return to Homepage
              </Link>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Products Hits */}
              {results.results.products?.length > 0 && (
                <div>
                  <h3 className="text-lg font-extrabold text-navy-950 mb-4 flex items-center">
                    <Package className="w-4 h-4 mr-2 text-hvac-600" />
                    Products & Equipment ({results.results.products.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.results.products.map((p) => (
                      <ProductCard key={p._id} product={p} onOpenQuote={onOpenQuote} />
                    ))}
                  </div>
                </div>
              )}

              {/* Commercial Hits */}
              {results.results.commercial?.length > 0 && (
                <div>
                  <h3 className="text-lg font-extrabold text-navy-950 mb-4 flex items-center">
                    <Building2 className="w-4 h-4 mr-2 text-hvac-600" />
                    Commercial Applications ({results.results.commercial.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.results.commercial.map((c) => (
                      <Link
                        key={c._id}
                        to={`/commercial/${c.slug}`}
                        className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-hvac-300 hover:shadow-xs flex items-center space-x-3 transition-all"
                      >
                        <img src={c.heroImage} alt={c.name} className="w-14 h-14 rounded-xl object-cover bg-slate-100 shrink-0" />
                        <div>
                          <h4 className="text-xs font-bold text-navy-900">{c.name}</h4>
                          <p className="text-[11px] text-slate-500 line-clamp-1">{c.tagline || 'Specialized Engineering'}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Residential Hits */}
              {results.results.residential?.length > 0 && (
                <div>
                  <h3 className="text-lg font-extrabold text-navy-950 mb-4 flex items-center">
                    <Home className="w-4 h-4 mr-2 text-hvac-600" />
                    Residential Solutions ({results.results.residential.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.results.residential.map((r) => (
                      <Link
                        key={r._id}
                        to={`/residential/${r.slug}`}
                        className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-hvac-300 hover:shadow-xs flex items-center space-x-3 transition-all"
                      >
                        <img src={r.heroImage} alt={r.name} className="w-14 h-14 rounded-xl object-cover bg-slate-100 shrink-0" />
                        <div>
                          <h4 className="text-xs font-bold text-navy-900">{r.name}</h4>
                          <p className="text-[11px] text-slate-500 line-clamp-1">{r.tagline || 'Residential Air Conditioning'}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects Hits */}
              {results.results.projects?.length > 0 && (
                <div>
                  <h3 className="text-lg font-extrabold text-navy-950 mb-4 flex items-center">
                    <FolderKanban className="w-4 h-4 mr-2 text-hvac-600" />
                    Completed Projects ({results.results.projects.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.results.projects.map((proj) => (
                      <ProjectCard key={proj._id} project={proj} />
                    ))}
                  </div>
                </div>
              )}

              {/* Insights Hits */}
              {results.results.insights?.length > 0 && (
                <div>
                  <h3 className="text-lg font-extrabold text-navy-950 mb-4 flex items-center">
                    <BookOpen className="w-4 h-4 mr-2 text-hvac-600" />
                    Insights & Articles ({results.results.insights.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {results.results.insights.map((item) => (
                      <div key={item._id} className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold text-hvac-600 uppercase">{item.category}</span>
                          <h4 className="text-xs font-bold text-navy-900 line-clamp-1 mt-0.5">{item.title}</h4>
                        </div>
                        <Link to={`/insights/${item.slug}`} className="text-xs font-bold text-hvac-600 hover:underline shrink-0 ml-3">
                          Read &rarr;
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
