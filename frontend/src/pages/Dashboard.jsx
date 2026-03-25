import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Edit2,
  User,
  LogOut,
  TrendingUp,
  ActivitySquare,
} from "lucide-react";
import { toast } from "react-toastify";
import { getStoredUser, removeToken, removeUser } from "../services/authApi";
import { getCurrentUser, updateProfile } from "../services/authApi";
import { getCertificatesByUser } from "../services/certificateApi";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(getStoredUser());
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [verifiedCount, setVerifiedCount] = useState(0);
  const [profileData, setProfileData] = useState({
    organizationName: "",
    about: "",
    address: "",
    website: "",
    phone: "",
  });

  // Fetch user data and certificates
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const storedUser = getStoredUser();
        const token = localStorage.getItem("token");

        if (storedUser && token) {
          const userData = await getCurrentUser(token);
          setUser(userData.user || storedUser);
          setProfileData({
            organizationName: userData.user?.organizationName || "",
            about: userData.user?.about || "",
            address: userData.user?.address || "",
            website: userData.user?.website || "",
            phone: userData.user?.phone || "",
          });

          // Fetch certificates
          const certData = await getCertificatesByUser(storedUser.id);
          setCertificates(certData.certificates || []);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const result = await updateProfile(token, profileData);
      toast.success("Profile updated successfully!");
      setUser(result.user);
      setEditingProfile(false);
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(error.message || "Failed to update profile");
    }
  };

  const handleLogout = () => {
    removeToken();
    removeUser();
    navigate("/login");
    toast.success("Logged out successfully");
  };

  const isProfileComplete =
    user?.about && user?.address && user?.phone && user?.website;
  const totalCertificates = certificates.length;
  const recentCertificates = certificates.slice(0, 5);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900 pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">
            Welcome back, <span className="text-blue-400 font-semibold">{user?.organizationName}</span>
          </p>
        </div>

        {/* Profile Incomplete Alert */}
        {!isProfileComplete && (
          <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-yellow-400 font-semibold mb-2">Complete Your Profile</p>
              <p className="text-yellow-300/70 text-sm mb-3">
                Your profile is incomplete. Please add missing details to enhance your organization visibility.
              </p>
              <button
                onClick={() => setEditingProfile(true)}
                className="text-sm px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded transition"
              >
                Complete Profile
              </button>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Total Certificates */}
          <div className="glass-card p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <FileText className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">{totalCertificates}</span>
            </div>
            <p className="text-gray-400 text-sm">Total Certificates</p>
          </div>

          {/* Issued */}
          <div className="glass-card p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <span className="text-2xl font-bold text-white">{totalCertificates}</span>
            </div>
            <p className="text-gray-400 text-sm">Issued</p>
          </div>

          {/* Verified */}
          <div className="glass-card p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-cyan-400" />
              <span className="text-2xl font-bold text-white">
                {verifiedCount}
              </span>
            </div>
            <p className="text-gray-400 text-sm">Verified</p>
          </div>

          {/* This Month */}
          <div className="glass-card p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="w-8 h-8 text-cyan-400" />
              <span className="text-2xl font-bold text-white">
                {Math.floor(totalCertificates * 0.35)}
              </span>
            </div>
            <p className="text-gray-400 text-sm">This Month</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile & Activities */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Card */}
            {editingProfile ? (
              <EditProfileForm
                profileData={profileData}
                setProfileData={setProfileData}
                onSubmit={handleProfileUpdate}
                onCancel={() => setEditingProfile(false)}
              />
            ) : (
              <ProfileCard user={user} onEdit={() => setEditingProfile(true)} />
            )}

            {/* Recent Certificates */}
            <CertificatesList 
              certificates={recentCertificates}
              onSelectCertificate={setSelectedCertificate}
              onVerificationUpdate={setVerifiedCount}
            />
          </div>

          {/* Right Column - Quick Actions & Info */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="glass-card p-6 rounded-lg">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <ActivitySquare className="w-5 h-5 text-blue-400" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate("/issue")}
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg font-semibold transition"
                >
                  Issue Certificate
                </button>
                <button
                  onClick={() => navigate("/verify")}
                  className="w-full py-3 px-4 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg font-semibold transition border border-slate-600"
                >
                  Verify Certificate
                </button>
              </div>
            </div>

            {/* Organization Info */}
            <div className="glass-card p-6 rounded-lg">
              <h3 className="text-white font-semibold mb-4">Organization Info</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-400">Type</p>
                  <p className="text-white font-semibold">{user?.organizationType}</p>
                </div>
                <div>
                  <p className="text-gray-400">Status</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <p className="text-green-400">Active</p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400">Member Since</p>
                  <p className="text-white font-semibold">
                    {new Date(user?.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Help Card */}
            <div className="glass-card p-6 rounded-lg bg-blue-500/5 border border-blue-500/20">
              <h3 className="text-white font-semibold mb-3">Need Help?</h3>
              <p className="text-gray-400 text-sm mb-4">
                Check our documentation for detailed guides on issuing and verifying certificates.
              </p>
              <button className="text-blue-400 hover:text-blue-300 font-semibold text-sm">
                View Docs →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Details Modal */}
      {selectedCertificate && (
        <CertificateModal
          certificate={selectedCertificate}
          onClose={() => setSelectedCertificate(null)}
        />
      )}
    </div>
  );
};

