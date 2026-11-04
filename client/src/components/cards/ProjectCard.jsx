import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, CheckCircle2, ArrowRight, Cpu } from 'lucide-react';

export default function ProjectCard({ project }) {
  const formatDate = (d) => {
    if (!d) return null;
    return new Date(d).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const completionStr = formatDate(project.actualCompletionDate || project.expectedCompletionDate);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-premium-hover transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Cover Image */}
      <div className="relative h-60 bg-slate-100 overflow-hidden">
        <img
          src={project.coverImage}
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent"></div>

        {/* Category & Status Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="bg-navy-950/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-white/10">
            {project.category}
          </span>

          {project.showStatusPublicly && (
            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded shadow-sm flex items-center space-x-1 ${
              project.status === 'Completed'
                ? 'bg-emerald-500 text-white'
                : 'bg-amber-500 text-white'
            }`}>
              <CheckCircle2 className="w-3 h-3 mr-1" />
              <span>{project.status}</span>
            </span>
          )}
        </div>

        {/* Location at bottom of image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center text-slate-200 text-xs">
          <MapPin className="w-3.5 h-3.5 mr-1 text-hvac-400 shrink-0" />
          <span className="truncate font-medium">{project.location}</span>
        </div>
      </div>

      {/* Card Info */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-navy-900 group-hover:text-hvac-600 transition-colors line-clamp-1">
            {project.name}
          </h3>

          <div className="mt-2 flex items-start space-x-1.5 text-xs text-slate-600">
            <Cpu className="w-3.5 h-3.5 text-hvac-600 shrink-0 mt-0.5" />
            <span className="line-clamp-2 font-medium">{project.hvacSystem}</span>
          </div>

          <p className="text-xs text-slate-500 mt-2 line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Footer with Completion Date */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          {project.showCompletionDatePublicly && completionStr ? (
            <div className="flex items-center text-slate-500">
              <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" />
              <span className="text-[11px]">Finished: <strong className="text-slate-700">{completionStr}</strong></span>
            </div>
          ) : (
            <span className="text-[11px] text-slate-400">Verified Execution</span>
          )}

          <Link
            to={`/projects/${project.slug}`}
            className="text-xs font-bold text-hvac-600 hover:text-hvac-700 flex items-center group-hover:underline"
          >
            <span>Case Study</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
