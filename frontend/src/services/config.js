// Detect API URL based on environment
const getApiUrl = () => {
  // Check if there's a custom API URL in environment variables
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl) {
    return envUrl;
  }

  // In development (localhost), use localhost:5000
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:5000/api';
  }

  // In production, use the deployed backend URL
  return 'https://blockcerts.onrender.com/api';
};

export const API_BASE_URL = getApiUrl();
export const AUTH_API_URL = `${API_BASE_URL}/auth`;

if (import.meta.env.DEV) {
  console.log('API URL:', API_BASE_URL);
}
