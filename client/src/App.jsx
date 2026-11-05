import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Outlet, Link } from 'react-router-dom';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LiveSearchModal from './components/modals/LiveSearchModal';
import QuoteModal from './components/modals/QuoteModal';
import FloatingContactWidget from './components/common/FloatingContactWidget';

// Public Pages
import HomePage from './pages/HomePage';
import CommercialCatalogPage from './pages/CommercialCatalogPage';
import CommercialDetailPage from './pages/CommercialDetailPage';
import ResidentialCatalogPage from './pages/ResidentialCatalogPage';
import ResidentialDetailPage from './pages/ResidentialDetailPage';
import ProductsCatalogPage from './pages/ProductsCatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import FeaturesPage from './pages/FeaturesPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import InsightsPage from './pages/InsightsPage';
import InsightDetailPage from './pages/InsightDetailPage';
import QuotePage from './pages/QuotePage';
import SearchResultsPage from './pages/SearchResultsPage';
import LocationsHubPage from './pages/LocationsHubPage';
import CityLocationPage from './pages/CityLocationPage';
import { 
  AboutPage, 
  ContactPage, 
  PrivacyPolicyPage, 
  TermsPage, 
  SitemapPage 
} from './pages/StaticPages';

// Scroll to top helper on navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Public Layout wrapper with Navbar, Footer, and Modals
function PublicLayout({ onOpenQuote, onOpenSearch }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar onOpenQuote={onOpenQuote} onOpenSearch={onOpenSearch} />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <FloatingContactWidget onOpenQuote={onOpenQuote} />
    </div>
  );
}

// 404 Not Found Page
function NotFoundPage({ onOpenQuote }) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20">
      <span className="text-6xl font-black text-[#009fe3] mb-2">404</span>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950 mb-3">Page Not Found</h1>
      <p className="text-slate-600 max-w-md mb-8">
        The air conditioning specification or resource you are looking for has been relocated or is temporarily unavailable.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link 
          to="/" 
          className="px-6 py-3 bg-[#009fe3] hover:bg-[#0089c4] text-white font-bold rounded-lg transition-all shadow-md"
        >
          Return to Homepage
        </Link>
        <button 
          onClick={() => onOpenQuote()} 
          className="px-6 py-3 bg-navy-900 hover:bg-navy-950 text-white font-bold rounded-lg transition-all shadow-md"
        >
          Request Free Consultation
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteInitialData, setQuoteInitialData] = useState({});
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleOpenQuote = (initialData = {}) => {
    setQuoteInitialData(initialData);
    setIsQuoteOpen(true);
  };

  const handleCloseQuote = () => {
    setIsQuoteOpen(false);
    setQuoteInitialData({});
  };

  const handleOpenSearch = () => setIsSearchOpen(true);
  const handleCloseSearch = () => setIsSearchOpen(false);

  // Keyboard shortcut Ctrl+K or Cmd+K for quick global search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route element={<PublicLayout onOpenQuote={handleOpenQuote} onOpenSearch={handleOpenSearch} />}>
          {/* Home */}
          <Route path="/" element={<HomePage onOpenQuote={handleOpenQuote} />} />
          
          {/* Product routes matching navbar */}
          <Route path="/product" element={<ProductsCatalogPage onOpenQuote={handleOpenQuote} />} />
          <Route path="/products" element={<ProductsCatalogPage onOpenQuote={handleOpenQuote} />} />
          <Route path="/products/:slug" element={<ProductDetailPage onOpenQuote={handleOpenQuote} />} />
          
          {/* Features */}
          <Route path="/features" element={<FeaturesPage onOpenQuote={handleOpenQuote} />} />
          
          {/* Blogs / Insights */}
          <Route path="/blogs" element={<InsightsPage />} />
          <Route path="/blogs/:slug" element={<InsightDetailPage onOpenQuote={handleOpenQuote} />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/insights/:slug" element={<InsightDetailPage onOpenQuote={handleOpenQuote} />} />
          
          {/* Quote & Search */}
          <Route path="/quote" element={<QuotePage />} />
          <Route path="/request-a-quote" element={<QuotePage />} />
          <Route path="/search" element={<SearchResultsPage onOpenQuote={handleOpenQuote} />} />
          
          {/* Solutions & Projects */}
          <Route path="/commercial" element={<CommercialCatalogPage onOpenQuote={handleOpenQuote} />} />
          <Route path="/commercial/:slug" element={<CommercialDetailPage onOpenQuote={handleOpenQuote} />} />
          <Route path="/residential" element={<ResidentialCatalogPage onOpenQuote={handleOpenQuote} />} />
          <Route path="/residential/:slug" element={<ResidentialDetailPage onOpenQuote={handleOpenQuote} />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage onOpenQuote={handleOpenQuote} />} />
          
          {/* Static Pages */}
          <Route path="/about" element={<AboutPage onOpenQuote={handleOpenQuote} />} />
          <Route path="/contact" element={<ContactPage onOpenQuote={handleOpenQuote} />} />
          <Route path="/locations" element={<LocationsHubPage onOpenQuote={handleOpenQuote} />} />
          <Route path="/locations/:citySlug" element={<CityLocationPage onOpenQuote={handleOpenQuote} />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/sitemap" element={<SitemapPage />} />
          
          {/* 404 Catch-All */}
          <Route path="*" element={<NotFoundPage onOpenQuote={handleOpenQuote} />} />
        </Route>
      </Routes>

      {/* Global Interactive Modals */}
      <QuoteModal 
        isOpen={isQuoteOpen} 
        onClose={handleCloseQuote} 
        initialData={quoteInitialData} 
      />
      <LiveSearchModal 
        isOpen={isSearchOpen} 
        onClose={handleCloseSearch} 
      />
    </>
  );
}
