const BASE_URL = "http://localhost:5000/api/certificates";

// Helper function to safely parse response
const handleResponse = async (response) => {
  const text = await response.text();

  let data;
  try {
    data = JSON.parse(text);
  } catch (parseErr) {
    console.error("Server returned non-JSON:", text);
    throw new Error("Server error. Invalid response format.");
  }

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

// Get all certificates by the logged-in user
export const getCertificatesByUser = async (userId) => {
  const response = await fetch(`${BASE_URL}/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return handleResponse(response);
};

// Get a specific certificate by ID
export const getCertificateById = async (certificateId) => {
  const response = await fetch(`${BASE_URL}/${certificateId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return handleResponse(response);
};

// Verify a certificate
export const verifyCertificate = async (certificateId) => {
  const response = await fetch(`${BASE_URL}/verify/${certificateId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return handleResponse(response);
};

// Delete a certificate
export const deleteCertificate = async (certificateId) => {
  const response = await fetch(`${BASE_URL}/${certificateId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return handleResponse(response);
};

// Issue a new certificate
export const issueCertificate = async (certificateData) => {
  const response = await fetch(`${BASE_URL}/issue`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(certificateData),
  });

  return handleResponse(response);
};
