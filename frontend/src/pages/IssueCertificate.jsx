import { useState } from "react";
import { uploadCertificate } from "../services/api";
import { getStoredUser } from "../services/authApi";
import { toast } from "react-toastify";
import { Upload, Check } from "lucide-react";

function IssueCertificate() {

  const [studentName, setStudentName] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const [certificateId, setCertificateId] = useState(null);

  const user = getStoredUser();

  const validateForm = () => {
    if (!studentName.trim()) {
      toast.error("Please enter student name");
      return false;
    }
    if (!course.trim()) {
      toast.error("Please enter course name");
      return false;
    }
    if (!year.trim()) {
      toast.error("Please enter year");
      return false;
    }
    if (!file) {
      toast.error("Please select a certificate file");
      return false;
    }
    return true;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const formData = new FormData();

    formData.append("studentName", studentName);
    formData.append("course", course);
    formData.append("year", year);
    formData.append("certificate", file);

    try {

      const result = await uploadCertificate(formData);

      setCertificateId(result.certificate.certificateId);

      // Clear form
      setStudentName("");
      setCourse("");
      setYear("");
      setFile(null);
      setFileName("");

      toast.success("Certificate uploaded successfully!");

    } catch (err) {

      console.error(err);
      toast.error(err.message || "Failed to upload certificate");

    } finally {
      setLoading(false);
    }

  };

  return (

    <div className="min-h-screen py-12 px-4 pt-24">

      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2 gradient-text">
            Issue Certificate
          </h1>
          <p className="text-white/60">Issue new certificates to students and store on blockchain</p>
        </div>

        {/* User Info Card */}
        {user && (
          <div className="glass-card p-6 mb-8 border border-accent/30 bg-accent/5 animate-fade-in">
            <p className="text-white/70">
              <span className="font-semibold text-accent">Issuing Organization:</span> {user.organizationName}
            </p>
          </div>
        )}

        <div className="glass-card p-8 space-y-6 animate-fade-in">

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Student Name */}
            <div>
              <label className="block text-sm font-medium mb-2 text-white">
                Student Name <span className="text-accent">*</span>
              </label>

              <input
                type="text"
                value={studentName}
                placeholder="e.g., John Doe"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition duration-300"
                onChange={(e) => setStudentName(e.target.value)}
              />
            </div>

            {/* Course */}
            <div>
              <label className="block text-sm font-medium mb-2 text-white">
                Course <span className="text-accent">*</span>
              </label>

              <input
                type="text"
                value={course}
                placeholder="e.g., Computer Science"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition duration-300"
                onChange={(e) => setCourse(e.target.value)}
              />
            </div>

            {/* Year */}
            <div>
              <label className="block text-sm font-medium mb-2 text-white">
                Year <span className="text-accent">*</span>
              </label>

              <input
                type="text"
                value={year}
                placeholder="e.g., 2024"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition duration-300"
                onChange={(e) => setYear(e.target.value)}
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium mb-2 text-white">
                Certificate File <span className="text-accent">*</span>
              </label>

              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white file:bg-primary/20 file:border-0 file:rounded file:px-4 file:py-2 file:text-primary file:font-semibold hover:border-accent/50 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition duration-300"
                  onChange={handleFileChange}
                />
              </div>

              {fileName && (
                <p className="text-sm text-accent mt-2 flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  {fileName}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Upload Certificate
                </>
              )}
            </button>

          </form>

        </div>

        {/* Success Card */}

        {certificateId && (

          <div className="mt-8 glass-card p-8 text-center border border-accent/50 bg-accent/10 animate-slide-up">

            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                <Check className="w-8 h-8 text-white" />
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-2 gradient-text">
              Certificate Issued Successfully! 🎉
            </h2>

            <p className="text-white/70 mb-6">
              Certificate has been stored on the blockchain and IPFS
            </p>

            <div className="bg-white/5 border border-white/20 rounded-lg p-6">
              <p className="text-xs text-white/60 mb-2">Certificate ID</p>
              <p className="text-2xl font-bold text-accent break-all font-mono">
                {certificateId}
              </p>
            </div>

            <p className="text-white/60 text-sm mt-6">
              Share this Certificate ID with the student to verify the certificate
            </p>

          </div>

        )}

      </div>

    </div>

  );

}

export default IssueCertificate;