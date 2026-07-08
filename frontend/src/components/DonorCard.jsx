export default function DonorCard({ donor }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-800">{donor.name}</h3>
        <span className="bg-blood-light text-blood font-bold px-3 py-1 rounded-full text-sm">
          {donor.bloodGroup}
        </span>
      </div>
      <p className="text-gray-500 text-sm mb-1">📍 {donor.city || "Location not set"}</p>
      <p className="text-gray-500 text-sm mb-4">📞 {donor.phone}</p>
      <a
        href={`tel:${donor.phone}`}
        className="block text-center bg-blood text-white py-2 rounded-lg hover:bg-blood-dark transition text-sm font-medium"
      >
        Contact Donor
      </a>
    </div>
  );
}
