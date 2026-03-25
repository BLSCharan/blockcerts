// Detect API URL based on environment
const getApiUrl = () => {
  // IMPORTANT: Always check environment variable first
  const envUrl = import.meta.env.VITE_API_URL;
  
  console.log('🔍 VITE_API_URL from env:', envUrl);
  
  if (envUrl && envUrl.length > 0) {
    // Ensure it includes /api
    if (!envUrl.includes('/api')) {
      console.warn('⚠️ WARNING: VITE_API_URL missing /api, adding it');
      return `${envUrl}/api`;
    }
    console.log('✅ Using env URL:', envUrl);
    return envUrl;
  }

  // Development (localhost)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🏠 Detected localhost - using local backend');
    return 'http://localhost:5000/api';
  }

  // Production fallback - ALWAYS include /api
  console.log('🌐 Detected production - using Render backend');
  return 'https://blockcerts.onrender.com/api';
};

export const API_BASE_URL = getApiUrl();
export const AUTH_API_URL = `${API_BASE_URL}/auth`;
export const CERTIFICATES_API_URL = `${API_BASE_URL}/certificates`;

console.log('📍 API_BASE_URL:', API_BASE_URL);
console.log('📍 AUTH_API_URL:', AUTH_API_URL);
console.log('📍 CERTIFICATES_API_URL:', CERTIFICATES_API_URL);
