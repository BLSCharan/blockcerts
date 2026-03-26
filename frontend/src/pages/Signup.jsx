import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Building, Mail, Lock, Phone, Globe, MapPin, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { signup, setToken, setStoredUser } from "../services/authApi";

function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    organizationName: "",
    organizationRegistrationId: "",
    email: "",
    password: "",
    confirmPassword: "",
    organizationType: "",
    about: "",
    address: "",
    website: "",
    phone: "",
  });

  const organizationTypes = ["College", "University", "Company", "School", "Institute", "Other"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    // Required fields validation
    if (
      !formData.organizationName ||
      !formData.organizationRegistrationId ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.organizationType
    ) {
      toast.error("Please fill in all required fields (marked with *)");
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    // Password validation
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }

    // Password match validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    // Website validation (if provided)
    if (formData.website) {
      try {
        new URL(formData.website);
      } catch {
        toast.error("Please enter a valid website URL");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const result = await signup(formData);

      // Store token and user info
      setToken(result.token);
      setStoredUser(result.user);

      toast.success("Registration successful! Welcome!");

      // Redirect to issue page
      setTimeout(() => {
        navigate("/issue");
      }, 1500);
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 pt-24">
      <div className="max-w-2xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold gradient-text mb-2">Register Organization</h1>
          <p className="text-white/60">Create an account to issue and manage certificates</p>
        </div>

        {/* Signup Form */}
        <div className="glass-card p-8 animate-fade-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1: Organization Name & Registration ID */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Organization Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white">
                  Organization Name <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                  placeholder="e.g., ABC University"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition duration-300"
                />
              </div>

              {/* Registration ID */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white">
                  Registration ID <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  name="organizationRegistrationId"
                  value={formData.organizationRegistrationId}
                  onChange={handleChange}
                  placeholder="e.g., REG-2024-001"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition duration-300"
                />
              </div>
            </div>

            {/* Row 2: Email & Organization Type */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white flex items-center gap-2">
                  <Mail className="w-4 h-4 text-accent" />
                  Email Address <span className="text-accent">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@organization.edu"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition duration-300"
                />
              </div>

              {/* Organization Type */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white flex items-center gap-2">
                  <Building className="w-4 h-4 text-accent" />
                  Organization Type <span className="text-accent">*</span>
                </label>
                <select
                  name="organizationType"
                  value={formData.organizationType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition duration-300 appearance-none"
                  style={{
                    colorScheme: 'dark'
                  }}
                >
                  <option value="" label="Select type" className="bg-slate-800 text-white" />
                  {organizationTypes.map((type) => (
                    <option key={type} value={type} label={type} className="bg-slate-800 text-white" />
                  ))}
                </select>
              </div>
            </div>

            {/* Row 3: Password & Confirm Password */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-accent" />
                  Password <span className="text-accent">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimum 6 characters"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition duration-300 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-accent" />
                  Confirm Password <span className="text-accent">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter password"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition duration-300 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">
                About Organization
              </label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                placeholder="Describe your organization briefly..."
                rows="3"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition duration-300 resize-none"
              />
            </div>

            {/* Row 4: Address & Website */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Address */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-accent" />
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street address"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition duration-300"
                />
              </div>

              {/* Website */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-accent" />
                  Website
                </label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition duration-300"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" />
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition duration-300"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating Account...
                </>
              ) : (
                "Create Organization Account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gradient-dark text-white/60">Already registered?</span>
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-white/60 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-accent font-semibold hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>

        {/* Info Box */}
        <div className="glass-card p-6 mt-6 animate-fade-in border border-primary/20 bg-primary/5">
          <p className="text-white/70 text-sm">
            <span className="font-semibold text-primary">Required Fields:</span> Organization Name, Registration ID, Email, Password, and Organization Type are required to create an account.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
