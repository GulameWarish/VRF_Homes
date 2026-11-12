import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import Enquiry from '../models/Enquiry.js';

// Standalone in-memory storage for enquiries when database is not connected
const inMemoryEnquiries = [];

// Transporter for Lead Notification Emails
const getMailTransporter = () => {
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }
  return null;
};

// Instant Lead Webhook, Email & Telegram Dispatcher
// Instant Lead Webhook, Email & Telegram Dispatcher
const sendLeadInstantAlerts = async (enquiryData) => {
  const leadRef = `VRF-${Date.now().toString().slice(-6)}`;
  const dateStr = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const alertText = 
`╔══════════════════════════════════════╗\n` +
`║    🏛️ VRF HOMES • ESTIMATE CARD     ║\n` +
`╚══════════════════════════════════════╝\n` +
`🆔 *REF ID:* ${leadRef}\n` +
`📅 *DATE:* ${dateStr}\n` +
`────────────────────────────────────────\n` +
`👤 *CLIENT PROFILE:*\n` +
`• *Name:* ${enquiryData.fullName}\n` +
`• *Mobile:* ${enquiryData.mobile}\n` +
`• *Email:* ${enquiryData.email}\n` +
`• *Location:* ${enquiryData.city || 'N/A'}${enquiryData.pincode ? ` (${enquiryData.pincode})` : ''}\n` +
`────────────────────────────────────────\n` +
`🏗️ *PROJECT DETAILS:*\n` +
`• *Segment:* ${enquiryData.segment || 'Residential VRF'}\n` +
`• *Typology/Brand:* ${enquiryData.propertyType || enquiryData.preferredBrand || enquiryData.selectedBrand || 'N/A'}\n` +
`• *Service:* ${enquiryData.serviceRequired || enquiryData.enquiryType || 'HVAC Consulting & Estimation'}\n` +
`────────────────────────────────────────\n` +
`📝 *REQUIREMENTS & SCOPE:*\n` +
`${enquiryData.message || enquiryData.requirements || 'Requested Free Site Sizing & Itemized BOQ'}\n` +
`────────────────────────────────────────\n` +
`🌐 *PORTAL:* https://vrfhomes.com\n` +
`════════════════════════════════════════`;

  // 1. Send Direct Lead Notification Email via Nodemailer
  const recipientEmail = process.env.NOTIFICATION_EMAIL || 'sales@shuklaenterprises.in';
  const transporter = getMailTransporter();
  if (transporter) {
    try {
      // 1A. Email Card Document to Sales / Admin Desk
      await transporter.sendMail({
        from: `"VRF Homes Desk" <${process.env.SMTP_USER}>`,
        to: recipientEmail,
        replyTo: enquiryData.email,
        subject: `[HVAC ESTIMATE CARD] ${enquiryData.fullName} - ${enquiryData.city || 'India'} (${leadRef})`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; background-color: #f8fafc; padding: 24px;">
            <!-- Outer Card Container -->
            <div style="background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08);">
              
              <!-- Luxury Brand Header -->
              <div style="background: linear-gradient(135deg, #071120 0%, #0b172a 60%, #009fe3 100%); padding: 28px 24px; text-align: center; color: #ffffff;">
                <div style="display: inline-block; background-color: rgba(0, 159, 227, 0.2); border: 1px solid rgba(0, 159, 227, 0.5); padding: 4px 14px; border-radius: 20px; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; color: #38bdf8; margin-bottom: 8px;">
                  Official Estimate Card Document
                </div>
                <h1 style="margin: 0; font-size: 26px; font-weight: 900; letter-spacing: 1px; color: #ffffff;">VRF HOMES</h1>
                <p style="margin: 6px 0 0 0; font-size: 13px; color: #cbd5e1; font-weight: 500;">
                  Turnkey HVAC &amp; Central Air Conditioning Engineering
                </p>
                <div style="margin-top: 14px; display: inline-block; background-color: rgba(255, 255, 255, 0.12); padding: 5px 16px; border-radius: 8px; font-size: 12px; font-family: monospace; color: #e0f2fe;">
                  REF ID: <strong>${leadRef}</strong> • ${dateStr}
                </div>
              </div>

              <!-- Card Body Content -->
              <div style="padding: 24px;">

                <!-- Section 1: Client Profile -->
                <div style="margin-bottom: 20px;">
                  <div style="font-size: 11px; font-weight: 800; color: #009fe3; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
                    👤 Client Profile
                  </div>
                  <table style="width: 100%; border-collapse: collapse; background-color: #f8fafc; border-radius: 10px; overflow: hidden; border: 1px solid #e2e8f0; font-size: 13px;">
                    <tr>
                      <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #64748b; width: 35%; font-weight: 600;">Full Name:</td>
                      <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-weight: 700;">${enquiryData.fullName}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: 600;">Contact Phone:</td>
                      <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #009fe3; font-weight: 700;">
                        <a href="tel:${enquiryData.mobile}" style="color: #009fe3; text-decoration: none;">${enquiryData.mobile}</a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: 600;">Email Address:</td>
                      <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">
                        <a href="mailto:${enquiryData.email}" style="color: #0f172a; text-decoration: none;">${enquiryData.email}</a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 10px 14px; color: #64748b; font-weight: 600;">City / Region:</td>
                      <td style="padding: 10px 14px; color: #0f172a; font-weight: 600;">
                        ${enquiryData.city || 'N/A'}${enquiryData.pincode ? ` (${enquiryData.pincode})` : ''}
                      </td>
                    </tr>
                  </table>
                </div>

                <!-- Section 2: Project Specifications -->
                <div style="margin-bottom: 20px;">
                  <div style="font-size: 11px; font-weight: 800; color: #009fe3; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
                    🏗️ Project Specifications
                  </div>
                  <table style="width: 100%; border-collapse: collapse; background-color: #f8fafc; border-radius: 10px; overflow: hidden; border: 1px solid #e2e8f0; font-size: 13px;">
                    <tr>
                      <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #64748b; width: 35%; font-weight: 600;">Segment:</td>
                      <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-weight: 600;">
                        <span style="background-color: #e0f2fe; color: #0369a1; padding: 3px 8px; border-radius: 6px; font-size: 11px; font-weight: 700;">
                          ${enquiryData.segment || 'Residential'}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: 600;">Property Typology:</td>
                      <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-weight: 600;">
                        ${enquiryData.propertyType || 'Luxury Villa / Apartment'}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: 600;">Preferred Brand:</td>
                      <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-weight: 600;">
                        ${enquiryData.preferredBrand || enquiryData.selectedBrand || 'All Authorized Brands'}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 10px 14px; color: #64748b; font-weight: 600;">Service Required:</td>
                      <td style="padding: 10px 14px; color: #0f172a; font-weight: 600;">
                        ${enquiryData.serviceRequired || enquiryData.enquiryType || 'Free Site Inspection & Sizing'}
                      </td>
                    </tr>
                  </table>
                </div>

                <!-- Section 3: Requirements & Message -->
                <div style="margin-bottom: 24px;">
                  <div style="font-size: 11px; font-weight: 800; color: #009fe3; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
                    📝 Client Requirements / Project Notes
                  </div>
                  <div style="background-color: #eff6ff; border-left: 4px solid #009fe3; padding: 14px 16px; border-radius: 0 10px 10px 0; color: #1e3a8a; font-size: 13px; line-height: 1.6;">
                    ${enquiryData.message || enquiryData.requirements || 'Client requested comprehensive heat-load sizing and itemized HVAC quotation.'}
                  </div>
                </div>

                <!-- Section 4: Quick Action Desk Buttons -->
                <div style="text-align: center; padding-top: 10px; border-top: 1px solid #e2e8f0;">
                  <a href="https://wa.me/${(enquiryData.mobile || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${enquiryData.fullName}, this is VRF Homes Engineering Support regarding your HVAC project inquiry.`)}" 
                     style="display: inline-block; padding: 12px 22px; background-color: #10b981; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 13px; margin: 4px 6px;">
                    📲 Reply on WhatsApp
                  </a>
                  <a href="tel:${enquiryData.mobile}" 
                     style="display: inline-block; padding: 12px 22px; background-color: #009fe3; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 13px; margin: 4px 6px;">
                    📞 Call Client Directly
                  </a>
                  <a href="mailto:${enquiryData.email}?subject=${encodeURIComponent(`VRF Homes HVAC Proposal - ${enquiryData.fullName}`)}" 
                     style="display: inline-block; padding: 12px 22px; background-color: #071120; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 13px; margin: 4px 6px;">
                    📧 Send Email Proposal
                  </a>
                </div>

              </div>

              <!-- Footer -->
              <div style="background-color: #f1f5f9; padding: 16px 20px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 11px; color: #64748b;">
                <p style="margin: 0; font-weight: 600;">VRF Homes • Shukla Enterprise Turnkey Mechanical HVAC</p>
                <p style="margin: 4px 0 0 0;">Lucknow Registered Office | Delhi NCR | Kerala Project Network</p>
                <p style="margin: 4px 0 0 0;"><a href="https://vrfhomes.com" style="color: #009fe3; text-decoration: none; font-weight: 700;">www.vrfhomes.com</a></p>
              </div>

            </div>
          </div>
        `
      });
      console.log(`[Email Card Dispatched] Lead notification card sent to: ${recipientEmail}`);

      // 1B. Send Confirmation Acknowledgment Card to the Client
      if (enquiryData.email && enquiryData.email.includes('@')) {
        try {
          await transporter.sendMail({
            from: `"VRF Homes" <${process.env.SMTP_USER}>`,
            to: enquiryData.email,
            subject: `Estimate Request Received - VRF Homes (${leadRef})`,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 20px;">
                <div style="background-color: #ffffff; border-radius: 14px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                  <div style="background: linear-gradient(135deg, #071120 0%, #009fe3 100%); padding: 24px; text-align: center; color: #ffffff;">
                    <h2 style="margin: 0; font-size: 22px; font-weight: 900; letter-spacing: 1px;">VRF HOMES</h2>
                    <p style="margin: 4px 0 0 0; font-size: 12px; color: #cbd5e1;">Your HVAC Estimate Request is Confirmed</p>
                  </div>
                  <div style="padding: 24px; font-size: 14px; color: #334155; line-height: 1.6;">
                    <p>Dear <strong>${enquiryData.fullName}</strong>,</p>
                    <p>Thank you for reaching out to <strong>VRF Homes</strong>. We have successfully registered your request for an HVAC &amp; Central Air Conditioning estimation.</p>
                    
                    <div style="background-color: #f1f5f9; padding: 14px 18px; border-radius: 10px; margin: 16px 0; font-size: 13px;">
                      <div><strong>Reference Number:</strong> <span style="font-family: monospace; color: #009fe3; font-weight: 700;">${leadRef}</span></div>
                      <div><strong>City / Location:</strong> ${enquiryData.city || 'India'}</div>
                      <div><strong>Project Typology:</strong> ${enquiryData.propertyType || 'Villa / Residential'}</div>
                    </div>

                    <p>Our senior mechanical HVAC engineer will review your site specifications and contact you shortly with a personalized heat-load recommendation and itemized BOQ.</p>

                    <p style="margin-top: 20px; font-size: 13px; color: #64748b;">
                      Need immediate assistance? Feel free to call or WhatsApp our engineering helpline at <a href="tel:+918896921318" style="color: #009fe3; font-weight: 700; text-decoration: none;">+91 88969 21318</a>.
                    </p>
                  </div>
                  <div style="background-color: #f8fafc; padding: 14px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8;">
                    VRF Homes • Authorized HVAC Partner for Voltas, Haier, Carrier, Mitsubishi Electric, O General &amp; Hitachi
                  </div>
                </div>
              </div>
            `
          });
          console.log(`[Client Confirmation Sent] Acknowledgment email sent to: ${enquiryData.email}`);
        } catch (clientMailErr) {
          console.log('[Client Confirmation Note]:', clientMailErr.message);
        }
      }

    } catch (mailErr) {
      console.log('[Email Dispatch Notice]:', mailErr.message);
    }
  } else {
    console.log(`[Email Alert Ready] Lead card prepared for ${recipientEmail}: ${enquiryData.fullName} (${enquiryData.mobile})`);
  }

  // 2. Telegram Instant Webhook Alert if configured
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

  // 3. Generic Webhook (e.g. Zapier, Make, Pabbly or WhatsApp Webhook)
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
