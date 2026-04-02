import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const isAuthMe = error.config && error.config.url === '/auth/me';
    if (error.response && error.response.status === 401 && isAuthMe) {
      // Gracefully suppress logging for expected 401s on initial load
      return Promise.reject(error);
    }

    // We will add token refresh logic here later
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api;
