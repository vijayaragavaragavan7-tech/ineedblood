const nodemailer = require("nodemailer");
const EmergencyRequest = require("../models/EmergencyRequest");
const User = require("../models/User");

// Setup nodemailer transporter (Gmail example)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// @desc   Create emergency blood request + notify matching donors by email
// @route  POST /api/requests
const createRequest = async (req, res) => {
  try {
    const { patientName, bloodGroup, unitsNeeded, hospitalName, city, contactNumber, notes } = req.body;

    const request = await EmergencyRequest.create({
      patientName,
      bloodGroup,
      unitsNeeded,
      hospitalName,
      city,
      contactNumber,
      notes,
      requestedBy: req.user ? req.user._id : undefined,
    });

    // Find matching available donors in the same city + blood group
    const matchingDonors = await User.find({
      role: "donor",
      bloodGroup,
      isAvailable: true,
      city: { $regex: city, $options: "i" },
    });

    // Send email alerts (won't crash the request if email fails)
    if (matchingDonors.length > 0 && process.env.EMAIL_USER) {
      const emails = matchingDonors.map((d) => d.email);
      transporter
        .sendMail({
          from: process.env.EMAIL_USER,
          to: emails,
          subject: `🩸 Urgent: ${bloodGroup} Blood Needed at ${hospitalName}`,
          text: `Hi,\n\nAn emergency request for ${bloodGroup} blood (${unitsNeeded} units) has been raised for patient ${patientName} at ${hospitalName}, ${city}.\n\nContact: ${contactNumber}\n\nIf you are available to donate, please reach out immediately.\n\n- INeedBlood Team`,
        })
        .catch((err) => console.error("Email send error:", err.message));
    }

    res.status(201).json({ request, matchedDonors: matchingDonors.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get all emergency requests (admin)
// @route  GET /api/requests
const getAllRequests = async (req, res) => {
  try {
    const requests = await EmergencyRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Update request status (admin)
// @route  PUT /api/requests/:id
const updateRequestStatus = async (req, res) => {
  try {
    const request = await EmergencyRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    request.status = req.body.status || request.status;
    const updated = await request.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createRequest, getAllRequests, updateRequestStatus };
