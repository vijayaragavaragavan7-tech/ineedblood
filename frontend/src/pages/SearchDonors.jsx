import { useState } from "react";
import api from "../api/axios";
import DonorCard from "../components/DonorCard";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function SearchDonors() {
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);
    try {
      const { data } = await api.get("/donors/search", {
        params: { bloodGroup, city },
      });
      setDonors(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold text-blood-dark mb-6">Find Blood Donors</h2>

      <form onSubmit={handleSearch} className="flex flex-wrap gap-4 mb-8 bg-white p-5 rounded-xl border border-gray-200">
        <select
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 flex-1 min-w-[150px]"
        >
          <option value="">Any Blood Group</option>
          {bloodGroups.map((bg) => (
            <option key={bg} value={bg}>{bg}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 flex-1 min-w-[150px]"
        />
        <button
          type="submit"
          className="bg-blood text-white px-6 py-2 rounded-lg font-medium hover:bg-blood-dark transition"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-gray-500">Searching...</p>}

      {!loading && searched && donors.length === 0 && (
        <p className="text-gray-500">No donors found matching your criteria.</p>
      )}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        {donors.map((donor) => (
          <DonorCard key={donor._id} donor={donor} />
        ))}
      </div>
    </div>
  );
}
