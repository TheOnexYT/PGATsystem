
import axios from 'axios';

const BASE_URL = 'https://apipqr-8d207c66b5e3.herokuapp.com';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to include token in requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('pgat-auth-token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log("Adding token to request:", token.substring(0, 15) + "...");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response ? error.response.data : error.message);
    return Promise.reject(error);
  }
);
