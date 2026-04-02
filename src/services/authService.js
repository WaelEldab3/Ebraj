import api from './api';

const authService = {
  login: async ({ identifier, password, loginType = 'MAIN' }) => {
    console.log('Logging in as:', loginType, '| identifier:', identifier);
    const response = await api.post('/auth/login', { identifier, password, loginType });
    return response.data;
  },

  register: async (userData) => {
    // userData should include username, email, phone, password
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  verifyAccount: async (code) => {
    const response = await api.post('/auth/verify-email', { code });
    return response.data;
  },

  resendCode: async (email) => {
    const response = await api.post('/auth/resend-code', { email });
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (code, password) => {
    const response = await api.post('/auth/reset-password', { code, password });
    return response.data;
  },

  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  requestVerification: async () => {
    const response = await api.post('/auth/request-verification');
    return response.data;
  },

  createSubAccount: async (userData) => {
    const response = await api.post('/auth/create-sub-account', userData);
    return response.data;
  },

  getSubAccounts: async () => {
    const response = await api.get('/auth/sub-accounts');
    return response.data;
  },

  lawResponse: async (action) => {
    const response = await api.patch('/auth/law-response', { action });
    return response.data;
  }
};

export default authService;
