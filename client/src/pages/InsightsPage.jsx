import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BookOpen, Search, Clock, Calendar, ArrowRight, Filter } from 'lucide-react';
import api from '../services/api';
import SEO from '../components/common/SEO';

export default function InsightsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const selectedCategory = searchParams.get('category') || 'All';
  const searchTerm = searchParams.get('search') || '';

  const categories = [
    'All',
    'HVAC Articles',
    'Installation Guides',
    'Energy Saving Tips',
    'Residential HVAC Guides',
    'Commercial HVAC Guides',
    'Industry News',
    'Case Studies',
    'Maintenance Tips'
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        let url = `/blogs?limit=50`;
        if (selectedCategory && selectedCategory !== 'All') {
          url += `&category=${encodeURIComponent(selectedCategory)}`;
        }
        if (searchTerm) {
          url += `&search=${encodeURIComponent(searchTerm)}`;
        }

        const res = await api.get(url);
        if (res.data.success) {
          setBlogs(res.data.data);
        }
      } catch (err) {
        console.error('Insights fetch error:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [selectedCategory, searchTerm]);

  const handleCategoryChange = (cat) => {
    const params = new URLSearchParams(searchParams);
    if (cat === 'All') params.delete('category');
    else params.set('category', cat);
    setSearchParams(params);
  };

  return (
    <>
      <SEO 
        title="Insights & Resources | HVAC Engineering Guides"
        description="Technical HVAC guides, cleanroom standards, Central VRF vs split AC analysis, energy saving tips, and commercial case studies."
      />

      <section className="bg-navy-950 text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-cyan-200 text-xs font-semibold mb-4 border border-white/15">
            <BookOpen className="w-3.5 h-3.5 text-cyan-300" />
            <span>Technical Knowledge & Thought Leadership</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Insights & Resources
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Deep-dive engineering guides, maintenance checklists, energy-reduction tips, and verified case studies from certified HVAC specialists.
          </p>
        </div>
      </section>

      <section className="py-12 bg-slate-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-8 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-navy-950 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="py-24 text-center">
              <div className="w-8 h-8 border-3 border-hvac-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-xs text-slate-500 font-semibold">Loading insights & resources...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-navy-950">No articles found in this category</h3>
              <p className="text-xs text-slate-500 mt-1 mb-4">Try selecting "All" to browse our complete technical library.</p>
              <button
                onClick={() => setSearchParams({})}
                className="px-4 py-2 bg-hvac-600 text-white rounded-xl text-xs font-bold"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((b) => (
                <article
                  key={b._id}
                  className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs hover:shadow-premium-hover transition-all duration-300 flex flex-col group"
                >
                  <div className="relative h-48 bg-slate-100 overflow-hidden">
                    <img
                      src={b.featuredImage}
                      alt={b.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-navy-950/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-white/10">
                      {b.category}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-3 text-[11px] text-slate-400 mb-2">
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {b.readTime || '5 min read'}
                        </span>
                        <span>•</span>
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(b.publishedAt || b.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-navy-950 group-hover:text-hvac-600 transition-colors line-clamp-2">
                        <Link to={`/insights/${b.slug}`}>
                          {b.title}
                        </Link>
                      </h3>

                      <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                        {b.excerpt}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-slate-600 truncate max-w-[170px]">
                        {b.author}
                      </span>
                      <Link
                        to={`/insights/${b.slug}`}
                        className="text-xs font-bold text-hvac-600 hover:text-hvac-700 flex items-center"
                      >
                        <span>Read Article</span>
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
