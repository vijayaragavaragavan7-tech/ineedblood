const express = require("express");
const router = express.Router();
const { createRequest, getAllRequests, updateRequestStatus } = require("../controllers/requestController");
const { protect, adminOnly } = require("../middleware/auth");

router.post("/", createRequest); // public - anyone can raise emergency request
router.get("/", protect, adminOnly, getAllRequests);
router.put("/:id", protect, adminOnly, updateRequestStatus);

module.exports = router;
