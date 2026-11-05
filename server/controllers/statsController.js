import mongoose from 'mongoose';
import Enquiry from '../models/Enquiry.js';
import Project from '../models/Project.js';
import Product from '../models/Product.js';
import Service from '../models/Service.js';
import Blog from '../models/Blog.js';
import CommercialCategory from '../models/CommercialCategory.js';
import ResidentialCategory from '../models/ResidentialCategory.js';
import { productsData, projectsData, commercialData, residentialData, servicesData, blogsData } from '../config/defaultData.js';

export const getDashboardStats = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({
        success: true,
        data: {
          overview: {
            totalEnquiries: 0,
            newLeads: 0,
            totalProjects: projectsData.length,
            completedProjects: projectsData.filter(p => p.status === 'Completed').length,
            ongoingProjects: 1,
            upcomingProjects: 0,
            totalProducts: productsData.length,
            totalServices: servicesData.length,
            totalBlogs: blogsData.length,
            totalCommercial: commercialData.length,
            totalResidential: residentialData.length
          },
          segments: {
            commercial: 0,
            residential: 0
          },
          recentEnquiries: [],
          recentProjects: projectsData.slice(0, 5)
        }
      });
    }

    const [
      totalEnquiries,
      newLeads,
      totalProjects,
      completedProjects,
      ongoingProjects,
      upcomingProjects,
      totalProducts,
      totalServices,
      totalBlogs,
      totalCommercial,
      totalResidential
    ] = await Promise.all([
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ status: 'New' }),
      Project.countDocuments(),
      Project.countDocuments({ status: 'Completed' }),
      Project.countDocuments({ status: { $in: ['Work In Progress', 'Work Scheduled', 'Installation Completed', 'Testing & Commissioning'] } }),
      Project.countDocuments({ status: { $in: ['Enquiry Received', 'Site Inspection', 'Quotation Sent', 'Approval Pending', 'Approved'] } }),
      Product.countDocuments({ isPublished: true }),
      Service.countDocuments({ isPublished: true }),
      Blog.countDocuments({ isPublished: true }),
      CommercialCategory.countDocuments(),
      ResidentialCategory.countDocuments()
    ]);

    // Segment comparison (Commercial vs Residential enquiries)
    const [commercialLeads, residentialLeads] = await Promise.all([
      Enquiry.countDocuments({ segment: 'Commercial' }),
      Enquiry.countDocuments({ segment: 'Residential' })
    ]);

    const recentEnquiries = await Enquiry.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const recentProjects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      data: {
        overview: {
          totalEnquiries,
          newLeads,
          totalProjects,
          completedProjects,
          ongoingProjects,
          upcomingProjects,
          totalProducts,
          totalServices,
          totalBlogs,
          totalCommercial,
          totalResidential
        },
        segments: {
          commercial: commercialLeads,
          residential: residentialLeads
        },
        recentEnquiries,
        recentProjects
      }
    });
  } catch (error) {
    res.json({
      success: true,
      data: {
        overview: {
          totalEnquiries: 0,
          newLeads: 0,
          totalProjects: projectsData.length,
          completedProjects: 5,
          ongoingProjects: 1,
          upcomingProjects: 0,
          totalProducts: productsData.length,
          totalServices: servicesData.length,
          totalBlogs: blogsData.length,
          totalCommercial: commercialData.length,
          totalResidential: residentialData.length
        },
        segments: { commercial: 0, residential: 0 },
        recentEnquiries: [],
        recentProjects: []
      }
    });
  }
};
