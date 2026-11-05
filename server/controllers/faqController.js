import mongoose from 'mongoose';
import FAQ from '../models/FAQ.js';
import { faqsData } from '../config/defaultData.js';

export const getFAQs = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ success: true, count: faqsData.length, data: faqsData });
    }
    const query = req.query.all === 'true' ? {} : { isPublished: true };
    const faqs = await FAQ.find(query).sort({ sortOrder: 1, createdAt: -1 });
    if (!faqs || faqs.length === 0) {
      return res.json({ success: true, count: faqsData.length, data: faqsData });
    }
    res.json({ success: true, count: faqs.length, data: faqs });
  } catch (error) {
    res.json({ success: true, count: faqsData.length, data: faqsData });
  }
};

export const createFAQ = async (req, res) => {
  try {
    const faq = await FAQ.create(req.body);
    res.status(201).json({ success: true, data: faq, message: 'FAQ created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!faq) {
      return res.status(404).json({ success: false, message: 'FAQ not found' });
    }
    res.json({ success: true, data: faq, message: 'FAQ updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);
    if (!faq) {
      return res.status(404).json({ success: false, message: 'FAQ not found' });
    }
    res.json({ success: true, message: 'FAQ deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
