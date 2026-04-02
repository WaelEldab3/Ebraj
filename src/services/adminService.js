import api from './api';

const adminService = {
  getAllUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },

  updateVerificationStatus: async ({ userId, status }) => {
    const response = await api.patch(`/admin/users/${userId}/verify`, { status });
    return response.data;
  },
};

export default adminService;
