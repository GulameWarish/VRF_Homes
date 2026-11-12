import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, Phone, ChevronDown, Menu, X, ArrowRight, 
  MessageCircle, Building2, Home, Layers, Wrench 
} from 'lucide-react';
import api from '../../services/api';

// Mega Menu Panels
import MegaMenuResidential from './MegaMenuResidential';
import MegaMenuCommercial from './MegaMenuCommercial';
import MegaMenuProducts from './MegaMenuProducts';
import MegaMenuServices from './MegaMenuServices';
import SocialLinks from '../common/SocialLinks';

// Animated Draw Outline Button matching HVAC Theme
export function DrawOutlineButton({ children, onClick, className = "", lineColor = "bg-white", ...rest }) {
  return (
    <button
      onClick={onClick}
      {...rest}
      className={`group relative px-4 xl:px-5 py-2.5 font-extrabold uppercase text-xs tracking-wider text-white transition-all duration-[300ms] hover:text-cyan-100 hover:bg-black/15 overflow-hidden shrink-0 ${className}`}
    >
      <span className="relative z-10 flex items-center space-x-1.5">{children}</span>

      {/* TOP */}
      <span className={`absolute left-0 top-0 h-[2px] w-0 ${lineColor} transition-all duration-100 group-hover:w-full shadow-[0_0_8px_rgba(255,255,255,0.9)]`} />

      {/* RIGHT */}
      <span className={`absolute right-0 top-0 h-0 w-[2px] ${lineColor} transition-all delay-100 duration-100 group-hover:h-full shadow-[0_0_8px_rgba(255,255,255,0.9)]`} />

      {/* BOTTOM */}
      <span className={`absolute bottom-0 right-0 h-[2px] w-0 ${lineColor} transition-all delay-200 duration-100 group-hover:w-full shadow-[0_0_8px_rgba(255,255,255,0.9)]`} />

      {/* LEFT */}
      <span className={`absolute bottom-0 left-0 h-0 w-[2px] ${lineColor} transition-all delay-300 duration-100 group-hover:h-full shadow-[0_0_8px_rgba(255,255,255,0.9)]`} />
    </button>
  );
}

// Animated Draw Outline NavLink for Header Navigation Links (HOME, INSIGHTS)
export function DrawOutlineNavLink({ to, children, className = "", lineColor = "bg-white", ...rest }) {
  return (
    <NavLink
      to={to}
      {...rest}
      className={({ isActive }) => `group relative px-3.5 xl:px-4 py-3 font-bold uppercase text-xs xl:text-sm tracking-wide text-white transition-all duration-[300ms] hover:text-cyan-100 hover:bg-black/15 overflow-hidden flex items-center space-x-1 shrink-0 ${
        isActive ? 'bg-black/20 text-white' : ''
      } ${className}`}
    >
      <span className="relative z-10 flex items-center space-x-1">{children}</span>

      {/* TOP */}
      <span className={`absolute left-0 top-0 h-[2px] w-0 ${lineColor} transition-all duration-100 group-hover:w-full shadow-[0_0_8px_rgba(255,255,255,0.9)]`} />

      {/* RIGHT */}
      <span className={`absolute right-0 top-0 h-0 w-[2px] ${lineColor} transition-all delay-100 duration-100 group-hover:h-full shadow-[0_0_8px_rgba(255,255,255,0.9)]`} />

      {/* BOTTOM */}
      <span className={`absolute bottom-0 right-0 h-[2px] w-0 ${lineColor} transition-all delay-200 duration-100 group-hover:w-full shadow-[0_0_8px_rgba(255,255,255,0.9)]`} />

      {/* LEFT */}
      <span className={`absolute bottom-0 left-0 h-0 w-[2px] ${lineColor} transition-all delay-300 duration-100 group-hover:h-full shadow-[0_0_8px_rgba(255,255,255,0.9)]`} />
    </NavLink>
  );
}

