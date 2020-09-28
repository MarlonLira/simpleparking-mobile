import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.34:4001'
});

export default api;