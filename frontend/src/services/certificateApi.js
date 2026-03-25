import { API_BASE_URL } from './config';

// Get BASE_URL dynamically to ensure it's always correct
const getBaseUrl = () => {
  return `${API_BASE_URL}/certificates`;
};

// Helper function to safely parse response
const handleResponse = async (response) => {
  const text = await response.text();

  // Always log the URL being called for debugging
  const baseUrl = getBaseUrl();
  console.log('✓ Certificate API called. Base URL:', baseUrl);
  console.log('Response Status:', response.status);
  
  if (response.status >= 400) {
    console.error('API Error Response:', text.substring(0, 500));
  }

  let data;
  try {
    data = JSON.parse(text);
  } catch (parseErr) {
    // Server returned non-JSON (HTML error page, etc)
    console.error("❌ Server returned non-JSON response:");
    console.error("Status:", response.status);
    console.error("Expected JSON but got:", text.substring(0, 500));
    
    // Check if it's an HTML error page
    if (text.includes('<!DOCTYPE') || text.includes('<html') || text.includes('<!doctype')) {
      throw new Error(`Server error (${response.status}): Invalid backend response. Check if API endpoint exists at ${getBaseUrl()}`);
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
  const baseUrl = getBaseUrl();
  console.log('Calling getCertificatesByUser at:', `${baseUrl}/user/${userId}`);
  
  const response = await fetch(`${baseUrl}/user/${userId}`, {
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
  const baseUrl = getBaseUrl();
  console.log('Calling getCertificateById at:', `${baseUrl}/${certificateId}`);
  
  const response = await fetch(`${baseUrl}/${certificateId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return handleResponse(response);
};

// Verify a certificate
export const verifyCertificate = async (certificateId) => {
  const baseUrl = getBaseUrl();
  console.log('Calling verifyCertificate at:', `${baseUrl}/verify/${certificateId}`);
  
  const response = await fetch(`${baseUrl}/verify/${certificateId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return handleResponse(response);
};

// Delete a certificate
export const deleteCertificate = async (certificateId) => {
  const baseUrl = getBaseUrl();
  console.log('Calling deleteCertificate at:', `${baseUrl}/${certificateId}`);
  
  const response = await fetch(`${baseUrl}/${certificateId}`, {
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
  const baseUrl = getBaseUrl();
  console.log('Calling issueCertificate at:', `${baseUrl}/upload`);
  
  const response = await fetch(`${baseUrl}/upload`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(certificateData),
  });

  return handleResponse(response);
};
