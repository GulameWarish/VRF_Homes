import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Clock, User, Calendar } from 'lucide-react';

export default function InsightsSection({ blogs }) {
  if (!blogs || blogs.length === 0) return null;

  return (
    <section className="py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold tracking-wider uppercase text-hvac-600 bg-hvac-50 px-3 py-1 rounded-full mb-3">
              <BookOpen className="w-3.5 h-3.5 text-hvac-600" />
              <span>Knowledge Base & Technical Guides</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
              Insights & Engineering Resources
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-xl">
              Expert articles on VRF selection, cleanroom compliance, energy reduction strategies, and architectural integration.
            </p>
          </div>

          <Link
            to="/insights"
            className="mt-4 md:mt-0 inline-flex items-center text-xs font-bold text-hvac-600 hover:text-hvac-700 hover:underline"
          >
            <span>View All Insights & Case Studies</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.slice(0, 3).map((b) => (
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

                  <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                    {b.excerpt}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-600 truncate max-w-[180px]">
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
      </div>
    </section>
  );
}
