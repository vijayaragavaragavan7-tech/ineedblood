import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

function DonorDashboard({ user }) {
  const [formData, setFormData] = useState({
    name: user.name || "",
    phone: user.phone || "",
    city: user.city || "",
    state: user.state || "",
    bloodGroup: user.bloodGroup || "",
    isAvailable: true,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await api.put("/donors/profile", formData);
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="max-w-lg mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold text-blood-dark mb-6">My Donor Profile</h2>
      {message && (
        <div className="bg-blood-light text-blood-dark rounded-lg p-3 mb-4 text-sm">{message}</div>
      )}
      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name"
          className="w-full border border-gray-300 rounded-lg px-4 py-2" />
        <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone"
          className="w-full border border-gray-300 rounded-lg px-4 py-2" />
        <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2">
          {bloodGroups.map((bg) => (
            <option key={bg} value={bg}>{bg}</option>
          ))}
        </select>
        <input name="city" value={formData.city} onChange={handleChange} placeholder="City"
          className="w-full border border-gray-300 rounded-lg px-4 py-2" />
        <input name="state" value={formData.state} onChange={handleChange} placeholder="State"
          className="w-full border border-gray-300 rounded-lg px-4 py-2" />
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input type="checkbox" name="isAvailable" checked={formData.isAvailable} onChange={handleChange} />
          Available to donate
        </label>
        <button type="submit" className="w-full bg-blood text-white py-2 rounded-lg font-medium hover:bg-blood-dark transition">
          Save Changes
        </button>
      </form>
    </div>
  );
}

function AdminDashboard() {
  const [inventory, setInventory] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    api.get("/inventory").then((res) => setInventory(res.data));
    api.get("/requests").then((res) => setRequests(res.data));
  }, []);

  const updateStock = async (bloodGroup, units) => {
    await api.put(`/inventory/${bloodGroup}`, { unitsAvailable: units });
    const { data } = await api.get("/inventory");
    setInventory(data);
  };

  const updateStatus = async (id, status) => {
    await api.put(`/requests/${id}`, { status });
    const { data } = await api.get("/requests");
    setRequests(data);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold text-blood-dark mb-6">Admin Dashboard</h2>

      <h3 className="font-semibold mb-3">Blood Inventory</h3>
      <div className="grid sm:grid-cols-4 gap-4 mb-10">
        {bloodGroups.map((bg) => {
          const stock = inventory.find((i) => i.bloodGroup === bg);
          return (
            <div key={bg} className="bg-white border border-gray-200 rounded-xl p-4 text-center">
              <div className="font-bold text-blood">{bg}</div>
              <input
                type="number"
                min="0"
                defaultValue={stock ? stock.unitsAvailable : 0}
                onBlur={(e) => updateStock(bg, Number(e.target.value))}
                className="w-full mt-2 border border-gray-300 rounded-lg px-2 py-1 text-center"
              />
              <p className="text-xs text-gray-400 mt-1">units</p>
            </div>
          );
        })}
      </div>

      <h3 className="font-semibold mb-3">Emergency Requests</h3>
      <div className="space-y-3">
        {requests.length === 0 && <p className="text-gray-500 text-sm">No requests yet.</p>}
        {requests.map((r) => (
          <div key={r._id} className="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">{r.patientName} — {r.bloodGroup} ({r.unitsNeeded} units)</p>
              <p className="text-sm text-gray-500">{r.hospitalName}, {r.city} • {r.contactNumber}</p>
            </div>
            <select
              value={r.status}
              onChange={(e) => updateStatus(r._id, e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
            >
              <option value="pending">Pending</option>
              <option value="fulfilled">Fulfilled</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  if (!user) return <p className="text-center mt-16 text-gray-500">Please login to view dashboard.</p>;
  return user.role === "admin" ? <AdminDashboard /> : <DonorDashboard user={user} />;
}
