import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' }
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  getProfile: () => API.get('/auth/profile'),
  updateProfile: (data) => API.put('/auth/profile', data)
};

export const donationAPI = {
  create: (data) => API.post('/donations', data),
  getAll: () => API.get('/donations'),
  getById: (id) => API.get(`/donations/${id}`),
  getStats: () => API.get('/donations/stats')
};

export const feedbackAPI = {
  create: (data) => API.post('/feedback', data),
  getAll: () => API.get('/feedback')
};

export default API;
