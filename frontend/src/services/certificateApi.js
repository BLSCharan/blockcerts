import { API_BASE_URL } from './config';

const BASE_URL = `${API_BASE_URL}/certificates`;

// Helper function to safely parse response
const handleResponse = async (response) => {
  const text = await response.text();

  // Log response details for debugging (development only)
  if (import.meta.env.DEV) {
    console.log('Response Status:', response.status);
    console.log('Response Text:', text.substring(0, 500));
    console.log('API URL being called:', BASE_URL);
  }

  let data;
  try {
    data = JSON.parse(text);
  } catch (parseErr) {
    // Server returned non-JSON (HTML error page, etc)
    console.error("Server returned non-JSON response:");
    console.error("Status:", response.status);
    console.error("Response:", text.substring(0, 1000));
    
    // Check if it's an HTML error page
    if (text.includes('<!DOCTYPE') || text.includes('<html') || text.includes('<!doctype')) {
      throw new Error(`Server error (${response.status}): ${text.includes('Cannot') ? 'Endpoint not found' : 'Invalid server response'}`);
    }
    
    throw new Error(`Server error: ${text || 'No response'}`);
  }

  if (!response.ok) {
    throw new Error(data.message || `Server error: ${response.status}`);
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
