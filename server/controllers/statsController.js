import Enquiry from '../models/Enquiry.js';
import Project from '../models/Project.js';
import Product from '../models/Product.js';
import Service from '../models/Service.js';
import Blog from '../models/Blog.js';
import CommercialCategory from '../models/CommercialCategory.js';
import ResidentialCategory from '../models/ResidentialCategory.js';

export const getDashboardStats = async (req, res) => {
  try {
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

    // Enquiries by status
    const statusAgg = await Enquiry.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    const enquiriesByStatus = statusAgg.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    // Recent 5 enquiries
    const recentEnquiries = await Enquiry.find()
      .sort({ createdAt: -1 })
      .limit(5);

    // Recent 5 projects
    const recentProjects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      stats: {
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
        totalResidential,
        commercialLeads,
        residentialLeads
      },
      enquiriesByStatus,
      recentEnquiries,
      recentProjects
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
