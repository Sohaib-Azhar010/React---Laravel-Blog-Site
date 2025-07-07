import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // adjust if needed
  withCredentials: true,
});

export default api;
