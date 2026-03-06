import { useState } from "react";
import { verifyCertificate } from "../services/api";

function VerifyCertificate(){

  const [certificateId,setCertificateId] = useState("");
  const [certificate,setCertificate] = useState(null);

  const handleVerify = async () => {

    const result = await verifyCertificate(certificateId);

    setCertificate(result);

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