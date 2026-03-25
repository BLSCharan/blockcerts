// Detect API URL based on environment
const getApiUrl = () => {
  // Check if there's a custom API URL in environment variables
  const envUrl = import.meta.env.VITE_API_URL;
  
  if (import.meta.env.DEV) {
    console.log('VITE_API_URL from env:', envUrl);
  }
  
  if (envUrl) {
    return envUrl;
  }

  // In development (localhost), use localhost:5000
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:5000/api';
  }

  // In production, always use the deployed backend URL with /api prefix
  // Check different possible hostnames
  const hostname = window.location.hostname;
  
  // If accessing from a custom domain or vercel domain, use Render backend
  if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
    return 'https://blockcerts.onrender.com/api';
  }
  
  // Fallback
  return 'https://blockcerts.onrender.com/api';
};

export const API_BASE_URL = getApiUrl();
export const AUTH_API_URL = `${API_BASE_URL}/auth`;

if (import.meta.env.DEV) {
  console.log('API_BASE_URL:', API_BASE_URL);
  console.log('AUTH_API_URL:', AUTH_API_URL);
}
