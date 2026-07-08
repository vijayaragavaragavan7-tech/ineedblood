const express = require("express");
const router = express.Router();
const BloodInventory = require("../models/BloodInventory");
const { protect, adminOnly } = require("../middleware/auth");

// @desc  Get current blood stock (public)
router.get("/", async (req, res) => {
  try {
    const inventory = await BloodInventory.find().sort({ bloodGroup: 1 });
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc  Add or update stock for a blood group (admin only)
router.put("/:bloodGroup", protect, adminOnly, async (req, res) => {
  try {
    const { unitsAvailable } = req.body;
    const updated = await BloodInventory.findOneAndUpdate(
      { bloodGroup: req.params.bloodGroup },
      { unitsAvailable },
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
