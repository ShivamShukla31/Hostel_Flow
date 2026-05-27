import API from '../api/api';
import { storage } from '../utils/helpers';

// Auth Service
export const authService = {
  register: async (data) => {
    try {
      const response = await API.post('/auth/register', data);
      if (response.data.accessToken) {
        storage.setToken(response.data.accessToken);
        storage.setUser({
          _id: response.data._id,
          name: response.data.name,
          email: response.data.email,
          role: response.data.role
        });
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const response = await API.post('/auth/login', { email, password });
      if (response.data.accessToken) {
        storage.setToken(response.data.accessToken);
      }
      if (response.data._id) {
        storage.setUser({
          _id: response.data._id,
          name: response.data.name,
          email: response.data.email,
          role: response.data.role
        });
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      await API.post('/auth/logout');
      storage.clear();
    } catch (error) {
      storage.clear(); // Clear local storage even if logout fails
      throw error;
    }
  },

  getProfile: async () => {
    try {
      const response = await API.get('/auth/profile');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  refreshToken: async () => {
    try {
      const response = await API.post('/auth/refresh-token');
      if (response.data.accessToken) {
        storage.setToken(response.data.accessToken);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Problem Service
export const problemService = {
  createProblem: async (data) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('department', data.category);
      formData.append('hostel', data.hostel);
      formData.append('priority', data.priority);
      if (data.image) {
        formData.append('problemImage', data.image);
      }

      const response = await API.post('/problems', formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getMyProblems: async (page = 1, limit = 10) => {
    try {
      const response = await API.get(`/problems/my?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAllProblems: async (page = 1, limit = 10) => {
    try {
      const response = await API.get(`/problems?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getProblemById: async (id) => {
    try {
      const response = await API.get(`/problems/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateProblemStatus: async (id, status) => {
    try {
      const response = await API.put(`/problems/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  assignWorker: async (id, workerId) => {
    try {
      const response = await API.put(`/problems/${id}/assign`, { workerId });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  approveProblem: async (id) => {
    try {
      const response = await API.put(`/problems/${id}/approve`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  rejectProblem: async (id) => {
    try {
      const response = await API.put(`/problems/${id}/reject`);
      return response;
    } catch (error) {
      throw error;
    }
  },
  closeProblem: async (id) => {
    try {
      const response = await API.put(`/problems/${id}/close`);
      return response;
    } catch (error) {
      throw error;
    }
  },
  getDashboardStats: async () => {
    try {
      const response = await API.get('/problems/dashboard');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getWorkers: async () => {
    try {
      const response = await API.get('/problems/workers');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAssignedProblems: async () => {
    try {
      const response = await API.get(`/problems/assigned`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getIssueStats: async () => {
    try {
      const response = await API.get('/problems/issue_stats');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
