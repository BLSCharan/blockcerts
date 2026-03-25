import { AUTH_API_URL } from './config';

// Get BASE_URL dynamically to ensure it's always correct
const getBaseUrl = () => {
  return AUTH_API_URL;
};

// Helper function to safely parse response
const handleResponse = async (response) => {
  const text = await response.text();

  // Always log the URL being called for debugging
  const baseUrl = getBaseUrl();
  console.log('✓ Auth API called:', baseUrl);
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

// Signup function
export const signup = async (formData) => {
  const baseUrl = getBaseUrl();
  console.log('Calling signup at:', `${baseUrl}/signup`);
  
  const response = await fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  return handleResponse(response);
};

// Login function
export const login = async (email, password) => {
  const baseUrl = getBaseUrl();
  console.log('Calling login at:', `${baseUrl}/login`);
  
  const response = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return handleResponse(response);
};

// Get current user profile
export const getCurrentUser = async (token) => {
  const baseUrl = getBaseUrl();
  console.log('Calling getCurrentUser at:', `${baseUrl}/me`);
  
  const response = await fetch(`${baseUrl}/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return handleResponse(response);
};

// Update user profile
export const updateProfile = async (token, profileData) => {
  const baseUrl = getBaseUrl();
  console.log('Calling updateProfile at:', `${baseUrl}/update-profile`);
  
  const response = await fetch(`${baseUrl}/update-profile`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profileData),
  });

  return handleResponse(response);
};

// Forgot password function
export const forgotPassword = async (email) => {
  const baseUrl = getBaseUrl();
  console.log('Calling forgotPassword at:', `${baseUrl}/forgot-password`);
  
  const response = await fetch(`${baseUrl}/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  return handleResponse(response);
};

// Reset password function (direct, no email link)
export const resetPassword = async (email, password, confirmPassword) => {
  const baseUrl = getBaseUrl();
  console.log('Calling resetPassword at:', `${baseUrl}/reset-password`);
  
  const response = await fetch(`${baseUrl}/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, confirmPassword }),
  });

  return handleResponse(response);
};

// Token helpers
export const getToken = () => localStorage.getItem("token");

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const removeUser = () => {
  localStorage.removeItem("user");
};

export const getStoredUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const setStoredUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const isAuthenticated = () => !!getToken();