const express = require("express");
const router = express.Router();
const { searchDonors, updateDonorProfile, getAllDonors } = require("../controllers/donorController");
const { protect, adminOnly } = require("../middleware/auth");

router.get("/search", searchDonors); // public search
router.put("/profile", protect, updateDonorProfile);
router.get("/", protect, adminOnly, getAllDonors);

module.exports = router;
