import { useState } from "react";
import api from "../api/axios";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function EmergencyRequest() {
  const [formData, setFormData] = useState({
    patientName: "",
    bloodGroup: "",
    unitsNeeded: 1,
    hospitalName: "",
    city: "",
    contactNumber: "",
    notes: "",
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const { data } = await api.post("/requests", formData);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold text-blood-dark mb-2">🚨 Emergency Blood Request</h2>
      <p className="text-gray-500 text-sm mb-6">
        Matching available donors in your city will be notified by email immediately.
      </p>

      {result && (
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 mb-6 text-sm">
          Request submitted successfully! {result.matchedDonors} matching donor(s) notified.
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-6 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <input name="patientName" placeholder="Patient Name" required onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blood" />

        <select name="bloodGroup" required onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blood">
          <option value="">Select Blood Group Needed</option>
          {bloodGroups.map((bg) => (
            <option key={bg} value={bg}>{bg}</option>
          ))}
        </select>

        <input type="number" name="unitsNeeded" min="1" placeholder="Units Needed" value={formData.unitsNeeded} onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blood" />

        <input name="hospitalName" placeholder="Hospital Name" required onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blood" />

        <input name="city" placeholder="City" required onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blood" />

        <input name="contactNumber" placeholder="Contact Number" required onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blood" />

        <textarea name="notes" placeholder="Additional notes (optional)" onChange={handleChange} rows="3"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blood" />

        <button type="submit" disabled={loading}
          className="w-full bg-blood text-white py-2 rounded-lg font-medium hover:bg-blood-dark transition disabled:opacity-60">
          {loading ? "Submitting..." : "Submit Emergency Request"}
        </button>
      </form>
    </div>
  );
}
