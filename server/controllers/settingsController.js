import mongoose from 'mongoose';
import WebsiteSettings from '../models/WebsiteSettings.js';
import { exactContactData } from '../config/defaultData.js';

export const getSettings = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ success: true, data: exactContactData });
    }
    let settings = await WebsiteSettings.findOne();
    if (!settings) {
      return res.json({ success: true, data: exactContactData });
    }
    res.json({ success: true, data: settings });
  } catch (error) {
    res.json({ success: true, data: exactContactData });
  }
};

export const updateSettings = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      Object.assign(exactContactData, req.body);
      return res.json({ success: true, data: exactContactData, message: 'Website settings updated successfully' });
    }
    let settings = await WebsiteSettings.findOne();
    if (!settings) {
      settings = await WebsiteSettings.create(req.body);
    } else {
      Object.assign(settings, req.body);
      await settings.save();
    }
    res.json({ success: true, data: settings, message: 'Website settings updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
