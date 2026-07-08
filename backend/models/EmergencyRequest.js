const mongoose = require("mongoose");

const emergencyRequestSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: true,
    },
    unitsNeeded: { type: Number, required: true, default: 1 },
    hospitalName: { type: String, required: true },
    city: { type: String, required: true },
    contactNumber: { type: String, required: true },
    requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["pending", "fulfilled", "cancelled"],
      default: "pending",
    },
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EmergencyRequest", emergencyRequestSchema);
