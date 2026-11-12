import React, { useState } from 'react';
import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, FolderKanban, Package, 
  Building2, Home, Award, Wrench, BookOpen, 
  MessageSquareQuote, HelpCircle, Settings, LogOut, 
  Menu, X, ExternalLink, Cpu, ShieldCheck 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard Overview', path: '/admin', icon: LayoutDashboard, exact: true },
    { label: 'Leads & Enquiries CRM', path: '/admin/leads', icon: Users },
    { label: 'Project Management', path: '/admin/projects', icon: FolderKanban },
    { label: 'Products & Equipment', path: '/admin/products', icon: Package },
    { label: 'Commercial Categories', path: '/admin/commercial', icon: Building2 },
    { label: 'Residential Typologies', path: '/admin/residential', icon: Home },
    { label: 'Brand Partnerships', path: '/admin/brands', icon: Award },
    { label: 'Services Catalog', path: '/admin/services', icon: Wrench },
    { label: 'Insights & Articles', path: '/admin/blogs', icon: BookOpen },
    { label: 'Customer Testimonials', path: '/admin/testimonials', icon: MessageSquareQuote },
    { label: 'FAQs Management', path: '/admin/faqs', icon: HelpCircle },
    { label: 'Website Settings & Stats', path: '/admin/settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      
      {/* Mobile Top Header */}
      <div className="md:hidden bg-navy-950 text-white p-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-hvac-600 flex items-center justify-center text-white">
            <Cpu className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-sm tracking-tight">VRF HOMES ADMIN</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg bg-white/10 text-white"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-navy-950 text-slate-300 flex flex-col justify-between transition-transform duration-200 border-r border-slate-800
        md:translate-x-0 md:static md:h-screen md:shrink-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full overflow-hidden">
          {/* Logo Header */}
          <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
            <Link to="/admin" className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-hvac-700 to-hvac-500 flex items-center justify-center text-white shadow-md shadow-hvac-500/20">
                <Cpu className="w-5 h-5 text-cyan-200" />
              </div>
              <div>
                <span className="font-black text-white text-base tracking-tight">
                  VRF<span className="text-hvac-400">ADMIN</span>
                </span>
                <span className="block text-[9px] uppercase tracking-widest text-slate-400 font-bold">
                  Operations Console
                </span>
              </div>
            </Link>
          </div>

          {/* Nav Links */}
          <nav className="p-4 space-y-1 overflow-y-auto flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) => `
                    flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all
                    ${isActive 
                      ? 'bg-hvac-600 text-white shadow-md shadow-hvac-600/30' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'}
                  `}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Bottom User Area */}
          <div className="p-4 border-t border-slate-800/80 bg-navy-900/60">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2 overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-hvac-800 text-emerald-300 flex items-center justify-center font-bold text-xs uppercase shrink-0">
                  {user?.name?.[0] || 'A'}
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-white truncate">{user?.name || 'Administrator'}</div>
                  <div className="text-[10px] text-slate-400 truncate">{user?.email || 'admin@vrfhomes.com'}</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {user?.role || 'admin'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link
                to="/"
                target="_blank"
                className="py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-center font-medium flex items-center justify-center space-x-1"
              >
                <span>Live Site</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
              <button
                onClick={handleLogout}
                className="py-1.5 px-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 rounded-lg text-center font-medium flex items-center justify-center space-x-1"
              >
                <LogOut className="w-3 h-3" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Admin Working Canvas */}
      <main className="flex-1 min-h-screen overflow-y-auto">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
