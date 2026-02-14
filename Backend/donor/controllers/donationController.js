import Donation from '../models/Donation.js';
import User from '../models/User.js';

export const createDonation = async (req, res) => {
  try {
    const donation = await Donation.create({ ...req.body, donorId: req.user._id });
    
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { totalDonations: 1, totalQuantityDonated: req.body.quantity }
    });

    res.status(201).json({ success: true, donation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ donorId: req.user._id }).sort('-createdAt');
    res.json({ success: true, donations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findOne({ _id: req.params.id, donorId: req.user._id });
    if (!donation) {
      return res.status(404).json({ success: false, message: 'Donation not found' });
    }
    res.json({ success: true, donation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const donations = await Donation.find({ donorId: req.user._id });
    
    const activeDonations = donations.filter(d => !['completed', 'distributed'].includes(d.status)).length;
    const lastDonation = donations.length > 0 ? donations[0].createdAt : null;
    
    const monthlyData = donations.reduce((acc, d) => {
      const month = new Date(d.createdAt).toLocaleString('default', { month: 'short' });
      acc[month] = (acc[month] || 0) + d.quantity;
      return acc;
    }, {});

    res.json({
      success: true,
      stats: {
        totalDonations: user.totalDonations,
        totalQuantityDonated: user.totalQuantityDonated,
        peopleFed: user.peopleFed || Math.floor(user.totalQuantityDonated * 3),
        lastDonation,
        activeDonations,
        impactScore: user.impactScore || user.totalDonations * 10,
        monthlyData: Object.entries(monthlyData).map(([month, quantity]) => ({ month, quantity }))
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
