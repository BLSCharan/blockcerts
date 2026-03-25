import { AUTH_API_URL } from './config';

const BASE_URL = AUTH_API_URL;

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

// Signup function
export const signup = async (formData) => {
  const response = await fetch(`${BASE_URL}/signup`, {
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
  const response = await fetch(`${BASE_URL}/login`, {
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
  const response = await fetch(`${BASE_URL}/me`, {
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
  const response = await fetch(`${BASE_URL}/update-profile`, {
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
  const response = await fetch(`${BASE_URL}/forgot-password`, {
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
  const response = await fetch(`${BASE_URL}/reset-password`, {
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