import axios from 'axios';
import config from '../config';

const axiosInstance = axios.create({
  baseURL: config.AXIOS_URL || 'http://localhost:4000',
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
