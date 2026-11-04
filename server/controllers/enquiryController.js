import Enquiry from '../models/Enquiry.js';

export const submitEnquiry = async (req, res) => {
  try {
    const { fullName, email, mobile, city } = req.body;

    if (!fullName || !email || !mobile || !city) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields (Name, Email, Mobile, City).'
      });
    }

    // Rate / duplicate submission check: same mobile/email within last 60 seconds
    const recent = await Enquiry.findOne({
      $or: [{ email: email.toLowerCase() }, { mobile: mobile.trim() }],
      createdAt: { $gte: new Date(Date.now() - 60000) }
    });

    if (recent) {
      return res.status(429).json({
        success: false,
        message: 'A submission from this contact was already received just now. Our HVAC engineers will connect with you shortly.'
      });
    }

    const enquiry = await Enquiry.create({
      ...req.body,
      email: email.toLowerCase().trim(),
      mobile: mobile.trim(),
      ipAddress: req.ip || req.headers['x-forwarded-for'] || ''
    });

    res.status(201).json({
      success: true,
      data: enquiry,
      message: 'Thank you! Your HVAC enquiry has been received. Our engineering specialist will contact you within 24 business hours.'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getEnquiries = async (req, res) => {
  try {
    const { status, segment, enquiryType, search, page = 1, limit = 50 } = req.query;
    const query = {};

    if (status && status !== 'All') {
      query.status = status;
    }

    if (segment && segment !== 'All') {
      query.segment = segment;
    }

    if (enquiryType && enquiryType !== 'All') {
      query.enquiryType = enquiryType;
    }

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { mobile: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
        { propertyType: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Enquiry.countDocuments(query);
    const enquiries = await Enquiry.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: enquiries
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Lead enquiry not found' });
    }
    res.json({ success: true, data: enquiry, message: 'Enquiry updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }
    res.json({ success: true, message: 'Lead removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const exportEnquiriesCSV = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    
    const headers = [
      'Date', 'Full Name', 'Email', 'Mobile', 'City', 'Pincode', 
      'Type', 'Segment', 'Property Type', 'Service', 'Product Interest', 
      'Status', 'Assigned To', 'Notes'
    ];

    const rows = enquiries.map(e => [
      new Date(e.createdAt).toISOString().split('T')[0],
      `"${(e.fullName || '').replace(/"/g, '""')}"`,
      `"${(e.email || '').replace(/"/g, '""')}"`,
      `"${(e.mobile || '').replace(/"/g, '""')}"`,
      `"${(e.city || '').replace(/"/g, '""')}"`,
      `"${(e.pincode || '').replace(/"/g, '""')}"`,
      `"${(e.enquiryType || '').replace(/"/g, '""')}"`,
      `"${(e.segment || '').replace(/"/g, '""')}"`,
      `"${(e.propertyType || '').replace(/"/g, '""')}"`,
      `"${(e.serviceRequired || '').replace(/"/g, '""')}"`,
      `"${(e.productInterest || '').replace(/"/g, '""')}"`,
      `"${(e.status || '').replace(/"/g, '""')}"`,
      `"${(e.assignedTo || '').replace(/"/g, '""')}"`,
      `"${(e.internalNotes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="vrf-homes-leads.csv"');
    res.status(200).send(csvContent);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
