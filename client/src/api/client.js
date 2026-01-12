import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - handle 401
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Don't redirect here, let the auth context handle it
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  getUniversities: () => apiClient.get('/auth/universities'),
  register: (data) => apiClient.post('/auth/register', data),
  verifyEmail: (data) => apiClient.post('/auth/verify-email', data),
  login: (data) => apiClient.post('/auth/login', data),
  getMe: () => apiClient.get('/auth/me'),
};

// Rides API
export const ridesApi = {
  createRequest: (data) => apiClient.post('/rides/', data),
  getMyRequest: () => apiClient.get('/rides/my-request'),
  getPendingRequests: () => apiClient.get('/rides/pending'),
  respondToRequest: (rideId, action) =>
    apiClient.post(`/rides/${rideId}/respond`, { action }),
  getMyAcceptedRides: () => apiClient.get('/rides/my-accepted'),
  cancelRide: (rideId) => apiClient.post(`/rides/${rideId}/cancel`),
  completeRide: (rideId) => apiClient.post(`/rides/${rideId}/complete`),
  submitReview: (rideId, data) => apiClient.post(`/rides/${rideId}/review`, data),
  getReview: (rideId) => apiClient.get(`/rides/${rideId}/review`),
};

export default apiClient;
