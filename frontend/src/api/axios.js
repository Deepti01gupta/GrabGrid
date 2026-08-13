import axios from 'axios';

const DEFAULT_DEV_API_URL = 'http://localhost:5000/api';
const DEFAULT_PROD_API_URL = 'https://grabgrid-api.onrender.com/api';

const normalizeApiBaseUrl = (rawUrl) => {
  if (!rawUrl || typeof rawUrl !== 'string') return '';

  let url = rawUrl.trim().replace(/\/+$/, '');
  if (!url) return '';

  // Guard against accidentally pointing API traffic to frontend hosting domains.
  if (url.includes('netlify.app')) {
    return DEFAULT_PROD_API_URL;
  }

  if (!/\/api(?:\/)?$/i.test(url)) {
    url = `${url}/api`;
  }

  return url;
};

const configuredApiUrl = normalizeApiBaseUrl(process.env.REACT_APP_API_URL);
const API_URL = configuredApiUrl || (process.env.NODE_ENV === 'production' ? DEFAULT_PROD_API_URL : DEFAULT_DEV_API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getStoredAccessToken = () => {
  return localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
};

// Add accessToken to request headers
api.interceptors.request.use((config) => {
  const accessToken = getStoredAccessToken();
  if (accessToken) {
    if (config.headers && typeof config.headers.set === 'function') {
      config.headers.set('Authorization', `Bearer ${accessToken}`);
      config.headers.set('x-access-token', accessToken);
    } else {
      config.headers = {
        ...(config.headers || {}),
        Authorization: `Bearer ${accessToken}`,
        'x-access-token': accessToken,
      };
    }
  }
  return config;
});

// Handle response errors (no auto-redirect)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
      sessionStorage.removeItem('user');
      // Do not auto-redirect, let app handle it
      console.warn('401 Unauthorized:', error.response?.data);
    }
    return Promise.reject(error);
  }
);

export default api;
