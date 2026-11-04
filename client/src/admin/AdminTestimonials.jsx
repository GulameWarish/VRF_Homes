import React, { useState, useEffect } from 'react';
import { MessageSquareQuote, Plus, Edit3, Trash2, X, Star } from 'lucide-react';
import api from '../services/api';

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const initialForm = {
    clientName: '',
    roleOrCompany: '',
    projectType: 'Commercial',
    rating: 5,
    review: '',
    isPublished: true
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await api.get('/testimonials?all=true');
      if (res.data.success) {
        setTestimonials(res.data.data);
      }
    } catch (err) {
      console.error('Fetch testimonials error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleOpenCreate = () => {
    setFormData(initialForm);
    setIsEditing(false);
    setActiveId(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (t) => {
    setFormData(t);
    setIsEditing(true);
    setActiveId(t._id);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put(`/testimonials/${activeId}`, formData);
      } else {
        await api.post('/testimonials', formData);
      }
      setModalOpen(false);
      fetchTestimonials();
    } catch (err) {
      alert('Error saving testimonial: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete testimonial?')) return;
    try {
      await api.delete(`/testimonials/${id}`);
      fetchTestimonials();
    } catch (err) {
      alert('Error deleting: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-950">Testimonials Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage genuine client feedback and ratings</p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-hvac-600 hover:bg-hvac-500 text-white font-bold text-xs flex items-center space-x-2 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t._id} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-1 text-amber-400 mb-3">
                {[...Array(t.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-700 italic leading-relaxed">"{t.review}"</p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-navy-950">{t.clientName}</h4>
                <p className="text-[10px] text-slate-400">{t.roleOrCompany}</p>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => handleOpenEdit(t)}
                  className="p-1 rounded bg-slate-100 text-slate-700 hover:bg-slate-200"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(t._id)}
                  className="p-1 rounded bg-rose-50 text-rose-600 hover:bg-rose-100"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 bg-navy-950 text-white flex items-center justify-between">
              <h3 className="text-base font-bold">{isEditing ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Client Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  placeholder="e.g. Dr. Rajesh Singhania"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Company / Project *</label>
                <input
                  type="text"
                  required
                  value={formData.roleOrCompany}
                  onChange={(e) => setFormData({ ...formData, roleOrCompany: e.target.value })}
                  placeholder="e.g. Luxury Villa, Sector 44, Noida"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Rating (1 to 5 Stars)</label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
                >
                  <option value={5}>5 Stars (Exceptional)</option>
                  <option value={4}>4 Stars (Very Good)</option>
                  <option value={3}>3 Stars (Satisfactory)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Client Review Quotation *</label>
                <textarea
                  rows="4"
                  required
                  value={formData.review}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  placeholder="Quote regarding performance, sound, or service..."
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
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
