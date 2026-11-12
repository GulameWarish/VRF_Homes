import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Home, CheckCircle2, ChevronDown, ArrowRight, 
  Layers, ShieldCheck, MapPin, Calendar, HelpCircle 
} from 'lucide-react';
import api from '../services/api';
import SEO from '../components/common/SEO';
import ProjectCard from '../components/cards/ProjectCard';

export default function ResidentialDetailPage({ onOpenQuote }) {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [brands, setBrands] = useState([]);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const fetchResidentialData = async () => {
      setLoading(true);
      setError(false);
      try {
        const [catRes, brandRes, projRes] = await Promise.all([
          api.get(`/residential/${slug}`),
          api.get('/brands'),
          api.get('/projects?type=Residential&limit=3')
        ]);

        if (catRes.data.success) {
          setCategory(catRes.data.data);
        } else {
          setError(true);
        }

        if (brandRes.data.success) setBrands(brandRes.data.data);
        if (projRes.data.success) setRelatedProjects(projRes.data.data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchResidentialData();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-10 h-10 border-3 border-hvac-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-xs font-semibold text-slate-500">Loading residential HVAC configuration...</p>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="py-24 text-center max-w-lg mx-auto px-4">
        <h2 className="text-2xl font-bold text-navy-950">Residential Category Not Found</h2>
        <p className="text-sm text-slate-500 mt-2 mb-6">The requested residential page could not be located.</p>
        <Link to="/residential" className="px-5 py-2.5 rounded-xl bg-hvac-600 text-white font-bold text-xs">
          Browse Residential Solutions
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={category.seoTitle || `${category.name} Air Conditioning Solutions`}
        description={category.seoDescription || category.introduction}
      />

      {/* Hero Header */}
      <section className="relative min-h-[50vh] flex items-center bg-navy-950 text-white overflow-hidden py-16">
        <div className="absolute inset-0 z-0">
          <img
            src={category.heroImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80'}
            alt={category.name}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/80 to-navy-900/60"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-cyan-200 text-xs font-semibold mb-4 border border-white/15">
              <Home className="w-3.5 h-3.5 text-cyan-300" />
              <span>Luxury Residential Air Conditioning</span>
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
                onClick={() => onOpenQuote({ segment: 'Residential', propertyType: category.name })}
                className="px-6 py-3 rounded-xl bg-hvac-600 hover:bg-hvac-500 text-white font-bold text-xs shadow-lg shadow-hvac-600/30 flex items-center space-x-2"
              >
                <span>Request {category.name} VRF Estimation</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Systems */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
              Recommended Systems for {category.name}
            </h2>
            <p className="text-xs text-slate-500 mt-2">
              High-efficiency variable refrigerant technology selected specifically for floor-to-ceiling heights and exterior aesthetics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.recommendedSystems?.map((sys, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-hvac-300 hover:bg-white hover:shadow-sm transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-hvac-50 text-hvac-600 flex items-center justify-center mb-4">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-navy-950 mb-2">
                  {sys.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {sys.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Options for Residential */}
      <section className="py-16 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <h3 className="text-2xl font-extrabold text-navy-950">
              Available & Configurable AC Brands
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              We install and service genuine equipment from premier manufacturers matching your preferences and interior specifications.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {['Voltas', 'Carrier', 'Haier', 'Hitachi', 'Trane', 'O General', 'Mitsubishi Electric'].map((brandName) => (
              <div
                key={brandName}
                className="p-4 rounded-xl bg-white border border-slate-200 text-center hover:border-hvac-300 transition-colors shadow-2xs"
              >
                <span className="text-xs font-bold text-navy-950">{brandName}</span>
                <span className="block text-[10px] text-slate-400 mt-1">Verified Solutions</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      {category.benefits?.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-extrabold text-navy-950 mb-8 text-center">
              Key Homeowner Benefits
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {category.benefits.map((b, i) => (
                <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center space-x-2 text-hvac-600 font-bold text-sm mb-2">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>{b.title}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed ml-7">
                    {b.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 bg-slate-50 border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-extrabold text-navy-950">Luxury Residential Project Portfolio</h3>
                <p className="text-xs text-slate-500 mt-1">Real completed projects with verified completion dates.</p>
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

      {/* FAQs */}
      {category.faqs?.length > 0 && (
        <section className="py-16 bg-white border-t border-slate-200/80">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-extrabold text-navy-950 text-center mb-8">
              Frequently Asked Questions for {category.name}
            </h3>
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

      {/* Quote Form Callout */}
      <section className="py-16 bg-navy-950 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl sm:text-4xl font-extrabold">
            Ready to Plan Your {category.name} Climate Design?
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            Share your architectural drawings or room dimensions for a complimentary heat load simulation and equipment estimate.
          </p>
          <button
            onClick={() => onOpenQuote({ segment: 'Residential', propertyType: category.name })}
            className="mt-6 px-8 py-3.5 rounded-xl bg-hvac-600 hover:bg-hvac-500 text-white font-bold text-xs shadow-xl"
          >
            Calculate Heat Load & Quotation
          </button>
        </div>
      </section>
    </>
  );
}
