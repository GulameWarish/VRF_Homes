import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Package, Search, Filter, Sparkles, ArrowRight } from 'lucide-react';
import api from '../services/api';
import SEO from '../components/common/SEO';
import ProductCard from '../components/cards/ProductCard';

export default function ProductsCatalogPage({ onOpenQuote }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
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
          api.get(url),
          api.get('/brands')
        ]);

        if (prodRes.data.success) {
          setProducts(prodRes.data.data);
        }
        if (brandRes.data.success) {
          setBrands(brandRes.data.data);
        }
      } catch (err) {
        console.error('Products load error:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory, selectedBrand, searchTerm]);

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

      {/* Main Catalog with Sidebar Filters */}
      <section className="py-12 bg-slate-50 min-h-[70vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Filter Toggle Button */}
            <div className="lg:hidden flex items-center justify-between bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="flex items-center space-x-2 text-xs font-bold text-navy-950"
              >
                <Filter className="w-4 h-4 text-hvac-600" />
                <span>Filters: {selectedCategory !== 'All' ? selectedCategory : 'All Categories'} {selectedBrand !== 'All' ? `• ${selectedBrand}` : ''}</span>
              </button>
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="text-xs font-bold text-hvac-600"
              >
                {showMobileFilters ? 'Hide Filters' : 'Change Filter'}
              </button>
            </div>

            {/* Sidebar Filter */}
            <aside className={`w-full lg:w-72 shrink-0 space-y-6 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
              {/* Search Box */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <label className="block text-xs font-bold text-navy-950 mb-2">Search Products</label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="e.g. VRF, Chiller, Cassette..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-hvac-600"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-navy-950 mb-3 flex items-center">
                  <Filter className="w-3.5 h-3.5 mr-1.5 text-hvac-600" />
                  Equipment Categories
                </h3>
                <div className="space-y-1 max-h-96 overflow-y-auto pr-1">
                  {allProductCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategorySelect(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                        selectedCategory === cat
                          ? 'bg-hvac-600 text-white font-bold'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="truncate">{cat}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-navy-950 mb-3">
                  Manufacturer / Brand
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => handleBrandSelect('All')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                      selectedBrand === 'All' ? 'bg-navy-950 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    All
                  </button>
                  {brands.map((b) => (
                    <button
                      key={b._id}
                      onClick={() => handleBrandSelect(b.name)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                        selectedBrand === b.name ? 'bg-navy-950 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Product Grid Area */}
            <main className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-xs font-bold text-slate-600">
                  Showing <span className="text-navy-950 font-extrabold">{products.length}</span> systems in{' '}
                  <span className="text-hvac-600 font-bold">{selectedCategory}</span>
                </p>
                {(selectedCategory !== 'All' || selectedBrand !== 'All' || searchTerm) && (
                  <button
                    onClick={() => setSearchParams({})}
                    className="text-xs font-bold text-rose-600 hover:underline"
                  >
                    Reset all filters
                  </button>
                )}
              </div>

              {loading ? (
                <div className="py-24 text-center">
                  <div className="w-8 h-8 border-3 border-hvac-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                  <p className="text-xs text-slate-500">Querying product catalog from MongoDB...</p>
                </div>
              ) : products.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
                  <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-navy-950">No systems matched your criteria</h3>
                  <p className="text-xs text-slate-500 mt-1 mb-4">Try adjusting your equipment category or manufacturer filter.</p>
                  <button
                    onClick={() => setSearchParams({})}
                    className="px-4 py-2 bg-hvac-600 text-white rounded-xl text-xs font-bold"
                  >
                    View All Products
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map((p) => (
                    <ProductCard key={p._id} product={p} onOpenQuote={onOpenQuote} />
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
