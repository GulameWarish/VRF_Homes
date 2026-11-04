import React, { useState, useEffect } from 'react';
import { 
  Settings, Save, Building2, MapPin, Phone, Mail, 
  Globe, CheckCircle, Plus, Trash2, ExternalLink, MessageCircle 
} from 'lucide-react';
import api from '../services/api';

export default function AdminSettings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [newBranch, setNewBranch] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        if (res.data.success) {
          setSettings(res.data.data);
        }
      } catch (err) {
        console.error('Settings load error:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (field, val) => {
    setSettings(prev => ({ ...prev, [field]: val }));
  };

  const handleOfficeChange = (officeKey, field, val) => {
    setSettings(prev => ({
      ...prev,
      [officeKey]: {
        ...prev[officeKey],
        [field]: val
      }
    }));
  };

  const handleStatsChange = (field, val) => {
    setSettings(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        [field]: val
      }
    }));
  };

  const handleAddBranch = () => {
    if (!newBranch.trim()) return;
    const currentBranches = settings.branches || [];
    if (!currentBranches.includes(newBranch.trim())) {
      setSettings(prev => ({
        ...prev,
        branches: [...currentBranches, newBranch.trim()]
      }));
    }
    setNewBranch('');
  };

  const handleRemoveBranch = (branchToRemove) => {
    setSettings(prev => ({
      ...prev,
      branches: (prev.branches || []).filter(b => b !== branchToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);
    try {
      const res = await api.put('/settings', settings);
      if (res.data.success) {
        setSettings(res.data.data);
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (err) {
      alert('Error updating settings: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="w-8 h-8 border-3 border-hvac-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-xs text-slate-500">Loading website and office configurations...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-950">Website Settings & Office Locations</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage company contact credentials, registered offices, branches, and live stats counters
          </p>
        </div>

        {savedSuccess && (
          <div className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold flex items-center space-x-1.5 animate-in fade-in">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Settings saved and published successfully!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Contact Credentials Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-4">
            <Phone className="w-5 h-5 text-hvac-600" />
            <h2 className="text-base font-bold text-navy-950">Core Contact Information</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Company Telephone / Mobile *</label>
              <input
                type="text"
                required
                value={settings?.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+91 88969 21318"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-hidden focus:border-hvac-600"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Clickable as `tel:+918896921318`</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Number *</label>
              <input
                type="text"
                required
                value={settings?.whatsapp || ''}
                onChange={(e) => handleChange('whatsapp', e.target.value)}
                placeholder="+91 88969 21318"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-hidden focus:border-hvac-600"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Direct WhatsApp chat link integration</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Sales & Support Email *</label>
              <input
                type="email"
                required
                value={settings?.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="sales@shuklaenterprises.in"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-hidden focus:border-hvac-600"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Clickable as `mailto:sales@shuklaenterprises.in`</span>
            </div>
          </div>
        </div>

        {/* Registered Office & Delhi Office */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Registered Office Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <MapPin className="w-5 h-5 text-hvac-600" />
              <h2 className="text-base font-bold text-navy-950">Registered Office Location</h2>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Title</label>
              <input
                type="text"
                value={settings?.registeredOffice?.title || 'Registered Office'}
                onChange={(e) => handleOfficeChange('registeredOffice', 'title', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Physical Address *</label>
              <textarea
                rows="3"
                value={settings?.registeredOffice?.address || ''}
                onChange={(e) => handleOfficeChange('registeredOffice', 'address', e.target.value)}
                placeholder="UGF 8, 92/200, Unnao Arcade Building, 5 Gautam Buddha Marg, Lucknow – 226018, Uttar Pradesh, India"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs leading-relaxed"
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">City</label>
                <input
                  type="text"
                  value={settings?.registeredOffice?.city || 'Lucknow'}
                  onChange={(e) => handleOfficeChange('registeredOffice', 'city', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">PIN Code</label>
                <input
                  type="text"
                  value={settings?.registeredOffice?.pincode || '226018'}
                  onChange={(e) => handleOfficeChange('registeredOffice', 'pincode', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Google Maps Direct Link</label>
              <input
                type="url"
                value={settings?.registeredOffice?.mapUrl || ''}
                onChange={(e) => handleOfficeChange('registeredOffice', 'mapUrl', e.target.value)}
                placeholder="https://maps.google.com/?q=..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
              />
            </div>
          </div>

          {/* Delhi Office Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <Building2 className="w-5 h-5 text-hvac-600" />
              <h2 className="text-base font-bold text-navy-950">Delhi Office Location</h2>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Title</label>
              <input
                type="text"
                value={settings?.delhiOffice?.title || 'Delhi Office'}
                onChange={(e) => handleOfficeChange('delhiOffice', 'title', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Physical Address *</label>
              <textarea
                rows="3"
                value={settings?.delhiOffice?.address || ''}
                onChange={(e) => handleOfficeChange('delhiOffice', 'address', e.target.value)}
                placeholder="14A, Uttam Vihar, Block F, Mahavir Enclave Part 3, Bindapur, New Delhi, Delhi – 110059, India"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs leading-relaxed"
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">City</label>
                <input
                  type="text"
                  value={settings?.delhiOffice?.city || 'New Delhi'}
                  onChange={(e) => handleOfficeChange('delhiOffice', 'city', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">PIN Code</label>
                <input
                  type="text"
                  value={settings?.delhiOffice?.pincode || '110059'}
                  onChange={(e) => handleOfficeChange('delhiOffice', 'pincode', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Google Maps Direct Link</label>
              <input
                type="url"
                value={settings?.delhiOffice?.mapUrl || ''}
                onChange={(e) => handleOfficeChange('delhiOffice', 'mapUrl', e.target.value)}
                placeholder="https://maps.google.com/?q=..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Branch Locations Management */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Globe className="w-5 h-5 text-hvac-600" />
            <h2 className="text-base font-bold text-navy-950">
              National Branch Network ({(settings?.branches || []).length} Active Branches)
            </h2>
          </div>

          <p className="text-xs text-slate-500">
            These branches display across the website footer, navigation badges, and the dedicated Contact Us location cards.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {(settings?.branches || []).map((branch) => (
              <span
                key={branch}
                className="inline-flex items-center px-3 py-1.5 rounded-xl bg-slate-100 text-xs font-bold text-navy-950 border border-slate-200"
              >
                <span>{branch}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveBranch(branch)}
                  className="ml-2 text-slate-400 hover:text-rose-600"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-2 max-w-sm pt-2">
            <input
              type="text"
              value={newBranch}
              onChange={(e) => setNewBranch(e.target.value)}
              placeholder="Add another branch city (e.g. Hyderabad)..."
              className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
            />
            <button
              type="button"
              onClick={handleAddBranch}
              className="px-4 py-2 bg-slate-900 hover:bg-hvac-600 text-white rounded-xl text-xs font-bold flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>

        {/* Dynamic Stats Counters */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-navy-950">Dynamic Company Statistics (Trust Highlights)</h2>
            <p className="text-xs text-slate-400 mt-0.5">Editable real figures displayed in Section 2 of Homepage</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Completed Projects</label>
              <input
                type="text"
                value={settings?.stats?.completedProjects || ''}
                onChange={(e) => handleStatsChange('completedProjects', e.target.value)}
                placeholder="650+"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-navy-950"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Residential Projects</label>
              <input
                type="text"
                value={settings?.stats?.residentialProjects || ''}
                onChange={(e) => handleStatsChange('residentialProjects', e.target.value)}
                placeholder="420+"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-navy-950"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Commercial Projects</label>
              <input
                type="text"
                value={settings?.stats?.commercialProjects || ''}
                onChange={(e) => handleStatsChange('commercialProjects', e.target.value)}
                placeholder="230+"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-navy-950"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Years of Experience</label>
              <input
                type="text"
                value={settings?.stats?.yearsOfExperience || ''}
                onChange={(e) => handleStatsChange('yearsOfExperience', e.target.value)}
                placeholder="18+"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-navy-950"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Service Locations</label>
              <input
                type="text"
                value={settings?.stats?.serviceLocations || ''}
                onChange={(e) => handleStatsChange('serviceLocations', e.target.value)}
                placeholder="9 Branches"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-navy-950"
              />
            </div>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex items-center justify-end space-x-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3.5 rounded-xl bg-hvac-600 hover:bg-hvac-500 text-white font-extrabold text-sm shadow-md shadow-hvac-600/30 flex items-center space-x-2 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving Settings...' : 'Save & Publish Website Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
