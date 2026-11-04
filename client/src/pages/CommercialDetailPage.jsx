import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Building2, ShieldAlert, CheckCircle2, ChevronDown, 
  ArrowRight, Sparkles, Package, MapPin, Calendar, HelpCircle 
} from 'lucide-react';
import api from '../services/api';
import SEO from '../components/common/SEO';
import ProjectCard from '../components/cards/ProjectCard';

export default function CommercialDetailPage({ onOpenQuote }) {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await api.get(`/commercial/${slug}`);
        if (res.data.success) {
          setCategory(res.data.data);
          // Fetch related projects for this category
          const projRes = await api.get(`/projects?limit=3`);
          if (projRes.data.success) {
            setRelatedProjects(projRes.data.data);
          }
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-10 h-10 border-3 border-hvac-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-xs font-semibold text-slate-500">Loading commercial application engineering data...</p>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="py-24 text-center max-w-lg mx-auto px-4">
        <h2 className="text-2xl font-bold text-navy-950">Commercial Sector Not Found</h2>
        <p className="text-sm text-slate-500 mt-2 mb-6">The requested commercial application could not be located in our database.</p>
        <Link to="/commercial" className="px-5 py-2.5 rounded-xl bg-hvac-600 text-white font-bold text-xs">
          Browse All Commercial Sectors
        </Link>
      </div>
    );
  }

  const commercialSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${category.name} HVAC Engineering`,
    description: category.introduction,
    serviceType: 'Commercial Air Conditioning & Ventilation',
    provider: {
      '@type': 'HVACBusiness',
      name: 'VRF Homes'
    }
  };

  return (
    <>
      <SEO 
        title={category.seoTitle || `${category.name} HVAC Solutions`}
        description={category.seoDescription || category.introduction}
        schemaData={commercialSchema}
      />

      {/* 1. Custom Hero Image & Heading */}
      <section className="relative min-h-[50vh] flex items-center bg-navy-950 text-white overflow-hidden py-16">
        <div className="absolute inset-0 z-0">
          <img
            src={category.heroImage || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80'}
            alt={category.name}
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/80 to-navy-900/60"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-cyan-200 text-xs font-semibold mb-4 border border-white/15">
              <Building2 className="w-3.5 h-3.5 text-cyan-300" />
              <span>Commercial Sector Specialization</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {category.name}
            </h1>

            <p className="mt-3 text-lg font-medium text-cyan-200">
              {category.tagline}
            </p>

            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              {category.introduction}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => onOpenQuote({ segment: 'Commercial', propertyType: category.name })}
                className="px-6 py-3 rounded-xl bg-hvac-600 hover:bg-hvac-500 text-white font-bold text-xs shadow-lg shadow-hvac-600/30 flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-cyan-200" />
                <span>Request {category.name} HVAC Proposal</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Overview */}
      {category.overview && (
        <section className="py-14 bg-white border-b border-slate-200/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-xl sm:text-2xl font-extrabold text-navy-950 mb-3">
              Engineering Architecture & Thermal Demands
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {category.overview}
            </p>
          </div>
        </section>
      )}

      {/* 3. HVAC Challenges & Solutions Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            {/* Challenges Column */}
            <div>
              <div className="flex items-center space-x-2 text-rose-600 text-xs font-bold uppercase tracking-wider mb-4">
                <ShieldAlert className="w-4 h-4" />
                <span>Critical Facility Challenges</span>
              </div>
              <h3 className="text-2xl font-extrabold text-navy-950 mb-6">
                Environmental & Operational Friction
              </h3>

              <div className="space-y-4">
                {category.challenges?.map((c, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                    <h4 className="text-sm font-bold text-navy-900 mb-1 flex items-center">
                      <span className="w-2 h-2 rounded-full bg-rose-500 mr-2"></span>
                      {c.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed ml-4">
                      {c.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Solutions Column */}
            <div>
              <div className="flex items-center space-x-2 text-hvac-600 text-xs font-bold uppercase tracking-wider mb-4">
                <CheckCircle2 className="w-4 h-4" />
                <span>Our Engineered Solutions</span>
              </div>
              <h3 className="text-2xl font-extrabold text-navy-950 mb-6">
                Engineered Performance Countermeasures
              </h3>

              <div className="space-y-4">
                {category.solutions?.map((s, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-white border border-hvac-200/80 shadow-2xs">
                    <h4 className="text-sm font-bold text-hvac-800 mb-1 flex items-center">
                      <span className="w-2 h-2 rounded-full bg-hvac-600 mr-2"></span>
                      {s.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed ml-4">
                      {s.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Suitable Products & Benefits */}
      <section className="py-16 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Suitable Products */}
            <div>
              <div className="inline-flex items-center space-x-1.5 text-xs font-bold tracking-wider uppercase text-hvac-600 bg-hvac-50 px-3 py-1 rounded-full mb-3">
                <Package className="w-3.5 h-3.5 text-hvac-600" />
                <span>Recommended Systems</span>
              </div>
              <h3 className="text-2xl font-extrabold text-navy-950 mb-4">
                Suitable HVAC Products for {category.name}
              </h3>
              <p className="text-xs text-slate-600 mb-6">
                Based on sensible and latent heat loads, air change per hour (ACH) rates, and acoustic criteria, our engineers recommend:
              </p>

              <div className="space-y-2">
                {category.suitableProducts?.map((p, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-bold text-navy-900">{p}</span>
                    <Link
                      to={`/products?category=${encodeURIComponent(p)}`}
                      className="text-xs font-bold text-hvac-600 hover:text-hvac-700 flex items-center"
                    >
                      View Specs <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits & Metrics */}
            <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200">
              <h3 className="text-lg font-bold text-navy-950 mb-4">
                Documented Client ROI & Operational Metrics
              </h3>
              <div className="space-y-4">
                {category.benefits?.map((b, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white border border-slate-200 flex items-start justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-navy-900">{b.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{b.description}</p>
                    </div>
                    {b.metric && (
                      <span className="ml-3 px-2.5 py-1 rounded-lg bg-hvac-50 text-hvac-700 font-extrabold text-xs shrink-0">
                        {b.metric}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 bg-slate-50 border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-extrabold text-navy-950">Related Showcase Case Studies</h3>
                <p className="text-xs text-slate-500 mt-1">Verified installations with full project completion records.</p>
              </div>
              <Link to="/projects" className="text-xs font-bold text-hvac-600 hover:underline flex items-center">
                All Projects <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((p) => (
                <ProjectCard key={p._id} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Industry Specific FAQs */}
      {category.faqs?.length > 0 && (
        <section className="py-16 bg-white border-t border-slate-200/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-extrabold text-navy-950">
                Frequently Asked Technical Questions: {category.name}
              </h3>
            </div>
            <div className="space-y-3">
              {category.faqs.map((f, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={i} className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : i)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between text-xs sm:text-sm font-bold text-navy-950"
                    >
                      <span>{f.question}</span>
                      <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isOpen ? 'rotate-180 text-hvac-600' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3">
                        {f.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 7. Request Consultation CTA */}
      <section className="py-16 bg-navy-950 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl sm:text-4xl font-extrabold">
            Need Expert HVAC Sizing for {category.name}?
          </h2>
          <p className="mt-3 text-sm text-slate-300 max-w-xl mx-auto">
            Connect with our mechanical engineers to review blueprints, duct schematics, and load simulations.
          </p>
          <button
            onClick={() => onOpenQuote({ segment: 'Commercial', propertyType: category.name })}
            className="mt-6 px-8 py-3.5 rounded-xl bg-gradient-to-r from-hvac-500 to-hvac-600 hover:from-hvac-600 hover:to-hvac-700 text-white font-bold text-sm shadow-xl"
          >
            Request Sizing & Quotation
          </button>
        </div>
      </section>
    </>
  );
}
