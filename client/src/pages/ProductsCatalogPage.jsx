import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Package, Search, Filter, Sparkles, ArrowRight } from 'lucide-react';
import api from '../services/api';
import SEO from '../components/common/SEO';
import ProductCard from '../components/cards/ProductCard';
import { FALLBACK_PRODUCTS, FALLBACK_BRANDS } from '../data/fallbackData';

export default function ProductsCatalogPage({ onOpenQuote }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const selectedCategory = searchParams.get('category') || 'All';
  const selectedBrand = searchParams.get('brand') || 'All';
  const searchTerm = searchParams.get('search') || '';

  const allProductCategories = [
    'All',
    'VRF Air Conditioning Systems',
    'Central Air Conditioning Systems',
    'Ductable AC',
    'Cassette AC',
    'Split AC',
    'Tower AC',
    'Concealed AC',
    'Chiller Systems',
    'Air Handling Units (AHU)'
  ];

  const filteredFallback = useMemo(() => {
    let list = [...FALLBACK_PRODUCTS];
    if (selectedCategory && selectedCategory !== 'All') {
      const catTrim = selectedCategory.toLowerCase().trim();
      list = list.filter(p => {
        if (!p.category) return false;
        const c = p.category.toLowerCase();
        if (catTrim.includes('duct') && c.includes('duct')) return true;
        if (catTrim.includes('cassette') && c.includes('cassette')) return true;
        if (catTrim.includes('split') && c.includes('split')) return true;
        if (catTrim.includes('tower') && c.includes('tower')) return true;
        if (catTrim.includes('conceal') && c.includes('conceal')) return true;
        if (catTrim.includes('chiller') && c.includes('chiller')) return true;
        if (catTrim.includes('vrf') && c.includes('vrf')) return true;
        if (catTrim.includes('ahu') && (c.includes('ahu') || c.includes('handling'))) return true;
        return c.includes(catTrim);
      });
    }
    if (selectedBrand && selectedBrand !== 'All') {
      const brandTrim = selectedBrand.toLowerCase().trim();
      list = list.filter(p => p.relatedBrands && p.relatedBrands.some(b => b.toLowerCase().includes(brandTrim)));
    }
    if (searchTerm) {
      const s = searchTerm.toLowerCase();
      list = list.filter(p => 
        (p.name && p.name.toLowerCase().includes(s)) ||
        (p.description && p.description.toLowerCase().includes(s)) ||
        (p.category && p.category.toLowerCase().includes(s))
      );
    }
    return list;
  }, [selectedCategory, selectedBrand, searchTerm]);

  const [products, setProducts] = useState(filteredFallback);
  const [brands, setBrands] = useState(FALLBACK_BRANDS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      try {
        let url = `/products?limit=100`;
        if (selectedCategory && selectedCategory !== 'All') {
          url += `&category=${encodeURIComponent(selectedCategory)}`;
        }
        if (selectedBrand && selectedBrand !== 'All') {
          url += `&brand=${encodeURIComponent(selectedBrand)}`;
        }
        if (searchTerm) {
          url += `&search=${encodeURIComponent(searchTerm)}`;
        }

        const [prodRes, brandRes] = await Promise.all([
          api.get(url).catch(() => ({ data: { success: false } })),
          api.get('/brands').catch(() => ({ data: { success: false } }))
        ]);

        if (isMounted) {
          if (prodRes.data?.success && Array.isArray(prodRes.data.data) && prodRes.data.data.length > 0) {
            setProducts(prodRes.data.data);
          } else {
            setProducts(filteredFallback);
          }
          if (brandRes.data?.success && Array.isArray(brandRes.data.data) && brandRes.data.data.length > 0) {
            setBrands(brandRes.data.data);
          }
        }
      } catch (err) {
        if (isMounted) {
          setProducts(filteredFallback);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchProducts();
    return () => { isMounted = false; };
  }, [selectedCategory, selectedBrand, searchTerm, filteredFallback]);

  const handleCategorySelect = (cat) => {
    const params = new URLSearchParams(searchParams);
    if (cat === 'All') params.delete('category');
    else params.set('category', cat);
    setSearchParams(params);
  };

  const handleBrandSelect = (brand) => {
    const params = new URLSearchParams(searchParams);
    if (brand === 'All') params.delete('brand');
    else params.set('brand', brand);
    setSearchParams(params);
  };

  const handleSearchChange = (e) => {
    const params = new URLSearchParams(searchParams);
    if (e.target.value) params.set('search', e.target.value);
    else params.delete('search');
    setSearchParams(params);
  };

  return (
    <>
      <SEO 
        title="Commercial & Residential HVAC Products & Equipment"
        description="Browse Mitsubishi Electric VRF, O General, Carrier chillers, Voltas, Hitachi, Trane & Haier HVAC systems."
      />

      {/* Header */}
      <section className="bg-navy-950 text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-cyan-200 text-xs font-semibold mb-4 border border-white/15">
            <Package className="w-3.5 h-3.5 text-cyan-300" />
            <span>Commercial & Residential HVAC Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            HVAC Products & Mechanical Systems
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Engineered equipment from leading international manufacturers with factory certified warranties, heat-load optimization, and turnkey installation.
          </p>
        </div>
      </section>

      {/* Main Catalog Section */}
      <section className="py-12 bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar Filters */}
            <aside className="lg:col-span-1 space-y-6">
              
              {/* Search */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Search Products
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="e.g. VRF, Chiller, Cassette..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-hvac-600 focus:ring-1 focus:ring-hvac-600"
                  />
                </div>
              </div>

              {/* Equipment Categories */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Filter className="w-3.5 h-3.5 text-hvac-600" />
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Equipment Categories</h3>
                  </div>
                  {selectedCategory !== 'All' && (
                    <button
                      onClick={() => handleCategorySelect('All')}
                      className="text-[11px] font-semibold text-hvac-600 hover:text-hvac-700 underline"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="space-y-1 max-h-96 overflow-y-auto pr-1">
                  {allProductCategories.map((cat) => {
                    const isSelected = selectedCategory === cat || (cat === 'All' && !searchParams.get('category'));
                    return (
                      <button
                        key={cat}
                        onClick={() => handleCategorySelect(cat)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-hvac-600 text-white font-bold shadow-xs'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Brands Filter */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Authorized Brand</h3>
                  {selectedBrand !== 'All' && (
                    <button
                      onClick={() => handleBrandSelect('All')}
                      className="text-[11px] font-semibold text-hvac-600 hover:text-hvac-700 underline"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
                  <button
                    onClick={() => handleBrandSelect('All')}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      selectedBrand === 'All'
                        ? 'bg-hvac-600 text-white font-bold shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    All Authorized Brands
                  </button>
                  {brands.map((b) => {
                    const isSelected = selectedBrand.toLowerCase() === b.name.toLowerCase();
                    return (
                      <button
                        key={b._id || b.name}
                        onClick={() => handleBrandSelect(b.name)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-hvac-600 text-white font-bold shadow-xs'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {b.name}
                      </button>
                    );
                  })}
                </div>
              </div>

            </aside>

            {/* Product Grid Area */}
            <main className="lg:col-span-3">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
                <div>
                  <p className="text-xs text-slate-500 font-semibold">
                    Showing <span className="font-bold text-slate-800">{products.length}</span> systems
                    {selectedCategory !== 'All' && <span> in <span className="text-hvac-600 font-bold">{selectedCategory}</span></span>}
                    {selectedBrand !== 'All' && <span> by <span className="text-hvac-600 font-bold">{selectedBrand}</span></span>}
                  </p>
                </div>
                {(selectedCategory !== 'All' || selectedBrand !== 'All' || searchTerm) && (
                  <button
                    onClick={() => setSearchParams({})}
                    className="text-xs font-bold text-rose-600 hover:text-rose-700 self-start sm:self-auto"
                  >
                    Reset all filters
                  </button>
                )}
              </div>

              {products.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                  <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-slate-800">No systems matched your criteria</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                    Try adjusting your equipment category or manufacturer filter.
                  </p>
                  <button
                    onClick={() => setSearchParams({})}
                    className="mt-4 px-5 py-2.5 bg-hvac-600 hover:bg-hvac-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                  >
                    View All Products
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((p) => (
                    <ProductCard key={p._id || p.slug} product={p} onOpenQuote={onOpenQuote} />
                  ))}
                </div>
              )}

            </main>

          </div>

        </div>
      </section>
    </>
  );
}
