import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-blood-light py-20 px-6 text-center">
        <h1 className="text-4xl font-bold text-blood-dark mb-4">
          Every Drop Counts. Save a Life Today.
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto mb-8">
          Find blood donors near you instantly, or register as a donor to help
          someone in their time of need.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/search"
            className="bg-blood text-white px-6 py-3 rounded-lg font-medium hover:bg-blood-dark transition"
          >
            Find Donors
          </Link>
          <Link
            to="/emergency"
            className="bg-white border border-blood text-blood px-6 py-3 rounded-lg font-medium hover:bg-blood-light transition"
          >
            Emergency Request
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto py-16 px-6 grid md:grid-cols-3 gap-8 text-center">
        <div>
          <div className="text-3xl mb-2">🔍</div>
          <h3 className="font-semibold mb-1">Search Donors</h3>
          <p className="text-gray-500 text-sm">
            Filter donors by blood group and city to find help fast.
          </p>
        </div>
        <div>
          <div className="text-3xl mb-2">🩸</div>
          <h3 className="font-semibold mb-1">Become a Donor</h3>
          <p className="text-gray-500 text-sm">
            Register once, save many lives. Update availability anytime.
          </p>
        </div>
        <div>
          <div className="text-3xl mb-2">🚨</div>
          <h3 className="font-semibold mb-1">Emergency Alerts</h3>
          <p className="text-gray-500 text-sm">
            Raise an urgent request — matching donors are notified by email.
          </p>
        </div>
      </section>
    </div>
  );
}
