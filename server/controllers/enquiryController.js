import mongoose from 'mongoose';
import Enquiry from '../models/Enquiry.js';

// Standalone in-memory storage for enquiries when database is not connected
const inMemoryEnquiries = [];

// Instant Lead Webhook & Telegram Dispatcher
const sendLeadInstantAlerts = async (enquiryData) => {
  const alertText = `🚨 *NEW HVAC INQUIRY RECEIVED*\n` +
    `👤 *Name:* ${enquiryData.fullName}\n` +
    `📱 *Mobile:* ${enquiryData.mobile}\n` +
    `📧 *Email:* ${enquiryData.email}\n` +
    `📍 *City:* ${enquiryData.city || 'N/A'}\n` +
    `🏢 *Segment:* ${enquiryData.segment || 'Residential VRF'}\n` +
    `🏷️ *Typology/Brand:* ${enquiryData.propertyType || enquiryData.selectedBrand || 'N/A'}\n` +
    `📝 *Requirements:* ${enquiryData.requirements || 'Consultation & Heat Load Sizing'}\n` +
    `⏰ *Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;

  // 1. Telegram Instant Webhook Alert if configured
  if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
    try {
      fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: alertText,
          parse_mode: 'Markdown'
        })
      }).catch(err => console.log('[Telegram Alert Skipped]:', err.message));
    } catch (_) {}
  }

  // 2. Generic Webhook (e.g. Zapier, Make, Pabbly or WhatsApp Webhook)
  if (process.env.LEAD_WEBHOOK_URL) {
    try {
      fetch(process.env.LEAD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: 'lead.created', lead: enquiryData })
      }).catch(err => console.log('[Lead Webhook Skipped]:', err.message));
    } catch (_) {}
  }
};

export const submitEnquiry = async (req, res) => {
  try {
    const { fullName, email, mobile, city } = req.body;

    if (!fullName || !email || !mobile || !city) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields (Name, Email, Mobile, City).'
      });
    }

    const whatsappChatUrl = `https://wa.me/918896921318?text=${encodeURIComponent(
      `Hello VRF Homes Team, I am ${fullName} from ${city} (${mobile}). Requirements: ${req.body.requirements || 'HVAC Consultation & Heat Load Sizing'}`
    )}`;

    // If database is not connected or offline, save in memory and succeed cleanly
    if (mongoose.connection.readyState !== 1) {
      const offlineDoc = {
        _id: 'offline_' + Date.now(),
        ...req.body,
        email: email.toLowerCase().trim(),
        mobile: mobile.trim(),
        createdAt: new Date(),
        status: 'New'
      };
      inMemoryEnquiries.unshift(offlineDoc);
      console.log('==================================================');
      console.log('[NEW HVAC ENQUIRY RECEIVED (IN-MEMORY PERSISTENCE)]');
      console.log('Name:', fullName);
      console.log('Mobile:', mobile);
      console.log('Email:', email);
      console.log('City:', city);
      console.log('Segment:', req.body.segment || 'N/A');
      console.log('Typology / Brand:', req.body.propertyType || req.body.selectedBrand || 'N/A');
      console.log('Requirements:', req.body.requirements || 'N/A');
      console.log('==================================================');

      sendLeadInstantAlerts(offlineDoc);

      return res.status(201).json({
        success: true,
        data: offlineDoc,
        whatsappChatUrl,
        message: 'Thank you! Your HVAC enquiry has been received. Our engineering specialist will contact you within 24 business hours.'
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
        whatsappChatUrl,
        message: 'A submission from this contact was already received just now. Our HVAC engineers will connect with you shortly.'
      });
    }

    const enquiry = await Enquiry.create({
      ...req.body,
      email: email.toLowerCase().trim(),
      mobile: mobile.trim(),
      ipAddress: req.ip || req.headers['x-forwarded-for'] || ''
    });

    sendLeadInstantAlerts(enquiry);

    res.status(201).json({
      success: true,
      data: enquiry,
      whatsappChatUrl,
      message: 'Thank you! Your HVAC enquiry has been received. Our engineering specialist will contact you within 24 business hours.'
    });
  } catch (error) {
    console.error('[Enquiry Handler Catch] Fallback saving enquiry:', error.message);
    const offlineDoc = {
      _id: 'offline_' + Date.now(),
      ...req.body,
      createdAt: new Date(),
      status: 'New'
    };
    inMemoryEnquiries.unshift(offlineDoc);
    sendLeadInstantAlerts(offlineDoc);

    const whatsappChatUrl = `https://wa.me/918896921318?text=${encodeURIComponent(
      `Hello VRF Homes Team, I am ${req.body.fullName || 'Guest'} from ${req.body.city || 'India'}. Requirements: ${req.body.requirements || 'HVAC Consultation'}`
    )}`;

    res.status(201).json({
      success: true,
      data: offlineDoc,
      whatsappChatUrl,
      message: 'Thank you! Your HVAC enquiry has been received. Our engineering specialist will contact you within 24 business hours.'
    });
  }
};

export const getEnquiries = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({
        success: true,
        total: inMemoryEnquiries.length,
        page: 1,
        pages: 1,
        data: inMemoryEnquiries
      });
    }

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
    res.json({
      success: true,
      total: inMemoryEnquiries.length,
      page: 1,
      pages: 1,
      data: inMemoryEnquiries
    });
  }
};

export const getEnquiryById = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const enquiry = inMemoryEnquiries.find(e => e._id === req.params.id) || inMemoryEnquiries[0];
      return res.json({ success: true, data: enquiry });
    }
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }
    res.json({ success: true, data: enquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateEnquiry = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    if (mongoose.connection.readyState !== 1) {
      const enquiry = inMemoryEnquiries.find(e => e._id === req.params.id);
      if (enquiry) {
        if (status) enquiry.status = status;
        if (adminNotes) enquiry.adminNotes = adminNotes;
        return res.json({ success: true, data: enquiry, message: 'Status updated' });
      }
    }
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { ...(status && { status }), ...(adminNotes && { adminNotes }) },
      { new: true }
    );
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }
    res.json({ success: true, data: enquiry, message: 'Status updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateEnquiryStatus = updateEnquiry;

export const exportEnquiriesCSV = async (req, res) => {
  try {
    const list = mongoose.connection.readyState === 1 ? await Enquiry.find().sort({ createdAt: -1 }) : inMemoryEnquiries;
    let csv = 'Name,Email,Mobile,City,Segment,PropertyType,Status,Date\n';
    list.forEach(e => {
      csv += `"${e.fullName || ''}","${e.email || ''}","${e.mobile || ''}","${e.city || ''}","${e.segment || ''}","${e.propertyType || ''}","${e.status || 'New'}","${e.createdAt || ''}"\n`;
    });
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=enquiries.csv');
    res.status(200).send(csv);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteEnquiry = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const idx = inMemoryEnquiries.findIndex(e => e._id === req.params.id);
      if (idx !== -1) inMemoryEnquiries.splice(idx, 1);
      return res.json({ success: true, message: 'Enquiry removed' });
    }
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }
    res.json({ success: true, message: 'Enquiry removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
