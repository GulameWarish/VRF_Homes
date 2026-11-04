import React, { useState, useEffect } from 'react';
import { HelpCircle, Plus, Edit3, Trash2, X } from 'lucide-react';
import api from '../services/api';

export default function AdminFaqs() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const initialForm = {
    question: '',
    answer: '',
    category: 'General',
    isPublished: true
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const res = await api.get('/faqs?all=true');
      if (res.data.success) {
        setFaqs(res.data.data);
      }
    } catch (err) {
      console.error('Fetch FAQs error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleOpenCreate = () => {
    setFormData(initialForm);
    setIsEditing(false);
    setActiveId(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (f) => {
    setFormData(f);
    setIsEditing(true);
    setActiveId(f._id);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put(`/faqs/${activeId}`, formData);
      } else {
        await api.post('/faqs', formData);
      }
      setModalOpen(false);
      fetchFaqs();
    } catch (err) {
      alert('Error saving FAQ: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete FAQ?')) return;
    try {
      await api.delete(`/faqs/${id}`);
      fetchFaqs();
    } catch (err) {
      alert('Error deleting: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-950">FAQs Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">Edit questions and answers shown in Section 11 of the homepage</p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-hvac-600 hover:bg-hvac-500 text-white font-bold text-xs flex items-center space-x-2 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>New FAQ</span>
        </button>
      </div>

      <div className="space-y-3">
        {faqs.map((f) => (
          <div key={f._id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-start justify-between">
            <div className="space-y-1 pr-4">
              <span className="text-[10px] font-bold text-hvac-600 uppercase tracking-wider">{f.category}</span>
              <h3 className="text-sm font-bold text-navy-950">{f.question}</h3>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">{f.answer}</p>
            </div>
            <div className="flex items-center space-x-1 shrink-0">
              <button
                onClick={() => handleOpenEdit(f)}
                className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(f._id)}
                className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 bg-navy-950 text-white flex items-center justify-between">
              <h3 className="text-base font-bold">{isEditing ? 'Edit FAQ' : 'Add FAQ'}</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Question *</label>
                <input
                  type="text"
                  required
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="e.g. What is the difference between VRF and VRF?"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                >
                  <option value="General">General</option>
                  <option value="VRF Systems">VRF Systems</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Residential">Residential</option>
                  <option value="Maintenance & AMC">Maintenance & AMC</option>
                  <option value="Installation & Design">Installation & Design</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Answer *</label>
                <textarea
                  rows="4"
                  required
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  placeholder="Detailed technical answer..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                ></textarea>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-hvac-600 hover:bg-hvac-500 text-white font-bold text-xs shadow-md"
                >
                  Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
