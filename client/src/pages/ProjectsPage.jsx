import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FolderKanban, Search, Filter } from 'lucide-react';
import api from '../services/api';
import SEO from '../components/common/SEO';
import ProjectCard from '../components/cards/ProjectCard';

export default function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const selectedCategory = searchParams.get('category') || 'All';
  const selectedType = searchParams.get('type') || 'All';

  const categories = ['All', 'Commercial', 'Residential', 'Industrial', 'Hospitality', 'Healthcare'];

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        let url = `/projects?limit=50`;
        if (selectedCategory && selectedCategory !== 'All') {
          url += `&category=${encodeURIComponent(selectedCategory)}`;
        }
        if (selectedType && selectedType !== 'All') {
          url += `&type=${encodeURIComponent(selectedType)}`;
        }

        const res = await api.get(url);
        if (res.data.success) {
          setProjects(res.data.data);
        }
      } catch (err) {
        console.error('Projects fetch error:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [selectedCategory, selectedType]);

  const handleCategoryChange = (cat) => {
    const params = new URLSearchParams(searchParams);
    if (cat === 'All') params.delete('category');
    else params.set('category', cat);
    setSearchParams(params);
  };

  return (
    <>
      <SEO 
        title="Completed HVAC Projects & Commissioning Records"
        description="Explore documented HVAC installations across Delhi NCR, Gurugram, Noida, and Jaipur. Documented start dates, completion dates, and installed tonnages."
      />

      <section className="bg-navy-950 text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-cyan-200 text-xs font-semibold mb-4 border border-white/15">
            <FolderKanban className="w-3.5 h-3.5 text-cyan-300" />
            <span>Documented Commissioning Portfolio</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            HVAC Projects & Case Studies
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Review verified execution records, actual completion dates, and engineering specifications for luxury residences, hospitals, and industrial hubs.
          </p>
        </div>
      </section>

      <section className="py-12 bg-slate-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-bold text-slate-400 mr-2 flex items-center">
                <Filter className="w-3.5 h-3.5 mr-1 text-hvac-600" />
                Sector:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-navy-950 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <span className="text-xs font-semibold text-slate-500">
              Showing <strong className="text-navy-950">{projects.length}</strong> verified projects
            </span>
          </div>

          {loading ? (
            <div className="py-24 text-center">
              <div className="w-8 h-8 border-3 border-hvac-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-xs text-slate-500 font-semibold">Loading project case studies...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
              <FolderKanban className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-navy-950">No projects found in this category</h3>
              <p className="text-xs text-slate-500 mt-1 mb-4">Try selecting "All" to view our complete project portfolio.</p>
              <button
                onClick={() => setSearchParams({})}
                className="px-4 py-2 bg-hvac-600 text-white rounded-xl text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <ProjectCard key={proj._id} project={proj} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
