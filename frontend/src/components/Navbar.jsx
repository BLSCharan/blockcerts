import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, Home, FileText, CheckCircle } from "lucide-react";
import { getStoredUser, removeToken, removeUser } from "../services/authApi";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();
  const user = getStoredUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    removeToken();
    removeUser();
    navigate("/login");
    toast.success("Logged out successfully");
  };

  return (
    <nav className="fixed top-0 w-full bg-gradient-to-r from-slate-900 to-purple-900 shadow-lg z-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold gradient-text">
            BlockCert
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <Link to="/" className="text-gray-300 hover:text-white transition flex items-center gap-1">
              <Home className="w-4 h-4" />
              Home
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-300 hover:text-white transition flex items-center gap-1"
                >
                  <FileText className="w-4 h-4" />
                  Dashboard
                </Link>
                <Link
                  to="/issue"
                  className="text-gray-300 hover:text-white transition flex items-center gap-1"
                >
                  <FileText className="w-4 h-4" />
                  Issue
                </Link>
                <Link
                  to="/verify"
                  className="text-gray-300 hover:text-white transition flex items-center gap-1"
                >
                  <CheckCircle className="w-4 h-4" />
                  Verify
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-300 hover:text-white transition">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-semibold transition"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              to="/"
              className="block text-gray-300 hover:text-white transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="block text-gray-300 hover:text-white transition py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/issue"
                  className="block text-gray-300 hover:text-white transition py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Issue Certificate
                </Link>
                <Link
                  to="/verify"
                  className="block text-gray-300 hover:text-white transition py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Verify Certificate
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-gray-300 hover:text-white transition py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;