import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Check, Download } from 'lucide-react';

export default function ProductCard({ product, onOpenQuote }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-premium-hover transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Product Image */}
      <div className="relative h-52 bg-gradient-to-b from-slate-50 to-slate-100/90 overflow-hidden flex items-center justify-center p-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-navy-950/85 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-white/10 shadow-xs">
          {product.category}
        </span>

        {/* Capacity / Efficiency Tag */}
        {product.efficiencyRating && (
          <span className="absolute bottom-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
            {product.efficiencyRating}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-navy-900 group-hover:text-hvac-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">
            {product.description}
          </p>

          {/* Key Features Bullets */}
          {product.keyFeatures && product.keyFeatures.length > 0 && (
            <ul className="mt-3 space-y-1">
              {product.keyFeatures.slice(0, 2).map((feat, i) => (
                <li key={i} className="text-[11px] text-slate-600 flex items-center">
                  <Check className="w-3 h-3 text-hvac-500 mr-1.5 shrink-0" />
                  <span className="truncate">{feat}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Card Actions */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
          <Link
            to={`/products/${product.slug}`}
            className="text-xs font-bold text-slate-700 hover:text-hvac-600 flex items-center"
          >
            <span>Specs & Details</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <button
            onClick={() => onOpenQuote ? onOpenQuote(product) : null}
            className="px-3 py-1.5 rounded-lg bg-hvac-50 hover:bg-hvac-600 text-hvac-700 hover:text-white text-xs font-bold transition-all shadow-2xs"
          >
            Request Quote
          </button>
        </div>
      </div>
    </div>
  );
}
