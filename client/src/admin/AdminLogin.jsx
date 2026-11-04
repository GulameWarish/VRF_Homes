import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, Cpu, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/common/SEO';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@vrfhomes.com');
  const [password, setPassword] = useState('Admin@12345');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        navigate('/admin');
      } else {
        setError(res.message || 'Invalid administrator credentials');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = () => {
    setEmail('admin@vrfhomes.com');
    setPassword('Admin@12345');
  };

  return (
    <>
      <SEO title="Administrator Portal Login | VRF Homes" />
      <div className="min-h-screen bg-navy-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
        
        {/* Glow ambient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-hvac-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-hvac-700 via-hvac-600 to-cyan-400 flex items-center justify-center text-white mx-auto shadow-xl shadow-hvac-600/30">
            <Cpu className="w-8 h-8 text-white" />
          </div>
          <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            VRF Homes Operations Portal
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Authorized management console for leads, projects, products & content
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 relative z-10">
          <div className="bg-white/95 backdrop-blur-md py-8 px-6 sm:px-10 rounded-3xl shadow-2xl border border-white/20">
            
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Admin Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-hvac-600 focus:ring-1 focus:ring-hvac-600 font-medium"
                    placeholder="admin@vrfhomes.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-hvac-600 focus:ring-1 focus:ring-hvac-600 font-medium"
                    placeholder="••••••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  type="button"
                  onClick={fillDemo}
                  className="text-hvac-600 hover:text-hvac-700 font-semibold"
                >
                  Use Demo Admin Credentials
                </button>
                <span className="text-slate-400">Role: Executive</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-hvac-600 to-hvac-500 hover:from-hvac-700 hover:to-hvac-600 text-white font-extrabold text-xs shadow-md shadow-hvac-600/30 flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <span>Authenticating Session...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Sign In to Admin Dashboard</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
              <Link to="/" className="text-xs font-semibold text-slate-500 hover:text-navy-950 flex items-center justify-center">
                <span>&larr; Return to public website</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
