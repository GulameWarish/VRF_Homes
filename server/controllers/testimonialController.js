import mongoose from 'mongoose';
import Testimonial from '../models/Testimonial.js';
import { testimonialsData } from '../config/defaultData.js';

export const getTestimonials = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ success: true, count: testimonialsData.length, data: testimonialsData });
    }
    const query = req.query.all === 'true' ? {} : { isPublished: true };
    const testimonials = await Testimonial.find(query).sort({ sortOrder: 1, createdAt: -1 });
    if (!testimonials || testimonials.length === 0) {
      return res.json({ success: true, count: testimonialsData.length, data: testimonialsData });
    }
    res.json({ success: true, count: testimonials.length, data: testimonials });
  } catch (error) {
    res.json({ success: true, count: testimonialsData.length, data: testimonialsData });
  }
};

export const createTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({ success: true, data: testimonial, message: 'Testimonial added' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    res.json({ success: true, data: testimonial, message: 'Testimonial updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    res.json({ success: true, message: 'Testimonial deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
