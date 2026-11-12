import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, Clock, Calendar, User, ArrowRight, Share2 } from 'lucide-react';
import api from '../services/api';
import SEO from '../components/common/SEO';

export default function InsightDetailPage({ onOpenQuote }) {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await api.get(`/blogs/${slug}`);
        if (res.data.success) {
          setBlog(res.data.data);
          setRelated(res.data.relatedBlogs || []);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-8 h-8 border-3 border-hvac-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-xs text-slate-500 font-semibold">Loading technical engineering guide...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="py-24 text-center max-w-md mx-auto px-4">
        <h2 className="text-xl font-bold text-navy-950">Article Not Found</h2>
        <p className="text-xs text-slate-500 mt-2 mb-6">The requested insights article could not be located.</p>
        <Link to="/insights" className="px-5 py-2.5 rounded-xl bg-hvac-600 text-white font-bold text-xs">
          Browse Insights & Resources
        </Link>
      </div>
    );
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.excerpt,
    image: blog.featuredImage,
    author: {
      '@type': 'Person',
      name: blog.author
    },
    datePublished: blog.publishedAt
  };

  return (
    <>
      <SEO
        title={blog.seoTitle || `${blog.title} | Insights & Resources`}
        description={blog.seoDescription || blog.excerpt}
        schemaData={articleSchema}
      />

      {/* Article Header */}
      <section className="bg-navy-950 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center space-x-2 text-xs text-slate-400 mb-6">
            <Link to="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link to="/insights" className="hover:text-white">Insights & Resources</Link>
            <span>/</span>
            <span className="text-emerald-300 font-semibold truncate">{blog.title}</span>
          </nav>

          <span className="inline-block bg-white/10 text-cyan-200 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md border border-white/15 mb-4">
            {blog.category}
          </span>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {blog.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-400 border-t border-white/10 pt-4">
            <span className="flex items-center">
              <User className="w-3.5 h-3.5 mr-1.5 text-hvac-400" />
              {blog.author}
            </span>
            <span>•</span>
            <span className="flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1.5 text-hvac-400" />
              {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span>•</span>
            <span className="flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1.5 text-hvac-400" />
              {blog.readTime || '6 min read'}
            </span>
          </div>
        </div>
      </section>

      {/* Featured Image & Body Content */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl overflow-hidden h-72 sm:h-96 bg-slate-100 mb-10 shadow-sm border border-slate-200">
            <img src={blog.featuredImage} alt={blog.title} className="w-full h-full object-cover" />
          </div>

          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-4 whitespace-pre-line">
            {blog.content}
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 mr-2">Topics:</span>
              {blog.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-semibold text-slate-700">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* CTA Box */}
          <div className="mt-12 p-8 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold text-navy-950">Have questions about this HVAC configuration?</h3>
              <p className="text-xs text-slate-500 mt-1">Talk to our certified technical consultants for specific project advice.</p>
            </div>
            <button
              onClick={() => onOpenQuote({ message: `Inquiring regarding: ${blog.title}` })}
              className="px-6 py-3 rounded-xl bg-hvac-600 hover:bg-hvac-500 text-white font-bold text-xs shadow-md shrink-0"
            >
              Consult an Engineer
            </button>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="py-16 bg-slate-50 border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-extrabold text-navy-950 mb-8">
              Related Insights & Resources
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r) => (
                <div key={r._id} className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-hvac-600 uppercase">{r.category}</span>
                    <h4 className="text-sm font-bold text-navy-950 mt-1 line-clamp-2">
                      <Link to={`/insights/${r.slug}`} className="hover:text-hvac-600">
                        {r.title}
                      </Link>
                    </h4>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2">{r.excerpt}</p>
                  </div>
                  <Link to={`/insights/${r.slug}`} className="text-xs font-bold text-hvac-600 flex items-center mt-4">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
