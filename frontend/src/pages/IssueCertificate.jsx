import { useState } from "react";
import { uploadCertificate } from "../services/api";

function IssueCertificate() {

  const [studentName, setStudentName] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [file, setFile] = useState(null);

  const [certificateId, setCertificateId] = useState(null);

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("studentName", studentName);
    formData.append("course", course);
    formData.append("year", year);
    formData.append("certificate", file);

    try {

      const result = await uploadCertificate(formData);

      setCertificateId(result.certificate.certificateId);

      alert(result.message);

    } catch (err) {

      console.error(err);

    }

  };

  return (

    <div className="min-h-screen py-12 px-4">

      <div className="max-w-2xl mx-auto">

        <h1 className="text-4xl font-bold mb-8 gradient-text">
          Issue Certificate
        </h1>

        <div className="glass-card p-8 space-y-6">

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block text-sm font-medium mb-2 text-white">
                Student Name
              </label>

              <input
                type="text"
                placeholder="Enter student name"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-border/50 text-white"
                onChange={(e) => setStudentName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-white">
                Course
              </label>

              <input
                type="text"
                placeholder="Enter course name"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-border/50 text-white"
                onChange={(e) => setCourse(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-white">
                Year
              </label>

              <input
                type="text"
                placeholder="Enter year"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-border/50 text-white"
                onChange={(e) => setYear(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-white">
                Certificate File
              </label>

              <input
                type="file"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-border/50 text-white"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-semibold"
            >
              Upload Certificate
            </button>

          </form>

        </div>

        {/* Show Certificate ID */}

        {certificateId && (

          <div className="mt-6 p-6 glass-card text-center">

            <h2 className="text-xl font-bold mb-2">
              Certificate Issued Successfully 🎉
            </h2>

            <p className="text-muted-foreground mb-3">
              Give this Certificate ID to the student
            </p>

            <div className="text-2xl font-bold text-primary">
              {certificateId}
            </div>

          </div>

        )}

      </div>

    </div>

  );

}

export default IssueCertificate;