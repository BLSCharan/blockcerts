const BASE_URL = "http://localhost:5000/api";

// Get token from localStorage
const getToken = () => {
  return localStorage.getItem("token");
};

// Upload certificate (requires authentication)
export const uploadCertificate = async (formData) => {
  const token = getToken();

  if (!token) {
    throw new Error("You must be logged in to upload a certificate");
  }

  const response = await fetch(
    `${BASE_URL}/certificates/upload`,
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: formData
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to upload certificate");
  }

  return response.json();
};

// Verify certificate (public endpoint)
export const verifyCertificate = async (certificateId) => {
  const response = await fetch(
    `${BASE_URL}/certificates/verify/${certificateId}`
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to verify certificate");
  }

  return response.json();
};