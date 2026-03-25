import { Link, useLocation, useNavigate } from "react-router-dom";
import { Shield, Menu, X, LogOut, LogIn, User, LayoutDashboard } from "lucide-react";
import { useState, useEffect } from "react";
import { getStoredUser, removeToken, isAuthenticated } from "../../services/authApi";
import { toast } from "react-toastify";

const publicNavLinks = [
  { to: "/", label: "Home" },
  { to: "/issue", label: "Issue Certificate" },
  { to: "/verify", label: "Verify" },
];

const authNavLinks = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { to: "/issue", label: "Issue Certificate" },
  { to: "/verify", label: "Verify" },
];

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // Update auth state
    setIsAuth(isAuthenticated());
    const storedUser = getStoredUser();
    setUser(storedUser);
  }, [location]);

  const handleLogout = () => {
    removeToken();
    setUser(null);
    setIsAuth(false);
    setMobileMenuOpen(false);
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold gradient-text">BlockCert</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {(isAuth ? authNavLinks : publicNavLinks).map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  location.pathname === link.to
                    ? "text-white bg-primary/20"
                    : "text-white hover:bg-white/10"
                }`}
              >
                {link.icon === "dashboard" && <LayoutDashboard className="w-4 h-4" />}
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            {isAuth && user ? (
              <>
                {/* User Info */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
                  <User className="w-4 h-4 text-primary" />
                  <div className="flex flex-col">
                    <span className="text-xs text-white/60">Organization</span>
                    <span className="text-sm font-semibold text-white">
                      {user.organizationName}
                    </span>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 font-semibold hover:bg-red-500/20 transition duration-300"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Login Button */}
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold hover:bg-white/10 transition duration-300"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>

                {/* Signup Button */}
                <Link
                  to="/signup"
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-semibold hover:opacity-90 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-2">
              {(isAuth ? authNavLinks : publicNavLinks).map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    location.pathname === link.to
                      ? "text-white bg-primary/20"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  {link.icon === "dashboard" && <LayoutDashboard className="w-4 h-4" />}
                  {link.label}
                </Link>
              ))}

              {/* Mobile Auth Section */}
              <div className="mt-4 pt-4 border-t border-border/50">
                {isAuth && user ? (
                  <>
                    <div className="px-4 py-3 rounded-lg bg-primary/10 border border-primary/20 mb-3">
                      <span className="text-xs text-white/60 block mb-1">Organization</span>
                      <span className="text-sm font-semibold text-white">
                        {user.organizationName}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 font-semibold hover:bg-red-500/20 transition duration-300"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-3 rounded-lg text-white font-semibold text-center hover:bg-white/10 transition duration-300 mb-3"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-semibold text-center hover:opacity-90 transition"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
