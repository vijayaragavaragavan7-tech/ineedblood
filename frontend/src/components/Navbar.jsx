import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blood">
        🩸 INeedBlood
      </Link>

      <div className="flex items-center gap-5 text-sm font-medium text-gray-700">
        <Link to="/" className="hover:text-blood">Home</Link>
        <Link to="/search" className="hover:text-blood">Find Donors</Link>
        <Link to="/emergency" className="hover:text-blood">Emergency Request</Link>

        {!user && (
          <>
            <Link to="/login" className="hover:text-blood">Login</Link>
            <Link
              to="/register"
              className="bg-blood text-white px-4 py-2 rounded-lg hover:bg-blood-dark transition"
            >
              Register as Donor
            </Link>
          </>
        )}

        {user && (
          <>
            <Link to="/dashboard" className="hover:text-blood">
              {user.role === "admin" ? "Admin Dashboard" : "My Dashboard"}
            </Link>
            <button
              onClick={handleLogout}
              className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
