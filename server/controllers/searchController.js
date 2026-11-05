import mongoose from 'mongoose';
import CommercialCategory from '../models/CommercialCategory.js';
import ResidentialCategory from '../models/ResidentialCategory.js';
import Product from '../models/Product.js';
import Project from '../models/Project.js';
import Service from '../models/Service.js';
import Brand from '../models/Brand.js';
import Blog from '../models/Blog.js';
import Feature from '../models/Feature.js';
import {
  commercialData,
  residentialData,
  productsData,
  projectsData,
  servicesData,
  brandsData,
  blogsData,
  featuresData
} from '../config/defaultData.js';

export const globalSearch = async (req, res) => {
  try {
    const q = (req.query.q || '').trim();
    if (!q || q.length < 2) {
      return res.json({
        success: true,
        query: q,
        total: 0,
        results: {
          commercial: [],
          residential: [],
          products: [],
          projects: [],
          services: [],
          brands: [],
          insights: [],
          features: []
        }
      });
    }

    if (mongoose.connection.readyState !== 1) {
      const qLower = q.toLowerCase();
      const match = (item, fields) => fields.some(f => item[f] && item[f].toLowerCase().includes(qLower));

      const commercial = commercialData.filter(i => match(i, ['name', 'tagline', 'overview']));
      const residential = residentialData.filter(i => match(i, ['name', 'tagline', 'overview']));
      const products = productsData.filter(i => match(i, ['name', 'tagline', 'description', 'category']));
      const projects = projectsData.filter(i => match(i, ['title', 'category', 'clientName']));
      const services = servicesData.filter(i => match(i, ['title', 'tagline', 'description']));
      const brands = brandsData.filter(i => match(i, ['name', 'tagline', 'country']));
      const insights = blogsData.filter(i => match(i, ['title', 'excerpt']));
      const features = featuresData.filter(i => match(i, ['title', 'subtitle', 'description']));

      const total = commercial.length + residential.length + products.length +
        projects.length + services.length + brands.length + insights.length + features.length;

      return res.json({
        success: true,
        query: q,
        total,
        results: { commercial, residential, products, projects, services, brands, insights, features }
      });
    }

    const regex = new RegExp(q, 'i');

    const [
      commercial,
      residential,
      products,
      projects,
      services,
      brands,
      insights,
      features
    ] = await Promise.all([
      CommercialCategory.find({ $or: [{ name: regex }, { tagline: regex }, { overview: regex }] }).select('name slug tagline heroImage'),
      ResidentialCategory.find({ $or: [{ name: regex }, { tagline: regex }, { overview: regex }] }).select('name slug tagline heroImage'),
      Product.find({ isPublished: true, $or: [{ name: regex }, { category: regex }, { tagline: regex }, { description: regex }] }).select('name slug category capacityRange efficiencyRating image'),
      Project.find({ isPublic: true, $or: [{ title: regex }, { category: regex }, { clientName: regex }, { locationCity: regex }] }).select('title slug category projectType systemInstalled images'),
      Service.find({ isPublished: true, $or: [{ title: regex }, { tagline: regex }, { description: regex }] }).select('title slug tagline icon heroImage'),
      Brand.find({ isActive: true, $or: [{ name: regex }, { tagline: regex }, { description: regex }, { country: regex }] }).select('name slug logo country specialty'),
      Blog.find({ isPublished: true, $or: [{ title: regex }, { excerpt: regex }, { category: regex }] }).select('title slug category readTime publishedAt coverImage'),
      Feature.find({ isPublished: true, $or: [{ title: regex }, { subtitle: regex }, { description: regex }] }).select('title slug subtitle icon')
    ]);

    const total = commercial.length + residential.length + products.length +
      projects.length + services.length + brands.length + insights.length + features.length;

    res.json({
      success: true,
      query: q,
      total,
      results: { commercial, residential, products, projects, services, brands, insights, features }
    });
  } catch (error) {
    res.json({
      success: true,
      query: req.query.q || '',
      total: 0,
      results: { commercial: [], residential: [], products: [], projects: [], services: [], brands: [], insights: [], features: [] }
    });
  }
};
