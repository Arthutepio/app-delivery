import axios from 'axios';

const port = 3001;

const PROTOCOL = process.env.REACT_APP_API_PROTOCOL || 'http';
const HOST = process.env.REACT_APP_API_HOST || 'localhost';
const PORT = process.env.REACT_APP_API_PORT || port;

const api = axios.create({
  baseURL: `${PROTOCOL}://${HOST}:${PORT}`,
});

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

export const requestData = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const requestLogin = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const requestRegister = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const updateData = async (endpoint, body) => {
  const data = await api.put(endpoint, body);
  return data;
};

export default api;
