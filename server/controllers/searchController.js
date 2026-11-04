import CommercialCategory from '../models/CommercialCategory.js';
import ResidentialCategory from '../models/ResidentialCategory.js';
import Product from '../models/Product.js';
import Project from '../models/Project.js';
import Service from '../models/Service.js';
import Brand from '../models/Brand.js';
import Blog from '../models/Blog.js';
import Feature from '../models/Feature.js';

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
      CommercialCategory.find({
        isPublished: true,
        $or: [{ name: regex }, { introduction: regex }, { tagline: regex }]
      }).select('name slug heroImage tagline').limit(5),

      ResidentialCategory.find({
        isPublished: true,
        $or: [{ name: regex }, { introduction: regex }, { tagline: regex }]
      }).select('name slug heroImage tagline').limit(5),

      Product.find({
        isPublished: true,
        $or: [{ name: regex }, { description: regex }, { category: regex }]
      }).select('name slug image category tagline').limit(6),

      Project.find({
        isPublic: true,
        $or: [{ name: regex }, { location: regex }, { hvacSystem: regex }, { description: regex }]
      }).select('name slug coverImage category location hvacSystem actualCompletionDate').limit(5),

      Service.find({
        isPublished: true,
        $or: [{ title: regex }, { shortDescription: regex }, { category: regex }]
      }).select('title slug image shortDescription category icon').limit(5),

      Brand.find({
        isActive: true,
        $or: [{ name: regex }, { description: regex }]
      }).select('name slug logo description').limit(5),

      Blog.find({
        isPublished: true,
        $or: [{ title: regex }, { excerpt: regex }, { category: regex }, { tags: regex }]
      }).select('title slug featuredImage category excerpt publishedAt').limit(5),

      Feature.find({
        isPublished: true,
        $or: [{ title: regex }, { shortDescription: regex }]
      }).select('title slug icon shortDescription').limit(4)
    ]);

    const total = commercial.length + residential.length + products.length + 
                  projects.length + services.length + brands.length + 
                  insights.length + features.length;

    res.json({
      success: true,
      query: q,
      total,
      results: {
        commercial,
        residential,
        products,
        projects,
        services,
        brands,
        insights,
        features
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