// Draw Outline Menu Trigger for Mega Menus (RESIDENTIAL, COMMERCIAL, PRODUCTS, SERVICES)
export function DrawOutlineMenuTrigger({ 
  to, 
  label, 
  isOpen, 
  onMouseEnter, 
  onMouseLeave, 
  onClick, 
  className = "", 
  lineColor = "bg-white" 
}) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="relative shrink-0"
    >
      <Link
        to={to}
        onClick={onClick}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`group relative px-3.5 xl:px-4 py-3 font-bold uppercase text-xs xl:text-sm tracking-wide text-white transition-all duration-[300ms] hover:text-cyan-100 hover:bg-black/15 overflow-hidden flex items-center space-x-1 ${
          isOpen ? 'bg-black/25 text-cyan-200' : ''
        } ${className}`}
      >
        <span className="relative z-10 flex items-center space-x-1">
          <span>{label}</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-cyan-300' : ''}`} />
        </span>

        {/* TOP */}
        <span className={`absolute left-0 top-0 h-[2px] w-0 ${lineColor} transition-all duration-100 group-hover:w-full shadow-[0_0_8px_rgba(255,255,255,0.9)]`} />

        {/* RIGHT */}
        <span className={`absolute right-0 top-0 h-0 w-[2px] ${lineColor} transition-all delay-100 duration-100 group-hover:h-full shadow-[0_0_8px_rgba(255,255,255,0.9)]`} />

        {/* BOTTOM */}
        <span className={`absolute bottom-0 right-0 h-[2px] w-0 ${lineColor} transition-all delay-200 duration-100 group-hover:w-full shadow-[0_0_8px_rgba(255,255,255,0.9)]`} />

        {/* LEFT */}
        <span className={`absolute bottom-0 left-0 h-0 w-[2px] ${lineColor} transition-all delay-300 duration-100 group-hover:h-full shadow-[0_0_8px_rgba(255,255,255,0.9)]`} />
      </Link>
    </div>
  );
}

// Draw Outline Link for Header Top Row (Call Button)
export function DrawOutlineLink({ children, href, className = "", lineColor = "bg-[#009fe3]", ...rest }) {
  return (
    <a
      href={href}
      {...rest}
      className={`group relative px-3 py-1.5 text-xs font-bold text-navy-950 transition-colors duration-[300ms] hover:text-[#009fe3] bg-slate-50 overflow-hidden rounded-md border border-slate-200 ${className}`}
    >
      <span className="relative z-10 flex items-center space-x-1.5">{children}</span>

      {/* TOP */}
      <span className={`absolute left-0 top-0 h-[2px] w-0 ${lineColor} transition-all duration-100 group-hover:w-full`} />

      {/* RIGHT */}
      <span className={`absolute right-0 top-0 h-0 w-[2px] ${lineColor} transition-all delay-100 duration-100 group-hover:h-full`} />

      {/* BOTTOM */}
      <span className={`absolute bottom-0 right-0 h-[2px] w-0 ${lineColor} transition-all delay-200 duration-100 group-hover:w-full`} />

      {/* LEFT */}
      <span className={`absolute bottom-0 left-0 h-0 w-[2px] ${lineColor} transition-all delay-300 duration-100 group-hover:h-full`} />
    </a>
  );
}

