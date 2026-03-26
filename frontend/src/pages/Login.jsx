import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";
import { toast } from "react-toastify";
import { login, setToken, setStoredUser } from "../services/authApi";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);

      // Store token and user info
      setToken(result.token);
      setStoredUser(result.user);

      toast.success("Login successful! ");

      // Redirect to issue page
      setTimeout(() => {
        navigate("/issue");
      }, 1000);
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 pt-24">
      <div className="w-full max-w-md">
        {/* Heading */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold gradient-text mb-2">Welcome Back</h1>
          <p className="text-white/60">Login to your organization account</p>
        </div>

        {/* Login Form */}
        <div className="glass-card p-8 animate-fade-in space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@organization.com"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition duration-300"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-accent" />
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition duration-300"
              />
              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm text-accent hover:underline transition"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Login
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gradient-dark text-white/60">New organization?</span>
            </div>
          </div>

          {/* Signup Link */}
          <div className="text-center">
            <p className="text-white/60 text-sm">
              Create a new account{" "}
              <Link to="/signup" className="text-accent font-semibold hover:underline">
                Sign up here
              </Link>
            </p>
          </div>
        </div>

        {/* Info Box */}
        <div className="glass-card p-6 mt-6 animate-fade-in border border-accent/20 bg-accent/5">
          <p className="text-white/70 text-sm">
            <span className="font-semibold text-accent"> Demo Login:</span> Use any registered organization email and password to login and issue certificates.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
