import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FolderKanban, MapPin, Calendar, CheckCircle2, 
  ArrowRight, Cpu, Building, ShieldCheck, Sparkles 
} from 'lucide-react';
import api from '../services/api';
import SEO from '../components/common/SEO';
import ProjectCard from '../components/cards/ProjectCard';

export default function ProjectDetailPage({ onOpenQuote }) {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await api.get(`/projects/detail/${slug}`);
        if (res.data.success) {
          setProject(res.data.data);
          setRelatedProjects(res.data.relatedProjects || []);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-8 h-8 border-3 border-hvac-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-xs text-slate-500">Loading project commissioning records...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="py-24 text-center max-w-md mx-auto px-4">
        <h2 className="text-xl font-bold text-navy-950">Project Case Study Not Found</h2>
        <p className="text-xs text-slate-500 mt-2 mb-6">The requested project could not be found or has not been made public.</p>
        <Link to="/projects" className="px-5 py-2.5 rounded-xl bg-hvac-600 text-white font-bold text-xs">
          Explore All Projects
        </Link>
      </div>
    );
  }

  const formatDate = (d) => {
    if (!d) return null;
    return new Date(d).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const startStr = formatDate(project.startDate);
  const completionStr = formatDate(project.actualCompletionDate || project.expectedCompletionDate);

  return (
    <>
      <SEO
        title={project.seoTitle || `${project.name} | Case Study`}
        description={project.seoDescription || project.description}
      />

      {/* Hero Header */}
      <section className="relative min-h-[50vh] flex items-center bg-navy-950 text-white overflow-hidden py-16">
        <div className="absolute inset-0 z-0">
          <img
            src={project.coverImage}
            alt={project.name}
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-900/60"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="bg-white/10 text-cyan-200 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md border border-white/15">
                {project.category}
              </span>
              {project.showStatusPublicly && (
                <span className="bg-emerald-500/90 text-white text-xs font-bold px-3 py-1 rounded-md flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  <span>{project.status}</span>
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {project.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <span className="flex items-center">
                <MapPin className="w-4 h-4 text-hvac-400 mr-1.5" />
                {project.location}
              </span>
              <span>•</span>
              <span className="flex items-center">
                <Cpu className="w-4 h-4 text-hvac-400 mr-1.5" />
                {project.hvacSystem}
              </span>
            </div>

            {/* Public Dates Summary */}
            <div className="mt-6 flex flex-wrap gap-4 text-xs">
              {project.showStartDatePublicly && startStr && (
                <div className="bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10">
                  <span className="text-slate-400 block text-[10px]">Start Date</span>
                  <span className="font-bold text-white">{startStr}</span>
                </div>
              )}

              {project.showCompletionDatePublicly && completionStr && (
                <div className="bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10">
                  <span className="text-emerald-400 block text-[10px]">Actual Completion Date</span>
                  <span className="font-bold text-white">{completionStr}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Overview & Milestones (2 cols) */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="text-2xl font-extrabold text-navy-950 mb-4">
                  Project Scope & HVAC Overview
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              </div>

              {/* Milestones Timeline */}
              {project.milestones && project.milestones.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-navy-950 mb-6">
                    Project Execution Milestones & Validation
                  </h3>
                  <div className="space-y-4 border-l-2 border-hvac-200 ml-3 pl-6">
                    {project.milestones.map((m, i) => (
                      <div key={i} className="relative">
                        <div className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 border-white ${
                          m.isCompleted ? 'bg-emerald-500' : 'bg-slate-300'
                        }`}></div>
                        <h4 className="text-sm font-bold text-navy-900">{m.title}</h4>
                        {m.description && <p className="text-xs text-slate-500 mt-0.5">{m.description}</p>}
                        {m.completedDate && (
                          <span className="text-[10px] text-slate-400 font-semibold block mt-1">
                            Verified: {new Date(m.completedDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-navy-950 mb-4">
                    On-Site Photographic Documentation
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.gallery.map((img, i) => (
                      <div key={i} className="rounded-2xl overflow-hidden h-52 bg-slate-100 border border-slate-200">
                        <img src={img} alt={`${project.name} gallery ${i}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Specifications */}
            <div className="space-y-6">
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-navy-950">
                  Commissioning Summary
                </h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">System Architecture</span>
                    <span className="font-bold text-navy-950">{project.hvacSystem}</span>
                  </div>
                  {project.brand && (
                    <div>
                      <span className="text-slate-400 block text-[11px]">Equipment Brand</span>
                      <span className="font-bold text-navy-950">{project.brand}</span>
                    </div>
                  )}
                  {project.capacity && (
                    <div>
                      <span className="text-slate-400 block text-[11px]">Total Tonnage / Capacity</span>
                      <span className="font-bold text-navy-950">{project.capacity}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-slate-400 block text-[11px]">Sector Typology</span>
                    <span className="font-bold text-navy-950">{project.category} ({project.projectType})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Location</span>
                    <span className="font-bold text-navy-950">{project.location}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <button
                    onClick={() => onOpenQuote({ propertyType: project.name, message: `I would like a similar HVAC installation as demonstrated in ${project.name}.` })}
                    className="w-full py-3 rounded-xl bg-hvac-600 hover:bg-hvac-500 text-white font-bold text-xs shadow-md shadow-hvac-600/20"
                  >
                    Request Similar Engineering
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 bg-slate-50 border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-extrabold text-navy-950 mb-8">
              Other Showcase Case Studies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((p) => (
                <ProjectCard key={p._id} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
