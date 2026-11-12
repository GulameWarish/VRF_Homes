import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Package, Check, ArrowRight, Download, 
  ShieldCheck, Cpu, Zap, FileText 
} from 'lucide-react';
import api from '../services/api';
import SEO from '../components/common/SEO';
import ProductCard from '../components/cards/ProductCard';

export default function ProductDetailPage({ onOpenQuote }) {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await api.get(`/products/${slug}`);
        if (res.data.success) {
          setProduct(res.data.data);
          setRelatedProducts(res.data.relatedProducts || []);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-8 h-8 border-3 border-hvac-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-xs text-slate-500">Loading technical specifications...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="py-24 text-center max-w-md mx-auto px-4">
        <h2 className="text-xl font-bold text-navy-950">System Specification Not Found</h2>
        <p className="text-xs text-slate-500 mt-2 mb-6">The requested product could not be located in our inventory database.</p>
        <Link to="/products" className="px-5 py-2.5 rounded-xl bg-hvac-600 text-white font-bold text-xs">
          Return to Equipment Catalog
        </Link>
      </div>
    );
  }

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    category: product.category,
    brand: {
      '@type': 'Brand',
      name: product.relatedBrands?.[0] || 'VRF Homes'
    }
  };

  return (
    <>
      <SEO
        title={product.seoTitle || `${product.name} | Specs & Quotation`}
        description={product.seoDescription || product.description}
        schemaData={productSchema}
      />

      {/* Breadcrumb & Main Overview */}
      <section className="py-8 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
            <Link to="/" className="hover:text-hvac-600">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-hvac-600">Products</Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold truncate">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Product Image Stage */}
            <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-navy-950/80 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border border-white/10">
                  {product.category}
                </span>
                {product.efficiencyRating && (
                  <span className="absolute bottom-4 left-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded shadow-md">
                    {product.efficiencyRating}
                  </span>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-hvac-600 uppercase tracking-wider">
                  {product.category}
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-navy-950 tracking-tight mt-1">
                  {product.name}
                </h1>
                {product.tagline && (
                  <p className="text-sm font-semibold text-slate-500 mt-2">
                    {product.tagline}
                  </p>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* Related Brands */}
              {product.relatedBrands?.length > 0 && (
                <div>
                  <span className="text-xs font-bold text-slate-700 block mb-2">
                    Manufacturer / Partner Platforms:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.relatedBrands.map((b, i) => (
                      <span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-navy-900 shadow-2xs">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-3">
                <button
                  onClick={() => onOpenQuote({ productInterest: product.category, message: `Inquiring about specifications and quotation for ${product.name}.` })}
                  className="px-6 py-3.5 rounded-xl bg-hvac-600 hover:bg-hvac-500 text-white font-bold text-xs shadow-md shadow-hvac-600/30 flex items-center space-x-2"
                >
                  <span>Request System Quotation &amp; Sizing</span>
                </button>

                {product.brochureUrl ? (
                  <a
                    href={product.brochureUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-200 flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4 text-hvac-600" />
                    <span>Download Engineering Brochure</span>
                  </a>
                ) : (
                  <button
                    onClick={() => onOpenQuote({ productInterest: product.category, message: `Please email the engineering technical brochure for ${product.name}.` })}
                    className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-200 flex items-center space-x-2"
                  >
                    <FileText className="w-4 h-4 text-hvac-600" />
                    <span>Request Technical Data Sheet</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features & Applications */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Key Features */}
            <div>
              <h3 className="text-xl font-extrabold text-navy-950 mb-4">
                Core Engineering Features
              </h3>
              <div className="space-y-3">
                {product.keyFeatures?.map((feat, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-hvac-100 text-hvac-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-semibold text-slate-700 leading-relaxed">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Typical Applications */}
            <div>
              <h3 className="text-xl font-extrabold text-navy-950 mb-4">
                Recommended Applications
              </h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {product.applications?.map((app, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs font-bold text-navy-900 flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-hvac-500"></span>
                    <span>{app}</span>
                  </div>
                ))}
              </div>

              {/* Peace of Mind Guarantee */}
              <div className="p-6 rounded-2xl bg-gradient-to-tr from-navy-950 to-navy-900 text-white space-y-2">
                <div className="flex items-center space-x-2 text-cyan-300 font-bold text-xs uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>OEM Warranty & Commissioning Guarantee</span>
                </div>
                <h4 className="text-base font-bold text-white">Full Manufacturer Warranty Compliance</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every installation is registered with official OEM factory diagnostics and backed by our comprehensive 1-year operational commissioning guarantee.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications Table */}
      {product.technicalSpecs?.length > 0 && (
        <section className="py-16 bg-slate-50 border-t border-slate-200/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-extrabold text-navy-950">
                Technical Specifications & Operating Parameters
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Engineering values verified under standard test conditions (AHRI / ISO 13253).
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-5">Engineering Parameter</th>
                    <th className="py-3 px-5">Specified Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {product.technicalSpecs.map((spec, i) => (
                    <tr key={i} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-5 font-bold text-navy-900">{spec.label}</td>
                      <td className="py-3.5 px-5 font-medium text-slate-600">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-white border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-extrabold text-navy-950 mb-8">
              Related Systems in {product.category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p._id} product={p} onOpenQuote={onOpenQuote} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