// Profile Card Component
const ProfileCard = ({ user, onEdit }) => {
  const completePercentage = [
    user?.organizationName,
    user?.about,
    user?.address,
    user?.website,
    user?.phone,
  ].filter(Boolean).length * 20;

  return (
    <div className="glass-card p-8 rounded-lg">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{user?.organizationName}</h2>
            <p className="text-gray-400">{user?.organizationType}</p>
          </div>
        </div>
        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition"
        >
          <Edit2 className="w-4 h-4" />
          Edit
        </button>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-gray-400">Profile Completion</p>
          <p className="text-sm font-semibold text-blue-400">{completePercentage}%</p>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${completePercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-400 mb-1">Email</p>
          <p className="text-white break-all">{user?.email}</p>
        </div>
        <div>
          <p className="text-gray-400 mb-1">Phone</p>
          <p className="text-white">{user?.phone || "Not added"}</p>
        </div>
        <div>
          <p className="text-gray-400 mb-1">Address</p>
          <p className="text-white">{user?.address || "Not added"}</p>
        </div>
        <div>
          <p className="text-gray-400 mb-1">Website</p>
          <p className="text-white">{user?.website || "Not added"}</p>
        </div>
      </div>

      {user?.about && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-gray-400 text-sm mb-2">About</p>
          <p className="text-gray-300 text-sm">{user.about}</p>
        </div>
      )}
    </div>
  );
};

// Edit Profile Form Component
const EditProfileForm = ({ profileData, setProfileData, onSubmit, onCancel }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="glass-card p-8 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-6">Edit Organization Profile</h2>
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Organization Name
          </label>
          <input
            type="text"
            name="organizationName"
            value={profileData.organizationName}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">About</label>
          <textarea
            name="about"
            value={profileData.about}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
            placeholder="Tell us about your organization..."
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={profileData.address}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              value={profileData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Website</label>
          <input
            type="url"
            name="website"
            value={profileData.website}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg font-semibold transition"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

// Certificate Details Modal
const CertificateModal = ({ certificate, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!certificate) return null;

  const handleCopyLink = () => {
    const ipfsLink = `https://gateway.pinata.cloud/ipfs/${certificate.cid}`;
    navigator.clipboard.writeText(ipfsLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const ipfsLink = `https://gateway.pinata.cloud/ipfs/${certificate.cid}`;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg p-8 max-w-2xl w-full border border-blue-500/30">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">Certificate Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-400 text-sm mb-2">Student Name</p>
              <p className="text-white font-semibold text-lg">{certificate.studentName}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-2">Course</p>
              <p className="text-white font-semibold text-lg">{certificate.course}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-2">Year of Issue</p>
              <p className="text-white font-semibold text-lg">{certificate.year}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-2">Issue Date</p>
              <p className="text-white font-semibold text-lg">
                {new Date(certificate.issuedAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div>
            <p className="text-gray-400 text-sm mb-2">Certificate ID</p>
            <p className="text-white font-mono text-sm bg-gray-800 p-3 rounded-lg break-all">
              {certificate.certificateId}
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-sm mb-2">IPFS Link</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={ipfsLink}
                readOnly
                className="flex-1 bg-gray-800 text-white text-sm p-3 rounded-lg border border-gray-700 font-mono break-all"
              />
              <button
                onClick={handleCopyLink}
                className="px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition whitespace-nowrap"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <a
              href={ipfsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg font-semibold transition text-center"
            >
              View on IPFS
            </a>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Certificates List Component
const CertificatesList = ({ certificates, onSelectCertificate, onVerificationUpdate }) => {
  const [verificationStatus, setVerificationStatus] = useState({});

  useEffect(() => {
    // Get verified count from localStorage
    const verifiedCerts = JSON.parse(localStorage.getItem("verifiedCertificates") || "[]");
    onVerificationUpdate(verifiedCerts.length);
  }, []);

  return (
    <div className="glass-card p-8 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          <FileText className="w-6 h-6 text-blue-400" />
          Recent Certificates
        </h3>
        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
          {certificates.length} issued
        </span>
      </div>

      {certificates.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 mb-4">No certificates issued yet</p>
          <p className="text-gray-500 text-sm">Start issuing certificates to see them here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {certificates.map((cert, index) => (
            <div
              key={cert._id || index}
              onClick={() => onSelectCertificate(cert)}
              className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg hover:border-blue-500/50 hover:bg-gray-800/80 transition cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-blue-400 font-semibold group-hover:text-blue-300 transition cursor-pointer">
                    {cert.studentName}
                  </h4>
                  <p className="text-gray-400 text-sm">{cert.course}</p>
                  <p className="text-gray-500 text-xs mt-1 font-mono">{cert.cid.substring(0, 20)}...</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm">
                    {new Date(cert.issuedAt).toLocaleDateString()}
                  </p>
                  <div className="flex items-center gap-2 mt-1 justify-end">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-green-400 text-xs">Verified</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
