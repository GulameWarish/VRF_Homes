import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, X, ArrowRight, Building2, Home, Package, 
  FolderKanban, Sparkles, BookOpen, Layers, ExternalLink 
} from 'lucide-react';
import api from '../../services/api';

export default function LiveSearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  // Live search debounced
  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const delayDebounce = setTimeout(async () => {
      try {
        const res = await api.get(`/search?q=${encodeURIComponent(query.trim())}`);
        if (res.data.success) {
          setResults(res.data);
        }
      } catch (err) {
        console.error('Live search error:', err.message);
      } finally {
        setLoading(false);
      }
    }, 280);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  // Handle Enter key to jump to dedicated search page
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'Enter' && query.trim()) {
      onClose();
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  if (!isOpen) return null;

  const totalHits = results ? results.total : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-200"
        onKeyDown={handleKeyDown}
      >
        {/* Search Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center space-x-3 bg-slate-50/70">
          <Search className="w-5 h-5 text-hvac-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search systems, commercial buildings, products, projects..."
            className="w-full bg-transparent border-none text-slate-800 placeholder-slate-400 text-sm sm:text-base font-semibold focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1 rounded bg-slate-200/60"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
          {loading && (
            <div className="py-12 flex flex-col items-center justify-center text-slate-400">
              <div className="w-7 h-7 border-2 border-hvac-500 border-t-transparent rounded-full animate-spin mb-3"></div>
              <p className="text-xs font-semibold">Searching HVAC database across all collections...</p>
            </div>
          )}

          {!loading && !query && (
            <div className="py-8 text-center text-slate-500">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Popular Searches</p>
              <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
                {['Hospital AC', 'Central VRF Home', 'Cleanroom HEPA', 'Chiller Plant', 'Luxury Villa', 'Cassette AC', 'Noida Projects', 'Carrier'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-hvac-50 text-slate-700 hover:text-hvac-700 text-xs rounded-lg transition-colors border border-slate-200/60 font-medium"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {!loading && query && totalHits === 0 && (
            <div className="py-12 text-center text-slate-500">
              <p className="text-sm font-bold text-slate-700 mb-1">No matching results found for "{query}"</p>
              <p className="text-xs text-slate-400">Try searching for "VRF", "Hospital", "Chiller", "Villa", or a specific brand name.</p>
            </div>
          )}

          {!loading && results && totalHits > 0 && (
            <div className="space-y-6">
              {/* Products Hits */}
              {results.results.products?.length > 0 && (
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center">
                    <Package className="w-3.5 h-3.5 mr-1.5 text-hvac-600" />
                    Products & Equipment ({results.results.products.length})
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {results.results.products.map((item) => (
                      <div
                        key={item._id}
                        onClick={() => { onClose(); navigate(`/products/${item.slug}`); }}
                        className="p-2.5 rounded-xl border border-slate-100 hover:border-hvac-200 hover:bg-hvac-50/60 cursor-pointer flex items-center space-x-3 transition-colors"
                      >
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-12 h-12 rounded-lg object-cover bg-slate-100 shrink-0" 
                        />
                        <div className="overflow-hidden">
                          <h4 className="text-xs font-bold text-navy-900 truncate">{item.name}</h4>
                          <p className="text-[11px] text-hvac-600 font-medium truncate">{item.category}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Commercial Hits */}
              {results.results.commercial?.length > 0 && (
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center">
                    <Building2 className="w-3.5 h-3.5 mr-1.5 text-hvac-600" />
                    Commercial Applications ({results.results.commercial.length})
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {results.results.commercial.map((item) => (
                      <div
                        key={item._id}
                        onClick={() => { onClose(); navigate(`/commercial/${item.slug}`); }}
                        className="p-2.5 rounded-xl border border-slate-100 hover:border-hvac-200 hover:bg-hvac-50/60 cursor-pointer flex items-center space-x-3 transition-colors"
                      >
                        <img 
                          src={item.heroImage} 
                          alt={item.name} 
                          className="w-12 h-12 rounded-lg object-cover bg-slate-100 shrink-0" 
                        />
                        <div className="overflow-hidden">
                          <h4 className="text-xs font-bold text-navy-900 truncate">{item.name}</h4>
                          <p className="text-[11px] text-slate-500 truncate">{item.tagline || 'Specialized Engineering'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Residential Hits */}
              {results.results.residential?.length > 0 && (
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center">
                    <Home className="w-3.5 h-3.5 mr-1.5 text-hvac-600" />
                    Residential Solutions ({results.results.residential.length})
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {results.results.residential.map((item) => (
                      <div
                        key={item._id}
                        onClick={() => { onClose(); navigate(`/residential/${item.slug}`); }}
                        className="p-2.5 rounded-xl border border-slate-100 hover:border-hvac-200 hover:bg-hvac-50/60 cursor-pointer flex items-center space-x-3 transition-colors"
                      >
                        <img 
                          src={item.heroImage} 
                          alt={item.name} 
                          className="w-12 h-12 rounded-lg object-cover bg-slate-100 shrink-0" 
                        />
                        <div className="overflow-hidden">
                          <h4 className="text-xs font-bold text-navy-900 truncate">{item.name}</h4>
                          <p className="text-[11px] text-slate-500 truncate">{item.tagline || 'Luxury Architectural HVAC'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects Hits */}
              {results.results.projects?.length > 0 && (
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center">
                    <FolderKanban className="w-3.5 h-3.5 mr-1.5 text-hvac-600" />
                    Showcase Projects ({results.results.projects.length})
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {results.results.projects.map((item) => (
                      <div
                        key={item._id}
                        onClick={() => { onClose(); navigate(`/projects/${item.slug}`); }}
                        className="p-2.5 rounded-xl border border-slate-100 hover:border-hvac-200 hover:bg-hvac-50/60 cursor-pointer flex items-center space-x-3 transition-colors"
                      >
                        <img 
                          src={item.coverImage} 
                          alt={item.name} 
                          className="w-12 h-12 rounded-lg object-cover bg-slate-100 shrink-0" 
                        />
                        <div className="overflow-hidden">
                          <h4 className="text-xs font-bold text-navy-900 truncate">{item.name}</h4>
                          <p className="text-[11px] text-slate-500 truncate">{item.location} • {item.hvacSystem}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Articles / Insights Hits */}
              {results.results.insights?.length > 0 && (
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center">
                    <BookOpen className="w-3.5 h-3.5 mr-1.5 text-hvac-600" />
                    Insights & Engineering Guides ({results.results.insights.length})
                  </div>
                  <div className="space-y-1.5">
                    {results.results.insights.map((item) => (
                      <div
                        key={item._id}
                        onClick={() => { onClose(); navigate(`/insights/${item.slug}`); }}
                        className="p-2.5 rounded-xl border border-slate-100 hover:border-hvac-200 hover:bg-hvac-50/60 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <span className="text-xs font-bold text-navy-900">{item.title}</span>
                        <span className="text-[11px] text-hvac-600 shrink-0 ml-2">{item.category}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Jump to Results Page */}
        {results && totalHits > 0 && (
          <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
            <button
              onClick={() => { onClose(); navigate(`/search?q=${encodeURIComponent(query)}`); }}
              className="text-xs font-bold text-hvac-600 hover:text-hvac-700 flex items-center justify-center mx-auto"
            >
              View all {totalHits} search results in full detail <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
