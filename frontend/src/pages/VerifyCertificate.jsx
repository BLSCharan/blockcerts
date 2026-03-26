import { useState } from "react";
import { verifyCertificate } from "../services/api";
import { CheckCircle, Copy, Check } from "lucide-react";

function VerifyCertificate(){

  const [certificateId,setCertificateId] = useState("");
  const [certificate,setCertificate] = useState(null);
  const [copiedCertId, setCopiedCertId] = useState(false);

  const handleCopyCertificateId = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedCertId(true);
    setTimeout(() => setCopiedCertId(false), 2000);
  };

  const handleVerify = async () => {

    const result = await verifyCertificate(certificateId);

    setCertificate(result);

    // Store verified certificate ID in localStorage
    if (result && result.success) {
      const verifiedCerts = JSON.parse(localStorage.getItem("verifiedCertificates") || "[]");
      if (!verifiedCerts.includes(certificateId)) {
        verifiedCerts.push(certificateId);
        localStorage.setItem("verifiedCertificates", JSON.stringify(verifiedCerts));
      }
    }

  };

  return (

    <div className="min-h-screen py-12 px-4">

      <div className="max-w-2xl mx-auto">

        <h1 className="text-4xl font-bold mb-8 gradient-text">

          Verify Certificate

        </h1>

        <div className="glass-card p-8 space-y-6">

          <div>

            <label className="block text-sm font-medium mb-2 text-white">
              Certificate ID
            </label>

            <div className="flex gap-4">

              <input
              type="text"
              placeholder="Enter Certificate ID"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-border/50 text-white placeholder-white/50 focus:outline-none focus:border-primary transition"
              onChange={(e)=>setCertificateId(e.target.value)}
              value={certificateId}
              />

              <button
              onClick={handleVerify}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-semibold hover:opacity-90 transition"
              >
                Verify
              </button>

            </div>

          </div>

          {certificate && (

            <div className="mt-8 space-y-4 border-t border-border/30 pt-6">
              
              {certificate.success && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <p className="text-green-400 font-semibold">Certificate Verified Successfully! ✓</p>
                </div>
              )}

              <div>
                <p className="text-sm text-white/70">Student Name</p>
                <p className="text-lg font-semibold text-white">
                  {certificate.cert.studentName}
                </p>
              </div>

              <div>
                <p className="text-sm text-white/70">Course</p>
                <p className="text-lg font-semibold text-white">
                  {certificate.cert.course}
                </p>
              </div>

              <div>
                <p className="text-sm text-white/70">Year</p>
                <p className="text-lg font-semibold text-white">
                  {certificate.cert.year}
                </p>
              </div>

              <div>
                <p className="text-sm text-white/70 mb-2">Certificate ID</p>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-semibold text-white font-mono break-all flex-1">
                    {certificate.cert.certificateId}
                  </p>
                  <button
                    onClick={() => handleCopyCertificateId(certificate.cert.certificateId)}
                    className="p-2 hover:bg-white/10 rounded transition"
                    title="Copy Certificate ID"
                  >
                    {copiedCertId ? (
                      <Check className="w-5 h-5 text-green-400" />
                    ) : (
                      <Copy className="w-5 h-5 text-white/60 hover:text-white" />
                    )}
                  </button>
                </div>
              </div>

              {certificate.ipfsLink && (
                <div>
                  <p className="text-sm text-muted-foreground mb-4">Certificate</p>
                  <iframe
                  src={certificate.ipfsLink}
                  width="100%"
                  height="500px"
                  className="border border-border/50 rounded-lg"
                  />
                </div>
              )}

            </div>

          )}

        </div>

      </div>

    </div>

  );

}

export default VerifyCertificate;