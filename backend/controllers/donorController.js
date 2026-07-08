const User = require("../models/User");

// @desc   Search donors by blood group and/or city
// @route  GET /api/donors/search?bloodGroup=A+&city=Chennai
const searchDonors = async (req, res) => {
  try {
    const { bloodGroup, city } = req.query;
    const filter = { role: "donor", isAvailable: true };

    if (bloodGroup) filter.bloodGroup = bloodGroup;
    if (city) filter.city = { $regex: city, $options: "i" };

    const donors = await User.find(filter).select("-password").sort({ createdAt: -1 });
    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Update own donor profile
// @route  PUT /api/donors/profile
const updateDonorProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { name, phone, city, state, bloodGroup, isAvailable, lastDonationDate } = req.body;

    user.name = name ?? user.name;
    user.phone = phone ?? user.phone;
    user.city = city ?? user.city;
    user.state = state ?? user.state;
    user.bloodGroup = bloodGroup ?? user.bloodGroup;
    user.isAvailable = isAvailable ?? user.isAvailable;
    user.lastDonationDate = lastDonationDate ?? user.lastDonationDate;

    const updated = await user.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get all donors (admin)
// @route  GET /api/donors
const getAllDonors = async (req, res) => {
  try {
    const donors = await User.find({ role: "donor" }).select("-password");
    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { searchDonors, updateDonorProfile, getAllDonors };