export default function Navbar({ onOpenQuote, onOpenSearch }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'residential' | 'commercial' | 'products' | 'services' | null
  const [mobileAccordion, setMobileAccordion] = useState(null); // 'residential' | 'commercial' | 'products' | 'services' | null
  const [searchQuery, setSearchQuery] = useState('');
  const [settings, setSettings] = useState(null);

  const navRef = useRef(null);
  const leaveTimeoutRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close mega menu on route change
  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Fetch company settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        if (res.data.success) {
          setSettings(res.data.data);
        }
      } catch (err) {
        // Fallback default
      }
    };
    fetchSettings();
  }, []);

  // Handle outside click & Escape key to close menus
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Hover Intent Helpers
  const handleMouseEnter = (menuKey) => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
    }
    setActiveDropdown(menuKey);
  };

  const handleMouseLeave = () => {
    leaveTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const handleDropdownPanelMouseEnter = () => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
    }
  };

  const handleDropdownPanelMouseLeave = () => {
    leaveTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    } else if (onOpenSearch) {
      onOpenSearch();
    }
  };

  const toggleMobileAccordion = (key) => {
    setMobileAccordion(prev => prev === key ? null : key);
  };

  return (
    <header ref={navRef} className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Bar with Brand Logo and Search */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between">
        
        {/* VRF HOME Logo (Fluid Responsive Scaling) */}
        <Link to="/" className="flex items-center space-x-1.5 sm:space-x-2 group shrink-0">
          <div className="flex items-baseline">
            <span className="text-2xl xs:text-3xl sm:text-4xl font-black italic tracking-tighter text-[#009fe3] uppercase drop-shadow-sm group-hover:scale-105 transition-transform">
              VRF
            </span>
            <span className="text-xl xs:text-2xl sm:text-3xl font-extrabold tracking-tight text-navy-950 uppercase ml-1.5 sm:ml-2">
              HOME
            </span>
          </div>
        </Link>

        {/* Right side: Search Box and Contact Quick Link */}
        <div className="flex items-center space-x-1.5 sm:space-x-3 md:space-x-5 shrink-0">
          {/* Search Box as seen in reference image */}
          <form 
            onSubmit={handleSearchSubmit} 
            className="relative hidden sm:flex items-center w-48 md:w-60 lg:w-72"
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-3.5 pr-9 py-1.5 text-xs sm:text-sm bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-[#009fe3] rounded-md focus:outline-none focus:ring-1 focus:ring-[#009fe3] text-slate-800 placeholder-slate-400 transition-all shadow-inner"
            />
            <button
              type="submit"
              title="Search"
              className="absolute right-1 top-1 bottom-1 px-2.5 text-slate-500 hover:text-[#009fe3] flex items-center justify-center transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* WhatsApp Direct */}
          <a
            href={`https://wa.me/${(settings?.whatsapp || '918896921318').replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-2.5 sm:px-3.5 py-1.5 rounded-md transition-colors shadow-sm shrink-0"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          {/* Mobile Search Icon */}
          <button
            onClick={() => onOpenSearch && onOpenSearch()}
            className="sm:hidden p-1.5 text-slate-600 hover:text-[#009fe3]"
            title="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-slate-700 hover:text-[#009fe3]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Solid Cyan/Blue Navigation Bar */}
      <nav className="relative bg-[#009fe3] text-white select-none">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="hidden lg:flex items-center justify-between">
            
            {/* Primary Nav Links: HOME | RESIDENTIAL | COMMERCIAL | PRODUCTS | SERVICES | INSIGHTS | GET A FREE ESTIMATE */}
            <div className="flex items-center space-x-0.5 xl:space-x-1 text-[11px] lg:text-xs xl:text-sm font-bold tracking-tight xl:tracking-wide uppercase shrink-0">
              
              {/* 1. HOME */}
              <DrawOutlineNavLink to="/">
                HOME
              </DrawOutlineNavLink>

              {/* 2. RESIDENTIAL (Mega Menu) */}
              <DrawOutlineMenuTrigger
                to="/residential"
                label="RESIDENTIAL"
                isOpen={activeDropdown === 'residential'}
                onMouseEnter={() => handleMouseEnter('residential')}
                onMouseLeave={handleMouseLeave}
                onClick={() => setActiveDropdown(prev => prev === 'residential' ? null : 'residential')}
              />

              {/* 3. COMMERCIAL (Mega Menu) */}
              <DrawOutlineMenuTrigger
                to="/commercial"
                label="COMMERCIAL"
                isOpen={activeDropdown === 'commercial'}
                onMouseEnter={() => handleMouseEnter('commercial')}
                onMouseLeave={handleMouseLeave}
                onClick={() => setActiveDropdown(prev => prev === 'commercial' ? null : 'commercial')}
              />

              {/* 4. PRODUCTS (Animated Brand Showcase Mega Menu) */}
              <DrawOutlineMenuTrigger
                to="/products"
                label="PRODUCTS"
                isOpen={activeDropdown === 'products'}
                onMouseEnter={() => handleMouseEnter('products')}
                onMouseLeave={handleMouseLeave}
                onClick={() => setActiveDropdown(prev => prev === 'products' ? null : 'products')}
              />

              {/* 5. SERVICES (Mega Menu) */}
              <DrawOutlineMenuTrigger
                to="/quote"
                label="SERVICES"
                isOpen={activeDropdown === 'services'}
                onMouseEnter={() => handleMouseEnter('services')}
                onMouseLeave={handleMouseLeave}
                onClick={() => setActiveDropdown(prev => prev === 'services' ? null : 'services')}
              />

              {/* 6. INSIGHTS */}
              <DrawOutlineNavLink to="/insights">
                INSIGHTS
              </DrawOutlineNavLink>

              {/* 7. GET A FREE ESTIMATE */}
              <Link
                to="/quote"
                className="group relative px-4 xl:px-5 py-2.5 font-extrabold uppercase text-xs tracking-wider text-white transition-all duration-[300ms] hover:text-cyan-100 hover:bg-black/15 overflow-hidden shrink-0 flex items-center justify-center"
              >
                <span>GET A FREE ESTIMATE</span>

                {/* TOP */}
                <span className="absolute left-0 top-0 h-[2px] w-0 bg-white transition-all duration-100 group-hover:w-full shadow-[0_0_8px_rgba(255,255,255,0.9)]" />

                {/* RIGHT */}
                <span className="absolute right-0 top-0 h-0 w-[2px] bg-white transition-all delay-100 duration-100 group-hover:h-full shadow-[0_0_8px_rgba(255,255,255,0.9)]" />

                {/* BOTTOM */}
                <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-white transition-all delay-200 duration-100 group-hover:w-full shadow-[0_0_8px_rgba(255,255,255,0.9)]" />

                {/* LEFT */}
                <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-white transition-all delay-300 duration-100 group-hover:h-full shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop Mega Menu Dropdown Container */}
        {activeDropdown && (
          <div
            onMouseEnter={handleDropdownPanelMouseEnter}
            onMouseLeave={handleDropdownPanelMouseLeave}
            className="hidden lg:block absolute top-full left-0 w-full z-50 normal-case"
          >
            {activeDropdown === 'residential' && (
              <MegaMenuResidential 
                onClose={() => setActiveDropdown(null)} 
                onOpenQuote={onOpenQuote} 
              />
            )}
            {activeDropdown === 'commercial' && (
              <MegaMenuCommercial 
                onClose={() => setActiveDropdown(null)} 
                onOpenQuote={onOpenQuote} 
              />
            )}
            {activeDropdown === 'products' && (
              <MegaMenuProducts 
                onClose={() => setActiveDropdown(null)} 
                onOpenQuote={onOpenQuote} 
              />
            )}
            {activeDropdown === 'services' && (
              <MegaMenuServices 
                onClose={() => setActiveDropdown(null)} 
                onOpenQuote={onOpenQuote} 
              />
            )}
          </div>
        )}

        {/* Mobile Navigation Drawer with Accordion Support */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-navy-950 text-white border-t border-white/10 px-4 py-5 space-y-3 max-h-[85vh] overflow-y-auto">
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products, brands & articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-3 pr-10 py-2.5 text-xs bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#009fe3]"
                />
                <button type="submit" className="absolute right-3 top-3 text-slate-400">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* 1. HOME */}
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg font-bold hover:bg-white/10 text-sm tracking-wide"
            >
              HOME
            </Link>

            {/* 2. RESIDENTIAL (Accordion) */}
            <div className="border-b border-white/10 pb-2">
              <button
                onClick={() => toggleMobileAccordion('residential')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg font-bold hover:bg-white/10 text-sm tracking-wide"
              >
                <span>RESIDENTIAL</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === 'residential' ? 'rotate-180 text-[#009fe3]' : ''}`} />
              </button>

              {mobileAccordion === 'residential' && (
                <div className="mt-2 pl-3 pr-2 space-y-2 bg-white/5 rounded-xl p-3 border border-white/10 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Link
                      to="/residential/luxury-villas"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block p-2 rounded-lg hover:bg-white/10"
                    >
                      <div className="font-bold text-cyan-200">Home & Villa AC Solutions</div>
                      <div className="text-[10px] text-slate-400">Central VRF for villas & bungalows</div>
                    </Link>
                    <Link
                      to="/residential/apartments-penthouses"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block p-2 rounded-lg hover:bg-white/10"
                    >
                      <div className="font-bold text-cyan-200">Apartment HVAC Solutions</div>
                      <div className="text-[10px] text-slate-400">Compact balcony-friendly units</div>
                    </Link>
                    <Link
                      to="/products?category=Ductable+AC"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block p-2 rounded-lg hover:bg-white/10"
                    >
                      <div className="font-bold text-cyan-200">Ductable & Cassette AC</div>
                      <div className="text-[10px] text-slate-400">Concealed false ceiling cooling</div>
                    </Link>
                    <Link
                      to="/products?category=Split+AC"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block p-2 rounded-lg hover:bg-white/10"
                    >
                      <div className="font-bold text-cyan-200">Split & Tower AC</div>
                      <div className="text-[10px] text-slate-400">Inverter hi-wall split systems</div>
                    </Link>
                    <Link
                      to="/features"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block p-2 rounded-lg hover:bg-white/10"
                    >
                      <div className="font-bold text-cyan-200">Smart Home Climate Control</div>
                      <div className="text-[10px] text-slate-400">Touch BMS & mobile WiFi controls</div>
                    </Link>
                    <Link
                      to="/quote"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block p-2 rounded-lg hover:bg-white/10"
                    >
                      <div className="font-bold text-cyan-200">Installation & AMC</div>
                      <div className="text-[10px] text-slate-400">Nitrogen holding tests & service care</div>
                    </Link>
                  </div>
                  <div className="pt-2 border-t border-white/10">
                    <Link
                      to="/residential"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-center py-2 px-3 rounded-lg bg-[#009fe3] text-white font-bold text-xs"
                    >
                      Explore Residential Solutions →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 3. COMMERCIAL (Accordion) */}
            <div className="border-b border-white/10 pb-2">
              <button
                onClick={() => toggleMobileAccordion('commercial')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg font-bold hover:bg-white/10 text-sm tracking-wide"
              >
                <span>COMMERCIAL</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === 'commercial' ? 'rotate-180 text-emerald-400' : ''}`} />
              </button>

              {mobileAccordion === 'commercial' && (
                <div className="mt-2 pl-3 pr-2 space-y-2 bg-white/5 rounded-xl p-3 border border-white/10 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Link
                      to="/commercial/corporate-offices"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block p-2 rounded-lg hover:bg-white/10"
                    >
                      <div className="font-bold text-emerald-300">Office HVAC Solutions</div>
                      <div className="text-[10px] text-slate-400">Corporate towers & IT parks</div>
                    </Link>
                    <Link
                      to="/commercial/hotels-resorts"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block p-2 rounded-lg hover:bg-white/10"
                    >
                      <div className="font-bold text-emerald-300">Hotels & Resorts</div>
                      <div className="text-[10px] text-slate-400">Hospitality guest room comfort</div>
                    </Link>
                    <Link
                      to="/commercial/hospitals"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block p-2 rounded-lg hover:bg-white/10"
                    >
                      <div className="font-bold text-emerald-300">Hospitals & Healthcare</div>
                      <div className="text-[10px] text-slate-400">NABH sterile laminar air OT suites</div>
                    </Link>
                    <Link
                      to="/commercial/banquet-halls"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block p-2 rounded-lg hover:bg-white/10"
                    >
                      <div className="font-bold text-emerald-300">Malls & Retail Spaces</div>
                      <div className="text-[10px] text-slate-400">High footfall retail cooling</div>
                    </Link>
                    <Link
                      to="/commercial"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block p-2 rounded-lg hover:bg-white/10"
                    >
                      <div className="font-bold text-emerald-300">Schools & Institutions</div>
                      <div className="text-[10px] text-slate-400">Campuses & auditoriums</div>
                    </Link>
                    <Link
                      to="/commercial/industrial"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block p-2 rounded-lg hover:bg-white/10"
                    >
                      <div className="font-bold text-emerald-300">Industrial HVAC Solutions</div>
                      <div className="text-[10px] text-slate-400">Manufacturing & cleanrooms</div>
                    </Link>
                    <Link
                      to="/products?category=VRF+Air+Conditioning+Systems"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block p-2 rounded-lg hover:bg-white/10"
                    >
                      <div className="font-bold text-emerald-300">VRF Systems</div>
                      <div className="text-[10px] text-slate-400">Central Inverter Condenser banks</div>
                    </Link>
                    <Link
                      to="/products?category=Chiller+Systems"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block p-2 rounded-lg hover:bg-white/10"
                    >
                      <div className="font-bold text-emerald-300">Chillers & AHUs</div>
                      <div className="text-[10px] text-slate-400">Screw chillers & air handling units</div>
                    </Link>
                  </div>
                  <div className="pt-2 border-t border-white/10">
                    <Link
                      to="/commercial"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-center py-2 px-3 rounded-lg bg-emerald-600 text-white font-bold text-xs"
                    >
                      Explore Commercial Solutions →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 4. PRODUCTS (Accordion with 8 Brands) */}
            <div className="border-b border-white/10 pb-2">
              <button
                onClick={() => toggleMobileAccordion('products')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg font-bold hover:bg-white/10 text-sm tracking-wide"
              >
                <span>PRODUCTS (BRANDS)</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === 'products' ? 'rotate-180 text-indigo-400' : ''}`} />
              </button>

              {mobileAccordion === 'products' && (
                <div className="mt-2 pl-3 pr-2 space-y-2 bg-white/5 rounded-xl p-3 border border-white/10 text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { name: 'Mitsubishi Electric', slug: 'Mitsubishi+Electric', logo: '/images/brands/mitsubishi-electric.svg' },
                      { name: 'O General', slug: 'O+General', logo: '/images/brands/o-general.svg' },
                      { name: 'Carrier', slug: 'Carrier', logo: '/images/brands/carrier.svg' },
                      { name: 'Hitachi', slug: 'Hitachi', logo: '/images/brands/hitachi.svg' },
                      { name: 'Voltas', slug: 'Voltas', logo: '/images/brands/voltas.svg' },
                      { name: 'Trane', slug: 'Trane', logo: '/images/brands/trane.svg' },
                      { name: 'Haier', slug: 'Haier', logo: '/images/brands/haier.svg' }
                    ].map((brand, idx) => (
                      <Link
                        key={idx}
                        to={`/products?brand=${brand.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 flex flex-col items-center justify-center text-center"
                      >
                        <div className="h-6 w-full flex items-center justify-center bg-white rounded p-1 mb-1">
                          <img src={brand.logo} alt={brand.name} className="max-h-5 object-contain" />
                        </div>
                        <span className="text-[11px] font-bold text-white truncate w-full">{brand.name}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-white/10">
                    <Link
                      to="/products"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-center py-2 px-3 rounded-lg bg-indigo-600 text-white font-bold text-xs"
                    >
                      Explore All Brands →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 5. SERVICES (Accordion) */}
            <div className="border-b border-white/10 pb-2">
              <button
                onClick={() => toggleMobileAccordion('services')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg font-bold hover:bg-white/10 text-sm tracking-wide"
              >
                <span>SERVICES</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === 'services' ? 'rotate-180 text-amber-400' : ''}`} />
              </button>

              {mobileAccordion === 'services' && (
                <div className="mt-2 pl-3 pr-2 space-y-2 bg-white/5 rounded-xl p-3 border border-white/10 text-xs">
                  <div className="space-y-1.5">
                    {[
                      'HVAC Design & Consultation',
                      'AC Installation',
                      'Repair & Troubleshooting',
                      'Preventive Maintenance',
                      'Annual Maintenance Contract (AMC)',
                      'System Upgradation'
                    ].map((svc, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          if (onOpenQuote) onOpenQuote({ serviceRequired: svc, enquiryType: 'Service & Maintenance' });
                        }}
                        className="w-full text-left p-2 rounded-lg hover:bg-white/10 flex items-center justify-between"
                      >
                        <span className="font-semibold text-amber-200">{svc}</span>
                        <ArrowRight className="w-3 h-3 text-amber-400" />
                      </button>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-white/10">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        if (onOpenQuote) onOpenQuote({ enquiryType: 'Service & Maintenance Inspection' });
                      }}
                      className="w-full py-2 px-3 rounded-lg bg-amber-500 text-white font-bold text-xs text-center"
                    >
                      Schedule Service Inspection →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 6. INSIGHTS */}
            <Link
              to="/insights"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg font-bold hover:bg-white/10 text-sm tracking-wide"
            >
              INSIGHTS
            </Link>

            {/* 7. GET A FREE ESTIMATE */}
            <div className="pt-2">
              <Link
                to="/quote"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-[#009fe3] hover:bg-[#0089c4] text-white py-2.5 px-4 rounded-xl font-bold text-xs tracking-wider uppercase flex items-center justify-center shadow-md"
              >
                <span>GET A FREE ESTIMATE</span>
              </Link>
            </div>

            {/* Contact quick links in drawer */}
            <div className="pt-3 border-t border-white/10 text-xs text-slate-400 space-y-2">
              <a 
                href={`tel:${(settings?.phone || '+91 88969 21318').replace(/[^0-9+]/g, '')}`}
                className="flex items-center text-slate-300 font-semibold"
              >
                <Phone className="w-3.5 h-3.5 mr-2 text-[#009fe3]" />
                {settings?.phone || '+91 88969 21318'}
              </a>
              <div className="text-[11px] text-slate-400 leading-relaxed">
                Registered Office: Lucknow | Delhi Office | Kerala Execution: Kochi, Kottayam, Trivandrum
              </div>

              {/* Official Social Media Channels with Real Logos */}
              <div className="pt-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">
                  Follow Us
                </span>
                <SocialLinks size="sm" />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
